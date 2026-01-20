"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { IceCreamBowl, Menu, X, ChevronDown, LogOut, Settings, User } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

export default function Navigation() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { user, profile, isAuthenticated, isAdmin, isLoading, signOut } = useAuth();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut();
      setIsDropdownOpen(false);
      setIsMenuOpen(false);
      router.push("/");
    } catch (err) {
      console.error("로그아웃 실패:", err);
    }
  };

  // Display name: use profile name, or email prefix, or "사용자"
  const displayName = profile?.name || user?.email?.split("@")[0] || "사용자";

  return (
    <>
      {/* Backdrop Overlay */}
      <div
        className={`fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300 ${
          isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsMenuOpen(false)}
        aria-hidden="true"
      />

      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#F6F6F6]/80 backdrop-blur-xl border-b border-black/5">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <a href="#" className="flex items-center gap-2">
              <IceCreamBowl className="w-6 h-6" strokeWidth={1.5} />
              <span className="text-lg font-semibold tracking-tight">Scoops Gelato</span>
            </a>
            <div className="hidden md:flex items-center gap-8">
              <a href="#about" className="text-sm font-light text-zinc-500 hover:text-[#111111] transition-all duration-300">
                소개
              </a>
              <a href="#brands" className="text-sm font-light text-zinc-500 hover:text-[#111111] transition-all duration-300">
                브랜드
              </a>
              <a href="#vision" className="text-sm font-light text-zinc-500 hover:text-[#111111] transition-all duration-300">
                비전
              </a>
              <a href="#franchise" className="text-sm font-light text-zinc-500 hover:text-[#111111] transition-all duration-300">
                가맹문의
              </a>

              {/* Auth Section - Desktop */}
              {isLoading ? (
                <div className="w-16 h-8 bg-zinc-200 rounded-lg animate-pulse" />
              ) : isAuthenticated ? (
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center gap-2 text-sm font-light text-zinc-600 hover:text-[#111111] transition-all duration-300 px-3 py-2 rounded-lg hover:bg-zinc-100"
                  >
                    <User className="w-4 h-4" />
                    <span className="max-w-24 truncate">{displayName}</span>
                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`} />
                  </button>

                  {/* Dropdown Menu */}
                  <div
                    className={`absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-zinc-200 py-2 transition-all duration-200 ${
                      isDropdownOpen ? "opacity-100 translate-y-0 visible" : "opacity-0 -translate-y-2 invisible"
                    }`}
                  >
                    <div className="px-4 py-2 border-b border-zinc-100">
                      <p className="text-sm font-medium text-zinc-900 truncate">{displayName}</p>
                      <p className="text-xs text-zinc-500 truncate">{user?.email}</p>
                      {isAdmin && (
                        <span className="inline-block mt-1 px-2 py-0.5 text-xs font-medium bg-emerald-100 text-emerald-700 rounded-full">
                          관리자
                        </span>
                      )}
                    </div>

                    {isAdmin && (
                      <a
                        href="/admin/inquiries"
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-zinc-700 hover:bg-zinc-50 transition-colors"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        <Settings className="w-4 h-4" />
                        관리자 페이지
                      </a>
                    )}

                    <button
                      onClick={handleSignOut}
                      className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      로그아웃
                    </button>
                  </div>
                </div>
              ) : (
                <a href="/login" className="text-sm font-light text-zinc-500 hover:text-[#111111] transition-all duration-300">
                  로그인
                </a>
              )}
            </div>
            <button
              className="md:hidden relative z-50"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "메뉴 닫기" : "메뉴 열기"}
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" strokeWidth={1.5} />
              ) : (
                <Menu className="w-6 h-6" strokeWidth={1.5} />
              )}
            </button>
          </div>

          {/* Mobile Menu - Always in DOM, controlled by CSS */}
          <div
            className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
              isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <div className="pt-4 pb-4 border-t border-black/5 mt-4">
              <div className="flex flex-col gap-4">
                <a
                  href="#about"
                  className="text-sm font-light text-zinc-500 hover:text-[#111111] transition-all duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  소개
                </a>
                <a
                  href="#brands"
                  className="text-sm font-light text-zinc-500 hover:text-[#111111] transition-all duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  브랜드
                </a>
                <a
                  href="#vision"
                  className="text-sm font-light text-zinc-500 hover:text-[#111111] transition-all duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  비전
                </a>
                <a
                  href="#franchise"
                  className="text-sm font-light text-zinc-500 hover:text-[#111111] transition-all duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  가맹문의
                </a>

                {/* Auth Section - Mobile */}
                {isLoading ? (
                  <div className="w-20 h-6 bg-zinc-200 rounded animate-pulse" />
                ) : isAuthenticated ? (
                  <>
                    <div className="pt-2 mt-2 border-t border-zinc-200">
                      <div className="flex items-center gap-2 mb-3">
                        <User className="w-4 h-4 text-zinc-400" />
                        <span className="text-sm font-medium text-zinc-700">{displayName}</span>
                        {isAdmin && (
                          <span className="px-2 py-0.5 text-xs font-medium bg-emerald-100 text-emerald-700 rounded-full">
                            관리자
                          </span>
                        )}
                      </div>

                      {isAdmin && (
                        <a
                          href="/admin/inquiries"
                          className="flex items-center gap-2 text-sm font-light text-zinc-500 hover:text-[#111111] transition-all duration-300 mb-3"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          <Settings className="w-4 h-4" />
                          관리자 페이지
                        </a>
                      )}

                      <button
                        onClick={handleSignOut}
                        className="flex items-center gap-2 text-sm font-light text-red-500 hover:text-red-700 transition-all duration-300"
                      >
                        <LogOut className="w-4 h-4" />
                        로그아웃
                      </button>
                    </div>
                  </>
                ) : (
                  <a
                    href="/login"
                    className="text-sm font-light text-zinc-500 hover:text-[#111111] transition-all duration-300"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    로그인
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
