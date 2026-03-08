import { Input } from '../ui/input';

interface DatePickerProps {
  value: Date | null;
  onChange: (value: Date | null) => void;
  disabled?: boolean;
}
export function DatePicker({ value, onChange, disabled }: DatePickerProps) {
  const formatDate = (date: Date | null) => {
    if (!date) return '';
    return date.toISOString().split('T')[0]; // yyyy-mm-dd
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    onChange(v ? new Date(v) : null);
  };

  return (
    <Input
      type="date"
      className="border px-2 py-1 rounded w-full"
      disabled={disabled}
      value={formatDate(value)}
      onChange={handleInput}
    />
  );
}
