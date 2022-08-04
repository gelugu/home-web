export interface CreateTaskDto {
  name: string;
  description?: string;
}

export interface UpdateTaskDto {
  name?: string;
  description?: string;
  open?: boolean;
}
