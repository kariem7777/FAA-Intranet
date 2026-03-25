import { lazy, Suspense } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Loading, ErrorPage } from "@/shared";
import { LegislationLayout } from "./features/Legislation/layout/LegislationLayout";
import { ProtectedRoute } from "@/features/authentication/routes/ProtectedRoute";
import { ROLES } from "@/features/authentication/constants/roles";

const LegislationHome = lazy(() => import("@/features/Legislation/pages/LegislationHome"));
const LegislationDashboardPage = lazy(() => import("@/features/Dashboard/pages/LegislationDashboardPage"));
const DocumentsManagementPage = lazy(() => import("@/features/Documents/pages/DocumentsManagementPage").then(module => ({ default: module.DocumentsManagementPage })));
const ApprovedLegalOpinionsPage = lazy(() => import("@/features/LegalOpinions/pages/ApprovedLegalOpinionsPage"));
const LegalOpinionsPage = lazy(() => import("@/features/LegalOpinions/pages/LegalOpinions").then(m => ({ default: m.LegalOpinions })));
const ApprovedOpinionDetailPage = lazy(() => import("@/features/LegalOpinions/pages/OpinionDetailPage"));
const AddUserPage = lazy(() => import("@/features/authentication/pages/AddUserPage").then(m => ({ default: m.AddUserPage })));
const NotificationsPage = lazy(() => import("@/features/Notifications/pages/NotificationsPage"));

const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <Suspense fallback={<Loading />}>
                <LegislationLayout />
            </Suspense>
        ),
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: (
                    <Suspense fallback={<Loading />}>
                        <LegislationHome />
                    </Suspense>
                ),
            },
            {
                path: "opinions",
                element: (
                    <Suspense fallback={<Loading />}>
                        <LegalOpinionsPage />
                    </Suspense>
                ),
            },
            {
                path: "opinions/:id",
                element: (
                    <Suspense fallback={<Loading />}>
                        <ApprovedOpinionDetailPage />
                    </Suspense>
                ),
            },
            {
                path: "approved-opinions",
                element: (
                    <Suspense fallback={<Loading />}>
                        <ApprovedLegalOpinionsPage />
                    </Suspense>
                ),
            },
            {
                path: "notifications",
                element: (
                    <Suspense fallback={<Loading />}>
                        <NotificationsPage />
                    </Suspense>
                ),
            },
            {
                element: <ProtectedRoute allowedRoles={[ROLES.Legal_Super_Admin]} />,
                children: [
                    {
                        path: "add-user",
                        element: (
                            <Suspense fallback={<Loading />}>
                                <AddUserPage />
                            </Suspense>
                        ),
                    },
                ]
            },
            {
                element: <ProtectedRoute allowedRoles={[ROLES.Legal_Admin, ROLES.Legal_Super_Admin]} />,
                children: [
                    {
                        path: "documents",
                        element: (
                            <Suspense fallback={<Loading />}>
                                <DocumentsManagementPage
                                    onAddDocument={() => { }}
                                    onEditDocument={() => { }}
                                />
                            </Suspense>
                        ),
                    },
                    {
                        path: "dashboard",
                        element: (
                            <Suspense fallback={<Loading />}>
                                <LegislationDashboardPage />
                            </Suspense>
                        ),
                    }
                ],
            },
        ]
    },
]);

const AppRouter = () => {
    return <RouterProvider router={router} />;
};

export default AppRouter;
