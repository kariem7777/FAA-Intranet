import { useSelector, useDispatch } from 'react-redux';
import { type RootState } from '../../store'; // Adjust path if needed
import { toggleLanguage, setLanguage } from '../../store/slices/globalSlice';

export const useTranslation = (enData?: any, arData?: any) => {
    const dispatch = useDispatch();
    const { language, direction } = useSelector((state: RootState) => state.global);
    const isRTL = direction === 'rtl';

    // Helper to get value from provided dictionaries based on current language
    const getTranslated = (key: string) => {
        if (!enData || !arData) return key;
        const data = language === 'ar' ? arData : enData;
        const keys = key.split('.');
        let current = data;
        for (const k of keys) {
            if (current === undefined || current[k] === undefined) return key;
            current = current[k];
        }
        return current;
    };

    return {
        language,
        direction,
        isRTL,
        toggleLanguage: () => dispatch(toggleLanguage()),
        setLanguage: (lang: 'en' | 'ar') => dispatch(setLanguage(lang)),
        t: getTranslated
    };
};
