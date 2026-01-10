import { lazy, Suspense, useEffect } from "react";
import { useSelector } from "react-redux";
import { type RootState } from "@/store";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Loading, ErrorPage } from "@/shared";
import { LegislationLayout } from "./features/Legislation/layout/LegislationLayout";

const LegislationHome = lazy(() => import("@/features/Legislation/pages/LegislationHome"));


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
