"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Controls from "@/components/Controls";

const Scene3D = dynamic(() => import("@/components/Scene3D"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-xl">
      <p className="text-gray-500 text-sm">Cargando escena 3D...</p>
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
    <main className="flex flex-col h-screen bg-white text-gray-900 overflow-hidden">
      {/* Encabezado — más compacto en móvil */}
      <header className="flex-none px-4 py-2.5 md:px-6 md:py-4 border-b border-gray-200">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-1 md:gap-0">
          <div>
            <h1 className="text-lg md:text-2xl font-bold tracking-tight text-gray-900 leading-tight">
              Visualizador de Pitch, Roll y Yaw
            </h1>
            <p className="hidden md:block text-gray-500 text-sm mt-0.5">
              Manipula los tres ejes de rotación de un avión en tiempo real
            </p>
          </div>
          <div className="text-right text-[10px] md:text-xs text-gray-400 leading-snug">
            <p className="font-medium text-gray-500">Prof. Rafael Miranda</p>
            <p>Robótica Industrial — CETYS Universidad Campus Tijuana</p>
            <p className="mt-1">
              <span className="font-semibold text-red-500">Equipo Rojo:</span>{" "}
              Kamila · Enrique · Jorge · Jesus · David · Iván
            </p>
          </div>
        </div>
      </header>

      {/* Contenido principal:
          – Móvil:    columna  (escena arriba, controles abajo)
          – Desktop:  fila     (escena izquierda, controles derecha) */}
      <div className="flex flex-col md:flex-row flex-1 min-h-0 gap-3 md:gap-4 p-3 md:p-4">

        {/* Escena 3D */}
        <div className="
          rounded-xl overflow-hidden border border-gray-200
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
