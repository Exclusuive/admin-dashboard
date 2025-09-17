"use client";
import { useState } from "react";
import { DashboardProvider } from "./providers/DashboardProvider";
import { Sidebar } from "../../components/dashboard/Sidebar";
import "@mysten/dapp-kit/dist/index.css";
import {
  createNetworkConfig,
  SuiClientProvider,
  WalletProvider,
} from "@mysten/dapp-kit";
import { getFullnodeUrl } from "@mysten/sui/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const { networkConfig } = createNetworkConfig({
  localnet: { url: getFullnodeUrl("localnet") },
  testnet: { url: getFullnodeUrl("testnet") },
  mainnet: { url: getFullnodeUrl("mainnet") },
});
const queryClient = new QueryClient();

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <DashboardProvider>
      <QueryClientProvider client={queryClient}>
        <SuiClientProvider networks={networkConfig} defaultNetwork="testnet">
          <WalletProvider>
            <div className="min-h-screen bg-gray-50">
              {/* Sidebar */}
              <Sidebar
                isOpen={sidebarOpen}
                onToggle={() => setSidebarOpen(!sidebarOpen)}
              />

              {/* Main Content */}
              <div
                className={`transition-all duration-300 ${
                  sidebarOpen ? "ml-64" : "ml-16"
                }`}
              >
                <div className="p-6">{children}</div>
              </div>
            </div>
          </WalletProvider>
        </SuiClientProvider>
      </QueryClientProvider>
    </DashboardProvider>
  );
}
