import { postRequest, http } from "@fe-lq/micro-kit";
http.defaults.baseURL = process.env.BASE_URL;

export const deleteFile = postRequest<{ filePath: string }>("/files/delete");
export const updateFile = postRequest<{ filePath: string }>("/files/upload");
