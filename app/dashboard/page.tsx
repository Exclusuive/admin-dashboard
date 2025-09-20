"use client";

import { useDashboard } from "./providers/DashboardProvider";

import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();
  const { shopId, shopCapId } = useDashboard();
  // 기본적으로 overview 페이지로 리다이렉트
  useEffect(() => {
    if (shopId && shopCapId) {
      router.push("/dashboard/overview");
    }
  }, [shopId, shopCapId, router]);

  return (
    <div className="p-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Dashboard</h1>
        <p className="text-gray-600">
          Select a shop to manage from the sidebar.
        </p>
      </div>
    </div>
  );
}

export function AddShopModal({ onAdd }: { onAdd: (name: string) => void }) {
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
