import { postRequest, getRequest, http } from "@fe-lq/micro-kit";
import { Category } from "@/types/category";
http.defaults.baseURL = process.env.BASE_URL;

export const getCategoryList = postRequest<Category[], Category>(
  "/category/list",
);
export const addCategory = postRequest<unknown, Partial<Category>>(
  "/category/add",
);
export const updateCategory = postRequest<unknown, Partial<Category>>(
  "/category/update",
);
export const deleteCategory = getRequest<unknown, { id: number }>(
  "/category/delete",
);
