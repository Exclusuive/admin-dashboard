export type OwnedObjectResponse = {
  data?: Array<{
    data?: {
      content?: unknown;
    };
  }>;
};

type PossibleIdShape = {
  fields?: unknown;
};

type FieldsWithNestedId = {
  shop_id?: unknown;
};

/**
 * Extracts ShopCap object id strings from Sui getOwnedObjects response.
 * Uses defensive type narrowing to safely traverse Move object shapes.
 */
export const getShopIdsFromCapIds = (
  response: OwnedObjectResponse | undefined | null
): string[] => {
  if (!response || !Array.isArray(response.data)) return [];

  return response.data.flatMap((item) => {
    const content: unknown = item?.data?.content;
    if (!content || typeof content !== "object") return [];

    const contentWithFields = content as PossibleIdShape;
    const fields: unknown = (contentWithFields as PossibleIdShape).fields;
    if (!fields || typeof fields !== "object") return [];

    const shopIds = fields as FieldsWithNestedId;
    const shopId: unknown = shopIds.shop_id;
    if (typeof shopId === "string") {
      return [shopId];
    }
    return [];
  });
};
