import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import i18n from '../../i18n';

interface GlobalState {
  language: 'en' | 'ar';
  direction: 'ltr' | 'rtl';
}

const getInitialLanguage = (): 'en' | 'ar' => {
  const storedLang = localStorage.getItem('language');
  if (storedLang === 'en' || storedLang === 'ar') {
    return storedLang;
  }
  return 'ar'; // Default to Arabic
};

const initialState: GlobalState = {
  language: getInitialLanguage(),
  direction: getInitialLanguage() === 'ar' ? 'rtl' : 'ltr',
};

// Set initial document direction
document.documentElement.dir = initialState.direction;
document.documentElement.lang = initialState.language;

const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<'en' | 'ar'>) => {
      const lang = action.payload;
      state.language = lang;
      state.direction = lang === 'ar' ? 'rtl' : 'ltr';
      
      // Update DOM and Storage
      document.documentElement.dir = state.direction;
      document.documentElement.lang = state.language;
      localStorage.setItem('language', state.language);
      
      // Sync with i18n
      i18n.changeLanguage(lang);
    },
    toggleLanguage: (state) => {
      const newLang = state.language === 'ar' ? 'en' : 'ar';
      state.language = newLang;
      state.direction = newLang === 'ar' ? 'rtl' : 'ltr';
      
      // Update DOM and Storage
      document.documentElement.dir = state.direction;
      document.documentElement.lang = state.language;
      localStorage.setItem('language', state.language);
      
      // Sync with i18n
      i18n.changeLanguage(newLang);
    },
  },
});

export const { setLanguage, toggleLanguage } = globalSlice.actions;
export default globalSlice.reducer;
