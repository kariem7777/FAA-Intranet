import { FileText } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "@/shared/hooks/useTranslation";
import type { LawCategory } from "../../../types";

import type { GlobalSearchCategory, GlobalSearchDocument } from "../../../slices/legislationSlice";

interface HeroSearchResultsProps {
  results: GlobalSearchCategory[];
  totalResults: number;
  categories: LawCategory[];
  onCategoryClick: (categoryId: number) => void;
  onDocumentClick?: (document: GlobalSearchDocument) => void;
}

export function HeroSearchResults({
  results,
  totalResults,
  categories,
  onCategoryClick,
  onDocumentClick,
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
              <div key={result.categoryId} className="flex flex-col border-b border-[#F1F3F5] last:border-0 pb-1 group/item transition-all hover:bg-[#FDFCFB]">
                <button
                  onClick={() => onCategoryClick(result.categoryId)}
                  className={`w-full px-5 py-4 transition-all text-start flex items-center justify-between hover:bg-[#F9F6F0]/50 relative`}
                >
                  {/* Category active indicator */}
                  <div className={`absolute top-0 bottom-0 w-1 bg-[#908e81] opacity-0 group-hover/item:opacity-100 transition-opacity ${isRTL ? 'right-0' : 'left-0'}`} />

                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 bg-[#F7F8FA] group-hover/item:bg-white transition-colors border border-transparent group-hover/item:border-[#E5DDC8]">
                      {category.imagePath ? (
                        <img
                          src={category.imagePath}
                          alt={getLocalizedString(category.lawCategoryEn, category.lawCategoryAr)}
                          className="w-6 h-6 object-contain"
                        />
                      ) : (
                        <FileText
                          className="w-5 h-5 transition-colors group-hover/item:text-[#908e81]"
                          style={{ color: category.color }}
                          strokeWidth={2}
                        />
                      )}
                    </div>

                    <div>
                      <div className="text-[14px] font-semibold text-[#1A1A1A] mb-[2px] group-hover/item:text-[#908e81] transition-colors">
                        {getLocalizedString(category.lawCategoryEn, category.lawCategoryAr)}
                      </div>
                      <div className="text-[13px] text-[#72777A] font-normal">
                        {t('legislation.hero.documentCount_plural', { count: result.documentCount })}
                      </div>
                    </div>
                  </div>

                  <div
                    className="flex-shrink-0 text-[#9CA3AF] group-hover/item:text-[#908e81] transition-all"
                    style={{ transform: isRTL ? "rotate(180deg)" : "none" }}
                  >
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path
                        d="M7.5 15L12.5 10L7.5 5"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </button>

                {/* Render top documents under this category - hidden by default, shown on hover */}
                <div className="hidden group-hover/item:block transition-all border-t border-[#F1F3F5]/30">
                  {result.subCategories?.flatMap(sc => sc.documents || [])?.slice(0, 3).map((doc) => (
                    <button
                      key={doc.id}
                      onClick={() => onDocumentClick?.(doc)}
                      className="w-full px-16 py-2 pb-3 hover:bg-[#F9F6F0] transition-colors text-start flex items-center gap-3 group/doc"
                    >
                      <FileText className="w-4 h-4 text-[#72777A] group-hover/doc:text-[#908e81] transition-colors" />
                      <div className="text-[13px] text-[#1A1A1A] font-medium truncate group-hover/doc:text-[#1A1A1A]/80 transition-colors">
                        {getLocalizedString(doc.documentNameEn, doc.documentNameAr)}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
