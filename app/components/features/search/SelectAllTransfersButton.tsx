'use client';

interface SelectAllTransfersButtonProps {
  allSelected: boolean;
  onClick: () => void;
}

export function SelectAllTransfersButton({ allSelected, onClick }: SelectAllTransfersButtonProps) {
  return (
    <button
      onClick={onClick}
      className="text-sm text-[#7B91FF] hover:underline"
    >
      {allSelected ? 'Снять все' : 'Выбрать все'}
    </button>
  );
}

