"use client";

import { useEffect, useState } from "react";
import { DashboardProvider, useDashboard } from "./providers/DashboardProvider";
import { Sidebar } from "../../components/common/Sidebar";
import "@mysten/dapp-kit/dist/index.css";
import { ConnectButton, useCurrentAccount } from "@mysten/dapp-kit";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { AddShopModal } from "./page";
import { RetailShop } from "@/lib/types";
import { useCreateShop } from "@/hooks/moveCall/useCreateShop";
import { useGetShops } from "@/hooks/getData/useGetShops";

function DashboardLayoutContent({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const account = useCurrentAccount();
  const { shopId, shopCapId, setShopId, setShopCapId } = useDashboard();
  const [shops, setShops] = useState<RetailShop[]>([]);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const { createShop } = useCreateShop();
  const { shops: tempShops } = useGetShops({
    owner: account?.address,
  });

  useEffect(() => {
    setShops(tempShops ?? []);
  }, [tempShops]);

  const handleClick = (shopId: string, shopCapId: string) => {
    setShopId(shopId);
    setShopCapId(shopCapId);
  };

  const handleAddShop = (name: string) => {
    if (!name.trim()) return;
    createShop(name, (result) => {
      setShops((prev) => [...prev, result]);
    });
    setIsAddOpen(false);
  };

  if (!account?.address) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <ConnectButton />
      </div>
    );
  }

  if (!shopId || !shopCapId) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen w-full p-6">
        <div className="w-full max-w-3xl bg-white p-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Shop Name</TableHead>
                <TableHead>Shop ID</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {shops.map((shop) => (
                <TableRow key={shop.id}>
                  <TableCell className="font-mono">Example Shop</TableCell>
                  <TableCell className="font-mono">
                    {shop.id?.toString().slice(0, 8)}...
                    {shop.id?.toString().slice(-8)}
                  </TableCell>
                  <TableCell className="text-right">
                    <button
                      className="inline-flex items-center justify-center rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50"
                      onClick={() => handleClick(shop.id, shop.capId)}
                    >
                      Manage
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
            <DialogTrigger asChild className="w-full mt-4">
              <Button variant="outline" className="w-full mt-4">
                <Plus className="w-5 h-5 mr-2" />
                Add New Shop
              </Button>
            </DialogTrigger>
            <AddShopModal onAdd={handleAddShop} />
          </Dialog>
        </div>
      </div>
    );
  }

  return (
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
  );
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardProvider>
      <DashboardLayoutContent>{children}</DashboardLayoutContent>
    </DashboardProvider>
  );
}
