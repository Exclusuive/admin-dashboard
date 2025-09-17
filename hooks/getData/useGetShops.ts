import { useEffect, useState } from "react";
import { RetailShop } from "@/lib/types";
import { useSuiClientQuery } from "@mysten/dapp-kit";
import { SHOP_MODULE_STRUCTS } from "@/lib/moveRegistry";
import { parseShopObject, ShopObject } from "@/lib/move/parseShopObject";

export function useGetShops({ owner }: { owner: string | undefined }) {
  const [shops, setShops] = useState<RetailShop[]>([]);
  const [isPending, setIsPending] = useState<boolean>(true);
  const [error] = useState<string | null>(null);

  const { data } = useSuiClientQuery("getOwnedObjects", {
    owner: owner || "",
    filter: { StructType: SHOP_MODULE_STRUCTS.RetailShopCap },
    options: {
      showType: true,
      showContent: true,
    },
  });

  useEffect(() => {
    if (!data) {
      setShops([]);
      setIsPending(false);
      return;
    }

    setIsPending(true);

    const parsed = (data.data ?? [])
      .map((obj) => parseShopObject(obj as unknown as ShopObject))
      .filter((s): s is RetailShop => s != null);

    setShops(parsed);
    setIsPending(false);
  }, [data]);

  return {
    shops,
    isPending,
    error,
  };
}
