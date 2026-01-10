interface ShimmerProps {
    width?: string | number;
    height?: string | number;
    className?: string;
    rounded?: string;
}

export function Shimmer({
    width = "100%",
    height = "20px",
    className = "",
    rounded = "rounded-md",
}: ShimmerProps) {
    return (
        <div
            className={`bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-shimmer ${rounded} ${className}`}
            style={{
                width,
                height,
            }}
        />
    );
}
