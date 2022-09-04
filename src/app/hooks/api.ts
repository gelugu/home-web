import { apiRoutes, routes } from "../config";

import {
  emptyProfile,
  SignUpDto,
  Task,
  UpdateUserDTO,
  User,
  UserProfile,
} from "../interfaces";
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
import { useRouter } from "next/router";

export const useApi = () => {
  const { error } = useContext(AppContext);
  const { get, post, put, remove } = useRequest();
  const { push } = useRouter();

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
  const status = async (): Promise<string> =>
    (await get<string>(apiRoutes.authStatus)).data;

  const logout = () => {
    localStorage.removeItem("token");
    push(routes.signin);
  };

  /**
   * Users
   */
  const getProfile = async (): Promise<UserProfile> => {
    try {
      return (await get<UserProfile>(apiRoutes.profile)).data;
    } catch ({ response }) {
      error("Can't load profile", response.data);
      return emptyProfile;
    }
  };
  const updateProfile = async (
    profile: UpdateUserDTO
  ): Promise<UserProfile> => {
    try {
      return (await put<UpdateUserDTO>(apiRoutes.profile, profile))
        .data as unknown as UserProfile;
    } catch ({ response }) {
      error("Can't update profile", response.data);
      return emptyProfile;
    }
  };

  /**
   * Tasks
   */
  const getTasks = async (): Promise<Task[]> => {
    try {
      return (await get<Task[]>(apiRoutes.tasks)).data;
    } catch ({ response }) {
      error("Can't load tasks", response.data);
      return [];
    }
  };
  const getTask = async (id: string): Promise<Task> => {
    try {
      const task = await get<Task>(`${apiRoutes.tasks}/${id}`);
      return task.data;
    } catch ({ response }) {
      error("Can't load tasks", response.data);
    }
  };
  const createTask = async (body: CreateTaskDto): Promise<Task> => {
    try {
      const task = await post<CreateTaskDto>(apiRoutes.tasks, body);
      return task.data as Task;
    } catch ({ response }) {
      error("Can't create tasks", response.data);
    }
  };
  const updateTask = async (id: string, body: UpdateTaskDto) => {
    try {
      // ToDo: delete unupdated props
      delete body["id"];
      delete body["create_date"];

      const task = await put<UpdateTaskDto>(`${apiRoutes.tasks}/${id}`, body);
      return task.data as Task;
    } catch ({ response }) {
      error("Can't update tasks", response.data);
    }
  };
  const deleteTask = async (id: string): Promise<Task> => {
    try {
      const task = await remove<Task>(`${apiRoutes.tasks}/${id}`);
      return task.data as Task;
    } catch ({ response }) {
      error("Can't update tasks", response.data);
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
    logout,
    getProfile,
    updateProfile,
    createTask,
    updateTask,
    deleteTask,
    getTasks,
    getTask,
  };
};
