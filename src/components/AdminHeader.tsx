"use client";

import Link from "next/link";
import { IceCreamBowl, RefreshCw, LogOut } from "lucide-react";

interface AdminHeaderProps {
  title: string;
  onRefresh?: () => void;
  isRefreshing?: boolean;
  onLogout: () => void;
}

export default function AdminHeader({
  title,
  onRefresh,
  isRefreshing = false,
  onLogout,
}: AdminHeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#F6F6F6]/80 backdrop-blur-xl border-b border-black/5">
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Left: Logo + Title */}
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2">
              <IceCreamBowl className="w-6 h-6" strokeWidth={1.5} />
              <span className="text-lg font-semibold tracking-tight">
                Scoops Gelato
              </span>
            </Link>
            <div className="h-6 w-px bg-zinc-300" />
            <h1 className="text-sm font-medium text-zinc-600">{title}</h1>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-2">
            {onRefresh && (
              <button
                onClick={onRefresh}
                disabled={isRefreshing}
                className="p-2 text-zinc-500 hover:text-[#111111] hover:bg-zinc-100 rounded-lg transition-all duration-300 disabled:opacity-50"
                title="새로고침"
                aria-label="새로고침"
              >
                <RefreshCw
                  className={`w-5 h-5 ${isRefreshing ? "animate-spin" : ""}`}
                />
              </button>
            )}
            <button
              onClick={onLogout}
              className="flex items-center gap-2 px-4 py-2 text-sm font-light text-zinc-500 hover:text-[#111111] hover:bg-zinc-100 rounded-lg transition-all duration-300"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">로그아웃</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
