import { useSelector, useDispatch } from 'react-redux';
import { type RootState } from '../../store'; 
import { toggleLanguage, setLanguage } from '../../store/slices/globalSlice';
import { useTranslation as useI18nTranslation } from 'react-i18next';

export const useTranslation = (namespace?: string) => {
    const dispatch = useDispatch();
    const { language, direction } = useSelector((state: RootState) => state.global);
    const isRTL = direction === 'rtl';
    const { t } = useI18nTranslation(namespace);

    return {
        language,
        direction,
        isRTL,
        toggleLanguage: () => dispatch(toggleLanguage()),
        setLanguage: (lang: 'en' | 'ar') => dispatch(setLanguage(lang)),
        t,
    };
};
