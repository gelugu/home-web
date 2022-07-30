import { User } from "../user";

export interface CreateTaskDto {
  name: string;
  description?: string;
  open?: boolean
}

export interface UpdateTaskDto {
  name?: string;
  description?: string;
  open?: boolean
}
