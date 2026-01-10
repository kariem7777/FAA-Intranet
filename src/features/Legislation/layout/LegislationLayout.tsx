import { Outlet } from "react-router-dom";
import { LegislationHeader } from "../components/layout/LegislationHeader";

import { useRef, useLayoutEffect, useState } from "react";

export const LegislationLayout = () => {
    const headerRef = useRef<HTMLElement>(null);
    const [headerHeight, setHeaderHeight] = useState(0);

    useLayoutEffect(() => {
        if (!headerRef.current) return;

        const observer = new ResizeObserver((entries) => {
            for (const entry of entries) {
                setHeaderHeight(entry.borderBoxSize[0].blockSize);
            }
        });

        observer.observe(headerRef.current);

        // Initial measurement
        setHeaderHeight(headerRef.current.offsetHeight);

        return () => observer.disconnect();
    }, []);

    return (
        <div style={{ paddingTop: headerHeight }}>
            <LegislationHeader
                ref={headerRef}
                currentPage="legislations"
                onNavigate={() => { }}
                userRole="admin"
                onRoleChange={() => { }}
            />
            <Outlet />
        </div>
    );
};
