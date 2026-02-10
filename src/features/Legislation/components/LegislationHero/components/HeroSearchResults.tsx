import { FileText } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "@/shared/hooks/useTranslation";
import type { LawCategory } from "../../../types";

interface SearchResult {
  categoryId: number;
  count: number;
}


interface HeroSearchResultsProps {
  results: SearchResult[];
  totalResults: number;
  categories: LawCategory[];
  onCategoryClick: (categoryId: number) => void;
}

export function HeroSearchResults({
  results,
  totalResults,
  categories,
  onCategoryClick,
}: HeroSearchResultsProps) {
  const { t, isRTL, getLocalizedString } = useTranslation();

  return (
    <div className="absolute left-0 right-0 px-20 top-[230px] z-[60]">
      <motion.div
        initial={{ opacity: 0, y: -5 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl border border-[#E1E4E9] overflow-hidden shadow-[0_8px_24px_rgba(0,0,0,0.12)]"
      >
        <div className="px-4 py-3 border-b border-[#F1F3F5] bg-[#FAFBFC]">
          <p
            className="text-[13px] text-[#72777A] font-normal"
          >
            {t('legislation.hero.foundResults', { total: totalResults, count: results.length })}
          </p>
        </div>

        <div className="divide-y divide-[#F1F3F5]">
          {results.map((result) => {
            const category = categories.find((c) => c.id === result.categoryId);
            if (!category) return null;

            return (
              <button
                key={result.categoryId}
                onClick={() => onCategoryClick(result.categoryId)}
                className="w-full px-5 py-4 hover:bg-gray-50 transition-colors text-start flex items-center justify-between group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 bg-[#F7F8FA]">
                    {category.imagePath ? (
                      <img
                        src={category.imagePath}
                        alt={getLocalizedString(category.lawCategoryEn, category.lawCategoryAr)}
                        className="w-6 h-6 object-contain"
                      />
                    ) : (
                      <FileText
                        className="w-5 h-5"
                        style={{ color: category.color }}
                        strokeWidth={2}
                      />
                    )}
                  </div>

                  <div>
                    <div className="text-[14px] font-medium text-[#1A1A1A] mb-[2px]">
                      {getLocalizedString(category.lawCategoryEn, category.lawCategoryAr)}
                    </div>
                    <div className="text-[13px] text-[#72777A] font-normal">
                      {t('legislation.hero.documentCount_plural', { count: result.count })}
                    </div>
                  </div>
                </div>

                <div
                  className="flex-shrink-0 text-[#9CA3AF]"
                  style={{ transform: isRTL ? "rotate(180deg)" : "none" }}
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path
                      d="M7.5 15L12.5 10L7.5 5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </button>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
