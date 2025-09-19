export interface RetailShop {
  id: string;
  name: string;
  capId: string;
}

export interface RetailMembershipType {
  name: string;
  requiredAmountToUpgrade: number;
}

export interface RetailMembership {
  id: string;
  name?: string;
  email?: string;
  status: string;
  joinDate: string;
  lastActivity: string;
}

export interface WebhookEvent {
  id: string;
  type: string;
  created: string;
  data: WebhookEventData;
  processed: boolean;
  error?: string;
  membershipApplied: boolean;
}

// Stripe 관련 타입들
export interface PaymentMethodData {
  type?: string;
}

export interface PaymentIntentObjectShape {
  amount?: number;
  currency?: string;
  payment_method?: PaymentMethodData;
  status?: string;
  id?: string;
}

export interface PaymentIntentDataShape {
  object?: PaymentIntentObjectShape;
}

export interface SubscriptionObjectShape {
  id?: string;
  status?: string;
  current_period_start?: number;
  current_period_end?: number;
  customer?: string;
}

export interface SubscriptionDataShape {
  object?: SubscriptionObjectShape;
}

export interface InvoiceObjectShape {
  id?: string;
  amount_paid?: number;
  currency?: string;
  status?: string;
  customer?: string;
}

export interface InvoiceDataShape {
  object?: InvoiceObjectShape;
}

// Web3 관련 타입들
export interface Web3EventData {
  payer: string;
  price: number;
  shop: string;
  created_at: string;
}

// WebhookEvent의 data 필드를 위한 유니온 타입
export type WebhookEventData =
  | PaymentIntentDataShape
  | SubscriptionDataShape
  | InvoiceDataShape
  | Web3EventData;

export interface EventStats {
  total: number;
  byType: Record<string, number>;
  last24Hours: number;
}
