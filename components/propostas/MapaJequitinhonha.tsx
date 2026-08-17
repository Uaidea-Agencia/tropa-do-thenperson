"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { type MotionValue, motion, useTransform } from "motion/react";
import { line, curveCatmullRom } from "d3-shape";
import mapaData from "./data/jequitinhonha.paths.json";
import { paradas } from "./data/paradas";

type PontoRota = { slug: string; nome: string; x: number; y: number };

const REGIAO_VERDE: Record<string, string> = {
  Diamantina: "var(--color-mapa-verde-1)",
  Capelinha: "var(--color-mapa-verde-2)",
  "Araçuaí": "var(--color-mapa-verde-3)",
  "Pedra Azul": "var(--color-mapa-verde-4)",
  Almenara: "var(--color-mapa-verde-5)",
};

const rotaGenerator = line<PontoRota>()
  .x((p) => p.x)
  .y((p) => p.y)
  .curve(curveCatmullRom.alpha(0.5));

interface MapaJequitinhonhaProps {
  progress: MotionValue<number>;
  paradaAtiva: number;
  onSelect: (index: number) => void;
  reducedMotion: boolean;
}

export function MapaJequitinhonha({
  progress,
  paradaAtiva,
  onSelect,
  reducedMotion,
}: Readonly<MapaJequitinhonhaProps>) {
  const routeRef = useRef<SVGPathElement>(null);
  const [pointDistances, setPointDistances] = useState<number[] | null>(null);

  const pontos = useMemo<PontoRota[]>(() => {
    const porSlug = new Map(mapaData.cidades.map((c) => [c.slug, c]));
    return paradas.map((parada) => {
      const ponto = porSlug.get(parada.slug);
      if (!ponto) throw new Error(`Coordenadas ausentes para "${parada.slug}"`);
      return { slug: parada.slug, nome: parada.cidade, x: ponto.x, y: ponto.y };
    });
  }, []);

  const rotaD = useMemo(() => rotaGenerator(pontos) ?? "", [pontos]);

  useEffect(() => {
    const pathEl = routeRef.current;
    if (!pathEl) return undefined;

    const timer = setTimeout(() => {
      const totalLength = pathEl.getTotalLength();
      const samples = 200;
      const distances = pontos.map((ponto) => {
        let closestT = 0;
        let closestDist = Infinity;
        for (let i = 0; i <= samples; i++) {
          const len = (i / samples) * totalLength;
          const { x, y } = pathEl.getPointAtLength(len);
          const dist = Math.hypot(x - ponto.x, y - ponto.y);
          if (dist < closestDist) {
            closestDist = dist;
            closestT = len / totalLength;
          }
        }
        return closestT;
      });
      setPointDistances(distances);
    }, 0);

    return () => clearTimeout(timer);
  }, [pontos]);

  const dashOffset = useTransform(progress, (p) => (reducedMotion ? 0 : 1 - p));

  return (
    <div className="relative w-full">
      <svg
        viewBox={mapaData.viewBox}
        className="w-full"
        role="img"
        aria-label={`Mapa do Vale do Jequitinhonha com as ${paradas.length} paradas da campanha: ${paradas
          .map((p) => p.cidade)
          .join(", ")}. Use as setas do teclado para navegar entre elas.`}
      >
        <g>
          {mapaData.microrregioes.map((regiao) => {
            const ativa = paradas[paradaAtiva]?.microrregiao === regiao.nome;
            return (
              <path
                key={regiao.id}
                d={regiao.d}
                fill={REGIAO_VERDE[regiao.nome] ?? "var(--color-mapa-verde-3)"}
                stroke="var(--color-mapa-verde-5)"
                strokeOpacity={0.4}
                strokeWidth={1}
                opacity={ativa ? 1 : 0.45}
                style={{
                  transformOrigin: `${regiao.cx}px ${regiao.cy}px`,
                  transform: ativa ? "scale(1.01)" : "scale(1)",
                  transition: reducedMotion
                    ? "opacity 0.15s linear"
                    : "opacity 0.3s var(--ease-brand), transform 0.3s var(--ease-brand)",
                }}
              />
            );
          })}
        </g>

        <mask id="revelar-rota">
          <motion.path
            d={rotaD}
            stroke="white"
            strokeWidth={40}
            fill="none"
            pathLength={1}
            strokeDasharray={1}
            style={{ strokeDashoffset: dashOffset }}
          />
        </mask>
        <path
          ref={routeRef}
          d={rotaD}
          mask="url(#revelar-rota)"
          stroke="var(--color-accent)"
          strokeWidth={3}
          fill="none"
          strokeLinecap="round"
          strokeDasharray="0 12"
        />

        {pontos.map((ponto, index) => {
          const parada = paradas[index];
          const ativo = index === paradaAtiva;
          const distancia = pointDistances?.[index] ?? index / (pontos.length - 1);
          return (
            <PontoCidade
              key={ponto.slug}
              ponto={ponto}
              parada={parada}
              ativo={ativo}
              distancia={distancia}
              progress={progress}
              reducedMotion={reducedMotion}
              onSelect={() => onSelect(index)}
              onArrowNav={(direction) => {
                const proximo = Math.min(paradas.length - 1, Math.max(0, index + direction));
                onSelect(proximo);
              }}
            />
          );
        })}
      </svg>

      <ol className="sr-only">
        {paradas.map((parada) => (
          <li key={parada.slug}>
            {parada.cidade}
            {parada.base ? " (base do candidato)" : ""} — {parada.eixo}: {parada.titulo}.{" "}
            {parada.texto}
            {parada.dado ? ` ${parada.dado}` : ""}
          </li>
        ))}
      </ol>
    </div>
  );
}

