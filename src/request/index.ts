import axios, { AxiosRequestConfig } from "axios";
type requestType = "post" | "delete" | "get" | "patch" | "put";

const request = axios.create({
  baseURL: process.env.BASE_URL,
  timeout: 5000,
});

request.interceptors.request.use(
  (config) => {
    config.headers.Authorization = `Bearer ${window.localStorage.rawStorage.getItem(
      "token",
    )}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

request.interceptors.response.use(
  (resolve) => {
    // 只要拥有有新token就重新设置
    if (resolve.headers["refresh-token"]) {
      localStorage.rawStorage.setItem(
        "token",
        resolve.headers["refresh-token"],
      );
    }
    return resolve.data;
  },
  (error) => {
    if (error.response?.status === 401 || error.response?.status === 403) {
      window.location.replace("/login");
    } else if (error.response?.status === 405) {
      return Promise.reject({ message: "请求方法不对" });
    }
    return Promise.reject(error.response?.data);
  },
);

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
