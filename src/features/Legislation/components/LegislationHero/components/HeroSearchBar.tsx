import { LoaderIcon, Search, X } from "lucide-react";
import { useTranslation } from "@/shared/hooks/useTranslation";
import type { RootState } from "@/store";
import { useSelector } from "react-redux";

interface HeroSearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onClear: () => void;
  onSearch: () => void;
}

export function HeroSearchBar({ value, onChange, onClear, onSearch }: HeroSearchBarProps) {
  const { t, isRTL } = useTranslation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSearch();
    }
  };

  const { globalLoading } = useSelector(
    (state: RootState) => state.legislationSlice
  );

  return (
    <div className="w-full">
      <div className="relative group  mx-auto">
        <div
          className="absolute top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none w-[22px] h-[22px] z-10"
          style={{ [isRTL ? "right" : "left"]: "16px" }}
        >
          {globalLoading ? (
            <LoaderIcon className="animate-spin" />
          ) : (
            <Search />
          )}
        </div>

        <input
          type="text"
          value={value}
          disabled={globalLoading}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder={t('legislation.hero.searchAllLegislations')}
          className={`w-full h-[60px] rounded-xl border-2 border-transparent transition-all outline-none bg-white/95 backdrop-blur-sm shadow-lg text-gray-900 text-lg focus:border-primary-500/30 focus:bg-white ${isRTL ? "pr-14 pl-36" : "pl-14 pr-36"
            }`}
        />

        <div
          className="absolute top-1/2 -translate-y-1/2 flex items-center gap-2 z-10"
          style={{ [isRTL ? "left" : "right"]: "8px" }}
        >
          {value && (
            <button
              type="button"
              onClick={onClear}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-400 hover:text-gray-600"
              title={t('common.clear')}
            >
              <X className="w-5 h-5" />
            </button>
          )}
          <button
            type="button"
            onClick={onSearch}
            disabled={globalLoading || !value.trim()}
            className="h-[44px] px-6 bg-faa-primary hover:bg-faa-primary/80 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg font-semibold transition-all shadow-md hover:shadow-lg active:scale-95 flex items-center whitespace-nowrap"
          >
            {t('common.search')}
          </button>
        </div>
      </div>
    </div>
  );
}
