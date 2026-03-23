import React from 'react';
import { AlertCircle, ChevronDown } from "lucide-react";
import { Shimmer } from '@/shared/components/Shimmer/Shimmer';

interface SelectFieldProps {
    id: string;
    label: string;
    hideLabel?: boolean;
    value: number;
    onChange: (value: number) => void;
    isLoading: boolean;
    error: string | null;
    onRetry?: () => void;
    placeholder?: string;
    required?: boolean;
    disabled?: boolean;
    children: React.ReactNode;
}

export const FetchingSelect = ({
    id,
    label,
    hideLabel,
    value,
    onChange,
    isLoading,
    error,
    onRetry,
    placeholder = 'Select…',
    required,
    disabled,
    children,
}: SelectFieldProps) => (
    <div className="space-y-1.5">
        {!hideLabel && (
            <label className="text-sm font-medium text-gray-700" htmlFor={id}>
                {label} {required && <span className="text-red-500">*</span>}
            </label>
        )}

        {/* Loading skeleton */}
        {isLoading && (
            <Shimmer height={40} className="w-full" />
        )}

        {/* Error state */}
        {!isLoading && error && (
            <div className="flex items-center justify-between h-10 px-3 rounded-md border border-red-200 bg-red-50 text-red-600 text-sm">
                <div className="flex items-center gap-1.5 overflow-hidden">
                    <AlertCircle size={14} className="shrink-0" />
                    <span className="truncate">{error}</span>
                </div>
                {onRetry && (
                    <button
                        type="button"
                        onClick={onRetry}
                        className="text-xs font-semibold hover:text-red-700 shrink-0 border-l border-red-200 pl-2 ml-1"
                    >
                        Retry
                    </button>
                )}
            </div>
        )}

        {/* Select */}
        {!isLoading && !error && (
            <div className="relative">
                <select
                    id={id}
                    value={value || ''}
                    onChange={(e) => onChange(Number(e.target.value))}
                    required={required}
                    disabled={disabled}
                    className="
                        w-full h-10 pl-3 pr-9 rounded-md border border-input bg-background
                        text-sm text-gray-700 shadow-sm appearance-none
                        focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-0
                        disabled:cursor-not-allowed disabled:opacity-50
                    "
                >
                    <option value="" disabled>
                        {placeholder}
                    </option>
                    {children}
                </select>
                <ChevronDown
                    size={15}
                    className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
            </div>
        )}
    </div>
);
