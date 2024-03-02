import { postRequest, getRequest, http } from "@fe-lq/micro-kit";
import { Category } from "@/types/category";
http.defaults.baseURL = process.env.BASE_URL;

export const getCategoryList = postRequest<Partial<Category>, Category[]>(
  "/category/list",
);
export const addCategory = postRequest<Partial<Category>>("/category/add");
export const updateCategory =
  postRequest<Partial<Category>>("/category/update");
export const deleteCategory = getRequest<{ id: number }>("/category/delete");
