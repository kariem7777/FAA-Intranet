import { User } from 'lucide-react';

interface UserAvatarProps {
    name?: string | null;
    size?: 'sm' | 'md' | 'lg' | 'xl';
    className?: string;
}

export const UserAvatar = ({ name, size = 'md', className = '' }: UserAvatarProps) => {
    const getInitials = (name: string) => {
        return name
            .split(' ')
            .map((n) => n[0])
            .slice(0, 2)
            .join('')
            .toUpperCase();
    };

    const sizeClasses = {
        sm: 'h-8 w-8 text-xs',
        md: 'h-10 w-10 text-sm',
        lg: 'h-12 w-12 text-base',
        xl: 'h-16 w-16 text-xl',
    };

    const initials = name ? getInitials(name) : null;

    return (
        <div
            className={`flex items-center justify-center rounded-full font-bold select-none overflow-hidden shrink-0 ${sizeClasses[size]} ${className}`}
            style={{
                background: 'linear-gradient(135deg, var(--color-legislation-active-indicator) 0%, #D1C4A3 100%)',
                color: 'var(--color-legislation-header-end)',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1), inset 0 0 0 1px rgba(255,255,255,0.2)'
            }}
        >
            {initials ? (
                <span>{initials}</span>
            ) : (
                <User className={size === 'sm' ? 'h-4 w-4' : 'h-5 w-5'} />
            )}
        </div>
    );
};
