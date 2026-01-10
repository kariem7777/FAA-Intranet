import {
  Scale,
  Search,
  ChevronDown,
  X,
  FileText,
  AlertCircle,
} from "lucide-react";
import { motion } from "framer-motion";
import PatternDraw from "./PatternDraw";
import { useTranslation } from "@/shared/hooks/useTranslation";
import useDebounce from "@/shared/hooks/useDebouncing";
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '@/store';
import {
  setGlobalSearchQuery,
  setSelectedEntity,
  setIsEntityDropdownOpen,
  setEntitySearchQuery,
  setShowSearchTooltip,
  clearSearch,
} from '../../slices/heroSlice';
import { t } from "i18next";

interface LegislationBannerProps {
  handleCategorySearch: (categoryId: number) => void;
  legislationCategories: Array<{
    id: number;
    titleKey: string;
    iconBgColor: string;
    customImage?: string;
  }>;
}

export function LegislationHero({
  handleCategorySearch,
  legislationCategories,
}: LegislationBannerProps) {
  const { isRTL } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const debounce = useDebounce();

  // Get all state from Redux
  const {
    globalSearchQuery,
    selectedEntity,
    isEntityDropdownOpen,
    entitySearchQuery,
    showSearchTooltip,
    searchResults,
    totalResults,
    entities,
  } = useSelector((state: RootState) => state.hero);


  // Content based on mode
  const content = {
    title: isRTL
      ? "منصة الجهاز التشريعية"
      : "FAA Legislative Platform",
    description: isRTL
      ? "مجموعة معتمدة من القوانين واللوائح والوثائق الرسمية، منظمة ومحدثة لضمان الشفافية والدقة."
      : "An official collection of laws, regulations, and legal documents, organized and regularly updated to ensure accuracy and transparency.",
  };


  return (
    <div
      dir={isRTL ? "rtl" : "ltr"}
      className="relative w-full"
      style={{
        background:
          "linear-gradient(135deg, #2F4F6F 0%, #1a3a52 100%)",
        overflow: "visible",
      }}
    >
      {/* Decorative Pattern Overlay – Draw Animation */}
      <motion.div
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: 0.8, scale: 1 }}
        transition={{ duration: 1.8, ease: "easeOut" }}
        className="absolute inset-0 pointer-events-none overflow-hidden"
      >
        <div
          className={`absolute top-0 h-full w-[70%] ${isRTL ? "-left-70" : "-right-70"
            }`}
          style={{
            maskImage: isRTL
              ? "linear-gradient(to right, rgba(0,0,0,0.5), transparent)"
              : "linear-gradient(to left, rgba(0,0,0,0.5), transparent)",
            WebkitMaskImage: isRTL
              ? "linear-gradient(to right, rgba(0,0,0,0.5), transparent)"
              : "linear-gradient(to left, rgba(0,0,0,0.5), transparent)",
          }}
        >
          <PatternDraw />
        </div>
      </motion.div>

      <div className="px-12 py-8 relative z-10">
        {/* Header Section */}
        <div className="mb-6">
          <div className="flex items-center gap-4 mb-2">
            <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-white/10 backdrop-blur-sm">
              <Scale
                className="w-6 h-6 text-[#C9A24D]"
                strokeWidth={1.8}
              />
            </div>
            <h1
              className="text-[32px] font-bold text-white"
              style={{
                fontFamily: isRTL
                  ? "Dubai, Arial, sans-serif"
                  : "Inter, system-ui, sans-serif",
              }}
            >
              {content.title}
            </h1>
          </div>

          <p
            className="text-[15px] text-white/80 max-w-[1400px]"
            style={{
              fontFamily: isRTL
                ? "Dubai, Arial, sans-serif"
                : "Inter, system-ui, sans-serif",
              lineHeight: "1.6",
              paddingLeft: isRTL ? "0" : "64px",
              paddingRight: isRTL ? "64px" : "0",
            }}
          >
            {content.description}
          </p>
        </div>

        <div className="grid grid-cols-12 gap-4 items-center">
          <div className="col-span-12 md:col-span-4!">
            <div
              className="relative"
              style={{ zIndex: 9999 }}
            >
              <div
                className="absolute top-1/2 -translate-y-1/2 pointer-events-none"
                style={{
                  [isRTL ? "right" : "left"]: "16px",
                }}
              >
                <Scale
                  className="w-5 h-5"
                  style={{ color: "#6B7280" }}
                />
              </div>
              <button
                onClick={() =>
                  dispatch(setIsEntityDropdownOpen(
                    !isEntityDropdownOpen,
                  ))
                }
                className="w-full h-[52px] rounded-lg border-2 transition-all flex items-center justify-between"
                style={{
                  paddingLeft: isRTL ? "16px" : "48px",
                  paddingRight: isRTL ? "48px" : "16px",
                  backgroundColor: "#FFFFFF",
                  borderColor: selectedEntity
                    ? "#2F4F6F"
                    : "#D1D5DB",
                  fontFamily: isRTL
                    ? "Dubai, Arial, sans-serif"
                    : "Inter, system-ui, sans-serif",
                  fontSize: "15px",
                  color: selectedEntity
                    ? "#1A1A1A"
                    : "#9CA3AF",
                  textAlign: isRTL ? "right" : "left",
                  direction: isRTL ? "rtl" : "ltr",
                }}
              >
                <span>
                  {selectedEntity
                    ? entities.items.find(
                      (e) => e.id === selectedEntity,
                    )?.[isRTL ? "nameAr" : "nameEn"]
                    : isRTL
                      ? "اختر الجهة"
                      : "Select Entity"}
                </span>
                <ChevronDown
                  className="w-5 h-5 flex-shrink-0"
                  style={{ color: "#6B7280" }}
                />
              </button>

              {/* Dropdown Menu */}
              {isEntityDropdownOpen && (
                <>
                  {/* Backdrop to close dropdown */}
                  <div
                    className="fixed inset-0"
                    style={{ zIndex: 9998 }}
                    onClick={() =>
                      dispatch(setIsEntityDropdownOpen(false))
                    }
                  />
                  <div
                    className="absolute top-full mt-2 w-full rounded-lg border shadow-lg overflow-hidden"
                    style={{
                      backgroundColor: "#FFFFFF",
                      borderColor: "#E5E7EB",
                      maxHeight: "320px",
                      direction: isRTL ? "rtl" : "ltr",
                      zIndex: 99999,
                    }}
                  >
                    {/* Search inside dropdown */}
                    <div
                      className="p-3 border-b"
                      style={{ borderColor: "#E5E7EB" }}
                    >
                      <div className="relative">
                        <Search
                          className="absolute top-1/2 -translate-y-1/2 text-gray-400"
                          style={{
                            [isRTL ? "right" : "left"]:
                              "12px",
                            width: "16px",
                            height: "16px",
                          }}
                        />
                        <input
                          type="text"
                          value={entitySearchQuery}
                          onChange={(e) => {
                            const value = e.target.value;
                            debounce(() => {
                              dispatch(setEntitySearchQuery(value));
                            }, 300);
                          }}
                          placeholder={
                            isRTL
                              ? "ابحث عن جهة..."
                              : "Search entity..."
                          }
                          className="w-full h-[40px] rounded border outline-none"
                          style={{
                            paddingLeft: isRTL
                              ? "12px"
                              : "36px",
                            paddingRight: isRTL
                              ? "36px"
                              : "12px",
                            backgroundColor: "#F7F8FA",
                            borderColor: "#E5E7EB",
                            fontFamily: isRTL
                              ? "Dubai, Arial, sans-serif"
                              : "Inter, system-ui, sans-serif",
                            fontSize: "14px",
                            textAlign: isRTL
                              ? "right"
                              : "left",
                            direction: isRTL
                              ? "rtl"
                              : "ltr",
                          }}
                        />
                      </div>
                    </div>

                    {/* Clear selection */}
                    {selectedEntity && (
                      <button
                        onClick={() => {
                          dispatch(setSelectedEntity(""));
                          dispatch(setIsEntityDropdownOpen(false));
                          dispatch(setEntitySearchQuery(""));
                          dispatch(setGlobalSearchQuery(""));
                        }}
                        className="w-full px-4 py-3 hover:bg-gray-50 transition-colors border-b flex items-center gap-2"
                        style={{
                          fontFamily: isRTL
                            ? "Dubai, Arial, sans-serif"
                            : "Inter, system-ui, sans-serif",
                          fontSize: "15px",
                          color: "#C9A24D",
                          borderColor: "#E5E7EB",
                          justifyContent: isRTL
                            ? "flex-end"
                            : "flex-start",
                        }}
                      >
                        <X className="w-4 h-4" />
                        {isRTL
                          ? "مسح التحديد"
                          : "Clear Selection"}
                      </button>
                    )}

                    {/* Entity List */}
                    <div
                      className="overflow-y-auto"
                      style={{ maxHeight: "240px" }}
                    >
                      {entities.items
                        .filter((entity) => {
                          const searchLower =
                            entitySearchQuery.toLowerCase();
                          return (
                            entity.nameAr.includes(
                              entitySearchQuery,
                            ) ||
                            entity.nameEn
                              .toLowerCase()
                              .includes(searchLower)
                          );
                        })
                        .map((entity) => (
                          <button
                            key={entity.id}
                            onClick={() => {
                              dispatch(setSelectedEntity(entity.id));
                              dispatch(setIsEntityDropdownOpen(false));
                              dispatch(setEntitySearchQuery(""));
                            }}
                            className="w-full px-4 py-3 hover:bg-gray-50 transition-colors"
                            style={{
                              fontFamily: isRTL
                                ? "Dubai, Arial, sans-serif"
                                : "Inter, system-ui, sans-serif",
                              fontSize: "15px",
                              color: "#1A1A1A",
                              backgroundColor:
                                selectedEntity === entity.id
                                  ? "#F7F8FA"
                                  : "transparent",
                              textAlign: isRTL
                                ? "right"
                                : "left",
                            }}
                          >
                            {isRTL
                              ? entity.nameAr
                              : entity.nameEn}
                          </button>
                        ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="col-span-12 md:col-span-8!">
            <div
              className="relative"
              onMouseEnter={() =>
                !selectedEntity &&
                dispatch(setShowSearchTooltip(true))
              }
              onMouseLeave={() =>
                dispatch(setShowSearchTooltip(false))
              }
            >
              <Search
                className="absolute top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                style={{
                  [isRTL ? "right" : "left"]: "20px",
                  width: "22px",
                  height: "22px",
                  opacity: selectedEntity ? 1 : 0.4,
                }}
              />
              <input
                type="text"
                value={globalSearchQuery}
                onChange={(e) => {
                  const value = e.target.value;
                  debounce(() => {
                    dispatch(setGlobalSearchQuery(value));
                  }, 300);
                }}
                disabled={!selectedEntity}
                placeholder={
                  isRTL
                    ? "ابحث في جميع التشريعات..."
                    : "Search across all legislations..."
                }
                className="w-full h-[52px] rounded-lg border-2 transition-all outline-none"
                style={{
                  paddingLeft: isRTL ? "20px" : "56px",
                  paddingRight: isRTL ? "56px" : "20px",
                  backgroundColor: selectedEntity
                    ? "#FFFFFF"
                    : "#F9FAFB",
                  borderColor: globalSearchQuery
                    ? "#2F4F6F"
                    : "#E5E7EB",
                  fontFamily: isRTL
                    ? "Dubai, Arial, sans-serif"
                    : "Inter, system-ui, sans-serif",
                  fontSize: "15px",
                  color: selectedEntity
                    ? "#1A1A1A"
                    : "#9CA3AF",
                  textAlign: isRTL ? "right" : "left",
                  direction: isRTL ? "rtl" : "ltr",
                  cursor: selectedEntity
                    ? "text"
                    : "not-allowed",
                  opacity: selectedEntity ? 1 : 0.6,
                }}
              />
              {globalSearchQuery && selectedEntity && (
                <button
                  onClick={() => dispatch(clearSearch())}
                  className="absolute top-1/2 -translate-y-1/2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                  style={{
                    [isRTL ? "left" : "right"]: "12px",
                  }}
                >
                  <X className="w-5 h-5 text-gray-400" />
                </button>
              )}

              {/* Tooltip - Show on hover when no entity selected */}
              {showSearchTooltip && !selectedEntity && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 5 }}
                  transition={{ duration: 0.2 }}
                  className="absolute bottom-full mb-2 px-3 py-2 rounded-lg shadow-lg whitespace-nowrap"
                  style={{
                    backgroundColor: "#1F2937",
                    [isRTL ? "right" : "left"]: "50%",
                    transform:
                      "translateX(" +
                      (isRTL ? "50%" : "-50%") +
                      ")",
                    zIndex: 50,
                  }}
                >
                  <div className="flex items-center gap-2">
                    <AlertCircle
                      className="w-4 h-4 flex-shrink-0"
                      style={{ color: "#FCD34D" }}
                    />
                    <p
                      style={{
                        fontFamily: isRTL
                          ? "Dubai, Arial, sans-serif"
                          : "Inter, system-ui, sans-serif",
                        fontSize: "13px",
                        color: "#FFFFFF",
                      }}
                    >
                      {isRTL
                        ? "الرجاء اختيار جهة أولاً"
                        : "Please select an entity first"}
                    </p>
                  </div>
                  {/* Arrow */}
                  <div
                    className="absolute top-full"
                    style={{
                      [isRTL ? "right" : "left"]: "50%",
                      transform:
                        "translateX(" +
                        (isRTL ? "50%" : "-50%") +
                        ")",
                      width: 0,
                      height: 0,
                      borderLeft: "6px solid transparent",
                      borderRight: "6px solid transparent",
                      borderTop: "6px solid #1F2937",
                    }}
                  />
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom accent line */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#C9A24D]"
        style={{ zIndex: 1 }}
      />

      {/* Search Results - Absolute Overlay positioned outside banner */}
      {
        globalSearchQuery &&
        searchResults.length > 0 &&
        selectedEntity && (
          <div
            className="absolute left-0 right-0 px-20"
            style={{
              top: 230,
              zIndex: 60,
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl border overflow-hidden"
              style={{
                borderColor: "#E1E4E9",
                boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
              }}
            >
              <div
                className="px-4 py-3 border-b"
                style={{
                  borderColor: "#F1F3F5",
                  backgroundColor: "#FAFBFC",
                }}
              >
                <p
                  style={{
                    fontFamily: isRTL
                      ? "Dubai, Arial, sans-serif"
                      : "Inter, system-ui, sans-serif",
                    fontSize: "13px",
                    color: "#72777A",
                    fontWeight: 400,
                  }}
                >
                  {isRTL
                    ? `تم العثور على ${totalResults} نتيجة عبر ${searchResults.length} فئات`
                    : `Found ${totalResults} results across ${searchResults.length} categories`}
                </p>
              </div>
              <div
                className="divide-y"
                style={{ borderColor: "#F1F3F5" }}
              >
                {searchResults.map((result) => {
                  const category = legislationCategories.find(
                    (c) => c.id === result.categoryId,
                  );
                  if (!category) return null;

                  return (
                    <button
                      key={result.categoryId}
                      onClick={() =>
                        handleCategorySearch(result.categoryId)
                      }
                      className="w-full px-5 py-4 hover:bg-gray-50 transition-colors flex items-center justify-between group"
                      style={{
                        textAlign: isRTL ? "right" : "left",
                      }}
                    >
                      <div className="flex items-center gap-4">
                        {/* Category Icon/Image */}
                        <div
                          className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                          style={{
                            backgroundColor: "#F7F8FA",
                          }}
                        >
                          {category.customImage ? (
                            <img
                              src={category.customImage}
                              alt={category.titleKey}
                              className="w-6 h-6 object-contain"
                            />
                          ) : (
                            <FileText
                              className="w-5 h-5"
                              style={{
                                color: category.iconBgColor,
                              }}
                              strokeWidth={2}
                            />
                          )}
                        </div>
                        <div>
                          <div
                            style={{
                              fontFamily: isRTL
                                ? "Dubai, Arial, sans-serif"
                                : "Inter, system-ui, sans-serif",
                              fontSize: "14px",
                              fontWeight: 500,
                              color: "#1A1A1A",
                              marginBottom: "2px",
                            }}
                          >
                            {t(category.titleKey)}
                          </div>
                          <div
                            style={{
                              fontFamily: isRTL
                                ? "Dubai, Arial, sans-serif"
                                : "Inter, system-ui, sans-serif",
                              fontSize: "13px",
                              color: "#72777A",
                              fontWeight: 400,
                            }}
                          >
                            {isRTL
                              ? `${result.count} وثيقة`
                              : `${result.count} document${result.count !== 1 ? "s" : ""}`}
                          </div>
                        </div>
                      </div>
                      <div
                        className="flex-shrink-0"
                        style={{
                          transform: isRTL
                            ? "rotate(180deg)"
                            : "none",
                          color: "#9CA3AF",
                        }}
                      >
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
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
        )
      }
    </div >
  );
}