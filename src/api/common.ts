import { postRequest, http } from "@fe-lq/micro-kit";
http.defaults.baseURL = process.env.BASE_URL;

export const deleteFile = postRequest<unknown, { filePath: string }>(
  "/files/delete",
);
export const updateFile = postRequest<unknown, { filePath: string }>(
  "/files/upload",
);
