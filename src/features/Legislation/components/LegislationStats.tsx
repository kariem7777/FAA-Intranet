import { useTranslation } from 'react-i18next';

export const LegislationStats = () => {
    const { t } = useTranslation('legislation');
    // Assuming we might eventually fetch stats or use static ones
    // For now it's a placeholder
    return (
        <div className="w-full h-32 bg-gray-50 flex items-center justify-center rounded-xl border-2 border-dashed border-gray-200 my-8">
            <h2 className="text-xl font-medium text-gray-400">Statistics Component</h2>
            {/* TODO: Implement Statistics Cards */}
        </div>
    );
};
