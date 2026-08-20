interface WhatsAppIconProps {
  size?: number;
  className?: string;
  variant?: "badge" | "glyph";
}

/**
 * Ícone oficial do WhatsApp — círculo verde (`--color-whatsapp`) + glifo
 * branco do fone/balão. Exceção documentada em `docs/marca.md`, seção
 * "Cor do WhatsApp — uso restrito": pedido explícito do cliente ("quero
 * o verdinho original") substitui, só pra este ícone, a regra anterior
 * do projeto de nunca usar o verde oficial da marca.
 *
 * - `variant="badge"` (padrão): desenha o próprio círculo verde por
 *   trás do glifo — pra usar sobre qualquer fundo que não seja já
 *   verde (o CTA laranja "Grupo do WhatsApp", o selo do aviso de
 *   saída).
 * - `variant="glyph"`: só o glifo branco, sem fundo — pra usar sobre
 *   uma superfície que já é o próprio verde (o botão flutuante, que
 *   tem `bg-whatsapp` como fundo real, não um selo por cima).
 */
export function WhatsAppIcon({ size = 18, className, variant = "badge" }: Readonly<WhatsAppIconProps>) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden="true">
      {variant === "badge" && <circle cx="12" cy="12" r="12" className="fill-whatsapp" />}
      <path
        d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.16-.17.2-.35.22-.64.08-.3-.15-1.26-.46-2.39-1.48-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.61-.92-2.21-.24-.58-.49-.5-.67-.51-.17-.01-.37-.01-.57-.01-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.87 1.21 3.07.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.69.63.71.23 1.36.19 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35z"
        className="fill-white"
      />
    </svg>
  );
}
