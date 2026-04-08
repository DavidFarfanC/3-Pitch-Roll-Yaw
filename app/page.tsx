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
    <main className="flex flex-col h-screen bg-slate-900 text-white overflow-hidden">
      {/* Encabezado — más compacto en móvil */}
      <header className="flex-none px-4 py-2.5 md:px-6 md:py-4 border-b border-slate-700">
        <p className="text-[10px] md:text-xs text-slate-500 mb-0.5">De: Kamila García</p>
        <h1 className="text-lg md:text-2xl font-bold tracking-tight text-white leading-tight">
          Visualizador de Pitch, Roll y Yaw
        </h1>
        <p className="hidden md:block text-slate-400 text-sm mt-0.5">
          Manipula los tres ejes de rotación de un avión en tiempo real
        </p>
      </header>

      {/* Contenido principal:
          – Móvil:    columna  (escena arriba, controles abajo)
          – Desktop:  fila     (escena izquierda, controles derecha) */}
      <div className="flex flex-col md:flex-row flex-1 min-h-0 gap-3 md:gap-4 p-3 md:p-4">

        {/* Escena 3D */}
        <div className="
          rounded-xl overflow-hidden border border-slate-700
          h-[46vh] md:h-auto md:flex-1
        ">
          <Scene3D pitch={pitch} roll={roll} yaw={yaw} />
        </div>

        {/* Panel de controles:
            – Móvil:   ancho completo, desplazamiento horizontal
            – Desktop: columna lateral fija de 288 px              */}
        <div className="
          md:flex-none md:w-72
          flex flex-col md:flex-col
          gap-3 md:gap-4
          overflow-y-auto
          pb-2 md:pb-0
        ">
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
