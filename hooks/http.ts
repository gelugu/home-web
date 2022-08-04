import axios, { AxiosResponse } from "axios";
import { apiRoutes, routes } from "../config";

import { Task } from "../interfaces";
import {
  LoginDto,
  LoginResponseDto,
  CreateTaskDto,
  UpdateTaskDto,
  TelegramUserDto,
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
   * Registration
   */
  const status = async () => get(apiRoutes.status);
  const registerBot = async (token: string) => post<TelegramUserDto>(
    apiRoutes.registerBot, { token }
  );
  const registerChat = async (chat: string) => post<TelegramUserDto>(
    apiRoutes.registerChat, { chat }
  );
  const getChat = async () => get<TelegramUserDto>(apiRoutes.registerChat);

  /**
   * Login
   */
  const sendCode = async () => get(apiRoutes.sendCode);
  const login = async (loginDto: LoginDto) => post<LoginResponseDto>(apiRoutes.login, loginDto);

  /**
   * Tasks
   */
  const getTasks = () => get<Task[]>(apiRoutes.tasks);
  const getTask = (id: string) => get<Task>(`${apiRoutes.tasks}/${id}`);
  const createTask = (body: CreateTaskDto) => post<Task>(apiRoutes.tasks, body);
  const updateTask = (id: string, body: UpdateTaskDto) =>
    put<Task>(apiRoutes.tasks, id, body);
  const deleteTask = (id: string) => remove<Task>(apiRoutes.tasks, id);

  return {
    status,
    registerBot,
    registerChat,
    getChat,
    sendCode,
    login,
    createTask,
    updateTask,
    deleteTask,
    getTasks,
    getTask,
  };
};
