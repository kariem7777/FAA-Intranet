import { lazy, Suspense, type ReactNode } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Loading, ErrorPage } from '@/shared';
import { LegislationLayout } from './features/Legislation/layout/LegislationLayout';
import { ProtectedRoute } from '@/features/authentication/routes/ProtectedRoute';
import { ROLES } from '@/features/authentication/constants/roles';

const LegislationHome = lazy(() => import('@/features/Legislation/pages/LegislationHome'));
const LegislationDashboardPage = lazy(() => import('@/features/Dashboard/pages/LegislationDashboardPage'));
const DocumentsManagementPage = lazy(() =>
    import('@/features/Documents/pages/DocumentsManagementPage').then((module) => ({
        default: module.DocumentsManagementPage,
    })),
);
const ApprovedLegalOpinionsPage = lazy(() => import('@/features/LegalOpinions/pages/ApprovedLegalOpinionsPage'));
const LegalOpinionsPage = lazy(() =>
    import('@/features/LegalOpinions/pages/LegalOpinions').then((module) => ({
        default: module.LegalOpinions,
    })),
);
const ApprovedOpinionDetailPage = lazy(() => import('@/features/LegalOpinions/pages/OpinionDetailPage'));
const AddUserPage = lazy(() =>
    import('@/features/authentication/pages/AddUserPage').then((module) => ({
        default: module.AddUserPage,
    })),
);
const NotificationsPage = lazy(() => import('@/features/Notifications/pages/NotificationsPage'));

const withSuspense = (element: ReactNode) => <Suspense fallback={<Loading />}>{element}</Suspense>;

const router = createBrowserRouter([
    {
        path: '/',
        element: withSuspense(<LegislationLayout />),
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: withSuspense(<LegislationHome />),
            },
            {
                path: 'opinions',
                element: withSuspense(<LegalOpinionsPage />),
            },
            {
                path: 'opinions/:id',
                element: withSuspense(<ApprovedOpinionDetailPage />),
            },
            {
                path: 'approved-opinions',
                element: withSuspense(<ApprovedLegalOpinionsPage />),
            },
            {
                path: 'notifications',
                element: withSuspense(<NotificationsPage />),
            },
            {
                element: <ProtectedRoute allowedRoles={[ROLES.Legal_Super_Admin]} />,
                children: [
                    {
                        path: 'add-user',
                        element: withSuspense(<AddUserPage />),
                    },
                ]
            },
            {
                element: <ProtectedRoute allowedRoles={[ROLES.Legal_Admin, ROLES.Legal_Super_Admin]} />,
                children: [
                    {
                        path: 'documents',
                        element: withSuspense(<DocumentsManagementPage />),
                    },
                    {
                        path: 'dashboard',
                        element: withSuspense(<LegislationDashboardPage />),
                    }
                ],
            },
        ]
    },
]);

const AppRouter = () => <RouterProvider router={router} />;

export default AppRouter;
