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
  // Se niega pitchRad porque en Three.js la rotación +X baja el morro (+Z→-Y),
  // mientras que en el convenio aeronáutico pitch positivo = morro arriba.
  useEffect(() => {
    if (!groupRef.current) return;
    groupRef.current.rotation.set(-pitchRad, yawRad, rollRad, "YXZ");
  }, [pitchRad, yawRad, rollRad]);

  return (
    <group ref={groupRef}>
      {/* ── FUSELAJE ── */}
      <mesh castShadow>
        <boxGeometry args={[0.26, 0.26, 2.8]} />
        <meshStandardMaterial color="#c8cfd8" roughness={0.4} metalness={0.3} />
      </mesh>

      {/* ── CONO DE NARIZ (apunta hacia +Z) ── */}
      <mesh position={[0, 0, 1.65]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <coneGeometry args={[0.13, 0.5, 16]} />
        <meshStandardMaterial color="#a0aab4" roughness={0.3} metalness={0.4} />
      </mesh>

      {/* ── ALAS PRINCIPALES ── */}
      <mesh position={[0, -0.02, 0.15]} castShadow>
        <boxGeometry args={[3.8, 0.055, 0.85]} />
        <meshStandardMaterial color="#8fa3c0" roughness={0.5} metalness={0.2} />
      </mesh>

      {/* ── ESTABILIZADOR HORIZONTAL (cola) ── */}
      <mesh position={[0, 0, -1.25]} castShadow>
        <boxGeometry args={[1.55, 0.05, 0.5]} />
        <meshStandardMaterial color="#8fa3c0" roughness={0.5} metalness={0.2} />
      </mesh>

      {/* ── ALETA VERTICAL (cola) ── */}
      <mesh position={[0, 0.33, -1.18]} castShadow>
        <boxGeometry args={[0.055, 0.6, 0.58]} />
        <meshStandardMaterial color="#8fa3c0" roughness={0.5} metalness={0.2} />
      </mesh>

      {/* ── CABINA / COCKPIT ── */}
      <mesh position={[0, 0.17, 0.9]} castShadow>
        <boxGeometry args={[0.22, 0.18, 0.55]} />
        <meshStandardMaterial color="#7ab3d4" roughness={0.1} metalness={0.1} transparent opacity={0.85} />
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
