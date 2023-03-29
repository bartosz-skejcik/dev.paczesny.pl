"use client";

import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { GoogleAnalytics } from "nextjs-google-analytics";

export interface AuthContextProps {
    children: React.ReactNode;
    session: Session;
}

export default function AuthContext({ children }: AuthContextProps) {
    return (
        <SessionProvider>
            <GoogleAnalytics trackPageViews />
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                pauseOnHover
                theme="dark"
            />
            {children}
        </SessionProvider>
    );
}
