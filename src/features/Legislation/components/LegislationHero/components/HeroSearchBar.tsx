import { Search, X } from "lucide-react";
import { useTranslation } from "@/shared/hooks/useTranslation";
import useDebounce from "@/shared/hooks/useDebouncing";

interface HeroSearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onClear: () => void;
}

export function HeroSearchBar({ value, onChange, onClear }: HeroSearchBarProps) {
  const { t, isRTL } = useTranslation();
  const debounce = useDebounce();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    debounce(() => onChange(newValue), 300);
  };

  return (
    <div className="w-full">
      <div className="relative">
        <Search className="absolute top-1/2 -translate-y-1/2 right-4 left-4 text-gray-400 pointer-events-none w-[22px] h-[22px]" />

        <input
          type="text"
          defaultValue={value}
          onChange={handleChange}
          placeholder={t('legislation.hero.searchAllLegislations')}
          className="w-full h-[52px] rounded-lg border-2 transition-all outline-none bg-white text-[#1A1A1A] text-base pl-15 pr-15"
        />

        {value && (
          <button
            onClick={onClear}
            className="absolute top-1/2 -translate-y-1/2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
            style={{ [isRTL ? "left" : "right"]: "12px" }}
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        )}
      </div>
    </div>
  );
}
