import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Schedulox",
  description: "Planing your Coding projects",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <>
          <div className="min-h-screen -z-10 fixed bg-gradient-to-br from-blue-100 to-purple-200">
            <div className="w-[55%] overflow-hidden aspect-square fixed rounded-full bg-[#4361EE]/50 blur-[87.6px] -top-[35%] -left-[10%]" />
            <div className="w-[55%] overflow-hidden aspect-square fixed rounded-full bg-[#4361EE]/50 blur-[87.6px] -bottom-[35%]  -right-[12%]" />
          </div>
        </>
        {children}
      </body>
    </html>
  );
}
