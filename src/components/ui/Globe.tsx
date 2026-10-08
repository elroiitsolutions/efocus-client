import { useEffect, useRef } from "react";

interface GlobeProps {
  className?: string;
}

export default function Globe({ className = "" }: GlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let rotation = 0;
    let isDragging = false;
    let lastMouseX = 0;
    let dragVelocity = 0;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = 800;
    let height = 800;

    // --------------------------------------------------
    // Resize
    // --------------------------------------------------
    const resize = () => {
      width = canvas.offsetWidth || 800;
      height = canvas.offsetHeight || 800;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
    };
    resize();
    window.addEventListener("resize", resize);

    // --------------------------------------------------
    // WORLD MAP RASTERIZER
    // --------------------------------------------------
    const offWidth = 360;
    const offHeight = 180;
    const offscreen = document.createElement("canvas");
    offscreen.width = offWidth;
    offscreen.height = offHeight;
    const offCtx = offscreen.getContext("2d", { willReadFrequently: true });

    if (!offCtx) return;

    offCtx.fillStyle = "#ffffff";
    offCtx.fillRect(0, 0, offWidth, offHeight);
    offCtx.fillStyle = "#000000";

    const toX = (lon: number) => ((lon + 180) / 360) * offWidth;
    const toY = (lat: number) => ((90 - lat) / 180) * offHeight;

    const drawPoly = (pts: [number, number][]) => {
      if (pts.length < 3) return;
      offCtx.beginPath();
      offCtx.moveTo(toX(pts[0][0]), toY(pts[0][1]));
      for (let i = 1; i < pts.length; i++) {
        offCtx.lineTo(toX(pts[i][0]), toY(pts[i][1]));
      }
      offCtx.closePath();
      offCtx.fill();
    };

    // North America
    drawPoly([
      [-168, 65], [-160, 71], [-140, 70], [-120, 76], [-90, 75], [-80, 62],
      [-60, 60], [-55, 48], [-65, 44], [-75, 35], [-80, 25], [-82, 30],
      [-90, 30], [-97, 26], [-97, 20], [-87, 13], [-80, 8], [-85, 15],
      [-105, 20], [-110, 23], [-117, 32], [-124, 40], [-125, 50], [-135, 58],
      [-165, 60], [-168, 65],
    ]);

    // Greenland
    drawPoly([
      [-50, 60], [-40, 65], [-20, 75], [-25, 82], [-55, 83], [-70, 77], [-50, 60],
    ]);

    // South America
    drawPoly([
      [-76, 8], [-60, 10], [-50, 0], [-35, -5], [-35, -12], [-40, -22],
      [-50, -30], [-58, -35], [-65, -45], [-67, -55], [-75, -50], [-72, -40],
      [-70, -25], [-78, -15], [-81, -5], [-76, 8],
    ]);

    // Europe
    drawPoly([
      [-10, 36], [0, 38], [15, 38], [25, 36], [30, 42], [40, 45],
      [50, 50], [60, 55], [60, 68], [30, 70], [20, 68], [10, 60],
      [5, 50], [-5, 48], [-10, 43], [-10, 36],
    ]);

    // UK / Ireland
    drawPoly([[-10, 52], [-5, 58], [0, 58], [1, 51], [-6, 50], [-10, 52]]);

    // Scandinavia
    drawPoly([[5, 58], [10, 62], [18, 70], [28, 70], [25, 60], [15, 55], [5, 58]]);

    // Africa
    drawPoly([
      [-17, 30], [-5, 36], [10, 37], [25, 32], [33, 31], [35, 25],
      [43, 12], [51, 12], [45, 0], [40, -10], [35, -20], [30, -32],
      [20, -34], [15, -28], [12, -15], [10, 0], [2, 5], [-15, 12],
      [-17, 20], [-17, 30],
    ]);

    // Madagascar
    drawPoly([[44, -12], [50, -15], [48, -25], [43, -25], [44, -12]]);

    // Asia & Russia
    drawPoly([
      [30, 32], [35, 33], [45, 40], [50, 30], [55, 25], [60, 25],
      [70, 20], [75, 10], [82, 10], [88, 22], [92, 16], [100, 10],
      [105, 10], [108, 20], [120, 25], [122, 32], [128, 38], [132, 43],
      [140, 50], [160, 55], [170, 65], [180, 68], [140, 75], [100, 76],
      [70, 72], [60, 60], [50, 45], [40, 42], [30, 32],
    ]);

    // Japan
    drawPoly([[130, 32], [140, 38], [142, 44], [138, 42], [132, 34], [130, 32]]);

    // Indonesia & Philippines
    drawPoly([[95, 5], [105, -5], [120, -8], [130, -5], [125, 5], [115, 5], [95, 5]]);
    drawPoly([[120, 15], [126, 18], [125, 10], [120, 15]]);

    // Australia & New Zealand
    drawPoly([
      [114, -22], [120, -15], [135, -12], [145, -15], [152, -25], [150, -36],
      [140, -38], [130, -32], [115, -34], [113, -28], [114, -22],
    ]);
    drawPoly([[168, -38], [175, -40], [172, -45], [168, -38]]);

    // --------------------------------------------------
    // CREATE 3D POINTS
    // --------------------------------------------------
    interface Point3D {
      x: number;
      y: number;
      z: number;
      isLand: boolean;
      size: number;
    }

    const points: Point3D[] = [];
    const numRings = 95;
    const pointsPerRing = 180;
    const imgData = offCtx.getImageData(0, 0, offWidth, offHeight).data;

    for (let i = 0; i < numRings; i++) {
      const lat = -82 + (164 * i) / (numRings - 1);
      const latRad = (lat * Math.PI) / 180;
      const cosLat = Math.cos(latRad);
      const sinLat = Math.sin(latRad);
      const ringPoints = Math.max(20, Math.floor(pointsPerRing * cosLat));

      for (let j = 0; j < ringPoints; j++) {
        const lon = -180 + (360 * j) / ringPoints;
        const lonRad = (lon * Math.PI) / 180;

        let isLand = false;
        const px = Math.min(offWidth - 1, Math.max(0, Math.floor(((lon + 180) / 360) * offWidth)));
        const py = Math.min(offHeight - 1, Math.max(0, Math.floor(((90 - lat) / 180) * offHeight)));
        const index = (py * offWidth + px) * 4;

        if (imgData[index] < 120) {
          isLand = true;
        }

        const x = cosLat * Math.sin(lonRad);
        const y = sinLat;
        const z = cosLat * Math.cos(lonRad);

        // Include land dots with high density + subtle background grid
        if (isLand || (i % 2 === 0 && j % 2 === 0)) {
          points.push({
            x,
            y,
            z,
            isLand,
            size: isLand ? 1.55 : 0.82,
          });
        }
      }
    }

    // Fixed axial tilt (approx 20 deg)
    const tilt = 0.30;
    const cosTilt = Math.cos(tilt);
    const sinTilt = Math.sin(tilt);

    // --------------------------------------------------
    // 60FPS CONTINUOUS ROLLING RENDER LOOP
    // --------------------------------------------------
    const render = () => {
      if (!isDragging) {
        rotation += 0.0035;
        if (Math.abs(dragVelocity) > 0.0001) {
          rotation += dragVelocity;
          dragVelocity *= 0.94;
        }
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const radius = (Math.min(width, height) / 2) * 0.98 * dpr;
      const cx = (width / 2) * dpr;
      const cy = (height / 2) * dpr;

      const cosRot = Math.cos(rotation);
      const sinRot = Math.sin(rotation);

      for (let i = 0; i < points.length; i++) {
        const p = points[i];

        // 1. Earth Rotation around Y-axis
        const rx = p.x * cosRot + p.z * sinRot;
        const ry = p.y;
        const rz = -p.x * sinRot + p.z * cosRot;

        // 2. Axial Tilt
        const tx = rx;
        const ty = ry * cosTilt - rz * sinTilt;
        const tz = ry * sinTilt + rz * cosTilt;

        // Only front hemisphere points for crisp presentation
        if (tz <= 0.01) {
          continue;
        }

        const screenX = cx + tx * radius;
        const screenY = cy - ty * radius;
        const depth = Math.max(0, tz);
        const normalizedY = screenY / (height * dpr);

        const topFade = Math.min(1, Math.max(0, (1.08 - normalizedY) / 0.45));
        const bottomFade = Math.min(1, Math.max(0, (0.90 - normalizedY) / 0.48));
        const edgeFade = Math.min(1, depth * 3.5);

        let alpha = (p.isLand ? 0.88 : 0.28) * topFade * bottomFade * edgeFade;

        if (normalizedY > 0.52) {
          alpha *= Math.max(0, 1 - (normalizedY - 0.52) * 2.5);
        }

        if (alpha < 0.005) {
          continue;
        }

        const dotSize = p.size * (0.78 + depth * 0.38) * dpr;

        ctx.beginPath();
        ctx.arc(screenX, screenY, dotSize, 0, Math.PI * 2);

        if (p.isLand) {
          ctx.fillStyle = `rgba(175, 2, 2, ${alpha})`;
        } else {
          ctx.fillStyle = `rgba(220, 100, 100, ${alpha})`;
        }

        ctx.fill();
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    // --------------------------------------------------
    // Mouse / Touch Drag Interactivity
    // --------------------------------------------------
    const onPointerDown = (e: MouseEvent | TouchEvent) => {
      isDragging = true;
      lastMouseX = "touches" in e ? e.touches[0].clientX : e.clientX;
      dragVelocity = 0;
    };

    const onPointerMove = (e: MouseEvent | TouchEvent) => {
      if (!isDragging) return;
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      const deltaX = clientX - lastMouseX;
      lastMouseX = clientX;
      rotation += deltaX * 0.005;
      dragVelocity = deltaX * 0.003;
    };

    const onPointerUp = () => {
      isDragging = false;
    };

    canvas.addEventListener("mousedown", onPointerDown);
    window.addEventListener("mousemove", onPointerMove);
    window.addEventListener("mouseup", onPointerUp);

    canvas.addEventListener("touchstart", onPointerDown, { passive: true });
    window.addEventListener("touchmove", onPointerMove, { passive: true });
    window.addEventListener("touchend", onPointerUp);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousedown", onPointerDown);
      window.removeEventListener("mousemove", onPointerMove);
      window.removeEventListener("mouseup", onPointerUp);
      canvas.removeEventListener("touchstart", onPointerDown);
      window.removeEventListener("touchmove", onPointerMove);
      window.removeEventListener("touchend", onPointerUp);
    };
  }, []);

  return (
    <div className={`relative w-full aspect-square select-none ${className}`}>
      <canvas
        ref={canvasRef}
        className="block w-full h-full cursor-grab active:cursor-grabbing pointer-events-auto"
        style={{
          width: "100%",
          height: "100%",
          contain: "layout paint size",
        }}
      />
    </div>
  );
}
