import { getCookie, setCookie } from "@/lib/cookies";
import { getNewAccessToken } from "@/lib/utils";
import { ResponseSuccessType } from "@/types/common";
import axios from "axios";

const instance = axios.create();

instance.defaults.headers.post["Content-Type"] = "application/json";
instance.defaults.headers["Accept"] = "application/json";
instance.defaults.timeout = 60000;

// Add a request interceptor
instance.interceptors.request.use(
  async function (config) {
    // Do something before request is sent
    const accessToken = await getCookie("accessToken");
    console.log(accessToken);

    if (accessToken) {
      config.headers.Authorization = accessToken;
    }

    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    const responseObject: ResponseSuccessType<any> = {
      data: response?.data,
      meta: response?.data?.meta,
    };

    return responseObject;
  },
  async function (error) {
    const config = error?.config;
    if (error?.response?.status === 500 && !config?.sent) {
      config.sent = true;
      const response = await getNewAccessToken();
      const newAccessToken = response?.data?.data?.accessToken;
      // console.log("rahat", response);

      if (newAccessToken) {
        console.log("sikder");

        config.headers.Authorization = newAccessToken;
        console.log("newAccessToken", newAccessToken);
        await setCookie("accessToken", newAccessToken);

        return instance(config);
      }
    }

    return Promise.reject(error);
  }
);

export { instance };
