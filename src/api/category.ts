import { postRequest, http } from "@fe-lq/micro-kit";
import { Category, FilterParams } from "@/types/category";
http.defaults.baseURL = process.env.BASE_URL;

export const getCategoryList = postRequest<Category[], FilterParams>(
  "/category/list",
);
export const addCategory = postRequest<unknown, Partial<Category>>(
  "/category/add",
);
export const updateCategory = postRequest<unknown, Partial<Category>>(
  "/category/update",
);
export const deleteCategory = postRequest<unknown, { id: number }>(
  "/category/delete",
);
