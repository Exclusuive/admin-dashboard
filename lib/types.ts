export interface RetailShop {
  id: string;
  name?: string;
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
