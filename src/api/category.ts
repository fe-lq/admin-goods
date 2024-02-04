import { postRequest, getRequest } from "@/request";
import { Category } from "@/types/category";

export const getCategoryList = postRequest<Partial<Category>, Category[]>(
  "/category/list",
);
export const addCategory = postRequest<Partial<Category>>("/category/add");
export const updateCategory =
  postRequest<Partial<Category>>("/category/update");
export const deleteCategory = getRequest<{ id: number }>("/category/delete");
