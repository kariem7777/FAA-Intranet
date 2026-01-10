import { Outlet } from "react-router-dom";
import { LegislationHeader } from "../components/layout/LegislationHeader";

export const LegislationLayout = () => {
    return (
        <div>
            <LegislationHeader currentPage="legislations" onNavigate={() => { }} increaseFontSize={() => { }} decreaseFontSize={() => { }} fontSizeMultiplier={1} userRole="admin" onRoleChange={() => { }} />
            <Outlet />
        </div>
    );
};
