export const ORIGIN_PACKAGE_ID =
  "0x214e062470743dcd5a74f2dec1c74570dd53c5335eaee8396c48869606a67f45";
export const UPGRADED_PACKAGE_ID =
  "0x214e062470743dcd5a74f2dec1c74570dd53c5335eaee8396c48869606a67f45";

export const MODULE = {
  RETAIL_SHOP: "retail_shop",
} as const;

// =====================================
// ================== Collection Module
// =====================================
const SHOP_MODULE_STRUCT_NAMES = {
  // Shop
  RetailShop: "RetailShop",
  RetailShopCap: "RetailShopCap",
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
