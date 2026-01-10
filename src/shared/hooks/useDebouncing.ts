import { useRef } from "react";

function useDebounce() {
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const debounce = (callback: () => void, delay: number) => {
        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }
        timerRef.current = setTimeout(callback, delay);
    };

    return debounce;
}

export default useDebounce;
