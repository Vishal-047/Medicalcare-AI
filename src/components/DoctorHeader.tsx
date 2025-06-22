"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";

const DoctorHeader = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { href: "/doctor", label: "Dashboard" },
    { href: "/doctor/patients", label: "Patients" },
    { href: "/doctor/earnings", label: "Earnings" },
    { href: "/doctor/activity", label: "Activity" },
    { href: "/doctor/profile", label: "Profile" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/doctor" className="text-2xl font-bold text-gray-900">
          MediCare <span className="text-blue-600">AI</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-gray-600 hover:text-blue-600 transition-colors ${
                pathname === link.href ? "font-semibold text-blue-600" : ""
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Stats and Auth */}
        <div className="hidden lg:flex items-center space-x-4">
          <Button variant="outline">Sign Out</Button>
        </div>

        {/* Mobile Menu Trigger */}
        <div className="lg:hidden">
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full sm:w-[320px]">
              <div className="p-4">
                <nav className="flex flex-col space-y-4 mb-6">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`text-lg text-gray-700 hover:text-blue-600 ${
                        pathname === link.href ? "font-bold text-blue-600" : ""
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
                <div className="border-t pt-6 space-y-4">
                    <Button variant="outline" className="w-full mt-4">Sign Out</Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default DoctorHeader; 