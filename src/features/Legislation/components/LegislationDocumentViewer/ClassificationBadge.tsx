import { useTranslation } from '@/shared/hooks/useTranslation';

interface ClassificationBadgeProps {
    classification: 'public' | 'secret';
}

export function ClassificationBadge({ classification }: ClassificationBadgeProps) {
    const { t } = useTranslation();

    const classificationConfig = {
        public: {
            bg: '#E8F5E9',
            text: '#2F7D32',
            label: t('legislation.public'),
        },
        secret: {
            bg: '#FFEBEE',
            text: '#9B1C1C',
            label: t('legislation.secret'),
        },
    };

    const config = classificationConfig[classification];

    return (
        <span
            className="px-3 py-1.5 rounded-full text-sm inline-flex items-center gap-2"
            style={{
                backgroundColor: config.bg,
                color: config.text,
                fontFamily: 'Dubai, Arial, sans-serif',
                fontWeight: 600,
                fontSize: '13px',
            }}
        >
            {config.label}
        </span>
    );
}
