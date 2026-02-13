import { useTranslation } from '@/shared/hooks/useTranslation';

interface ClassificationBadgeProps {
    classification: number;
}

export function ClassificationBadge({ classification }: ClassificationBadgeProps) {
    const { t } = useTranslation();

    const getClassificationConfig = (type: number) => {
        switch (type) {
            case 1: // Public
                return {
                    bg: 'var(--color-msg-admin-bg)',
                    text: 'var(--color-msg-admin-text)',
                    label: t('legislation.public'),
                };
            case 2: // Secret
                return {
                    bg: 'var(--color-bg-red-light)',
                    text: 'var(--color-accent-red)',
                    label: t('legislation.secret'),
                };
            default:
                return {
                    bg: 'var(--color-bg-card)',
                    text: 'var(--color-secondary)',
                    label: t('legislation.unknown'),
                };
        }
    };

    const config = getClassificationConfig(classification);

    return (
        <span
            className="px-3 py-1.5 rounded-full text-sm inline-flex items-center gap-2"
            style={{
                backgroundColor: config.bg,
                color: config.text,
                fontWeight: 600,
                fontSize: 'var(--font-size-xs)',
            }}
        >
            {config.label}
        </span>
    );
}
