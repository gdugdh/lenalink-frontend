'use client';

import { FilterCheckbox } from './FilterCheckbox';
import type { FilterState } from './SearchFilters';

interface AdditionalTransferFiltersProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
}

export function AdditionalTransferFilters({ filters, onFilterChange }: AdditionalTransferFiltersProps) {
  const filterOptions = [
    { key: 'convenientTransfers' as const, label: 'Удобные пересадки' },
    { key: 'noRecheck' as const, label: 'Без повторной регистрации' },
    { key: 'noVisa' as const, label: 'Без виз на пересадках' },
    { key: 'noAirportChange' as const, label: 'Без смены аэропорта' },
    { key: 'noNightTransfers' as const, label: 'Без ночных пересадок' },
  ];

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-sm text-[#022444]">Условия пересадок</span>
      </div>
      {filterOptions.map((option) => (
        <FilterCheckbox
          key={option.key}
          label={option.label}
          checked={filters[option.key]}
          onChange={(checked) => onFilterChange({ ...filters, [option.key]: checked })}
        />
      ))}
    </div>
  );
}

