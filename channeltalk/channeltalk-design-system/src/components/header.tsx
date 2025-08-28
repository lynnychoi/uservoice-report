"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // 모바일 메뉴가 열렸을 때 body 스크롤 방지
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // 컴포넌트 언마운트 시 스크롤 복원
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <header className="border-b bg-white sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">C</span>
              </div>
              <span className="text-xl font-semibold text-gray-900">채널톡 디자인 시스템</span>
            </Link>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              <Link href="/foundation" className="text-gray-600 hover:text-gray-900 transition-colors">
                Foundation
              </Link>
              <Link href="/components" className="text-gray-600 hover:text-gray-900 transition-colors">
                Components
              </Link>
              <Link href="/playground" className="text-gray-600 hover:text-gray-900 transition-colors">
                Playground
              </Link>
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-gray-600 hover:text-gray-900 transition-colors relative z-50"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <nav className="md:hidden mt-4 pt-4 border-t border-gray-200 bg-white rounded-b-lg shadow-lg">
              <div className="flex flex-col space-y-1 pb-2">
                <Link 
                  href="/foundation" 
                  className="text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition-colors py-3 px-2 rounded-md"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Foundation
                </Link>
                <Link 
                  href="/components" 
                  className="text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition-colors py-3 px-2 rounded-md"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Components
                </Link>
                <Link 
                  href="/playground" 
                  className="text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition-colors py-3 px-2 rounded-md"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Playground
                </Link>
              </div>
            </nav>
          )}
        </div>
      </header>

      {/* Mobile Menu Backdrop */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
    </>
  );
}