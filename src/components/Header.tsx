"use client"
import { useState } from "react"
import { Button } from "./ui/button"
import { Activity } from "lucide-react"
import {useRouter} from "next/navigation";
import AuthModal from "./AuthModal";
import { ThemeToggle } from "./ThemeToggle";

const Header = () => {
  const navigate = useRouter();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalDefaultTab, setAuthModalDefaultTab] = useState("signin");

  const openAuthModal = (tab: "signin" | "signup") => {
    setAuthModalDefaultTab(tab);
    setIsAuthModalOpen(true);
  }

  return (
    <>
      <header className="bg-white dark:bg-slate-950 shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Activity className="w-8 h-8 text-blue-600 mr-3" />
              <span className="text-2xl font-bold text-gray-900 dark:text-gray-50">
                MediCare AI
              </span>
            </div>
            <nav className="hidden md:flex space-x-8">
              <button 
                onClick={() => navigate.push("/")}
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 transition-colors cursor-pointer"
              >
                Home
              </button>
              <button 
                onClick={() => navigate.push("/find-care")}
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 transition-colors cursor-pointer"
              >
                Find Care
              </button>
              <button 
                onClick={() => navigate.push("/doctor-directory")}
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 transition-colors cursor-pointer"
              >
                Doctors
              </button>
              <button 
                onClick={() => navigate.push("/medical-records")}
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 transition-colors cursor-pointer"
              >
                Records
              </button>
              <button 
                onClick={() => navigate.push("/join-us")}
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 transition-colors cursor-pointer"
              >
                Join Us
              </button>
            </nav>

            <div className="flex items-center space-x-4">
              <ThemeToggle />
              <Button variant="outline" onClick={() => openAuthModal('signin')} className="cursor-pointer">Sign In</Button>
              <Button onClick={() => openAuthModal('signup')} className="cursor-pointer">Get Started</Button>
            </div>
          </div>
        </div>
      </header>
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
        defaultTab={authModalDefaultTab}
      />
    </>
  )
}
export default Header
