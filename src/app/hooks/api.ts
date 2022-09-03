import { apiRoutes } from "../config";

import { SignUpDto, Task, User } from "../interfaces";
import {
  LoginCodeDto,
  LoginResponseDto,
  CreateTaskDto,
  UpdateTaskDto,
  LoginPasswordDto,
} from "../interfaces";
import { useRequest } from ".";
import { AppContext } from "../context";
import { useContext } from "react";

export const useApi = () => {
  const { error } = useContext(AppContext);
  const { get, post, put, remove } = useRequest();

  /**
   * Root
   */
  const getLoginPattern = async (): Promise<string> =>
    (await get<string>(apiRoutes.loginPattern)).data;
  const getPasswordPattern = async (): Promise<string> =>
    (await get<string>(apiRoutes.passwordPattern)).data;

  /**
   * Sign Up
   */
  const signUp = async (user: SignUpDto): Promise<User> =>
    (await post(apiRoutes.signup, user)).data as User;

  /**
   * Login
   */
  const sendCode = async () => get(apiRoutes.sendCode);
  const loginWithCode = async (
    loginDto: LoginCodeDto
  ): Promise<LoginResponseDto> =>
    (await post(apiRoutes.signinTelegram, loginDto))
      .data as unknown as LoginResponseDto;
  const loginWithPassword = async (
    loginDto: LoginPasswordDto
  ): Promise<LoginResponseDto> =>
    (await post(apiRoutes.signinPassword, loginDto))
      .data as unknown as LoginResponseDto;
  const status = async (customToken?: string): Promise<string> =>
    (await get<string>(apiRoutes.authStatus)).data;

  /**
   * Tasks
   */
  const getTasks = async (showHidden = false): Promise<Task[]> => {
    try {
      return (await get<Task[]>(apiRoutes.tasks, `hidden=${showHidden}`)).data;
    } catch ({ response }) {
      error("Can't load tasks", response.data);
      return []
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
      const task = await post<CreateTaskDto>(apiRoutes.tasks, body);
      return task.data as Task;
    } catch ({ message }) {
      error("Can't create tasks", message);
    }
  };
  const updateTask = async (id: string, body: UpdateTaskDto) => {
    try {
      // ToDo: delete unupdated props
      delete body["id"];
      delete body["create_date"];

      const task = await put<UpdateTaskDto>(`${apiRoutes.tasks}/${id}`, body);
      return task.data as Task;
    } catch ({ message }) {
      error("Can't update tasks", message);
    }
  };
  const deleteTask = async (id: string): Promise<Task> => {
    try {
      const task = await remove<Task>(`${apiRoutes.tasks}/${id}`);
      return task.data as Task;
    } catch ({ message }) {
      error("Can't update tasks", message);
    }
  };

  return {
    getLoginPattern,
    getPasswordPattern,
    signUp,
    status,
    sendCode,
    loginWithCode,
    loginWithPassword,
    createTask,
    updateTask,
    deleteTask,
    getTasks,
    getTask,
  };
};
