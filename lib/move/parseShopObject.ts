export type ShopCapObject = {
  data: {
    content: {
      fields: {
        id: {
          id: string;
        };
        shop: string;
      };
    };
  };
};

export type ShopObject = {
  data: {
    content: {
      fields: {
        membership_types: {
          fields: {
            contents: [
              {
                fields: {
                  key: string;
                  value: {
                    fields: {
                      name: string;
                      require_condition: number;
                    };
                  };
                };
              }
            ];
          };
        };
      };
    };
  };
};

export const parseShopCapObject = (shop: ShopCapObject) => {
  if (!shop) return null;
  return {
    id: shop.data.content.fields.shop ?? "",
    capId: shop.data.content.fields.id.id ?? "",
  };
};

export const parseMembershipTypes = (shop: ShopObject) => {
  if (!shop) return null;

  console.log(shop.data.content.fields?.membership_types);

  const membershipTypes =
    shop.data.content.fields?.membership_types?.fields?.contents?.map(
      (membershipType) => {
        return {
          name: membershipType.fields.value.fields.name,
          require_condition:
            membershipType.fields.value.fields.require_condition,
          type: membershipType.fields.key,
        };
      }
    );

  return membershipTypes;
};
