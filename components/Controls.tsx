"use client";

interface ControlsProps {
  pitch: number;
  roll: number;
  yaw: number;
  onPitchChange: (v: number) => void;
  onRollChange: (v: number) => void;
  onYawChange: (v: number) => void;
  onReset: () => void;
}

interface SliderProps {
  label: string;
  sublabel: string;
  value: number;
  onChange: (v: number) => void;
  accentColor: string;
  trackColor: string;
}

function Slider({ label, sublabel, value, onChange, accentColor, trackColor }: SliderProps) {
  const percent = ((value + 180) / 360) * 100;

  return (
    <div className="flex flex-col gap-1.5 md:gap-2">
      {/* Encabezado del slider */}
      <div className="flex items-baseline justify-between">
        <div>
          <span className="font-semibold text-sm text-gray-800">{label}</span>
          <span className="ml-1.5 text-xs text-gray-400">{sublabel}</span>
        </div>
        <span className="text-sm font-mono font-bold tabular-nums" style={{ color: accentColor }}>
          {value > 0 ? "+" : ""}
          {value}°
        </span>
      </div>

      {/* Input range — thumb más grande en táctil */}
      <input
        type="range"
        min={-180}
        max={180}
        step={1}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full touch-action-none"
        style={{
          background: `linear-gradient(to right, ${accentColor} 0%, ${accentColor} ${percent}%, ${trackColor} ${percent}%, ${trackColor} 100%)`,
        } as React.CSSProperties}
      />

      {/* Marcas de extremos */}
      <div className="flex justify-between text-[10px] md:text-xs text-gray-400 -mt-1">
        <span>-180°</span>
        <span>0°</span>
        <span>+180°</span>
      </div>
    </div>
  );
}

export default function Controls({
  pitch, roll, yaw,
  onPitchChange, onRollChange, onYawChange,
  onReset,
}: ControlsProps) {
  return (
    <>
      {/* ── Valores actuales ── */}
      <div className="rounded-xl bg-gray-50 border border-gray-200 p-3 md:p-4">
        <h2 className="text-[10px] md:text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 md:mb-3">
          Valores actuales
        </h2>
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="rounded-lg bg-white border border-gray-100 py-1.5 px-1 md:p-2">
            <p className="text-[9px] md:text-[10px] text-gray-400 uppercase tracking-wide">Pitch</p>
            <p className="text-base md:text-lg font-bold font-mono text-red-500 tabular-nums">{pitch}°</p>
          </div>
          <div className="rounded-lg bg-white border border-gray-100 py-1.5 px-1 md:p-2">
            <p className="text-[9px] md:text-[10px] text-gray-400 uppercase tracking-wide">Roll</p>
            <p className="text-base md:text-lg font-bold font-mono text-blue-500 tabular-nums">{roll}°</p>
          </div>
          <div className="rounded-lg bg-white border border-gray-100 py-1.5 px-1 md:p-2">
            <p className="text-[9px] md:text-[10px] text-gray-400 uppercase tracking-wide">Yaw</p>
            <p className="text-base md:text-lg font-bold font-mono text-green-500 tabular-nums">{yaw}°</p>
          </div>
        </div>
      </div>

      {/* ── Sliders ── */}
      <div className="rounded-xl bg-gray-50 border border-gray-200 p-3 md:p-4 flex flex-col gap-4 md:gap-5">
        <h2 className="text-[10px] md:text-xs font-semibold text-gray-400 uppercase tracking-wider">
          Controles de rotación
        </h2>

        <Slider
          label="Pitch" sublabel="(Cabeceo)"
          value={pitch} onChange={onPitchChange}
          accentColor="#ef4444" trackColor="#e2e8f0"
        />
        <div className="border-t border-gray-200" />
        <Slider
          label="Roll" sublabel="(Alabeo)"
          value={roll} onChange={onRollChange}
          accentColor="#3b82f6" trackColor="#e2e8f0"
        />
        <div className="border-t border-gray-200" />
        <Slider
          label="Yaw" sublabel="(Guiñada)"
          value={yaw} onChange={onYawChange}
          accentColor="#22c55e" trackColor="#e2e8f0"
        />
      </div>

      {/* ── Reset ── */}
      <button
        onClick={onReset}
        className="w-full rounded-xl bg-gray-800 hover:bg-gray-700 active:bg-gray-600 border border-gray-700 transition-all duration-150 py-3 text-sm font-semibold text-white tracking-wide"
      >
        Restablecer posición
      </button>

      {/* ── Leyenda de ejes ── */}
      <div className="rounded-xl bg-gray-50 border border-gray-200 p-3 md:p-4">
        <h2 className="text-[10px] md:text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 md:mb-3">
          Leyenda de ejes
        </h2>
        <div className="flex flex-col gap-1.5 md:gap-2 text-xs md:text-sm">
          <div className="flex items-center gap-2">
            <div className="w-5 h-1.5 rounded-full bg-red-500 flex-none" />
            <span className="text-gray-600">
              <span className="font-semibold text-red-500">Rojo</span> — Pitch (eje lateral X)
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-5 h-1.5 rounded-full bg-blue-500 flex-none" />
            <span className="text-gray-600">
              <span className="font-semibold text-blue-500">Azul</span> — Roll (eje longitudinal Z)
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-5 h-1.5 rounded-full bg-green-500 flex-none" />
            <span className="text-gray-600">
              <span className="font-semibold text-green-500">Verde</span> — Yaw (eje vertical Y)
            </span>
          </div>
        </div>
        <p className="text-[10px] md:text-xs text-gray-400 mt-2 md:mt-3 leading-relaxed">
          Arrastra la escena para rotar la cámara. Pellizca o usa la rueda para hacer zoom.
        </p>
      </div>
    </>
  );
}
