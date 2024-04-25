import { postRequest, http } from "@fe-lq/micro-kit";
http.defaults.baseURL = process.env.BASE_URL;

/**
 * filePath： 图片地址
 */
export const deleteFile = postRequest<unknown, { filePath: string }>(
  "/files/delete",
);

/**
 * filePath： 图片地址
 */
export const updateFile = postRequest<unknown, { filePath: string }>(
  "/files/upload",
);
