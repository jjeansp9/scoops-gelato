import { createBrowserClient } from "@supabase/ssr";
import { createClient } from "@supabase/supabase-js";

// Placeholder values for build time (will be replaced at runtime)
const PLACEHOLDER_URL = "https://placeholder.supabase.co";
const PLACEHOLDER_KEY = "placeholder-key";

// Browser client for client-side usage
export function createBrowserSupabaseClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || PLACEHOLDER_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || PLACEHOLDER_KEY;
  return createBrowserClient(url, key);
}

// Server client for server-side operations
// Uses service role key if available, otherwise falls back to anon key
export function createServerSupabaseClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || PLACEHOLDER_URL;
  const key =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    PLACEHOLDER_KEY;
  return createClient(url, key);
}

// ============================================
// Type Definitions
// ============================================

// User role types
export type UserRole = "admin" | "user";

// User profile from user_profiles table
export interface UserProfile {
  id: string;
  email: string;
  name: string | null;
  role: UserRole;
  created_at: string;
  updated_at: string;
}

// Types for franchise inquiry
export interface FranchiseInquiry {
  id: string;
  name: string;
  phone: string;
  region: string;
  message: string;
  status: "pending" | "contacted" | "completed";
  created_at: string;
}

// Database schema types for Supabase
export interface Database {
  public: {
    Tables: {
      user_profiles: {
        Row: UserProfile;
        Insert: {
          id: string;
          email: string;
          name?: string | null;
          role?: UserRole;
        };
        Update: {
          email?: string;
          name?: string | null;
          role?: UserRole;
        };
      };
      franchise_inquiries: {
        Row: FranchiseInquiry;
        Insert: Omit<FranchiseInquiry, "id" | "created_at">;
        Update: Partial<Omit<FranchiseInquiry, "id" | "created_at">>;
      };
    };
    Functions: {
      get_user_role: {
        Args: { user_id: string };
        Returns: string;
      };
    };
  };
}
