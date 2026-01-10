import { useContext, useId } from 'react';
import { DialogPortalContext } from '../context/DialogPortalContext';

export function useDialogPortal() {
  const id = useId();
  const context = useContext(DialogPortalContext);
  if (!context) {
    throw new Error('useDialogPortal must be used within DialogPortalProvider');
  }
  const show = (component: React.ReactNode) => {
    context.addDialog(id, component);
  };

  const hide = () => {
    context.removeDialog(id);
  };

  return { show, hide };
}
