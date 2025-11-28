'use client';

interface TransferOptionProps {
  count: number;
  label: string;
  checked: boolean;
  onToggle: () => void;
  price: number | null;
  loading: boolean;
}

function formatPrice(price: number | null): string | null {
  if (price === null) return null;
  return price.toLocaleString('ru-RU') + '₽';
}

export function TransferOption({ count, label, checked, onToggle, price, loading }: TransferOptionProps) {
  return (
    <label className="flex cursor-pointer items-center justify-between">
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id={`transfer-${count}`}
          className="rounded"
          checked={checked}
          onChange={onToggle}
        />
        <span className="text-sm text-[#022444]">{label}</span>
      </div>
      {loading ? (
        <span className="text-sm text-gray-400">...</span>
      ) : price ? (
        <span className="text-sm text-[#022444]">{formatPrice(price)}</span>
      ) : null}
    </label>
  );
}

