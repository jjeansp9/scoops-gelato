"use client";

import { useEffect, useState, useCallback } from "react";
import { User, Session } from "@supabase/supabase-js";
import { createBrowserSupabaseClient, UserProfile, UserRole } from "@/lib/supabase";

export interface UseAuthReturn {
  // Auth state
  user: User | null;
  session: Session | null;
  profile: UserProfile | null;

  // Loading states
  isLoading: boolean;
  isProfileLoading: boolean;

  // Computed properties
  isAuthenticated: boolean;
  isAdmin: boolean;
  role: UserRole | null;

  // Actions
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

/**
 * useAuth - Supabase 인증 및 사용자 프로필 관리 훅
 *
 * 기능:
 * - Supabase 세션 구독 및 관리
 * - user_profiles 테이블에서 역할 조회
 * - 로그아웃 함수 제공
 * - isAdmin 편의 getter
 *
 * 사용 예시:
 * ```tsx
 * const { user, profile, isAdmin, signOut } = useAuth();
 * ```
 */
export function useAuth(): UseAuthReturn {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isProfileLoading, setIsProfileLoading] = useState(false);

  const supabase = createBrowserSupabaseClient();

  // Fetch user profile from user_profiles table
  const fetchProfile = useCallback(async (userId: string) => {
    setIsProfileLoading(true);
    try {
      const { data, error } = await supabase
        .from("user_profiles")
        .select("*")
        .eq("id", userId)
        .single();

      if (error) {
        console.error("[useAuth] Error fetching profile:", error.message);
        setProfile(null);
      } else {
        setProfile(data as UserProfile);
      }
    } catch (err) {
      console.error("[useAuth] Unexpected error fetching profile:", err);
      setProfile(null);
    } finally {
      setIsProfileLoading(false);
    }
  }, [supabase]);

  // Refresh profile manually
  const refreshProfile = useCallback(async () => {
    if (user?.id) {
      await fetchProfile(user.id);
    }
  }, [user?.id, fetchProfile]);

  // Sign out
  const signOut = useCallback(async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      setSession(null);
      setProfile(null);
    } catch (err) {
      console.error("[useAuth] Error signing out:", err);
      throw err;
    }
  }, [supabase]);

  // Initialize auth state and subscribe to changes
  useEffect(() => {
    let mounted = true;

    // Get initial session
    const initializeAuth = async () => {
      try {
        const { data: { session: initialSession } } = await supabase.auth.getSession();

        if (!mounted) return;

        if (initialSession?.user) {
          setSession(initialSession);
          setUser(initialSession.user);
          await fetchProfile(initialSession.user.id);
        }
      } catch (err) {
        console.error("[useAuth] Error initializing auth:", err);
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    initializeAuth();

    // Subscribe to auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, currentSession) => {
        if (!mounted) return;

        setSession(currentSession);
        setUser(currentSession?.user ?? null);

        if (event === "SIGNED_IN" && currentSession?.user) {
          await fetchProfile(currentSession.user.id);
        } else if (event === "SIGNED_OUT") {
          setProfile(null);
        } else if (event === "TOKEN_REFRESHED" && currentSession?.user) {
          // Optionally refresh profile on token refresh
        }
      }
    );

    // Cleanup
    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [supabase, fetchProfile]);

  // Computed properties
  const isAuthenticated = !!user && !!session;
  const isAdmin = profile?.role === "admin";
  const role = profile?.role ?? null;

  return {
    user,
    session,
    profile,
    isLoading,
    isProfileLoading,
    isAuthenticated,
    isAdmin,
    role,
    signOut,
    refreshProfile,
  };
}

// Export type for convenience
export type { UserProfile, UserRole } from "@/lib/supabase";
