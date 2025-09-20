import { useEffect, useState } from "react";
import { RetailMembership } from "@/lib/types";
import { useSuiClientQuery } from "@mysten/dapp-kit";
import { parseMembershipTypes, ShopObject } from "@/lib/move/parseShopObject";

export function useGetMemberships({ id }: { id: string }) {
  const [memberships, setMemberships] = useState<RetailMembership[]>([]);
  const [isPending, setIsPending] = useState<boolean>(true);
  const [error] = useState<string | null>(null);

  const { data } = useSuiClientQuery("getObject", {
    id: id,
    options: {
      showType: true,
      showContent: true,
    },
  });

  useEffect(() => {
    if (!data) {
      setMemberships([]);
      setIsPending(false);
      return;
    }

    const parsed = parseMembershipTypes(data as unknown as ShopObject);

    setMemberships(parsed as RetailMembership[] | []);
    setIsPending(false);
  }, [data]);

  return {
    memberships,
    isPending,
    error,
  };
}
