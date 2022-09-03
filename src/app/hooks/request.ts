import axios, { AxiosResponse } from "axios";
import { useContext } from "react";
import { AppContext } from "../context";

export const useRequest = () => {
  const { token } = useContext(AppContext);
  const apiRoute = process.env.NEXT_PUBLIC_API_HOST;

  const headers = { Authorization: `Bearer ${token}` };
  const axiosConfig = { headers };

  const get = function <T>(
    route: string,
    ...queries: string[]
  ): Promise<AxiosResponse<T, any>> {
    let url = `${apiRoute}${route}`;

    if (queries.length) {
      url += `?${queries.join("&")}`;
    }

    return axios.get<T>(url, axiosConfig);
  };

  const post = function <T>(
    route: string,
    body: T,
    useAuth = true
  ): Promise<AxiosResponse<T, any>> {
    if (useAuth) return axios.post<T>(`${apiRoute}${route}`, body, axiosConfig);
    else return axios.post<T>(`${apiRoute}${route}`, body);
  };

  const put = function <T>(
    route: string,
    body: T
  ): Promise<AxiosResponse<T, any>> {
    return axios.put<T>(`${apiRoute}${route}`, body, axiosConfig);
  };

  const remove = function <T>(
    route: string
  ): Promise<AxiosResponse<T, any>> {
    return axios.delete<T>(`${apiRoute}${route}`, axiosConfig);
  };

  return {
    get,
    put,
    post,
    remove,
  };
};
