export interface Point {
  x: number;
  y: number;
}

// Standard uniform Catmull-Rom → cubic Bézier control-point formula
// (tangent at each point = (next - prev) * tension, control point =
// point + tangent / 3). tension ~0.5 is the conventional Catmull-Rom
// default. Open spline: endpoints reuse their single neighbor as the
// phantom point on the missing side.
function segmentControlPoints(p0: Point, p1: Point, p2: Point, p3: Point, tension: number) {
  return {
    c1x: p1.x + ((p2.x - p0.x) * tension) / 3,
    c1y: p1.y + ((p2.y - p0.y) * tension) / 3,
    c2x: p2.x - ((p3.x - p1.x) * tension) / 3,
    c2y: p2.y - ((p3.y - p1.y) * tension) / 3,
  };
}

/** One "C ..." fragment per pair of consecutive points (points.length - 1 segments). */
export function catmullRomSegments(points: Point[], tension = 0.5): string[] {
  if (points.length < 2) return [];
  const segments: string[] = [];
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[Math.max(0, i - 1)];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[Math.min(points.length - 1, i + 2)];
    const c = segmentControlPoints(p0, p1, p2, p3, tension);
    segments.push(`C ${c.c1x},${c.c1y} ${c.c2x},${c.c2y} ${p2.x},${p2.y}`);
  }
  return segments;
}

/** Full "M ... C ... C ..." path through every point, in order. */
export function catmullRomPath(points: Point[], tension = 0.5): string {
  if (points.length === 0) return "";
  const segments = catmullRomSegments(points, tension);
  return `M ${points[0].x},${points[0].y} ${segments.join(" ")}`;
}

/**
 * cumulative[i] = the path string from the start up to and including
 * points[i]. Feeding each of these into a detached <path> element and
 * reading getTotalLength() gives the exact arc-length-so-far at every
 * original control point — used to find each tag's normalized position
 * along the final curve without sampling/searching.
 */
export function catmullRomCumulativePaths(points: Point[], tension = 0.5): string[] {
  if (points.length === 0) return [];
  const segments = catmullRomSegments(points, tension);
  const cumulative: string[] = [`M ${points[0].x},${points[0].y}`];
  let acc = cumulative[0];
  for (const segment of segments) {
    acc = `${acc} ${segment}`;
    cumulative.push(acc);
  }
  return cumulative;
}
