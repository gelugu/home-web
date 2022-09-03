export interface CreateTaskDto {
  name: string;
  user_id: string;
  description?: string;
  parent_id?: string;
  due_date?: number;
  schedule_date?: number;
}

export interface UpdateTaskDto {
  name?: string;
  user_id?: string;
  description?: string;
  open?: boolean;
  parent_id?: string;
  due_date?: number;
  schedule_date?: number;
  hidden?: boolean;
}
