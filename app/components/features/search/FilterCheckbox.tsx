'use client';

interface FilterCheckboxProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export function FilterCheckbox({ label, checked, onChange }: FilterCheckboxProps) {
  return (
    <label className="flex cursor-pointer items-center justify-between">
      <span className="text-sm text-[#022444]">{label}</span>
      <input
        type="checkbox"
        className="rounded"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
    </label>
  );
}

