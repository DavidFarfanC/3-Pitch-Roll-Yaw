"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Grid, Environment } from "@react-three/drei";
import { Suspense } from "react";
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

function AxisLabels() {
  return null; // Las etiquetas se muestran en el panel de controles
}

export default function Scene3D({ pitch, roll, yaw }: Scene3DProps) {
  return (
    <Canvas
      shadows
      camera={{ position: [4, 2.5, 5], fov: 45, near: 0.1, far: 100 }}
      style={{ background: "linear-gradient(180deg, #0f172a 0%, #1e293b 60%, #0f172a 100%)" }}
    >
      <Suspense fallback={null}>
        <Lights />

        {/* Modelo del avión con los ejes */}
        <AirplaneModel pitch={pitch} roll={roll} yaw={yaw} />

        {/* Rejilla de referencia */}
        <Grid
          position={[0, -2.2, 0]}
          args={[16, 16]}
          cellSize={1}
          cellThickness={0.4}
          cellColor="#334155"
          sectionSize={4}
          sectionThickness={1}
          sectionColor="#475569"
          fadeDistance={18}
          fadeStrength={1}
          infiniteGrid
        />

        {/* Controles de cámara orbitales */}
        <OrbitControls
          enablePan={false}
          minDistance={3}
          maxDistance={12}
          target={[0, 0, 0]}
        />
      </Suspense>
    </Canvas>
  );
}