interface PontoCidadeProps {
  ponto: PontoRota;
  parada: (typeof paradas)[number];
  ativo: boolean;
  distancia: number;
  progress: MotionValue<number>;
  reducedMotion: boolean;
  onSelect: () => void;
  onArrowNav: (direction: 1 | -1) => void;
}

function PontoCidade({
  ponto,
  parada,
  ativo,
  distancia,
  progress,
  reducedMotion,
  onSelect,
  onArrowNav,
}: Readonly<PontoCidadeProps>) {
  const visitadoOpacity = useTransform(progress, (p) =>
    reducedMotion || p >= distancia ? 1 : 0,
  );
  const naoVisitadoOpacity = useTransform(visitadoOpacity, (v) => 1 - v);
  const raio = ativo ? 12 : 8;

  function handleKeyDown(event: React.KeyboardEvent) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onSelect();
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      onArrowNav(1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      onArrowNav(-1);
    }
  }

  return (
    <g
      transform={`translate(${ponto.x}, ${ponto.y})`}
      role="button"
      tabIndex={0}
      aria-label={`${parada.cidade} — ${parada.eixo}: ${parada.titulo}${parada.base ? " · base do candidato" : ""}`}
      aria-pressed={ativo}
      onClick={onSelect}
      onKeyDown={handleKeyDown}
      className="cursor-pointer outline-none focus-visible:[&>circle.foco]:opacity-100"
    >
      {/* fill="transparent" (not "none") on purpose: gives the whole
          20-unit-radius disc a real hit area for click/tap, not just
          the thin focus-ring stroke — the visible dot alone (r=8-12) is
          too small a touch target. */}
      <circle r={20} fill="transparent" stroke="var(--color-focus)" strokeWidth={2} className="foco opacity-0" />
      {parada.base && ativo && (
        <motion.g
          initial={reducedMotion ? { y: -raio - 26 } : { y: -raio - 22 }}
          animate={
            reducedMotion ? { y: -raio - 26 } : { y: [-raio - 22, -raio - 30, -raio - 22] }
          }
          transition={
            reducedMotion ? undefined : { duration: 1.1, repeat: Infinity, ease: "easeInOut" }
          }
        >
          <path
            d="M-6,-14 A6,6 0 1 1 6,-14 L0,2 Z"
            fill="var(--color-accent)"
            stroke="var(--color-bg)"
            strokeWidth={1.5}
          />
          <circle cy={-14} r={2.4} fill="var(--color-bg)" />
        </motion.g>
      )}
      {ativo && !reducedMotion && (
        <motion.circle
          fill="none"
          stroke="var(--color-accent)"
          strokeWidth={2}
          initial={{ r: raio, opacity: 0.6 }}
          animate={{ r: [raio, raio + 8], opacity: [0.6, 0] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "easeOut" }}
        />
      )}
      <motion.circle
        r={raio}
        style={{ fillOpacity: ativo ? 1 : visitadoOpacity }}
        fill="var(--color-accent)"
        stroke="var(--color-bg)"
        strokeWidth={2}
      />
      {!ativo && (
        <motion.circle
          r={raio}
          fill="none"
          stroke="var(--color-accent)"
          strokeWidth={1.5}
          style={{ opacity: naoVisitadoOpacity }}
        />
      )}
      <text
        x={0}
        y={-raio - 8}
        textAnchor="middle"
        fontSize={16}
        fontWeight={600}
        fill="var(--color-text)"
        stroke="var(--color-bg)"
        strokeWidth={3.5}
        paintOrder="stroke"
        className="pointer-events-none select-none"
      >
        {parada.cidade}
      </text>
    </g>
  );
}
