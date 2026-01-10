import React, { useEffect, useRef, useState } from "react";
import image from '@/assets/logo.png';

type LazyImageProps = {
    src: string;
    alt?: string;
    className?: string;
    placeholder?: string;
    style?: React.CSSProperties;
    onClick?: () => void;
};

function LazyImage({ src, alt, className, placeholder, style, onClick }: LazyImageProps) {
    const ref = useRef<HTMLImageElement | null>(null);
    const [isVisible, setIsVisible] = useState(false);
    const [loaded, setLoaded] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        const node = ref.current;
        if (!node) return;

        if (typeof IntersectionObserver === "undefined") {
            setIsVisible(true);
            return;
        }

        const obs = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsVisible(true);
                        obs.disconnect();
                    }
                });
            },
            {
                root: null,
                rootMargin: '50px',
                threshold: 0.01
            }
        );

        obs.observe(node);

        return () => obs.disconnect();
    }, []);

    // Validate if src is a valid URL or path
    const isValidSrc = Boolean(
        src &&
        typeof src === 'string' &&
        src.trim() !== "" &&
        src !== placeholder &&
        src !== 'undefined' &&
        src !== 'null'
    );

    // Use imported image as default placeholder
    const defaultPlaceholder = placeholder || image;

    // Determine what to show - NEVER set src to invalid URL
    const shouldShowRealImage = isVisible && isValidSrc && !error;
    const actualSrc = shouldShowRealImage ? src : defaultPlaceholder;
    const objectFitClass = (loaded && !error && isValidSrc) ? "object-cover" : "object-contain";
    const opacityClass = (loaded && !error && isValidSrc) ? "opacity-100" : "opacity-50";

    return (
        <img
            ref={ref}
            src={actualSrc}
            alt={alt}
            className={`${className ?? ""} transition-opacity duration-300 ${objectFitClass} ${opacityClass}`}
            style={style}
            onLoad={() => {
                // Only set loaded to true if we're loading the actual image
                if (actualSrc === src && isValidSrc && shouldShowRealImage) {
                    setLoaded(true);
                    setError(false);
                }
            }}
            onError={() => {
                // Only set error if we were trying to load the real image
                if (actualSrc === src) {
                    setError(true);
                    setLoaded(false);
                }
            }}
            onClick={onClick}
            loading="lazy"
        />
    );
}

// Factory that matches the existing usage pattern: const AbeImage = LazyLoadImage(abeImage);
export default function LazyLoadImageFactory(src: string) {
    return function loadImage(props: Omit<LazyImageProps, "src">) {
        return <LazyImage src={src} {...props} />;
    };
}