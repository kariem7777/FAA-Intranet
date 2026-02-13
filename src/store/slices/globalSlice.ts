import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import i18n from '../../i18n';

interface GlobalState {
  language: 'en' | 'ar';
  direction: 'ltr' | 'rtl';
  fontSize: 'sm' | 'base' | 'lg' | 'xl';
}

const getInitialLanguage = (): 'en' | 'ar' => {
  const storedLang = localStorage.getItem('language');
  if (storedLang === 'en' || storedLang === 'ar') {
    return storedLang;
  }
  return 'ar'; // Default to Arabic
};

// Initialize font scale from localStorage or default
const initializeFontScale = (): string => {
  const storedScale = localStorage.getItem('textSize') as 'sm' | 'base' | 'lg' | 'xl' | null;
  const size = storedScale || 'base';
  document.documentElement.setAttribute('data-text-size', size);
  return size;
};

const initialState: GlobalState = {
  language: getInitialLanguage(),
  direction: getInitialLanguage() === 'ar' ? 'rtl' : 'ltr',
  fontSize: initializeFontScale() as 'sm' | 'base' | 'lg' | 'xl',
};

// Set initial document direction and font scale
document.documentElement.dir = initialState.direction;
document.documentElement.lang = initialState.language;
initializeFontScale();

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
    increaseFontSize: (state) => {
        const currentSize = document.documentElement.getAttribute('data-text-size') as 'sm' | 'base' | 'lg' | 'xl';
        const newSize = currentSize === 'sm' ? 'base' : currentSize === 'base' ? 'lg' : currentSize === 'lg' ? 'xl' : 'xl'  ;
        document.documentElement.setAttribute('data-text-size', newSize);
        localStorage.setItem('textSize', newSize);
    },
    decreaseFontSize: (state) => {
        const currentSize = document.documentElement.getAttribute('data-text-size') as 'sm' | 'base' | 'lg' | 'xl';
        const newSize = currentSize === 'xl' ? 'lg' : currentSize === 'lg' ? 'base' : currentSize === 'base' ? 'sm' : 'sm';
        document.documentElement.setAttribute('data-text-size', newSize);
        localStorage.setItem('textSize', newSize);
    },
    setFontSize: (state, action: PayloadAction<'sm' | 'base' | 'lg' | 'xl'>) => {
        const size = action.payload;
        document.documentElement.setAttribute('data-text-size', size);
        localStorage.setItem('textSize', size);
    }
  },
});

export const { setLanguage, toggleLanguage, increaseFontSize, decreaseFontSize, setFontSize } = globalSlice.actions;
export default globalSlice.reducer;
