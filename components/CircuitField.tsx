"use client";

import { useEffect, useRef } from "react";

// Decorative hero background: a procedurally generated circuit board whose traces carry
// pulses of "current". The pointer acts as a probe (lights up nearby traces and draws
// pulses toward it) and a click/tap fires a burst. Pure Canvas 2D, no dependencies.

type Point = { x: number; y: number };
type Trace = { pts: Point[]; cum: number[]; len: number };
type Pulse = { trace: Trace; d: number; speed: number; hue: number; tail: number };

const DIRS: ReadonlyArray<readonly [number, number]> = [
  [1, 0], [1, 1], [0, 1], [-1, 1], [-1, 0], [-1, -1], [0, -1], [1, -1],
];
const PROBE_RADIUS = 180;

function makeTrace(pts: Point[]): Trace {
  const cum = [0];
  for (let i = 1; i < pts.length; i++) {
    const a = pts[i - 1]!;
    const b = pts[i]!;
    cum.push(cum[i - 1]! + Math.hypot(b.x - a.x, b.y - a.y));
  }
  return { pts, cum, len: cum[cum.length - 1]! };
}

function buildTraces(width: number, height: number, cell: number): Trace[] {
  const cols = Math.ceil(width / cell) + 1;
  const rows = Math.ceil(height / cell) + 1;
  const ox = (width - (cols - 1) * cell) / 2;
  const oy = (height - (rows - 1) * cell) / 2;
  const used = new Uint8Array(cols * rows);
  const traces: Trace[] = [];
  const attempts = Math.floor(cols * rows * 0.12);

  for (let a = 0; a < attempts; a++) {
    let cx = Math.floor(Math.random() * cols);
    let cy = Math.floor(Math.random() * rows);
    if (used[cy * cols + cx]) continue;
    let dir = Math.floor(Math.random() * 4) * 2;
    const cells: Array<[number, number, number]> = [[cx, cy, dir]];
    used[cy * cols + cx] = 1;
    const steps = 4 + Math.floor(Math.random() * 16);
    for (let s = 0; s < steps; s++) {
      if (Math.random() < 0.2) dir = (dir + (Math.random() < 0.5 ? 1 : 7)) % 8;
      const [dx, dy] = DIRS[dir]!;
      const nx = cx + dx;
      const ny = cy + dy;
      if (nx < 0 || ny < 0 || nx >= cols || ny >= rows || used[ny * cols + nx]) break;
      cx = nx;
      cy = ny;
      used[cy * cols + cx] = 1;
      cells.push([cx, cy, dir]);
    }
    if (cells.length < 4) continue;
    // Keep only the corners so each trace is a short polyline.
    const pts: Point[] = [];
    for (let i = 0; i < cells.length; i++) {
      const [x, y, d] = cells[i]!;
      const next = cells[i + 1];
      if (i === 0 || i === cells.length - 1 || (next && next[2] !== d)) {
        pts.push({ x: ox + x * cell, y: oy + y * cell });
      }
    }
    traces.push(makeTrace(pts));
  }
  return traces;
}

function pointAt(trace: Trace, d: number): Point {
  const { pts, cum } = trace;
  for (let i = 1; i < pts.length; i++) {
    if (d <= cum[i]!) {
      const a = pts[i - 1]!;
      const b = pts[i]!;
      const t = (d - cum[i - 1]!) / (cum[i]! - cum[i - 1]! || 1);
      return { x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t };
    }
  }
  return pts[pts.length - 1]!;
}

function strokeRange(ctx: CanvasRenderingContext2D, trace: Trace, from: number, to: number) {
  const start = pointAt(trace, Math.max(0, from));
  ctx.beginPath();
  ctx.moveTo(start.x, start.y);
  for (let i = 1; i < trace.pts.length; i++) {
    if (trace.cum[i]! > from && trace.cum[i]! < to) ctx.lineTo(trace.pts[i]!.x, trace.pts[i]!.y);
  }
  const end = pointAt(trace, Math.min(trace.len, to));
  ctx.lineTo(end.x, end.y);
  ctx.stroke();
}

