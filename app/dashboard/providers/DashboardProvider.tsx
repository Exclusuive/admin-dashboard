"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface DashboardContextType {
  activeTab: string;
  shopId: string;
  shopCapId: string;
  setActiveTab: (tab: string) => void;
  setShopId: (id: string) => void;
  setShopCapId: (id: string) => void;

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
  const [shopId, setShopId] = useState("");
  const [shopCapId, setShopCapId] = useState("");

  const stats = {
    totalUsers: 0,
    totalOrders: 0,
    revenue: 0,
  };

  return (
    <DashboardContext.Provider
      value={{
        activeTab,
        setActiveTab,
        shopId,
        shopCapId,
        setShopId,
        setShopCapId,
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
