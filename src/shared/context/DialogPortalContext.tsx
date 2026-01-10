import { createContext, useContext, useCallback, useState } from 'react';
import { createPortal } from 'react-dom';

interface DialogInstance {
    id: string;
    component: React.ReactNode;
}

interface DialogPortalContextType {
    dialogs: DialogInstance[];
    addDialog: (id: string, component: React.ReactNode) => void;
    removeDialog: (id: string) => void;
}

export const DialogPortalContext = createContext<DialogPortalContextType | undefined>(
    undefined,
);

export function DialogPortalProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [dialogs, setDialogs] = useState<DialogInstance[]>([]);

    const addDialog = useCallback((id: string, component: React.ReactNode) => {
        setDialogs((prev) => {
            // Remove if already exists
            const filtered = prev.filter((d) => d.id !== id);
            return [...filtered, { id, component }];
        });
    }, []);

    const removeDialog = useCallback((id: string) => {
        setDialogs((prev) => prev.filter((d) => d.id !== id));
    }, []);

    return (
        <DialogPortalContext.Provider value={{ dialogs, addDialog, removeDialog }}>
            {children}
        </DialogPortalContext.Provider>
    );
}

/**
 * Portal renderer - place this at app root to render all dialogs
 */
export function DialogPortal() {
    const context = useContext(DialogPortalContext);
    if (!context) {
        throw new Error('DialogPortal must be used within DialogPortalProvider');
    }
    const { dialogs } = context;

    if (dialogs.length === 0) return null;

    return createPortal(
        <div className="dialog-portal-container">
            {dialogs.map((dialog) => (
                <div key={dialog.id}>{dialog.component}</div>
            ))}
        </div>,
        document.body,
    );
}


