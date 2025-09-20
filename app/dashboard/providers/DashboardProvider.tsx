"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { SuiClientProvider, WalletProvider } from "@mysten/dapp-kit";
import { createNetworkConfig } from "@mysten/dapp-kit";
import { getFullnodeUrl } from "@mysten/sui/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

interface DashboardContextType {
  shopId: string;
  shopCapId: string;
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

const { networkConfig } = createNetworkConfig({
  localnet: { url: getFullnodeUrl("localnet") },
  testnet: { url: getFullnodeUrl("testnet") },
  mainnet: { url: getFullnodeUrl("mainnet") },
});
const queryClient = new QueryClient();

export function DashboardProvider({ children }: { children: ReactNode }) {
  const [shopId, setShopId] = useState("");
  const [shopCapId, setShopCapId] = useState("");

  const stats = {
    totalUsers: 0,
    totalOrders: 0,
    revenue: 0,
  };

  return (
    <QueryClientProvider client={queryClient}>
      <SuiClientProvider networks={networkConfig} defaultNetwork="testnet">
        <WalletProvider>
          <DashboardContext.Provider
            value={{
              shopId,
              shopCapId,
              setShopId,
              setShopCapId,
              stats,
            }}
          >
            {children}
          </DashboardContext.Provider>
        </WalletProvider>
      </SuiClientProvider>
    </QueryClientProvider>
  );
}

export function useDashboard() {
  const context = useContext(DashboardContext);
  if (context === undefined) {
    throw new Error("useDashboard must be used within a DashboardProvider");
  }
  return context;
}
