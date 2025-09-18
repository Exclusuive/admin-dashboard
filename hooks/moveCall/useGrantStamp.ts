import { useCurrentAccount, useSuiClient } from "@mysten/dapp-kit";
import { useState, type Dispatch, type SetStateAction } from "react";
import { useSignAndExecuteTransaction } from "@mysten/dapp-kit";
import { Transaction } from "@mysten/sui/transactions";
import { MODULE, STAMP_REWARD_MODULE_FUNCTIONS } from "@/lib/moveRegistry";
import { UPGRADED_PACKAGE_ID } from "@/lib/moveRegistry";
import { WebhookEvent } from "@/lib/types";

export function useGrantStamp() {
  const account = useCurrentAccount();
  const client = useSuiClient();
  const [isSuccess, setIsSuccess] = useState(false);
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

  const grantStamp = ({
    shopId,
    shopCapId,
    stampCardId,
    selectedEvent,
    setEvents,
  }: {
    shopId: string;
    shopCapId: string;
    stampCardId: string;
    selectedEvent: WebhookEvent;
    setEvents: Dispatch<SetStateAction<WebhookEvent[]>>;
  }) => {
    setIsPending(true);
    setError(null);

    if (!account) return;

    const tx = new Transaction();

    tx.moveCall({
      package: UPGRADED_PACKAGE_ID,
      module: STAMP_REWARD,
      target: STAMP_REWARD_MODULE_FUNCTIONS.grantStamp,
      arguments: [
        tx.object(shopId),
        tx.object(shopCapId),
        tx.object(stampCardId),
      ],
    });

    signAndExecuteTransaction(
      {
        transaction: tx,
      },
      {
        onSuccess: () => {
          setEvents((prevEvents: WebhookEvent[]) =>
            prevEvents.map((evt) =>
              evt.id === selectedEvent.id
                ? { ...selectedEvent, membershipApplied: true }
                : evt
            )
          );
          setIsSuccess(true);
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
    grantStamp,
    isSuccess,
    isPending,
    error,
  };
}
