'use client';

import { TransferOption } from './TransferOption';
import { SelectAllTransfersButton } from './SelectAllTransfersButton';
import { TransferDurationSlider } from './TransferDurationSlider';
import { AdditionalTransferFilters } from './AdditionalTransferFilters';
import type { FilterState } from './SearchFilters';

interface TransfersFilterProps {
  selectedTransfers: number[];
  onToggle: (count: number) => void;
  priceStats: {
    transfers: Record<number, number | null>;
  };
  loading: boolean;
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  onSelectAll: () => void;
}

export function TransfersFilter({
  selectedTransfers,
  onToggle,
  priceStats,
  loading,
  filters,
  onFilterChange,
  onSelectAll,
}: TransfersFilterProps) {
  const transferOptions = [
    { count: 0, label: 'Без пересадок' },
    { count: 1, label: '1 пересадка' },
    { count: 2, label: '2 пересадки' },
    { count: 3, label: '3 пересадки' },
  ];

  return (
    <div className="rounded-lg border bg-white p-4">
      <h3 className="mb-3 text-sm font-bold text-[#022444]">Пересадки</h3>
      <div className="space-y-2">
        {transferOptions.map((option) => (
          <TransferOption
            key={option.count}
            count={option.count}
            label={option.label}
            checked={selectedTransfers.includes(option.count)}
            onToggle={() => onToggle(option.count)}
            price={priceStats.transfers[option.count]}
            loading={loading}
          />
        ))}
      </div>

      <TransferDurationSlider
        value={filters.maxTransferDuration}
        onChange={(value) => onFilterChange({ ...filters, maxTransferDuration: value })}
        max={6}
      />

      <div className="mt-4 space-y-3">
        <SelectAllTransfersButton
          allSelected={selectedTransfers.length === 4}
          onClick={onSelectAll}
        />

        <AdditionalTransferFilters
          filters={filters}
          onFilterChange={onFilterChange}
        />
      </div>
    </div>
  );
}

