import { useTranslation } from "@/shared/hooks/useTranslation";
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '@/store';
import { HeroBackground } from './components/HeroBackground';
import { HeroHeader } from './components/HeroHeader';
import { HeroSearchBar } from './components/HeroSearchBar';
import { HeroSearchResults } from './components/HeroSearchResults';
import { useEffect } from 'react';
import { performGlobalSearch, setGlobalSearchQuery } from "../../slices/legislationSlice";

interface LegislationBannerProps {
  handleCategorySearch?: (categoryId: number) => void;
  mode?: "legislation" | "documents" | "approved-opinions";
  onAddDocument?: () => void;
  onBack?: () => void;
}

export function LegislationHero({
  mode = "legislation",
  handleCategorySearch,
  onAddDocument,
  onBack,
}: LegislationBannerProps) {
  const { t, isRTL } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();

  const { globalSearchQuery, searchResults, totalResults, categories } = useSelector(
    (state: RootState) => state.legislationSlice
  );

  const modeContent = {
    legislation: {
      title: t('legislation.hero.legislationTitle'),
      description: t('legislation.hero.legislationDescription'),
    },
    documents: {
      title: t('legislation.hero.documentsTitle'),
      description: t('legislation.hero.documentsDescription'),
    },
    'approved-opinions': {
      title: t('legislation.hero.approvedOpinionsTitle'),
      description: t('legislation.hero.approvedOpinionsDescription'),
    },
  };

  const content = modeContent[mode];
  const showSearchBar = mode === "legislation";
  const showSearchResults = globalSearchQuery && searchResults.length > 0;

  useEffect(() => {
    if (globalSearchQuery.trim()) {
      const timer = setTimeout(() => {
        dispatch(performGlobalSearch());
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [globalSearchQuery, dispatch]);

  const handleSearchChange = (value: string) => {
    dispatch(setGlobalSearchQuery(value));
  };

  const handleClearSearch = () => {
    dispatch(setGlobalSearchQuery(''));
  };

  const handleCategoryClick = (categoryId: number) => {
    handleCategorySearch?.(categoryId);
  };

  return (
    <div dir={isRTL ? "rtl" : "ltr"} className="relative w-full overflow-visible px-20 pt-4">
      <HeroBackground />

      <div className="py-8 pt-4 relative z-10">
        <HeroHeader
          mode={mode}
          title={content.title}
          description={content.description}
          onAddDocument={onAddDocument}
          onBack={onBack}
        // isAddingDocument={loading.add}
        />

        {showSearchBar && (
          <HeroSearchBar
            value={globalSearchQuery}
            onChange={handleSearchChange}
            onClear={handleClearSearch}
          />
        )}
      </div>

      {showSearchResults && (
        <HeroSearchResults
          results={searchResults}
          totalResults={totalResults}
          categories={categories.items}
          onCategoryClick={handleCategoryClick}
        />
      )}
    </div>
  );
}
