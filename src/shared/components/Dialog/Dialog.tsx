import { X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export interface DialogProps {
    children: React.ReactNode;
    onClose?: () => void;
    title?: string;
    showCloseIcon?: boolean;
    showCloseButton?: boolean;
    closeButtonText?: string;
    closeOnBackdropClick?: boolean;
    closeOnEscape?: boolean;
    size?: 'small' | 'medium' | 'large' | 'fullscreen';
    className?: string;
}

export function Dialog({
    children,
    onClose,
    title,
    showCloseIcon = true,
    showCloseButton = false,
    closeButtonText = 'Close',
    closeOnBackdropClick = true,
    closeOnEscape = true,
    size = 'medium',
    className = '',
}: DialogProps) {
    const dialogRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        requestAnimationFrame(() => {
            setIsVisible(true);
        });
    }, []);

    const handleClose = () => {
        setIsVisible(false);
        setTimeout(() => {
            onClose?.();
        }, 300); // Match transition duration
    };

    useEffect(() => {
        if (closeOnEscape && onClose) {
            const handleEscape = (e: KeyboardEvent) => {
                if (e.key === 'Escape') {
                    handleClose();
                }
            };
            document.addEventListener('keydown', handleEscape);
            return () => document.removeEventListener('keydown', handleEscape);
        }
    }, [closeOnEscape, onClose]);

    useEffect(() => {
        const originalOverflow = document.body.style.overflow;
        const originalPaddingRight = document.body.style.paddingRight;
        const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
        document.body.style.overflow = 'hidden';
        if (scrollbarWidth > 0) {
            document.body.style.paddingRight = `${scrollbarWidth}px`;
        }

        return () => {
            document.body.style.overflow = originalOverflow;
            document.body.style.paddingRight = originalPaddingRight;
        };
    }, []);

    useEffect(() => {
        dialogRef.current?.focus();
    }, []);

    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (closeOnBackdropClick && onClose && e.target === e.currentTarget) {
            handleClose();
        }
    };

    const sizeClasses = {
        small: 'max-w-sm',
        medium: 'max-w-2xl',
        large: 'max-w-4xl',
        fullscreen: 'max-w-full h-full max-h-full rounded-none',
    };

    return (
        <div
            className={`fixed inset-0 flex items-center justify-center z-[40] p-4 transition-all duration-300 ${isVisible ? 'bg-black/50 backdrop-blur-sm' : 'bg-black/0 backdrop-blur-none'
                }`}
            onClick={handleBackdropClick}
            role="presentation"
        >
            <div
                ref={dialogRef}
                className={`bg-white rounded-xl shadow-2xl max-h-[90vh] w-full flex flex-col outline-none transition-all duration-300 ${isVisible
                    ? 'opacity-100 translate-y-0 scale-100'
                    : 'opacity-0 translate-y-4 scale-95'
                    } ${sizeClasses[size]} ${className}`}
                role="dialog"
                aria-modal="true"
                aria-labelledby={title ? 'dialog-title' : undefined}
                tabIndex={-1}
            >
                {(title || showCloseIcon) && (
                    <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 flex-shrink-0 !rounded-t-xl">
                        {title && (
                            <h6 id="dialog-title" className="!font-semibold !text-gray-900 !text-lg">
                                {title}
                            </h6>
                        )}
                        {showCloseIcon && onClose && (
                            <button
                                type="button"
                                className="flex items-center justify-center w-8 h-8 p-0 border-0 bg-transparent rounded-md cursor-pointer text-gray-500 transition-all duration-200 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 active:scale-95"
                                onClick={handleClose}
                                aria-label={closeButtonText}
                            >
                                <X className="w-5 h-5" />
                            </button>
                        )}
                    </div>
                )}
                <div className="px-6 py-4 overflow-y-auto overflow-x-visible flex-1 rounded-b-xl scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 hover:scrollbar-thumb-gray-400">
                    {children}
                </div>
                {showCloseButton && onClose && (
                    <div className="px-6 py-4 border-t border-gray-200 flex justify-end flex-shrink-0 !rounded-b-xl bg-gray-50">
                        <button
                            type="button"
                            className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors font-medium text-sm"
                            onClick={handleClose}
                        >
                            {closeButtonText}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}