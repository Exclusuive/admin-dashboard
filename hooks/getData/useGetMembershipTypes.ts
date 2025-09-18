import { useEffect, useState } from "react";
import { RetailMembershipType } from "@/lib/types";
import { useSuiClientQuery } from "@mysten/dapp-kit";
import { parseMembershipTypes, ShopObject } from "@/lib/move/parseShopObject";

export function useGetMembershipTypes({ id }: { id: string }) {
  const [membershipTypes, setMembershipTypes] = useState<
    RetailMembershipType[]
  >([]);
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
      setMembershipTypes([]);
      setIsPending(false);
      return;
    }

    const parsed = parseMembershipTypes(data as unknown as ShopObject);

    setMembershipTypes(parsed as RetailMembershipType[] | []);
    setIsPending(false);
  }, [data]);

  return {
    membershipTypes,
    isPending,
    error,
  };
}
