import { useCurrentAccount, useSuiClient } from "@mysten/dapp-kit";
import { useState } from "react";
import { useSignAndExecuteTransaction } from "@mysten/dapp-kit";
import { Transaction } from "@mysten/sui/transactions";
import { MODULE } from "@/lib/moveRegistry";
import { SHOP_MODULE_FUNCTIONS, UPGRADED_PACKAGE_ID } from "@/lib/moveRegistry";
import { RetailMembershipType } from "@/lib/types";
import { SuiTransactionBlockResponse } from "@mysten/sui/client";

export function useCreateMembershipType() {
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

  const createMembershipType = (
    {
      name,
      requiredAmountToUpgrade,
      shopId,
      shopCapId,
    }: {
      name: string;
      requiredAmountToUpgrade: number;
      shopId: string;
      shopCapId: string;
    },
    setResult: (result: RetailMembershipType) => void
  ) => {
    setIsPending(true);
    setError(null);

    if (!account) return;

    const tx = new Transaction();

    tx.moveCall({
      package: UPGRADED_PACKAGE_ID,
      module: RETAIL_SHOP,
      target: SHOP_MODULE_FUNCTIONS.createMembershipType,
      arguments: [
        tx.object(shopId),
        tx.object(shopCapId),
        tx.pure.string(name),
        tx.pure.u64(requiredAmountToUpgrade),
      ],
    });

    signAndExecuteTransaction(
      {
        transaction: tx,
      },
      {
        onSuccess: () => {
          const newType: RetailMembershipType = {
            name,
            requiredAmountToUpgrade,
          };
          setResult(newType);
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
    createMembershipType,
    isPending,
    error,
  };
}
