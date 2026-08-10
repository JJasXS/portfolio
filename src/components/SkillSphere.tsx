"use client";

import { Html, Line, OrbitControls } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { Minus, Plus, RotateCcw } from "lucide-react";
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type MutableRefObject,
  type ReactNode,
} from "react";
import { useTheme } from "next-themes";
import * as THREE from "three";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import { personalInfo } from "@/data/personal";
import { skillConnections, skills } from "@/data/skills";
import { SkillLogo } from "./SkillLogo";

const SCENE_BG = {
  light: "#f6f7f9",
  dark: "#070b12",
} as const;

const SHELL_RADIUS: Record<1 | 2 | 3, number> = {
  1: 2.85,
  2: 4.15,
  3: 5.45,
};

const OUTER_BOUND = SHELL_RADIUS[3] * 1.08;
const DEFAULT_DISTANCE = 15.5;
const MIN_DISTANCE = 10;
const MAX_DISTANCE = 22;

function spherePosition(orbit: 1 | 2 | 3, angleDeg: number): THREE.Vector3 {
  const r = SHELL_RADIUS[orbit];
  const lon = (angleDeg * Math.PI) / 180;
  // Wider latitude band so nodes spread further apart vertically too
  const latDeg = ((angleDeg * 0.91 + orbit * 37) % 140) - 70;
  const lat = (latDeg * Math.PI) / 180;
  return new THREE.Vector3(
    r * Math.cos(lat) * Math.cos(lon),
    r * Math.sin(lat),
    r * Math.cos(lat) * Math.sin(lon),
  );
}

function arcPoints(a: THREE.Vector3, b: THREE.Vector3, segments = 28) {
  const mid = a.clone().add(b).multiplyScalar(0.5);
  const len = mid.length();
  if (len < 0.05) {
    mid.set(0, SHELL_RADIUS[2] * 0.9, 0);
  } else {
    const target = Math.min(len * 1.12, OUTER_BOUND);
    mid.normalize().multiplyScalar(target);
  }
  const curve = new THREE.QuadraticBezierCurve3(a, mid, b);
  return curve.getPoints(segments).map((p) => {
    if (p.length() <= OUTER_BOUND) return p;
    return p.normalize().multiplyScalar(OUTER_BOUND);
  });
}

type SkillSphereProps = {
  focusId: string | null;
  selectedId: string | null;
  dragGuardRef: MutableRefObject<boolean>;
  isDimmed: (id: string) => boolean;
  isLineActive: (a: string, b: string) => boolean;
  onHover: (id: string | null) => void;
  onSelect: (id: string) => void;
  hoverCard?: ReactNode;
};

function CenterCore() {
  const glowRef = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (!glowRef.current) return;
    const s = 1 + Math.sin(clock.elapsedTime * 1.4) * 0.045;
    glowRef.current.scale.setScalar(s);
  });

  return (
    <group>
      <mesh ref={glowRef}>
        <sphereGeometry args={[0.95, 32, 32]} />
        <meshBasicMaterial color="#2dd4bf" transparent opacity={0.12} />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.72, 32, 32]} />
        <meshStandardMaterial
          color="#0f172a"
          emissive="#115e59"
          emissiveIntensity={0.35}
          metalness={0.4}
          roughness={0.35}
        />
      </mesh>
      <Html center distanceFactor={8} style={{ pointerEvents: "none" }}>
        <div className="w-28 select-none text-center">
          <p className="text-[13px] font-semibold tracking-wide text-foreground">
            {personalInfo.firstName.toUpperCase()}
          </p>
          <p className="mt-0.5 text-[9px] text-muted">Software Engineer</p>
        </div>
      </Html>
    </group>
  );
}

