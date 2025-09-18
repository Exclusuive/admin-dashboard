import { SuiTransactionBlockResponse } from "@mysten/sui/client";

export type ShopObject = {
  data: {
    content: {
      fields: {
        id: {
          id: string;
        };
        name: string;
      };
    };
  };
};

export const parseAddMemberDigest = (data: SuiTransactionBlockResponse) => {
  if (!data) return null;
  const createdObjects = (data.objectChanges ?? []).filter(
    (
      change
    ): change is Extract<
      NonNullable<typeof data.objectChanges>[number],
      { type: "created" }
    > => change.type === "created"
  );

  console.log(createdObjects);

  // const stampCardObjects = createdObjects.filter(
  //   (change) =>
  //     isRetailModule(change.objectType) &&
  //     getStructName(change.objectType) === "RetailShop"
  // );
  // const retailShopCapObjects = createdObjects.filter(
  //   (change) =>
  //     isRetailModule(change.objectType) &&
  //     getStructName(change.objectType) === "RetailShopCap"
  // );

  // const shop = retailShopObjects[0];
  // const shopCap = retailShopCapObjects[0];

  return {
    id: "",
    capId: "",
  };
};
