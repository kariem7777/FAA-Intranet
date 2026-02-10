import imgLegislationBanner from "@/assets/banner-background.png";

export function HeroBackground() {
    return (
        <>
            <div className="absolute inset-0">
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: `url(${imgLegislationBanner})` }}
                />
                <div className="absolute inset-0 bg-black/27" />
            </div>
            <div className="absolute inset-0 overflow-visible hero-gradient" />
            <div className="absolute bottom-0 left-0 right-0 h-[2px] z-[1] bg-[var(--color-legislation-active-indicator)]" />
        </>
    );
}
