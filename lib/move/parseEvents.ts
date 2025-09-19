export type EventObject = {
  data: {
    id: {
      txDigest: string;
    };
    parsedJson: {
      created_at: string;
      payer: string;
      price: number;
      shop: string;
    };
  }[];
};

export const parseEvents = (events: EventObject) => {
  console.log(events);
  return events.data.map((event) => {
    return {
      id: event.id.txDigest,
      created: event.parsedJson.created_at,
      payer: event.parsedJson.payer,
      price: event.parsedJson.price,
      shop: event.parsedJson.shop,
    };
  });
};
