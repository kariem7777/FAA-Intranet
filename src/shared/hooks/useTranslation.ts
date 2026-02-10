import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../store";
import { toggleLanguage, setLanguage } from "../../store/slices/globalSlice";
import { useTranslation as useI18nTranslation } from "react-i18next";

export const useTranslation = (namespace: string = "") => {
  const dispatch = useDispatch();
  const { language, direction } = useSelector(
    (state: RootState) => state.global
  );

  const isRTL = direction === "rtl";

  const { t, i18n } = useI18nTranslation(namespace);

  const getLocalizedString = (enText: string, arText: string) => {
    return language === "en" ? enText : arText;
  }

  return {
    language,
    direction,
    isRTL,
    t,
    toggleLanguage: () => dispatch(toggleLanguage()),
    setLanguage: (lang: "en" | "ar") => dispatch(setLanguage(lang)),
    getLocalizedString,
    i18n,
  };
};
