import { apiRoutes } from "../config";

import { Task } from "../interfaces";
import {
  LoginDto,
  LoginResponseDto,
  CreateTaskDto,
  UpdateTaskDto,
  TelegramUserDto,
} from "../interfaces";
import { useRequest } from ".";
import { AppContext } from "../context";
import { useContext } from "react";

export const useApi = () => {
  const { token, error } = useContext(AppContext);
  const { get, post, put, remove } = useRequest({ token });

  /**
   * Registration
   */
  const status = async () => get(apiRoutes.status);
  const registerBot = async (token: string) =>
    post<TelegramUserDto>(apiRoutes.registerBot, { token });
  const registerChat = async (chat: string) =>
    post<TelegramUserDto>(apiRoutes.registerChat, { chat });
  const getChat = async () => get<TelegramUserDto>(apiRoutes.registerChat);

  /**
   * Login
   */
  const sendCode = async () => get(apiRoutes.sendCode);
  const login = async (loginDto: LoginDto) =>
    post<LoginResponseDto>(apiRoutes.login, loginDto);

  /**
   * Tasks
   */
  const getTasks = async (): Promise<Task[]> => {
    try {
      const tasks = await get<Task[]>(apiRoutes.tasks);
      return tasks.data;
    } catch ({ message }) {
      error("Can't load tasks", message);
      return [];
    }
  };
  const getTask = async (id: string): Promise<Task> => {
    try {
      const task = await get<Task>(`${apiRoutes.tasks}/${id}`);
      return task.data;
    } catch ({ message }) {
      error("Can't load tasks", message);
    }
  };
  const createTask = async (body: CreateTaskDto): Promise<Task> => {
    try {
      const task = await post<CreateTaskDto>(apiRoutes.tasksCreate, body);
      return task.data as Task;
    } catch ({ message }) {
      error("Can't create tasks", message);
    }
  };
  const updateTask = async (id: string, body: UpdateTaskDto) => {
    try {
      // ToDo: delete unupdated props
      delete body["id"] 
      delete body["create_date"]

      const task = await put<UpdateTaskDto>(`${apiRoutes.tasks}/${id}`, body);
      return task.data as Task;
    } catch ({ message }) {
      error("Can't update tasks", message);
    }
  }
  const deleteTask = async (id: string): Promise<Task> => {
    try {
      const task = await remove<Task>(`${apiRoutes.tasks}/${id}`);
      return task.data as Task;
    } catch ({ message }) {
      error("Can't update tasks", message);
    }
  }

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
