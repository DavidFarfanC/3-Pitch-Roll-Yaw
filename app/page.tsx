"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Controls from "@/components/Controls";

const Scene3D = dynamic(() => import("@/components/Scene3D"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-slate-800 rounded-xl">
      <p className="text-slate-400 text-sm">Cargando escena 3D...</p>
    </div>
  ),
});

export default function Home() {
  const [pitch, setPitch] = useState(0);
  const [roll, setRoll] = useState(0);
  const [yaw, setYaw] = useState(0);

  const handleReset = () => {
    setPitch(0);
    setRoll(0);
    setYaw(0);
  };

  return (
    <main className="flex flex-col h-screen bg-slate-900 text-white">
      {/* Encabezado */}
      <header className="flex-none px-6 py-4 border-b border-slate-700">
        <p className="text-xs text-slate-500 mb-1">De: Kamila García</p>
        <h1 className="text-2xl font-bold tracking-tight text-white">
          Visualizador de Pitch, Roll y Yaw
        </h1>
        <p className="text-slate-400 text-sm mt-0.5">
          Manipula los tres ejes de rotación de un avión en tiempo real
        </p>
      </header>

      {/* Contenido principal */}
      <div className="flex flex-1 min-h-0 gap-4 p-4">
        {/* Escena 3D */}
        <div className="flex-1 min-w-0 rounded-xl overflow-hidden border border-slate-700">
          <Scene3D pitch={pitch} roll={roll} yaw={yaw} />
        </div>

        {/* Panel lateral de controles */}
        <div className="flex-none w-72 flex flex-col gap-4 overflow-y-auto">
          <Controls
            pitch={pitch}
            roll={roll}
            yaw={yaw}
            onPitchChange={setPitch}
            onRollChange={setRoll}
            onYawChange={setYaw}
            onReset={handleReset}
          />
        </div>
      </div>
    </main>
  );
}
