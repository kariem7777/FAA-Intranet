import { lazy, Suspense } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Loading, ErrorPage } from "@/shared";
import { LegislationLayout } from "./features/Legislation/layout/LegislationLayout";

const LegislationHome = lazy(() => import("@/features/Legislation/pages/LegislationHome"));
const LegislationDashboardPage = lazy(() => import("@/features/Dashboard/pages/LegislationDashboardPage"));
const DocumentsManagementPage = lazy(() => import("@/features/Documents/pages/DocumentsManagementPage").then(module => ({ default: module.DocumentsManagementPage })));
const ApprovedLegalOpinionsPage = lazy(() => import("@/features/LegalOpinions/pages/ApprovedLegalOpinionsPage"));
const ApprovedOpinionDetailPage = lazy(() => import("@/features/LegalOpinions/pages/OpinionDetailPage"));
const AddUserPage = lazy(() => import("@/features/authentication/pages/AddUserPage").then(m => ({ default: m.AddUserPage })));


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
                path: "opinions/:id",
                element: (
                    <Suspense fallback={<Loading />}>
                        <ApprovedOpinionDetailPage />
                    </Suspense>
                ),
            },
            {
                path: "add-user",
                element: (
                    <Suspense fallback={<Loading />}>
                        <AddUserPage />
                    </Suspense>
                ),
            }
            // {
            //     path: "legal-opinions",
            //     element: (
            //         <Suspense fallback={<Loading />}>
            //             <LegalOpinionsPage
            //                 onBack={() => { }}
            //             />
            //         </Suspense>
            //     ),

            // }
        ]
    },
]);

const AppRouter = () => {
    return <RouterProvider router={router} />;
};

export default AppRouter;

