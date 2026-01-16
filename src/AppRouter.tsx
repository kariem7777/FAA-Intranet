import { lazy, Suspense, useEffect } from "react";
import { useSelector } from "react-redux";
import { type RootState } from "@/store";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Loading, ErrorPage } from "@/shared";
import { LegislationLayout } from "./features/Legislation/layout/LegislationLayout";

const LegislationHome = lazy(() => import("@/features/Legislation/pages/LegislationHome"));
const LegislationDashboardPage = lazy(() => import("@/features/Legislation/pages/LegislationDashboardPage"));
const DocumentsManagementPage = lazy(() => import("@/features/Legislation/pages/DocumentsManagementPage").then(module => ({ default: module.DocumentsManagementPage })));
const ApprovedLegalOpinionsPage = lazy(() => import("@/features/Legislation/pages/ApprovedLegalOpinionsPage"));
const ApprovedOpinionDetailPage = lazy(() => import("@/features/Legislation/pages/ApprovedOpinionDetailPage"));


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
                path: "approved-opinions/:id",
                element: (
                    <Suspense fallback={<Loading />}>
                        <ApprovedOpinionDetailPage />
                    </Suspense>
                ),
            },
        ]
    },
]);

const AppRouter = () => {
    const { fontSizeMultiplier } = useSelector((state: RootState) => state.global);

    useEffect(() => {
        document.documentElement.style.setProperty('--font-scale', fontSizeMultiplier.toString());
    }, [fontSizeMultiplier]);

    return <RouterProvider router={router} />;
};

export default AppRouter;

