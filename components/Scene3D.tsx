"use client";

import { useRef, useEffect, useState, Suspense } from "react";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { OrbitControls, Grid, Line, Text } from "@react-three/drei";
import * as THREE from "three";
import AirplaneModel from "./AirplaneModel";

interface Scene3DProps {
  pitch: number;
  roll: number;
  yaw: number;
}

function Lights() {
  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight
        position={[5, 8, 5]}
        intensity={1.4}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <directionalLight position={[-4, 2, -3]} intensity={0.4} color="#b0c8ff" />
    </>
  );
}

/** Plano cartesiano de referencia: plano XZ semi-transparente + ejes del mundo */
function CartesianPlane() {
  const axisLen = 3.5;
  const labelOffset = axisLen + 0.3;

  return (
    <group>
      {/* Plano XZ semi-transparente */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[7, 7]} />
        <meshStandardMaterial color="#bfdbfe" transparent opacity={0.18} side={2} />
      </mesh>

      {/* Eje X — rojo */}
      <Line points={[[-axisLen, 0, 0], [axisLen, 0, 0]]} color="#ef4444" lineWidth={1.5} dashed dashSize={0.25} gapSize={0.12} />
      <Text position={[labelOffset, 0, 0]} fontSize={0.28} color="#ef4444" anchorX="center" anchorY="middle">X</Text>

      {/* Eje Y — verde */}
      <Line points={[[0, -axisLen, 0], [0, axisLen, 0]]} color="#22c55e" lineWidth={1.5} dashed dashSize={0.25} gapSize={0.12} />
      <Text position={[0, labelOffset, 0]} fontSize={0.28} color="#22c55e" anchorX="center" anchorY="middle">Y</Text>

      {/* Eje Z — azul */}
      <Line points={[[0, 0, -axisLen], [0, 0, axisLen]]} color="#3b82f6" lineWidth={1.5} dashed dashSize={0.25} gapSize={0.12} />
      <Text position={[0, 0, labelOffset]} fontSize={0.28} color="#3b82f6" anchorX="center" anchorY="middle">Z</Text>

      {/* Origen */}
      <mesh>
        <sphereGeometry args={[0.07, 12, 12]} />
        <meshStandardMaterial color="#64748b" />
      </mesh>
    </group>
  );
}

const ISO_POSITION = new THREE.Vector3(6, 6, 6);
const ORIGIN = new THREE.Vector3(0, 0, 0);

/** Controlador de cámara: anima suavemente hacia la vista isométrica cuando se activa */
function CameraController({
  trigger,
  orbitRef,
}: {
  trigger: number;
  orbitRef: React.MutableRefObject<any>;
}) {
  const { camera } = useThree();
  const animating = useRef(false);

  useEffect(() => {
    if (trigger === 0) return;
    animating.current = true;
  }, [trigger]);

  useFrame(() => {
    if (!animating.current) return;

    camera.position.lerp(ISO_POSITION, 0.08);

    const controls = orbitRef.current;
    if (controls) {
      controls.target.lerp(ORIGIN, 0.08);
      controls.update();
    }

    if (camera.position.distanceTo(ISO_POSITION) < 0.02) {
      camera.position.copy(ISO_POSITION);
      if (controls) {
        controls.target.copy(ORIGIN);
        controls.update();
      }
      animating.current = false;
    }
  });

  return null;
}

export default function Scene3D({ pitch, roll, yaw }: Scene3DProps) {
  const orbitRef = useRef<any>(null);
  const [isoTrigger, setIsoTrigger] = useState(0);

  return (
    <div className="relative w-full h-full">
      <Canvas
        shadows
        camera={{ position: [4, 2.5, 5], fov: 45, near: 0.1, far: 100 }}
        style={{ background: "#ffffff" }}
      >
        <Suspense>
          <Lights />
          <CartesianPlane />
          <AirplaneModel pitch={pitch} roll={roll} yaw={yaw} />

          <Grid
            position={[0, -2.2, 0]}
            args={[16, 16]}
            cellSize={1}
            cellThickness={0.4}
            cellColor="#cbd5e1"
            sectionSize={4}
            sectionThickness={1}
            sectionColor="#94a3b8"
            fadeDistance={18}
            fadeStrength={1}
            infiniteGrid
          />

          <CameraController trigger={isoTrigger} orbitRef={orbitRef} />

          <OrbitControls
            ref={orbitRef}
            enablePan={false}
            minDistance={3}
            maxDistance={12}
            target={[0, 0, 0]}
          />
        </Suspense>
      </Canvas>

      {/* Botón de vista isométrica */}
      <button
        onClick={() => setIsoTrigger((t) => t + 1)}
        title="Restablecer vista isométrica"
        className="
          absolute top-3 right-3
          flex items-center gap-1.5
          px-3 py-1.5
          rounded-lg
          bg-white/90 hover:bg-white
          border border-gray-200 hover:border-gray-300
          shadow-sm hover:shadow
          text-xs font-medium text-gray-600 hover:text-gray-900
          transition-all duration-150
          backdrop-blur-sm
        "
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="w-3.5 h-3.5"
        >
          <path
            fillRule="evenodd"
            d="M15.312 11.424a5.5 5.5 0 01-9.201 2.466l-.312-.311h2.433a.75.75 0 000-1.5H3.989a.75.75 0 00-.75.75v4.242a.75.75 0 001.5 0v-2.43l.31.31a7 7 0 0011.712-3.138.75.75 0 00-1.449-.39zm1.23-3.723a.75.75 0 00.219-.53V2.929a.75.75 0 00-1.5 0V5.36l-.31-.31A7 7 0 003.239 8.188a.75.75 0 101.448.389A5.5 5.5 0 0113.89 6.11l.311.31h-2.432a.75.75 0 000 1.5h4.243a.75.75 0 00.53-.219z"
            clipRule="evenodd"
          />
        </svg>
        Isométrico
      </button>
    </div>
  );
}
