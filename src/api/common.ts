import { postRequest } from "@/request";

export const deleteFile = postRequest<{ filePath: string }>("/files/delete");
export const updateFile = postRequest<{ filePath: string }>("/files/upload");
