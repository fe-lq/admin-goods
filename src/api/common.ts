import { postRequest } from "@/request";

export const deleteFile = postRequest<{ filePath: string }>("/files/delete");
