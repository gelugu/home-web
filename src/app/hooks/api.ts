import { useRouter } from "next/router";
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
  const { token, error } = useContext(AppContext);
  const { get, post, put, remove } = useRequest({ token });

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
    (await post(apiRoutes.loginWithCode, loginDto))
      .data as unknown as LoginResponseDto;
  const loginWithPassword = async (
    loginDto: LoginPasswordDto
  ): Promise<LoginResponseDto> =>
    (await post(apiRoutes.loginWithPassword, loginDto))
      .data as unknown as LoginResponseDto;
  const status = async (): Promise<string> =>
    (await get<string>(apiRoutes.status)).data;

  /**
   * Tasks
   */
  const getTasks = async (showHidden = false): Promise<Task[]> => {
    const tasks = await get<Task[]>(apiRoutes.tasks, `hidden=${showHidden}`);
    return tasks.data;
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
