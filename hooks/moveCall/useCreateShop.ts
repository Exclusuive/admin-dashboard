import { useCurrentAccount, useSuiClient } from "@mysten/dapp-kit";
import { useState } from "react";
import { useSignAndExecuteTransaction } from "@mysten/dapp-kit";
import { Transaction } from "@mysten/sui/transactions";
import { MODULE } from "@/lib/moveRegistry";
import { SHOP_MODULE_FUNCTIONS, UPGRADED_PACKAGE_ID } from "@/lib/moveRegistry";
import { RetailShop } from "@/lib/types";
import { SuiTransactionBlockResponse } from "@mysten/sui/client";
import { parseCreateShopDigest } from "@/lib/move/parseCreateShopDigest";

export function useCreateShop() {
  const account = useCurrentAccount();
  const client = useSuiClient();
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { mutate: signAndExecuteTransaction } = useSignAndExecuteTransaction({
    execute: async ({ bytes, signature }) =>
      await client.executeTransactionBlock({
        transactionBlock: bytes,
        signature,
        options: {
          showRawEffects: true,
          showObjectChanges: true,
        },
      }),
  });
  const { RETAIL_SHOP } = MODULE;

  const createShop = (
    name: string,
    setResult: (result: RetailShop) => void
  ) => {
    setIsPending(true);
    setError(null);

    if (!account) return;

    const tx = new Transaction();

    tx.moveCall({
      package: UPGRADED_PACKAGE_ID,
      module: RETAIL_SHOP,
      target: SHOP_MODULE_FUNCTIONS.createShop,
      arguments: [tx.pure.string(name)],
    });

    signAndExecuteTransaction(
      {
        transaction: tx,
      },
      {
        onSuccess: (data: SuiTransactionBlockResponse) => {
          const newShop = parseCreateShopDigest(data);
          setResult({ ...newShop, name } as RetailShop);
          setIsPending(false);
        },
        onError: (err: Error) => {
          setError(err.message);
        },
        onSettled: () => {
          setIsPending(false);
        },
      }
    );
  };

  return {
    createShop,
    isPending,
    error,
  };
}
