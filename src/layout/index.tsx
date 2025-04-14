import React from "react";
import { Outlet } from "react-router-dom";

const Homepage: React.FC = () => {
    return (
        <div className="w-full h-full">
            <Outlet />
        </div>
    );
};

export default Homepage;
