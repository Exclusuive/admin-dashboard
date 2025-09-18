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
  data: Record<string, unknown>;
  processed: boolean;
  error?: string;
  membershipApplied: boolean;
}

export interface EventStats {
  total: number;
  byType: Record<string, number>;
  last24Hours: number;
}
