"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const COUNT = 3000;

/** Palette weights: violet is the body, cyan the shimmer, amber the rare warm spark. */
const PALETTE: { color: THREE.Color; weight: number }[] = [
  { color: new THREE.Color("#6C63FF"), weight: 0.55 },
  { color: new THREE.Color("#00D4FF"), weight: 0.3 },
  { color: new THREE.Color("#E8A87C"), weight: 0.15 },
];

function pickColor(): THREE.Color {
  const r = Math.random();
  let acc = 0;
  for (const { color, weight } of PALETTE) {
    acc += weight;
    if (r <= acc) return color;
  }
  return PALETTE[0].color;
}

function Particles({ animate }: { animate: boolean }) {
  const points = useRef<THREE.Points>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const gl = useThree((s) => s.gl);

  // R3F's deferred unmount cleanup calls forceContextLoss(), which makes
  // three log "Context Lost" to the console on every route change away from
  // the hero. Resource disposal still runs; the context goes with the canvas.
  useEffect(() => {
    return () => {
      gl.forceContextLoss = () => {};
    };
  }, [gl]);

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(COUNT * 3);
    const col = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT; i++) {
      // flattened ellipsoid: wide and shallow, like a slow nebula seen edge-on
      const radius = Math.cbrt(Math.random()) * 10;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta) * 1.6;
      pos[i * 3 + 1] = radius * Math.cos(phi) * 0.55;
      pos[i * 3 + 2] = radius * Math.sin(phi) * Math.sin(theta);

      // slight brightness variance so the field doesn't look stamped
      const c = pickColor().clone().multiplyScalar(0.65 + Math.random() * 0.5);
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }
    return [pos, col];
  }, []);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useFrame((state, delta) => {
    if (!points.current || !animate) return;
    const p = points.current;
    // perpetual slow drift
    p.rotation.y += delta * 0.02;
    // cursor parallax – a few percent of influence, eased in
    p.rotation.x = THREE.MathUtils.lerp(p.rotation.x, mouse.current.y * 0.06, 0.025);
    p.rotation.z = THREE.MathUtils.lerp(p.rotation.z, mouse.current.x * 0.04, 0.025);
    // breathing: barely perceptible scale oscillation
    const s = 1 + Math.sin(state.clock.elapsedTime * 0.25) * 0.015;
    p.scale.setScalar(s);
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        vertexColors
        transparent
        opacity={0.85}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export default function ParticleField() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [reduced, setReduced] = useState(false);
  const [inView, setInView] = useState(true);

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  // Pause the render loop once the hero scrolls out of view
  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const animate = !reduced && inView;

  return (
    <div ref={containerRef} className="absolute inset-0" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
        frameloop={animate ? "always" : "demand"}
      >
        <Particles animate={animate} />
      </Canvas>
    </div>
  );
}
