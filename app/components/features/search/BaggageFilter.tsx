'use client';

interface BaggageFilterProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  price: number | null;
  loading: boolean;
}

function formatPrice(price: number | null): string | null {
  if (price === null) return null;
  return price.toLocaleString('ru-RU') + '₽';
}

export function BaggageFilter({ checked, onChange, price, loading }: BaggageFilterProps) {
  return (
    <div className="rounded-lg border bg-white p-4">
      <h3 className="mb-3 text-sm font-bold text-[#022444]">Багаж</h3>
      <label className="flex cursor-pointer items-center justify-between">
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="baggage"
            className="rounded"
            checked={checked}
            onChange={(e) => onChange(e.target.checked)}
          />
          <span className="text-sm text-[#022444]">С багажом</span>
        </div>
        {loading ? (
          <span className="text-sm text-gray-400">...</span>
        ) : price ? (
          <span className="text-sm text-[#022444]">{formatPrice(price)}</span>
        ) : null}
      </label>
    </div>
  );
}

