import { useCurrentAccount, useSuiClient } from "@mysten/dapp-kit";
import { useState } from "react";
import { useSignAndExecuteTransaction } from "@mysten/dapp-kit";
import { Transaction } from "@mysten/sui/transactions";
import { MODULE, STAMP_REWARD_MODULE_FUNCTIONS } from "@/lib/moveRegistry";
import { UPGRADED_PACKAGE_ID } from "@/lib/moveRegistry";
import { RetailMembership } from "@/lib/types";
import { SuiTransactionBlockResponse } from "@mysten/sui/client";
import { parseAddMemberDigest } from "@/lib/move/parseAddMemberDigest";

export function useAddMember() {
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
  const { STAMP_REWARD } = MODULE;

  const addMember = (
    {
      shopId,
      recipient,
    }: {
      recipient: string;
      shopId: string;
    },
    setResult: (result: RetailMembership) => void
  ) => {
    setIsPending(true);
    setError(null);

    if (!account) return;

    const tx = new Transaction();

    const stampCard = tx.moveCall({
      package: UPGRADED_PACKAGE_ID,
      module: STAMP_REWARD,
      target: STAMP_REWARD_MODULE_FUNCTIONS.newStampCard,
      arguments: [tx.object(shopId)],
    });

    tx.transferObjects([tx.object(stampCard)], recipient);

    signAndExecuteTransaction(
      {
        transaction: tx,
      },
      {
        onSuccess: (data: SuiTransactionBlockResponse) => {
          const newStampCardId = parseAddMemberDigest(data);

          //   const newMember: RetailMembership = {
          //     name,
          //     email,
          //     status,
          //     joinDate,
          //     lastActivity,
          //   };
          //   setResult(newMember);
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
    addMember,
    isPending,
    error,
  };
}