function ElectricArc({
  points,
  active,
  dimmed,
  dragBoost,
}: {
  points: THREE.Vector3[];
  active: boolean;
  dimmed: boolean;
  dragBoost: number;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const dashRef = useRef(0);

  useFrame((_, delta) => {
    dashRef.current += delta * ((active ? 2.6 : 1.15) * (1 + dragBoost * 2.8));
    const group = groupRef.current;
    if (!group) return;
    group.traverse((obj) => {
      const line = obj as THREE.Line & {
        material?: THREE.LineDashedMaterial | THREE.LineBasicMaterial;
      };
      if (!line.isLine || !line.material) return;
      const mat = line.material;
      if ("dashOffset" in mat) {
        mat.dashOffset = -dashRef.current;
      }
      if (mat instanceof THREE.LineDashedMaterial) {
        mat.opacity = dimmed
          ? 0.07
          : active
            ? 0.65 + dragBoost * 0.3
            : 0.28 + dragBoost * 0.25;
        mat.needsUpdate = true;
      } else if (mat instanceof THREE.LineBasicMaterial) {
        mat.opacity = dimmed
          ? 0.02
          : active
            ? 0.3 + dragBoost * 0.35
            : 0.1 + dragBoost * 0.2;
      }
    });
  });

  const color = active ? "#2dd4bf" : "#94a3b8";

  return (
    <group ref={groupRef}>
      <Line
        points={points}
        color={color}
        lineWidth={active ? 3.2 + dragBoost * 2 : 2 + dragBoost * 1.2}
        transparent
        opacity={0.15}
      />
      <Line
        points={points}
        color={color}
        lineWidth={active ? 1.8 : 1.15}
        dashed
        dashSize={0.16}
        gapSize={0.1}
        transparent
        opacity={0.45}
      />
    </group>
  );
}

function SkillNode({
  id,
  name,
  monogram,
  position,
  orbit,
  dimmed,
  isFocus,
  onHover,
  onSelect,
  dragGuardRef,
}: {
  id: string;
  name: string;
  monogram: string;
  position: THREE.Vector3;
  orbit: 1 | 2 | 3;
  dimmed: boolean;
  isFocus: boolean;
  onHover: (id: string | null) => void;
  onSelect: (id: string) => void;
  dragGuardRef: MutableRefObject<boolean>;
}) {
  return (
    <group position={position}>
      <mesh>
        <sphereGeometry args={[isFocus ? 0.28 : 0.22, 20, 20]} />
        <meshStandardMaterial
          color="#0f172a"
          emissive={isFocus ? "#2dd4bf" : "#134e4a"}
          emissiveIntensity={isFocus ? 0.55 : dimmed ? 0.05 : 0.2}
          metalness={0.35}
          roughness={0.4}
          transparent
          opacity={dimmed ? 0.35 : 1}
        />
      </mesh>
      <Html
        center
        distanceFactor={12}
        zIndexRange={[20, 0]}
        style={{
          opacity: dimmed ? 0.35 : 1,
          transition: "opacity 200ms",
          pointerEvents: "auto",
        }}
      >
        <button
          type="button"
          aria-label={name}
          aria-pressed={isFocus}
          onMouseEnter={() => onHover(id)}
          onMouseLeave={() => onHover(null)}
          onFocus={() => onHover(id)}
          onBlur={() => onHover(null)}
          onClick={() => {
            if (dragGuardRef.current) return;
            onSelect(id);
          }}
          className={`flex w-[68px] flex-col items-center gap-1 overflow-hidden rounded-lg border px-1.5 py-1.5 backdrop-blur-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
            isFocus
              ? "border-accent/70 bg-surface/95 shadow-[0_0_20px_var(--glow)]"
              : "border-border bg-surface/90 hover:border-accent/40"
          }`}
        >
          <SkillLogo
            skillId={id}
            name={name}
            monogram={monogram}
            size={orbit === 1 ? 20 : 16}
          />
          <span className="w-full truncate text-center text-[9px] font-medium leading-tight text-foreground">
            {name}
          </span>
        </button>
      </Html>
    </group>
  );
}

function SceneContent({
  focusId,
  selectedId,
  isDimmed,
  isLineActive,
  onHover,
  onSelect,
  dragGuardRef,
  dragging,
  controlsRef,
  onDragStart,
  onDragEnd,
  sceneBg,
}: {
  focusId: string | null;
  selectedId: string | null;
  isDimmed: (id: string) => boolean;
  isLineActive: (a: string, b: string) => boolean;
  onHover: (id: string | null) => void;
  onSelect: (id: string) => void;
  dragGuardRef: MutableRefObject<boolean>;
  dragging: boolean;
  controlsRef: MutableRefObject<OrbitControlsImpl | null>;
  onDragStart: () => void;
  onDragEnd: () => void;
  sceneBg: string;
}) {
  const positions = useMemo(() => {
    const map = new Map<string, THREE.Vector3>();
    for (const skill of skills) {
      map.set(skill.id, spherePosition(skill.orbit, skill.angle));
    }
    return map;
  }, []);

  const arcs = useMemo(
    () =>
      skillConnections
        .map(([a, b]) => {
          const pa = positions.get(a);
          const pb = positions.get(b);
          if (!pa || !pb) return null;
          return { a, b, points: arcPoints(pa, pb) };
        })
        .filter(Boolean) as Array<{
        a: string;
        b: string;
        points: THREE.Vector3[];
      }>,
    [positions],
  );

  const dragBoost = dragging ? 1 : 0;

  return (
    <>
      <color attach="background" args={[sceneBg]} />
      <ambientLight intensity={0.55} />
      <pointLight position={[6, 8, 4]} intensity={1.1} color="#99f6e4" />
      <pointLight position={[-5, -3, -6]} intensity={0.45} color="#38bdf8" />

      <mesh>
        <sphereGeometry args={[OUTER_BOUND, 32, 24]} />
        <meshBasicMaterial
          color="#2dd4bf"
          wireframe
          transparent
          opacity={0.045 + dragBoost * 0.05}
        />
      </mesh>

      <CenterCore />

      {arcs.map(({ a, b, points }) => {
        const linked = isLineActive(a, b);
        const dimmed = Boolean(focusId) && !linked;
        return (
          <ElectricArc
            key={`${a}-${b}`}
            points={points}
            active={Boolean(focusId) ? linked : true}
            dimmed={dimmed}
            dragBoost={dragBoost}
          />
        );
      })}

      {skills.map((skill) => {
        const pos = positions.get(skill.id);
        if (!pos) return null;
        return (
          <SkillNode
            key={skill.id}
            id={skill.id}
            name={skill.name}
            monogram={skill.monogram}
            position={pos}
            orbit={skill.orbit}
            dimmed={isDimmed(skill.id)}
            isFocus={focusId === skill.id || selectedId === skill.id}
            onHover={onHover}
            onSelect={onSelect}
            dragGuardRef={dragGuardRef}
          />
        );
      })}

      <OrbitControls
        ref={controlsRef}
        enablePan={false}
        enableZoom={false}
        minDistance={MIN_DISTANCE}
        maxDistance={MAX_DISTANCE}
        minPolarAngle={Math.PI * 0.22}
        maxPolarAngle={Math.PI * 0.78}
        rotateSpeed={0.72}
        autoRotate={!dragging && !focusId}
        autoRotateSpeed={0.4}
        onStart={onDragStart}
        onEnd={onDragEnd}
      />
    </>
  );
}

export function SkillSphere({
  focusId,
  selectedId,
  dragGuardRef,
  isDimmed,
  isLineActive,
  onHover,
  onSelect,
  hoverCard,
}: SkillSphereProps) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const controlsRef = useRef<OrbitControlsImpl | null>(null);
  const [dragging, setDragging] = useState(false);
  const [distance, setDistance] = useState(DEFAULT_DISTANCE);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = !mounted || resolvedTheme !== "light";
  const sceneBg = isDark ? SCENE_BG.dark : SCENE_BG.light;

  const applyDistance = (next: number) => {
    const clamped = Math.min(MAX_DISTANCE, Math.max(MIN_DISTANCE, next));
    setDistance(clamped);
    const controls = controlsRef.current;
    if (!controls) return;
    const cam = controls.object;
    const dir = cam.position.clone().sub(controls.target).normalize();
    cam.position.copy(controls.target.clone().add(dir.multiplyScalar(clamped)));
    controls.update();
  };

  const resetView = () => {
    const controls = controlsRef.current;
    if (controls) {
      controls.reset();
      controls.object.position.set(0, 1.1, DEFAULT_DISTANCE);
      controls.target.set(0, 0, 0);
      controls.update();
    }
    setDistance(DEFAULT_DISTANCE);
  };

  return (
    <div className="relative min-w-0">
      <div
        className="relative h-[min(72vh,660px)] isolate overflow-hidden rounded-3xl border border-border bg-background shadow-[0_0_80px_-40px_var(--glow)] [contain:paint]"
        role="application"
        aria-label="Skill constellation sphere. Drag to rotate. Use buttons to zoom."
      >
        <div className="absolute inset-0 overflow-hidden rounded-3xl">
          <Canvas
            key={sceneBg}
            camera={{ position: [0, 1.1, DEFAULT_DISTANCE], fov: 40 }}
            dpr={[1, 1.75]}
            gl={{ antialias: true, alpha: false }}
            onPointerMissed={() => onHover(null)}
            style={{ width: "100%", height: "100%" }}
          >
            <SceneContent
              focusId={focusId}
              selectedId={selectedId}
              isDimmed={isDimmed}
              isLineActive={isLineActive}
              onHover={onHover}
              onSelect={onSelect}
              dragGuardRef={dragGuardRef}
              dragging={dragging}
              controlsRef={controlsRef}
              sceneBg={sceneBg}
              onDragStart={() => {
                setDragging(true);
                dragGuardRef.current = true;
              }}
              onDragEnd={() => {
                setDragging(false);
                window.setTimeout(() => {
                  dragGuardRef.current = false;
                }, 50);
              }}
            />
          </Canvas>
        </div>

        {hoverCard}

        <div className="absolute bottom-3 right-3 z-20 flex flex-col gap-1">
          <button
            type="button"
            onClick={() => applyDistance(distance / 1.18)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-surface/95 text-foreground backdrop-blur transition hover:border-accent/40 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            aria-label="Zoom in"
          >
            <Plus className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => applyDistance(distance * 1.18)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-surface/95 text-foreground backdrop-blur transition hover:border-accent/40 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            aria-label="Zoom out"
          >
            <Minus className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={resetView}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-surface/95 text-foreground backdrop-blur transition hover:border-accent/40 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            aria-label="Reset map view"
          >
            <RotateCcw className="h-4 w-4" />
          </button>
        </div>

        <p className="pointer-events-none absolute left-3 top-3 z-10 rounded-full border border-border bg-surface/90 px-3 py-1 text-[11px] text-muted backdrop-blur">
          Drag to spin the sphere
        </p>
      </div>
    </div>
  );
}
