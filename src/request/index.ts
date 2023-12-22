import axios, { AxiosRequestConfig } from "axios";

const request = axios.create({
  baseURL: process.env.BASE_URL,
  timeout: 5000,
});
type requestType = "post" | "delete" | "get" | "patch" | "put";
const createHttp = (type: requestType) => {
  return <P = unknown, R = any>(url: string) => {
    return async (params?: P, config?: AxiosRequestConfig) => {
      const paramsKey = type === "get" || type === "delete" ? "params" : "data";
      return request<
        P,
        {
          code: number;
          data: R;
          message: string;
        }
      >({
        method: type,
        url,
        [paramsKey]: params,
        ...config,
      });
    };
  };
};

export const postRequest = createHttp("post");
export const getRequest = createHttp("get");
export const deleteRequest = createHttp("delete");
export const patchRequest = createHttp("patch");
export const putRequest = createHttp("put");
