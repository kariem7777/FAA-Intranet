import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { LegislationHeader } from "../components/layout/LegislationHeader";
import { useRef, useLayoutEffect, useState } from "react";
import { LegislationLookupsProvider } from "../providers";

type NavigationPage = 'home' | 'legislations' | 'dashboard' | 'documents' | 'search' | 'approved-opinions';

export const LegislationLayout = () => {
    const headerRef = useRef<HTMLElement>(null);
    const [headerHeight, setHeaderHeight] = useState(0);
    const [userRole, setUserRole] = useState<'admin' | 'user'>('admin');
    const navigate = useNavigate();
    const location = useLocation();

    // Derive current page from route
    const getCurrentPage = (): NavigationPage => {
        const path = location.pathname;
        if (path === '/dashboard') return 'dashboard';
        if (path === '/legislations') return 'legislations';
        if (path === '/documents') return 'documents';
        if (path === '/search') return 'search';
        if (path === '/approved-opinions') return 'approved-opinions';
        return 'home';
    };

    const handleNavigate = (page: NavigationPage) => {
        switch (page) {
            case 'home':
                navigate('/');
                break;
            case 'dashboard':
                navigate('/dashboard');
                break;
            case 'legislations':
                navigate('/legislations');
                break;
            case 'documents':
                navigate('/documents');
                break;
            case 'search':
                navigate('/search');
                break;
            case 'approved-opinions':
                navigate('/approved-opinions');
                break;
            default:
                navigate('/');
        }
    };

    const handleRoleChange = (role: 'admin' | 'user') => {
        setUserRole(role);
    };

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
                currentPage={getCurrentPage()}
                onNavigate={handleNavigate}
                userRole={userRole}
                onRoleChange={handleRoleChange}
            />
            <LegislationLookupsProvider>
                <Outlet />
            </LegislationLookupsProvider>
        </div>
    );
};
