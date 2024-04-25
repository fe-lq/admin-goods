import { postRequest, getRequest, http } from "@fe-lq/micro-kit";
import { Goods } from "@/types/goods";
http.defaults.baseURL = process.env.BASE_URL;

export const getGoodsList = postRequest<
  Goods[],
  Pick<Goods, "goodsName" | "goodsOnSale">
>("/goods/getList");
export const createGoods = postRequest<unknown, Partial<Goods>>(
  "/goods/create",
);
export const updateGoods = postRequest<unknown, Partial<Goods>>(
  "/goods/update",
);
export const deleteGoods = getRequest<unknown, { id: number }>("/goods/delete");
