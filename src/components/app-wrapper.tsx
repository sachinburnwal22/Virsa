"use client";

import type React from "react";

import { useAuth } from "../contexts/auth-context";
import { AuthPage } from "./auth-page";

export function AppWrapper({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <AuthPage />;
  }

  return <>{children}</>;
}
