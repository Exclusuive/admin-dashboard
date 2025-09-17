"use client";

import { useDashboard } from "./providers/DashboardProvider";
import { Overview } from "../../components/dashboard/Overview";
import { Memberships } from "../../components/dashboard/Memberships";
import { Orders } from "../../components/dashboard/Orders";
import { Rewards } from "../../components/dashboard/Rewards";
import { Analytics } from "../../components/dashboard/Analytics";
import { Settings } from "../../components/dashboard/Settings";
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { useState, useEffect } from "react";
import { useCreateShop } from "@/hooks/moveCall/useCreateShop";
import { RetailShop } from "@/lib/types";
import { useGetShops } from "@/hooks/getData/useGetShops";

export default function Dashboard() {
  const { activeTab, shopId, shopCapId, setShopId, setShopCapId } =
    useDashboard();
  const account = useCurrentAccount();
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
    createShop((result) => {
      setShops((prev) => [...prev, result]);
    });
    setIsAddOpen(false);
  };

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return <Overview />;
      case "memberships":
        return <Memberships />;
      case "orders":
        return <Orders />;
      case "products":
        return <Rewards />;
      case "analytics":
        return <Analytics />;
      case "settings":
        return <Settings />;
      default:
        return <Overview />;
    }
  };

  if (!account?.address)
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <ConnectButton />
      </div>
    );
  if (!shopId || !shopCapId) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen w-full p-6">
        <div className="w-full max-w-3xl bg-white p-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Shop ID</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {shops.map((shop) => (
                <TableRow key={shop.id}>
                  <TableCell className="font-mono">{shop.id}</TableCell>
                  <TableCell className="text-right">
                    <button
                      className="inline-flex items-center justify-center rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50"
                      onClick={() => handleClick(shop.id, shop.capId)}
                    >
                      선택
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
                새로운 상점 추가 하기
              </Button>
            </DialogTrigger>
            <AddShopModal onAdd={handleAddShop} />
          </Dialog>
        </div>
      </div>
    );
  }

  return <div className="p-6">{renderContent()}</div>;
}

function AddShopModal({ onAdd }: { onAdd: (name: string) => void }) {
  const [name, setName] = useState("");

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>새로운 상점 추가 하기</DialogTitle>
      </DialogHeader>
      <div className="mt-2 space-y-2">
        <label
          className="text-sm font-medium text-foreground"
          htmlFor="shop-name"
        >
          상점 이름
        </label>
        <input
          id="shop-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="예: 강남점"
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        />
      </div>
      <div className="mt-4 flex justify-end gap-2">
        <Button variant="outline" onClick={() => setName("")}>
          초기화
        </Button>
        <Button onClick={() => onAdd(name)} disabled={!name.trim()}>
          추가
        </Button>
      </div>
    </DialogContent>
  );
}
