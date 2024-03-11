import React from "react";
import Sidebar from "./Side";
import { Outlet } from "react-router-dom";

export default function Layout() {
    return (
        <div className="flex h-dvh overflow-hidden">
            <Sidebar />
            <div className="flex flex-col flex-1">
                <Outlet />
                <div className="p-4">
                </div>
            </div>
        </div>
    );
}
