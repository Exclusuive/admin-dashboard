import { SuiTransactionBlockResponse } from "@mysten/sui/client";

export type ShopObject = {
  data: {
    content: {
      fields: {
        id: {
          id: string;
        };
        owner: {
          AddressOwner: string;
        };
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

  return {
    id: createdObjects[0].objectId,
    owner: createdObjects[0].owner,
  };
};
