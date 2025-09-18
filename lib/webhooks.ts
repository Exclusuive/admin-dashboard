export const EVENT_TYPE_COLORS = {
  "payment_intent.succeeded": "bg-green-100 text-green-800",
  "payment_intent.payment_failed": "bg-red-100 text-red-800",
  "customer.subscription.created": "bg-blue-100 text-blue-800",
  "customer.subscription.updated": "bg-yellow-100 text-yellow-800",
  "customer.subscription.deleted": "bg-red-100 text-red-800",
  "invoice.payment_succeeded": "bg-green-100 text-green-800",
  "invoice.payment_failed": "bg-red-100 text-red-800",
} as const;

export const EVENT_TYPE_LABELS = {
  "payment_intent.succeeded": "결제 성공",
  "payment_intent.payment_failed": "결제 실패",
  "customer.subscription.created": "구독 생성",
  "customer.subscription.updated": "구독 업데이트",
  "customer.subscription.deleted": "구독 삭제",
  "invoice.payment_succeeded": "인보이스 결제 성공",
  "invoice.payment_failed": "인보이스 결제 실패",
} as const;

export const getEventTypeColor = (type: string): string => {
  return (
    (EVENT_TYPE_COLORS as Record<string, string>)[type] ||
    "bg-gray-100 text-gray-800"
  );
};

export const getEventTypeLabel = (type: string): string => {
  return (EVENT_TYPE_LABELS as Record<string, string>)[type] || type;
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
};

export const getMembershipStatus = (event: { type: string }): string | null => {
  if (event.type === "payment_intent.succeeded") {
    return "적립하기";
  } else if (event.type === "payment_intent.payment_failed") {
    return null;
  } else if (event.type.includes("subscription")) {
    return "구독 관리";
  } else {
    return null;
  }
};

interface PaymentMethodData {
  type?: string;
}

interface PaymentIntentObjectShape {
  amount?: number;
  currency?: string;
  payment_method?: PaymentMethodData;
}

interface PaymentIntentDataShape {
  object?: PaymentIntentObjectShape;
}

export const getPaymentAmount = (event: {
  type: string;
  data: Record<string, unknown>;
}): { value: number; currency: string } => {
  if (
    event.type === "payment_intent.succeeded" ||
    event.type === "payment_intent.payment_failed"
  ) {
    const data = event.data as PaymentIntentDataShape;
    const object = data.object;
    if (object && typeof object.amount === "number") {
      return {
        value: object.amount / 100,
        currency: (object.currency ?? "KRW").toUpperCase(),
      };
    }
  }
  return { value: 0, currency: "KRW" };
};

export const getPaymentMethod = (event: {
  type: string;
  data: Record<string, unknown>;
}): string => {
  if (
    event.type === "payment_intent.succeeded" ||
    event.type === "payment_intent.payment_failed"
  ) {
    const data = event.data as PaymentIntentDataShape;
    const object = data.object;
    if (object && object.payment_method) {
      const paymentMethod = object.payment_method;
      return `Card (${(paymentMethod.type ?? "STRIPE").toUpperCase()})`;
    }
  }
  return "Web3(USDC/Sui)";
};
