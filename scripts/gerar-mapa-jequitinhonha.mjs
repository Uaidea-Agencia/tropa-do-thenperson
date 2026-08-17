// Run-once build script — regenerate with `node scripts/gerar-mapa-jequitinhonha.mjs`
// whenever components/propostas/data/paradas.ts adds/removes/moves a
// parada, then commit the updated jequitinhonha.paths.json. The
// component never fetches this at runtime.
//
// Imports paradas.ts (a .ts file) directly via Node's built-in type
// stripping (unflagged since Node 23.6, experimental — confirmed
// working on Node 23.9). If a future Node version drops or changes
// this, the fix is to inline the six {slug, lat, lng} pairs here
// instead of importing paradas.ts.
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { geoMercator, geoPath } from "d3-geo";
import { paradas } from "../components/propostas/data/paradas.ts";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_PATH = join(__dirname, "../components/propostas/data/jequitinhonha.paths.json");

const MESORREGIAO_ID = 3103;
const WIDTH = 900;

async function fetchJson(url) {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Falha ao buscar ${url}: HTTP ${res.status}`);
  }
  return res.json();
}

async function confirmMesorregiao() {
  const mesorregioes = await fetchJson(
    "https://servicodados.ibge.gov.br/api/v1/localidades/estados/31/mesorregioes",
  );
  const jequitinhonha = mesorregioes.find((m) => m.nome === "Jequitinhonha");
  if (!jequitinhonha) {
    throw new Error("Mesorregião 'Jequitinhonha' não encontrada na lista do IBGE.");
  }
  if (jequitinhonha.id !== MESORREGIAO_ID) {
    throw new Error(
      `Código da mesorregião divergente: esperado ${MESORREGIAO_ID}, IBGE retornou ${jequitinhonha.id}.`,
    );
  }
  console.log(`✓ Mesorregião confirmada: ${jequitinhonha.nome} (id ${jequitinhonha.id})`);
}

async function fetchMalha() {
  const url = `https://servicodados.ibge.gov.br/api/v3/malhas/mesorregioes/${MESORREGIAO_ID}?formato=application/vnd.geo+json&qualidade=intermediaria&intrarregiao=microrregiao`;
  const geojson = await fetchJson(url);
  console.log(`✓ Malha baixada: ${geojson.features.length} microrregiões`);
  return geojson;
}

async function fetchMicrorregioes() {
  const microrregioes = await fetchJson(
    `https://servicodados.ibge.gov.br/api/v1/localidades/mesorregioes/${MESORREGIAO_ID}/microrregioes`,
  );
  const porId = new Map(microrregioes.map((m) => [String(m.id), m.nome]));
  console.log(`✓ Nomes de microrregião resolvidos: ${[...porId.values()].join(", ")}`);
  return porId;
}

// IBGE's malha GeoJSON winds polygon rings the opposite way from what
// RFC 7946 (and d3-geo, which assumes it) expects — exterior rings must
// be counter-clockwise in [lon, lat] order. Left uncorrected, d3-geo's
// clip stream reads each region as "everything except the shape", and
// geoPath renders the full clip-extent rectangle as part of the path.
// Rewind every ring so exterior = CCW, holes = CW, matching the spec.
function ringSignedArea(ring) {
  let sum = 0;
  for (let i = 0; i < ring.length - 1; i++) {
    const [x1, y1] = ring[i];
    const [x2, y2] = ring[i + 1];
    sum += x1 * y2 - x2 * y1;
  }
  return sum / 2;
}

function rewindPolygon(rings) {
  return rings.map((ring, index) => {
    const isExterior = index === 0;
    const area = ringSignedArea(ring);
    // Empirically verified against this exact malha (see scratchpad
    // test): d3-geo wants the exterior ring's planar [lon, lat]
    // shoelace area negative, holes positive — the opposite of the
    // usual "CCW = positive = exterior" convention, because the
    // right-hand rule on a sphere flips sign once flattened to a
    // lon(x)/lat(y) plot in standard north-up orientation.
    const needsReversal = isExterior ? area > 0 : area < 0;
    return needsReversal ? [...ring].reverse() : ring;
  });
}

function rewindFeature(feature) {
  const { geometry } = feature;
  if (geometry.type === "Polygon") {
    return { ...feature, geometry: { ...geometry, coordinates: rewindPolygon(geometry.coordinates) } };
  }
  if (geometry.type === "MultiPolygon") {
    return {
      ...feature,
      geometry: { ...geometry, coordinates: geometry.coordinates.map(rewindPolygon) },
    };
  }
  return feature;
}

function buildFeatureCollectionForFit(malha) {
  const pontosComoFeatures = paradas.map((p) => ({
    type: "Feature",
    properties: {},
    geometry: { type: "Point", coordinates: [p.lng, p.lat] },
  }));
  return {
    type: "FeatureCollection",
    features: [...malha.features, ...pontosComoFeatures],
  };
}

async function main() {
  await confirmMesorregiao();
  const [malhaOriginal, nomesPorId] = await Promise.all([fetchMalha(), fetchMicrorregioes()]);
  const malha = { ...malhaOriginal, features: malhaOriginal.features.map(rewindFeature) };

  const paraFit = buildFeatureCollectionForFit(malha);
  const bounds = geoPath(geoMercator().fitSize([WIDTH, WIDTH], paraFit)).bounds(paraFit);
  const [[x0, y0], [x1, y1]] = bounds;
  const aspect = (y1 - y0) / (x1 - x0);
  const height = Math.round(WIDTH * aspect);

  const projection = geoMercator().fitSize([WIDTH, height], paraFit);
  const path = geoPath(projection);

  const microrregioes = malha.features.map((feature) => {
    const nome = nomesPorId.get(feature.properties.codarea);
    if (!nome) {
      throw new Error(`Microrregião sem nome resolvido: codarea ${feature.properties.codarea}`);
    }
    const [cx, cy] = path.centroid(feature);
    return {
      id: feature.properties.codarea,
      nome,
      d: path(feature),
      cx: Math.round(cx * 100) / 100,
      cy: Math.round(cy * 100) / 100,
    };
  });

  const cidades = paradas.map((p) => {
    const [x, y] = projection([p.lng, p.lat]);
    return {
      slug: p.slug,
      nome: p.cidade,
      x: Math.round(x * 100) / 100,
      y: Math.round(y * 100) / 100,
    };
  });

  const output = {
    viewBox: `0 0 ${WIDTH} ${height}`,
    microrregioes,
    cidades,
  };

  writeFileSync(OUT_PATH, JSON.stringify(output, null, 2) + "\n");
  console.log(`✓ Geometria salva em ${OUT_PATH}`);
}

main().catch((error) => {
  console.error("✗ Geração interrompida:", error.message);
  process.exitCode = 1;
});
