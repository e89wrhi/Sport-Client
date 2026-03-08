import { cn } from '@/lib/utils';
import { Button } from '../ui/button';
import { Loader2 } from 'lucide-react';

interface UpdateButtonProps {
  isLoading: boolean;
  isDisabled?: boolean;
  label: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  fullWidth?: boolean;
  loadingLabel?: string;
  form?: string;
}

export function UpdateButton({
  isLoading,
  isDisabled = false,
  label,
  icon,
  onClick,
  form,
  fullWidth = false,
  loadingLabel = '',
}: UpdateButtonProps) {
  const btnTitle = label ? label : 'Update';
  const loading = loadingLabel ? loadingLabel : 'Updating...';
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
