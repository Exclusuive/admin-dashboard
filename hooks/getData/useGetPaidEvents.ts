import { useEffect, useState } from "react";
import { WebhookEvent } from "@/lib/types";
import { useSuiClientQuery } from "@mysten/dapp-kit";
import { MODULE, UPGRADED_PACKAGE_ID } from "@/lib/moveRegistry";
import { parseEvents, EventObject } from "@/lib/move/parseEvents";

export function useGetPaidEvents() {
  const [events, setEvents] = useState<WebhookEvent[]>([]);
  const [isPending, setIsPending] = useState<boolean>(true);
  const [error] = useState<string | null>(null);
  const [refetchSwitch, setRefetchSwitch] = useState(false);

  const { data, refetch: refetchEvents } = useSuiClientQuery("queryEvents", {
    query: {
      MoveEventModule: {
        module: MODULE.PAY,
        package: UPGRADED_PACKAGE_ID,
      },
    },
  });

  const refetch = () => {
    setRefetchSwitch((prev) => !prev);
  };

  // refetchSwitch가 변경될 때 쿼리들을 다시 실행
  useEffect(() => {
    if (refetchSwitch !== undefined) {
      refetchEvents();
    }
  }, [refetchSwitch, refetchEvents]);

  useEffect(() => {
    if (!data) {
      setEvents([]);
      setIsPending(false);
      return;
    }
    const parsedEvents = parseEvents(data as unknown as EventObject);
    const parsedEventsWithType: WebhookEvent[] = parsedEvents.map((event) => ({
      ...event,
      type: "web3",
      processed: true,
      membershipApplied: true,
      data: {
        object: {
          payer: event.payer,
          amount: Number(event.price),
          currency: "USDC",
          payment_method: {
            type: "web3",
          },
          shop: event.shop,
          created: event.created,
        },
      },
    }));

    setEvents(parsedEventsWithType);

    setIsPending(false);
  }, [data]);

  return {
    events,
    isPending,
    error,
    refetch,
  };
}
