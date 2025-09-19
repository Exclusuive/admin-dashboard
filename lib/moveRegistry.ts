export const ORIGIN_PACKAGE_ID =
  "0x874ce7b4d400de4566accbca60e6779d35756474a4356c21b715120ca835c33f";
export const UPGRADED_PACKAGE_ID =
  "0x874ce7b4d400de4566accbca60e6779d35756474a4356c21b715120ca835c33f";

export const MODULE = {
  RETAIL_SHOP: "retail_shop",
  STAMP_REWARD: "stamp_reward",
  PAY: "pay",
} as const;

// =====================================
// ================== Collection Module
// =====================================
const SHOP_MODULE_STRUCT_NAMES = {
  // Shop
  RetailShop: "RetailShop",
  RetailShopCap: "RetailShopCap",
  RetailMembershipType: "RetailMembershipType",
} as const;

export const SHOP_MODULE_STRUCTS = Object.fromEntries(
  Object.entries(SHOP_MODULE_STRUCT_NAMES).map(([key, struct]) => [
    key,
    `${ORIGIN_PACKAGE_ID}::${MODULE.RETAIL_SHOP}::${struct}`,
  ])
) as Record<keyof typeof SHOP_MODULE_STRUCT_NAMES, string>;

const SHOP_MODULE_FUNCTION_NAMES = {
  // Entry
  createShop: "create_shop",
  createMembershipType: "add_retail_membership_type",
  // New
  newShop: "new_shop",
} as const;

export const SHOP_MODULE_FUNCTIONS = Object.fromEntries(
  Object.entries(SHOP_MODULE_FUNCTION_NAMES).map(([key, func]) => [
    key,
    `${UPGRADED_PACKAGE_ID}::${MODULE.RETAIL_SHOP}::${func}`,
  ])
) as Record<keyof typeof SHOP_MODULE_FUNCTION_NAMES, string>;

export const SHOP_EVENT_NAMES = {
  ShopCreated: "ShopCreated",
  ShopUpdated: "ShopUpdated",
} as const;

export const SHOP_EVENTS = Object.fromEntries(
  Object.entries(SHOP_EVENT_NAMES).map(([key, event]) => [
    key,
    `${UPGRADED_PACKAGE_ID}::${MODULE.RETAIL_SHOP}::${event}`,
  ])
) as Record<keyof typeof SHOP_EVENT_NAMES, string>;

const STAMP_REWARD_MODULE_STRUCT_NAMES = {
  StampCard: "StampCard",
} as const;

export const STAMP_REWARD_MODULE_STRUCTS = Object.fromEntries(
  Object.entries(STAMP_REWARD_MODULE_STRUCT_NAMES).map(([key, struct]) => [
    key,
    `${ORIGIN_PACKAGE_ID}::${MODULE.STAMP_REWARD}::${struct}`,
  ])
) as Record<keyof typeof STAMP_REWARD_MODULE_STRUCT_NAMES, string>;

const STAMP_REWARD_MODULE_FUNCTION_NAMES = {
  // New
  newStampCard: "new_stamp_card",
  addMember: "create_stamp_card_by_shop_owner",
  grantStamp: "create_stamp_by_shop_owner",
} as const;

export const STAMP_REWARD_MODULE_FUNCTIONS = Object.fromEntries(
  Object.entries(STAMP_REWARD_MODULE_FUNCTION_NAMES).map(([key, func]) => [
    key,
    `${UPGRADED_PACKAGE_ID}::${MODULE.STAMP_REWARD}::${func}`,
  ])
) as Record<keyof typeof STAMP_REWARD_MODULE_FUNCTION_NAMES, string>;

export const STAMP_REWARD_EVENT_NAMES = {
  StampCardCreated: "StampCardCreated",
} as const;

export const STAMP_REWARD_EVENTS = Object.fromEntries(
  Object.entries(STAMP_REWARD_EVENT_NAMES).map(([key, event]) => [
    key,
    `${UPGRADED_PACKAGE_ID}::${MODULE.STAMP_REWARD}::${event}`,
  ])
) as Record<keyof typeof STAMP_REWARD_EVENT_NAMES, string>;

export const PAY_EVENT_NAMES = {
  Paid: "Paid",
} as const;

export const PAY_EVENTS = Object.fromEntries(
  Object.entries(PAY_EVENT_NAMES).map(([key, event]) => [
    key,
    `${UPGRADED_PACKAGE_ID}::${MODULE.RETAIL_SHOP}::${event}`,
  ])
) as Record<keyof typeof PAY_EVENT_NAMES, string>;
