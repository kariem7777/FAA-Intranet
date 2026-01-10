import React, { useRef, useState } from 'react';
import { useDialogPortal } from './useDialogPortal';
import { ConfirmationDialog } from '../components/Dialog/ConfirmationDialog';

export interface ConfirmationOptions {
    title: string;
    message: string;
    confirmLabel?: string;
    cancelLabel?: string;
    variant?: 'danger' | 'warning' | 'info' | 'success' | 'primary';
}

export function useConfirmation() {
    const { show, hide } = useDialogPortal();
    const resolveRef = useRef<((value: boolean) => void) | null>(null);

    const confirm = (options: ConfirmationOptions): Promise<boolean> => {
        return new Promise((resolve) => {
            resolveRef.current = resolve;

            const handleConfirm = () => {
                if (resolveRef.current) {
                    resolveRef.current(true);
                    resolveRef.current = null;
                }
                hide();
            };

            const handleCancel = () => {
                if (resolveRef.current) {
                    resolveRef.current(false);
                    resolveRef.current = null;
                }
                hide();
            };

            show(
                <ConfirmationDialog
                    isOpen={true}
                    title={options.title}
                    message={options.message}
                    confirmLabel={options.confirmLabel}
                    cancelLabel={options.cancelLabel}
                    variant={options.variant}
                    onConfirm={handleConfirm}
                    onCancel={handleCancel}
                />
            );
        });
    };

    return confirm;
}
