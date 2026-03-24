import { useState, useMemo } from "react";
import { FileText, CheckCircle2, MessageSquare, Search, X } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "@/shared/hooks/useTranslation";
import { useNavigate } from "react-router-dom";
import type { LawCategory } from "../../../types";

import type { GlobalSearchCategory, GlobalSearchDocument, GlobalSearchOpinion } from "../../../slices/legislationSlice";

interface HeroSearchResultsProps {
  results: GlobalSearchCategory[];
  opinionResults?: GlobalSearchOpinion[];
  totalResults: number;
  categories: LawCategory[];
  onCategoryClick: (categoryId: number) => void;
  onDocumentClick?: (document: GlobalSearchDocument) => void;
}

export function HeroSearchResults({
  results,
  opinionResults = [],
  categories,
  onCategoryClick,
  onDocumentClick,
}: HeroSearchResultsProps) {
  const { t, isRTL, getLocalizedString } = useTranslation();
  const navigate = useNavigate();
  const [filterQuery, setFilterQuery] = useState("");

  const filteredResults = useMemo(() => {
    if (!filterQuery.trim()) return results;
    const query = filterQuery.toLowerCase();

    return results.filter((category) => {
      const catMatches = getLocalizedString(category.categoryNameEn, category.categoryNameAr).toLowerCase().includes(query);
      const subCatMatches = category.subCategories?.some(sc =>
        getLocalizedString(sc.subCategoryNameEn, sc.subCategoryNameAr).toLowerCase().includes(query) ||
        sc.documents?.some(doc => getLocalizedString(doc.documentNameEn, doc.documentNameAr).toLowerCase().includes(query))
      );
      return catMatches || subCatMatches;
    });
  }, [results, filterQuery, getLocalizedString]);

  const filteredOpinionResults = useMemo(() => {
    if (!filterQuery.trim()) return opinionResults;
    const query = filterQuery.toLowerCase();

    return opinionResults.filter((opinion) => {
      const titleMatches = opinion.title.toLowerCase().includes(query);
      const deptMatches = getLocalizedString(opinion.departmentEn, opinion.departmentAr).toLowerCase().includes(query);
      const replierMatches = opinion.reply?.replier && getLocalizedString(opinion.reply.replier.nameEn, opinion.reply.replier.nameAr).toLowerCase().includes(query);
      return titleMatches || deptMatches || replierMatches;
    });
  }, [opinionResults, filterQuery, getLocalizedString]);

  const handleOpinionClick = (id: number) => {
    navigate(`/opinions/${id}`);
  };

  return (
    <div className="absolute left-0 right-0 px-20 top-[193px] z-[60]">
      <motion.div
        initial={{ opacity: 0, y: -5 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl border border-[#E1E4E9] overflow-hidden shadow-[0_8px_24px_rgba(0,0,0,0.12)] max-h-[500px] overflow-y-auto custom-scrollbar"
      >
        <div className="border-b border-[#F1F3F5] bg-[#FAFBFC] sticky top-0 z-10 flex flex-col">
          <div className="px-4 py-3 flex items-center justify-between">
            <p
              className="text-[11px]! font-bold text-gray-400 uppercase tracking-wider"
            >
              {t('legislation.hero.documents')}
            </p>
          </div>

          <div className="px-4 pb-3">
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className={`h-4 w-4 transition-colors ${filterQuery ? 'text-[#908e81]' : 'text-gray-400'}`} />
              </div>
              <input
                type="text"
                value={filterQuery}
                onChange={(e) => setFilterQuery(e.target.value)}
                placeholder={t('legislation.hero.searchAllLegislations')}
                className="block w-full pl-10 pr-10 py-2 border border-gray-200 rounded-lg text-[13px] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#908e81]/20 focus:border-[#908e81] transition-all bg-white"
              />
              {filterQuery && (
                <button
                  onClick={() => setFilterQuery("")}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center hover:text-gray-600 text-gray-400 transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="divide-y divide-[#F1F3F5]">
          {filteredResults.map((result) => {
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
                      className="group/doc w-full text-start flex items-center justify-between gap-4 px-6 py-2.5 hover:bg-[#F9F6F0] transition-colors"
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <FileText className="w-3.5 h-3.5 flex-shrink-0 text-[#C4BFB0] group-hover/doc:text-[#908e81] transition-colors" />
                        <span className="text-[13px] text-[#1A1A1A] font-medium truncate group-hover/doc:text-[#908e81] transition-colors">
                          {getLocalizedString(doc.documentNameEn, doc.documentNameAr)}
                        </span>
                      </div>

                      {getLocalizedString(doc.subCategoryNameEn, doc.subCategoryNameAr) && (
                        <div className="flex items-center gap-1.5 flex-shrink-0">
                          <span className="text-[12px] text-[#9CA3AF] truncate max-w-[140px]">
                            {getLocalizedString(doc.subCategoryNameEn, doc.subCategoryNameAr)}
                          </span>
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
          {filteredOpinionResults.length > 0 && (
            <>
              <div className="bg-gray-50/30 px-4 py-1 border-t border-[#F1F3F5]">
                <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                  {t('legislation.hero.approvedOpinions_plural', { count: filteredOpinionResults.length })}
                </span>
              </div>
              {filteredOpinionResults.map((opinion) => (
                <button
                  key={opinion.id}
                  onClick={() => handleOpinionClick(opinion.id)}
                  className="w-full px-5 py-4 transition-all text-start flex items-center justify-between hover:bg-[#FDFCFB] group/opt relative"
                >
                  <div className={`absolute top-0 bottom-0 w-1 bg-green-500 opacity-0 group-hover/opt:opacity-100 transition-opacity ${isRTL ? 'right-0' : 'left-0'}`} />

                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 bg-green-50 group-hover/opt:bg-white transition-colors border border-transparent group-hover/opt:border-green-200">
                      <MessageSquare className="w-5 h-5 text-green-600" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="text-[14px] font-semibold text-[#1A1A1A] mb-[2px] group-hover/opt:text-green-700 transition-colors truncate">
                        {opinion.title}
                      </div>
                      <div className="flex items-center gap-2 text-[12px] text-[#72777A]">
                        <span className="font-medium text-faa-primary/70">{getLocalizedString(opinion.departmentEn, opinion.departmentAr)}</span>
                        <span>•</span>
                        <span>{new Date(opinion.createdOnUtc).toLocaleDateString()}</span>
                        {opinion.reply?.replier && (
                          <>
                            <span>•</span>
                            <div className="flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3 text-green-600" />
                              <span className="text-green-600 font-semibold">{getLocalizedString(opinion.reply.replier.nameEn, opinion.reply.replier.nameAr)}</span>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  <div
                    className="flex-shrink-0 text-[#9CA3AF] group-hover/opt:text-green-600 transition-all"
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
              ))}
            </>
          )}

          {filteredResults.length === 0 && filteredOpinionResults.length === 0 && (
            <div className="py-20 flex flex-col items-center justify-center text-center px-4">
              <div className="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center mb-4">
                <Search className="w-8 h-8 text-gray-300" />
              </div>
              <p className="text-gray-900 font-semibold text-[15px] mb-1">{t('common.noResultsFound')}</p>
              <p className="text-gray-500 text-[13px]">{t('legislation.hero.filterNoResults')}</p>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