function drawBoard(ctx: CanvasRenderingContext2D, traces: Trace[], color: string, width: number, padFill: boolean) {
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  ctx.lineWidth = width;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  for (const trace of traces) {
    strokeRange(ctx, trace, 0, trace.len);
    for (const end of [trace.pts[0]!, trace.pts[trace.pts.length - 1]!]) {
      ctx.beginPath();
      ctx.arc(end.x, end.y, 3, 0, Math.PI * 2);
      if (padFill) ctx.fill();
      else ctx.stroke();
    }
  }
}

function distanceToTrace(trace: Trace, p: Point): number {
  let best = Infinity;
  for (const pt of trace.pts) best = Math.min(best, Math.hypot(pt.x - p.x, pt.y - p.y));
  return best;
}

export function CircuitField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dim = document.createElement("canvas");
    const bright = document.createElement("canvas");
    const lens = document.createElement("canvas");
    const dimCtx = dim.getContext("2d");
    const brightCtx = bright.getContext("2d");
    const lensCtx = lens.getContext("2d");
    if (!dimCtx || !brightCtx || !lensCtx) return;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let traces: Trace[] = [];
    let pulses: Pulse[] = [];
    let maxPulses = 40;
    let running = false;
    let visible = true;
    let frame = 0;
    let last = 0;
    let lastProbeSpawn = 0;
    const probe = { x: -9999, y: -9999, tx: -9999, ty: -9999, active: false };

    const spawn = (trace: Trace, fast: boolean) => {
      pulses.push({
        trace,
        d: 0,
        speed: fast ? 320 + Math.random() * 200 : 70 + Math.random() * 120,
        hue: fast ? 320 + Math.random() * 20 : 190 + Math.random() * 80,
        tail: fast ? 90 : 40 + Math.random() * 50,
      });
    };

    const nearbyTraces = (p: Point, radius: number) => traces.filter((t) => distanceToTrace(t, p) < radius);

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      for (const c of [canvas, dim, bright]) {
        c.width = Math.round(width * dpr);
        c.height = Math.round(height * dpr);
      }
      lens.width = lens.height = Math.round(PROBE_RADIUS * 2 * dpr);
      const cell = width < 640 ? 22 : 28;
      traces = buildTraces(width, height, cell);
      maxPulses = Math.min(width < 640 ? 24 : 60, Math.ceil(traces.length * 0.35));
      pulses = [];
      for (const [c, color, w, fill] of [
        [dimCtx, "rgba(120, 140, 255, 0.22)", 1.3, false],
        [brightCtx, "rgba(150, 230, 255, 0.95)", 1.7, true],
      ] as const) {
        c.setTransform(dpr, 0, 0, dpr, 0, 0);
        c.clearRect(0, 0, width, height);
        drawBoard(c, traces, color, w, fill);
      }
      if (reduceMotion) paint(0);
    };

    const paint = (dt: number) => {
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(dim, 0, 0);

      // Probe: reveal the bright board through a soft circular lens around the pointer.
      probe.x += (probe.tx - probe.x) * Math.min(1, dt * 10);
      probe.y += (probe.ty - probe.y) * Math.min(1, dt * 10);
      if (probe.active) {
        const size = lens.width;
        const sx = probe.x * dpr - size / 2;
        const sy = probe.y * dpr - size / 2;
        lensCtx.globalCompositeOperation = "source-over";
        lensCtx.clearRect(0, 0, size, size);
        // Clamp the source rect: Safari draws nothing when it falls outside the image.
        const x0 = Math.max(0, sx);
        const y0 = Math.max(0, sy);
        const w = Math.min(bright.width, sx + size) - x0;
        const h = Math.min(bright.height, sy + size) - y0;
        if (w > 0 && h > 0) lensCtx.drawImage(bright, x0, y0, w, h, x0 - sx, y0 - sy, w, h);
        lensCtx.globalCompositeOperation = "destination-in";
        const g = lensCtx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
        g.addColorStop(0, "rgba(0,0,0,0.9)");
        g.addColorStop(1, "rgba(0,0,0,0)");
        lensCtx.fillStyle = g;
        lensCtx.fillRect(0, 0, size, size);
        ctx.drawImage(lens, sx, sy);
      }

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.globalCompositeOperation = "lighter";
      for (const pulse of pulses) {
        pulse.d += pulse.speed * dt;
        const from = pulse.d - pulse.tail;
        const to = Math.min(pulse.d, pulse.trace.len);
        ctx.strokeStyle = `hsla(${pulse.hue}, 100%, 65%, 0.22)`;
        ctx.lineWidth = 7;
        strokeRange(ctx, pulse.trace, from, to);
        ctx.strokeStyle = `hsla(${pulse.hue}, 100%, 78%, 0.95)`;
        ctx.lineWidth = 2;
        strokeRange(ctx, pulse.trace, from, to);
        if (pulse.d <= pulse.trace.len) {
          const head = pointAt(pulse.trace, pulse.d);
          ctx.fillStyle = `hsla(${pulse.hue}, 100%, 92%, 1)`;
          ctx.beginPath();
          ctx.arc(head.x, head.y, 2.4, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.globalCompositeOperation = "source-over";
      pulses = pulses.filter((p) => p.d - p.tail < p.trace.len);
    };

    const tick = (now: number) => {
      if (!running) return;
      const dt = Math.min(0.05, (now - last) / 1000 || 0);
      last = now;
      while (pulses.length < maxPulses && Math.random() < 0.08 && traces.length) {
        spawn(traces[Math.floor(Math.random() * traces.length)]!, false);
      }
      if (probe.active && now - lastProbeSpawn > 90) {
        lastProbeSpawn = now;
        const near = nearbyTraces({ x: probe.tx, y: probe.ty }, 120);
        if (near.length && pulses.length < maxPulses + 30) spawn(near[Math.floor(Math.random() * near.length)]!, true);
      }
      paint(dt);
      frame = requestAnimationFrame(tick);
    };

    const start = () => {
      if (running || reduceMotion || !visible || document.hidden) return;
      running = true;
      last = performance.now();
      frame = requestAnimationFrame(tick);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(frame);
    };

    const localPoint = (ev: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const p = { x: ev.clientX - rect.left, y: ev.clientY - rect.top };
      return { p, inside: p.x >= 0 && p.y >= 0 && p.x <= rect.width && p.y <= rect.height };
    };
    const onMove = (ev: PointerEvent) => {
      const { p, inside } = localPoint(ev);
      probe.active = inside;
      probe.tx = p.x;
      probe.ty = p.y;
      if (probe.x < -1000) {
        probe.x = p.x;
        probe.y = p.y;
      }
    };
    const onDown = (ev: PointerEvent) => {
      const { p, inside } = localPoint(ev);
      if (!inside || reduceMotion) return;
      for (const trace of nearbyTraces(p, 240).slice(0, 18)) spawn(trace, true);
    };
    const onLeave = () => {
      probe.active = false;
    };

    let resizeTimer = 0;
    const onResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(resize, 150);
    };
    const onVisibility = () => (document.hidden ? stop() : start());
    const observer = new IntersectionObserver(([entry]) => {
      visible = Boolean(entry?.isIntersecting);
      if (visible) start();
      else stop();
    });

    resize();
    observer.observe(canvas);
    window.addEventListener("resize", onResize);
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    document.addEventListener("visibilitychange", onVisibility);
    start();

    return () => {
      stop();
      observer.disconnect();
      window.clearTimeout(resizeTimer);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return <canvas ref={canvasRef} className="circuit" aria-hidden="true" />;
}
