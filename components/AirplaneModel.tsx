"use client";

import { useRef, useEffect, useMemo } from "react";
import * as THREE from "three";
import type { Group } from "three";

interface AirplaneModelProps {
  pitch: number;
  roll: number;
  yaw: number;
}

// Flecha de eje: cilindro (cuerpo) + cono (punta)
function AxisArrow({
  direction,
  color,
  length = 1.6,
}: {
  direction: [number, number, number];
  color: string;
  length?: number;
}) {
  const arrow = useMemo(() => {
    const dir = new THREE.Vector3(...direction).normalize();
    const helper = new THREE.ArrowHelper(
      dir,
      new THREE.Vector3(0, 0, 0),
      length,
      color,
      length * 0.2,   // longitud de la cabeza
      length * 0.08   // radio de la cabeza
    );
    // Hacer las líneas más visibles
    (helper.line.material as THREE.LineBasicMaterial).linewidth = 2;
    return helper;
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return <primitive object={arrow} />;
}

export default function AirplaneModel({ pitch, roll, yaw }: AirplaneModelProps) {
  const groupRef = useRef<Group>(null);

  const pitchRad = (pitch * Math.PI) / 180;
  const rollRad = (roll * Math.PI) / 180;
  const yawRad = (yaw * Math.PI) / 180;

  // Aplicar rotaciones en orden YXZ (Yaw → Pitch → Roll)
  // que es la convención estándar en aeronáutica
  useEffect(() => {
    if (!groupRef.current) return;
    groupRef.current.rotation.set(pitchRad, yawRad, rollRad, "YXZ");
  }, [pitchRad, yawRad, rollRad]);

  return (
    <group ref={groupRef}>
      {/* ── CABEZA ── */}
      <mesh position={[0, 1.35, 0]} castShadow>
        <sphereGeometry args={[0.28, 16, 16]} />
        <meshStandardMaterial color="#f5c5a3" roughness={0.6} metalness={0.0} />
      </mesh>

      {/* ── CUELLO ── */}
      <mesh position={[0, 1.03, 0]} castShadow>
        <cylinderGeometry args={[0.09, 0.09, 0.18, 12]} />
        <meshStandardMaterial color="#f5c5a3" roughness={0.6} metalness={0.0} />
      </mesh>

      {/* ── TORSO ── */}
      <mesh position={[0, 0.48, 0]} castShadow>
        <boxGeometry args={[0.52, 0.72, 0.28]} />
        <meshStandardMaterial color="#3b82f6" roughness={0.5} metalness={0.1} />
      </mesh>

      {/* ── CADERA ── */}
      <mesh position={[0, 0.06, 0]} castShadow>
        <boxGeometry args={[0.46, 0.22, 0.26]} />
        <meshStandardMaterial color="#1e40af" roughness={0.5} metalness={0.1} />
      </mesh>

      {/* ── BRAZO IZQUIERDO ── */}
      <mesh position={[0.38, 0.46, 0]} castShadow>
        <cylinderGeometry args={[0.08, 0.07, 0.65, 10]} />
        <meshStandardMaterial color="#3b82f6" roughness={0.5} metalness={0.1} />
      </mesh>
      {/* mano izquierda */}
      <mesh position={[0.38, 0.10, 0]} castShadow>
        <sphereGeometry args={[0.09, 10, 10]} />
        <meshStandardMaterial color="#f5c5a3" roughness={0.6} metalness={0.0} />
      </mesh>

      {/* ── BRAZO DERECHO ── */}
      <mesh position={[-0.38, 0.46, 0]} castShadow>
        <cylinderGeometry args={[0.08, 0.07, 0.65, 10]} />
        <meshStandardMaterial color="#3b82f6" roughness={0.5} metalness={0.1} />
      </mesh>
      {/* mano derecha */}
      <mesh position={[-0.38, 0.10, 0]} castShadow>
        <sphereGeometry args={[0.09, 10, 10]} />
        <meshStandardMaterial color="#f5c5a3" roughness={0.6} metalness={0.0} />
      </mesh>

      {/* ── PIERNA IZQUIERDA ── */}
      <mesh position={[0.15, -0.52, 0]} castShadow>
        <cylinderGeometry args={[0.1, 0.08, 0.72, 10]} />
        <meshStandardMaterial color="#1e3a5f" roughness={0.6} metalness={0.0} />
      </mesh>
      {/* pie izquierdo */}
      <mesh position={[0.15, -0.93, 0.07]} castShadow>
        <boxGeometry args={[0.14, 0.1, 0.28]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.8} metalness={0.0} />
      </mesh>

      {/* ── PIERNA DERECHA ── */}
      <mesh position={[-0.15, -0.52, 0]} castShadow>
        <cylinderGeometry args={[0.1, 0.08, 0.72, 10]} />
        <meshStandardMaterial color="#1e3a5f" roughness={0.6} metalness={0.0} />
      </mesh>
      {/* pie derecho */}
      <mesh position={[-0.15, -0.93, 0.07]} castShadow>
        <boxGeometry args={[0.14, 0.1, 0.28]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.8} metalness={0.0} />
      </mesh>

      {/* ═══════════════════════════════════
          EJES DE ROTACIÓN
          ─ Rojo  : Pitch  (eje lateral X)
          ─ Verde : Yaw    (eje vertical Y)
          ─ Azul  : Roll   (eje longitudinal Z)
          ═══════════════════════════════════ */}

      {/* PITCH — eje X — ROJO */}
      <AxisArrow direction={[1, 0, 0]} color="#ff3333" />
      <AxisArrow direction={[-1, 0, 0]} color="#ff3333" />

      {/* YAW — eje Y — VERDE */}
      <AxisArrow direction={[0, 1, 0]} color="#22cc55" />
      <AxisArrow direction={[0, -1, 0]} color="#22cc55" />

      {/* ROLL — eje Z — AZUL */}
      <AxisArrow direction={[0, 0, 1]} color="#3388ff" />
      <AxisArrow direction={[0, 0, -1]} color="#3388ff" />
    </group>
  );
}
