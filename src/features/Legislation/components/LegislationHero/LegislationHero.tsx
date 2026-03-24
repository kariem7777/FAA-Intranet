import { useTranslation } from "@/shared/hooks/useTranslation";
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '@/store';
import { HeroBackground } from './components/HeroBackground';
import { HeroHeader } from './components/HeroHeader';
import { HeroSearchBar } from './components/HeroSearchBar';
import { HeroSearchResults } from './components/HeroSearchResults';
import { useEffect } from 'react';
import { performGlobalSearch, setGlobalSearchQuery, clearSearch } from "../../slices/legislationSlice";

interface LegislationBannerProps {
  handleCategorySearch?: (categoryId: number) => void;
  mode?: "legislation" | "documents" | "approved-opinions" | "add-user";
  onAddDocument?: () => void;
  onBack?: () => void;
  onViewDocument?: (doc: any) => void;
}

export function LegislationHero({
  mode = "legislation",
  handleCategorySearch,
  onAddDocument,
  onBack,
  onViewDocument,
}: LegislationBannerProps) {
  const { t, isRTL } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();

  const { globalSearchQuery, searchResults, opinionResults, totalResults, categories } = useSelector(
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
    'add-user': {
      title: t('legislation.hero.addUserTitle'),
      description: t('legislation.hero.addUserDescription'),
    },
  };

  const content = modeContent[mode];
  const showSearchBar = mode === "legislation";
  const showSearchResults = globalSearchQuery && (searchResults.length > 0 || opinionResults.length > 0);

  useEffect(() => {
    if (globalSearchQuery.trim()) {
      const timer = setTimeout(() => {
        dispatch(performGlobalSearch());
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [globalSearchQuery, dispatch]);

  useEffect(() => {
    // Clear search when changing modes (e.g., from legislation to dashboard)
    dispatch(clearSearch());
  }, [mode, dispatch]);

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
          opinionResults={opinionResults}
          totalResults={totalResults}
          categories={categories.items}
          onCategoryClick={handleCategoryClick}
          onDocumentClick={onViewDocument}
        />
      )}
    </div>
  );
}
