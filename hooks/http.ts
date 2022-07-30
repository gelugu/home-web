import axios, { AxiosResponse } from "axios";
import { apiRoutes, routes } from "../config";

import { Task } from "../interfaces";
import {
  LoginDto,
  LoginResponseDto,
  CreateTaskDto,
  UpdateTaskDto,
} from "../interfaces/dto";

export const useHttp = (token?: string) => {
  const apiRoute = process.env.NEXT_PUBLIC_API_HOST;

  const headers = { Authorization: `Bearer ${token}` };
  const axiosConfig = { headers };

  const get = function <T>(
    route: string,
    ...querys: string[]
  ): Promise<AxiosResponse<T, any>> {
    let url = `${apiRoute}${route}`;

    if (querys.length) {
      url += `?${querys.join("&")}`;
    }

    return axios.get<T>(url, axiosConfig);
  };

  const post = function <T>(
    route: string,
    body: T,
    useAuth = true
  ): Promise<AxiosResponse<T, any>> {
    if (useAuth)
      return axios.post<T>(`${apiRoute}${route}`, body, axiosConfig);
    else return axios.post<T>(`${apiRoute}${route}`, body);
  };

  const put = function <T>(
    route: string,
    id: string,
    body: T
  ): Promise<AxiosResponse<T, any>> {
    return axios.put<T>(`${apiRoute}${route}/${id}`, body, axiosConfig);
  };

  const remove = function <T>(
    route: string,
    id: string
  ): Promise<AxiosResponse<T, any>> {
    return axios.delete<T>(`${apiRoute}${route}/${id}`, axiosConfig);
  };

  /**
   * Login
   */
  const login = async (loginDto: LoginDto) => post<LoginResponseDto>(apiRoutes.login, loginDto);

  /**
   * Tasks
   */
  const getTasks = () => get<Task[]>(apiRoutes.tasks);
  const getTask = (id: string) => get<Task>(`${apiRoutes.tasks}/${id}`);
  const createTask = (body: Task) => post<Task>(apiRoutes.tasks, body);
  const updateTask = (id: string, body: UpdateTaskDto) =>
    put<UpdateTaskDto>(apiRoutes.tasks, id, body);
  const deleteTask = (id: string) => remove<Task>(apiRoutes.tasks, id);

  return {
    login,
    createTask,
    updateTask,
    deleteTask,
    getTasks,
    getTask,
  };
};
