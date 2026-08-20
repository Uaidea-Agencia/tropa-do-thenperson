let audioContext: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  const AudioContextCtor =
    window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!AudioContextCtor) return null;
  if (!audioContext) audioContext = new AudioContextCtor();
  return audioContext;
}

// Duas notas curtas, intervalo de quinta justa (A5 → E6) — "tim-tim" de
// aviso genérico, não os dois tons específicos do som proprietário de
// notificação do WhatsApp.
const NOTES: Array<{ freq: number; start: number }> = [
  { freq: 880, start: 0 },
  { freq: 1318.5, start: 0.11 },
];
const NOTE_DURATION_S = 0.22;
const NOTE_PEAK_GAIN = 0.18;

/**
 * Toca um "tim-tim" curto de aviso (~350ms), sintetizado via Web Audio
 * API — tom original, não uma cópia do som proprietário de notificação
 * do WhatsApp (é um asset licenciado; reproduzir o som real seria
 * problema de marca registrada, não só de peso de página). Pedido do
 * cliente: aviso de saída "tem que fazer um barulho de mensagem do
 * whatsapp" — ver `docs/ui-web.md`, seção "Aviso de saída
 * (exit-intent)".
 *
 * Silencioso e sem erro se o navegador bloquear áudio sem gesto do
 * usuário (política de autoplay) — `mouseout` (o próprio gatilho do
 * exit-intent) não conta como gesto "confiável" em todo navegador, e
 * `AudioContext` pode não ter sido desbloqueado ainda por nenhum clique
 * anterior na página. Quando isso acontece o aviso continua funcionando
 * normalmente, só sem som — o som é tempero, nunca pode travar o fluxo
 * de saída do usuário.
 */
export function playNotificationChime() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    if (ctx.state === "suspended") {
      void ctx.resume().catch(() => {});
    }

    for (const { freq, start } of NOTES) {
      const oscillator = ctx.createOscillator();
      const gain = ctx.createGain();
      oscillator.type = "sine";
      oscillator.frequency.value = freq;

      const startTime = ctx.currentTime + start;
      gain.gain.setValueAtTime(0, startTime);
      gain.gain.linearRampToValueAtTime(NOTE_PEAK_GAIN, startTime + 0.015);
      gain.gain.exponentialRampToValueAtTime(0.0001, startTime + NOTE_DURATION_S);

      oscillator.connect(gain);
      gain.connect(ctx.destination);
      oscillator.start(startTime);
      oscillator.stop(startTime + NOTE_DURATION_S + 0.02);
    }
  } catch {
    // Ver comentário acima — som é tempero, nunca pode quebrar o fluxo.
  }
}
