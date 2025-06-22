import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import DoctorHeader from "@/components/DoctorHeader";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function DoctorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50 dark:bg-gray-900`}
      >
        <DoctorHeader />
        <main className="container mx-auto px-4 py-8 pt-24">
          {children}
        </main>
      </body>
    </html>
  );
} 