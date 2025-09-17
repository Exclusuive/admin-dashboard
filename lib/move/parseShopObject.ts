export type ShopObject = {
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

export const parseShopObject = (shop: ShopObject) => {
  if (!shop) return null;
  return {
    id: shop.data.content.fields.shop ?? "",
    capId: shop.data.content.fields.id.id ?? "",
  };
};
