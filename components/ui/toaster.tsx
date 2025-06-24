import { Toast, ToastViewport } from '@/components/ui/toast';
import { useToast } from '@/components/ui/use-toast';
import * as ToastPrimitives from '@radix-ui/react-toast';
import { useEffect, useState } from 'react';

export function Toaster() {
  const { toasts } = useToast();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <ToastPrimitives.Provider>
      {toasts.map(({ id, title, description, action, ...props }) => (
        <Toast key={id} {...props}>
          <div className="grid gap-1">
            {title && <div className="text-sm font-semibold">{title}</div>}
            {description && <div className="text-sm opacity-90">{description}</div>}
          </div>
          {action}
        </Toast>
      ))}
      <ToastViewport />
    </ToastPrimitives.Provider>
  );
}
