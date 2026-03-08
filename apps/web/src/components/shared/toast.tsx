import { toast } from 'sonner';

type ToastType = 'success' | 'error' | 'info' | 'warning';

interface ToastOptions {
  title: string;
  description?: string;
  type?: ToastType; // defaults to 'info'
}

export const showToast = ({
  title,
  description,
  type = 'info',
}: ToastOptions) => {
  switch (type) {
    case 'success':
      toast.success(title, { description });
      break;
    case 'error':
      toast.error(title, { description });
      break;
    case 'warning':
      toast.warning(title, { description });
      break;
    case 'info':
    default:
      toast.info(title, { description });
      break;
  }
};
