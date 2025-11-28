'use client';

interface TransferDurationSliderProps {
  value: number;
  onChange: (value: number) => void;
  max: number;
}

export function TransferDurationSlider({ value, onChange, max }: TransferDurationSliderProps) {
  return (
    <div className="mt-4">
      <div className="mb-2 flex items-center justify-between text-sm">
        <span className="text-[#022444]">Длительность пересадок</span>
        <span className="text-[#022444]">До {max}ч</span>
      </div>
      <input
        type="range"
        min="0"
        max={max * 10}
        value={value * 10}
        onChange={(e) => onChange(Number(e.target.value) / 10)}
        step="1"
        className="mt-2 w-full"
      />
    </div>
  );
}

