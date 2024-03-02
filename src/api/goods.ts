import { postRequest, getRequest, http } from "@fe-lq/micro-kit";
import { Goods } from "@/types/goods";
http.defaults.baseURL = process.env.BASE_URL;

export const getGoodsList = postRequest<
  Pick<Goods, "goodsName" | "goodsOnSale"> & { goodsType?: number },
  Goods[]
>("/goods/getList");
export const createGoods = postRequest<Partial<Goods>>("/goods/create");
export const updateGoods = postRequest<Partial<Goods>>("/goods/update");
export const deleteGoods = getRequest<{ id: number }>("/goods/delete");
