import { cn } from '@/lib/utils';
import { Button } from '../ui/button';
import { Loader2 } from 'lucide-react';

interface CreateButtonProps {
  isLoading: boolean;
  isDisabled?: boolean;
  label: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  fullWidth?: boolean;
  loadingLabel?: string;
  form?: string;
}

export function CreateButton({
  isLoading,
  isDisabled = false,
  label,
  icon,
  onClick,
  form,
  fullWidth = false,
  loadingLabel = '',
}: CreateButtonProps) {
  const btnTitle = label ? label : 'Create';
  const loading = loadingLabel ? loadingLabel : 'Creating...';
  return (
    <Button
      type="submit"
      form={form}
      onClick={onClick}
      disabled={isDisabled}
      className={cn('rounded-full', fullWidth ? 'w-full sm:w-auto' : undefined)}
    >
      {isLoading ? (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        icon && <span className="mr-2">{icon}</span>
      )}
      {isLoading ? loading : btnTitle}
    </Button>
  );
}
