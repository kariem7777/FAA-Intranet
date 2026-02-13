import type { LucideIcon } from 'lucide-react';
import type { ReactNode } from 'react';

interface MetadataItemProps {
    icon: LucideIcon;
    label: string;
    value: ReactNode;
}

export function MetadataItem({
    icon: Icon,
    label,
    value,
}: MetadataItemProps) {
    return (
        <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg mt-1 bg-faa-primary/10">
                <Icon className="w-5 h-5 " style={{ color: 'var(--color-faa-primary)' }} />
            </div>
            <div className="flex-1">
                <p
                    className="mb-1 text-gray-500"
                    style={{
                        fontSize: `var(--font-size-xs)`,
                        fontWeight: 500,
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                    }}
                >
                    {label}
                </p>
                <div
                    style={{
                        fontSize: `var(--font-size-base)`,
                        fontWeight: 500,
                        color: 'var(--color-text-primary)',
                    }}
                >
                    {value}
                </div>
            </div>
        </div>
    );
}
