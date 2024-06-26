import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "./globals.css";

import Navbar from '@/app/components/navbar/index'

const inter = Inter({subsets: ["cyrillic"]});

export const metadata: Metadata = {
    title: "Graphic galaxy",
    description: "Generated by create next app",
};

export default function RootLayout({children,}:
                                       Readonly<{ children: React.ReactNode; }>) {
    return (
        <html lang="ru">
            <body className={inter.className}>
                <Navbar/>

                <div className={'main-content'}>
                    {children}
                </div>
            </body>
        </html>
    );
}
