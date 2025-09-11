"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface DashboardContextType {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  user: {
    name: string;
    email: string;
    role: string;
  };
  stats: {
    totalUsers: number;
    totalOrders: number;
    revenue: number;
  };
}

const DashboardContext = createContext<DashboardContextType | undefined>(
  undefined
);

export function DashboardProvider({ children }: { children: ReactNode }) {
  const [activeTab, setActiveTab] = useState("overview");

  const user = {
    name: "Admin",
    email: "admin@example.com",
    role: "Administrator",
  };

  const stats = {
    totalUsers: 1234,
    totalOrders: 567,
    revenue: 12345678,
  };

  return (
    <DashboardContext.Provider
      value={{
        activeTab,
        setActiveTab,
        user,
        stats,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboard() {
  const context = useContext(DashboardContext);
  if (context === undefined) {
    throw new Error("useDashboard must be used within a DashboardProvider");
  }
  return context;
}
