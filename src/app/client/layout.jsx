'use client'

import UserPanel from "../components/siderbar";

export default function ClientLayout({ children }) {
    return (
        <div className="flex min-h-screen">
            <UserPanel />
            <div className="w-full md:ml-64 ml-0 pb-20 md:pb-0">
                {children}
            </div>
        </div>
    );
}