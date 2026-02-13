import type { LucideIcon } from 'lucide-react';
import type { ReactNode } from 'react';

interface MetadataItemProps {
    icon: LucideIcon;
    label: string;
    value: ReactNode;
    fontSizeMultiplier?: number;
    bgOffWhite: string;
    primary: string;
    textSecondary: string;
    textPrimary: string;
}

export function MetadataItem({
    icon: Icon,
    label,
    value,
    fontSizeMultiplier = 1,
    bgOffWhite,
    primary,
    textSecondary,
    textPrimary,
}: MetadataItemProps) {
    return (
        <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg mt-1" style={{ backgroundColor: bgOffWhite }}>
                <Icon className="w-5 h-5" style={{ color: primary }} />
            </div>
            <div className="flex-1">
                <p
                    className="mb-1"
                    style={{
                        fontFamily: 'Dubai, Arial, sans-serif',
                        fontSize: `${13 * fontSizeMultiplier}px`,
                        fontWeight: 600,
                        color: textSecondary,
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                    }}
                >
                    {label}
                </p>
                <div
                    style={{
                        fontFamily: 'Dubai, Arial, sans-serif',
                        fontSize: `${16 * fontSizeMultiplier}px`,
                        fontWeight: 600,
                        color: textPrimary,
                    }}
                >
                    {value}
                </div>
            </div>
        </div>
    );
}
