import { Scale, Plus, ArrowLeft, Gavel } from "lucide-react";
import { useTranslation } from "@/shared/hooks/useTranslation";

interface HeroHeaderProps {
    mode: "legislation" | "documents" | "approved-opinions";
    title: string;
    description: string;
    onAddDocument?: () => void;
    onBack?: () => void;
    isAddingDocument?: boolean;
}

export function HeroHeader({
    mode,
    title,
    description,
    onAddDocument,
    onBack,
    isAddingDocument = false,
}: HeroHeaderProps) {
    const { t, isRTL } = useTranslation();
    const fontFamily = isRTL ? "Dubai, Arial, sans-serif" : "Inter, system-ui, sans-serif";

    const showBackButton = mode === 'approved-opinions' && onBack;
    const showAddButton = mode === "documents" && onAddDocument;
    const Icon = mode === 'approved-opinions' ? Gavel : Scale;

    return (
        <div className="mb-6">
            <div className="flex items-center gap-4 mb-2 justify-between">
                <div className="flex items-center gap-4">
                    {showBackButton && (
                        <>
                            <button
                                onClick={onBack}
                                className="flex items-center gap-2 text-white/80 hover:text-white hover:bg-white/10 h-10 px-3 rounded-lg transition-all"
                                style={{ fontFamily, fontSize: "15px", fontWeight: 500 }}
                            >
                                <ArrowLeft className={`h-5 w-5 ${isRTL ? 'rotate-180' : ''}`} />
                                {t('legalOpinions.back')}
                            </button>
                            <div className="h-8 w-px bg-white/20" />
                        </>
                    )}

                    <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-white/10 backdrop-blur-sm">
                        <Icon
                            className="w-6 h-6 text-[var(--color-legislation-active-indicator)]"
                            strokeWidth={1.8}
                        />
                    </div>

                    <h1
                        className="text-[32px] font-bold text-white"
                        style={{ fontFamily }}
                    >
                        {title}
                    </h1>
                </div>

                {showAddButton && (
                    <button
                        onClick={onAddDocument}
                        disabled={isAddingDocument}
                        className="flex items-center gap-2 px-6 py-3 rounded-lg transition-all hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
                        style={{
                            backgroundColor: isAddingDocument ? "#9CA3AF" : "var(--color-legislation-active-indicator)",
                            color: "#FFFFFF",
                            fontFamily,
                            fontSize: "15px",
                            fontWeight: 500,
                        }}
                    >
                        <Plus className="w-5 h-5" />
                        <span>{t('legislation.hero.addNewDocument')}</span>
                    </button>
                )}
            </div>

            <p className="text-md text-white/80 max-w-[1400px] leading-[1.6] line-clamp-2 wrap-break-word">
                {description}
            </p>
        </div>
    );
}
