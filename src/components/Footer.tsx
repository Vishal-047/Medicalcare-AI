"use client";
import { Activity, Mail, Phone, MapPin } from "lucide-react";
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-slate-50 dark:bg-slate-900 border-t">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <Activity className="w-8 h-8 text-blue-600 mr-3" />
              <span className="text-2xl font-bold text-foreground">MediCare AI</span>
            </div>
            <p className="text-muted-foreground mb-4">
              Revolutionizing healthcare with AI-powered medical assistance and comprehensive care solutions.
            </p>
            <div className="flex space-x-4">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-sm font-bold">f</span>
              </div>
              <div className="w-10 h-10 bg-blue-400 rounded-full flex items-center justify-center">
                <span className="text-sm font-bold">t</span>
              </div>
              <div className="w-10 h-10 bg-blue-700 rounded-full flex items-center justify-center">
                <span className="text-sm font-bold">in</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 text-foreground">Services</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition-colors">AI Medical Analysis</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Speech Recognition</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Find Healthcare</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Medical Records</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 text-foreground">Support</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Contact Us</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 text-foreground">Contact Info</h4>
            <div className="space-y-3 text-muted-foreground">
              <div className="flex items-center">
                <Phone className="w-5 h-5 mr-3" />
                <span>+91 XXXXX XXXXX</span>
              </div>
              <div className="flex items-center">
                <Mail className="w-5 h-5 mr-3" />
                <span>support@medicareai.com</span>
              </div>
              <div className="flex items-center">
                <MapPin className="w-5 h-5 mr-3" />
                <span>123 Healthcare Ave, Medical City, Mumbai</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-8 text-center text-muted-foreground">
          <p>&copy; 2025 MediCare AI. All rights reserved. </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
