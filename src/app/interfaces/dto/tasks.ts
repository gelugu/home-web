export interface CreateTaskDto {
  name: string;
  track_id: string;
  description?: string;
  parent_id?: string;
  due_date?: number;
  schedule_date?: number;
}

export interface UpdateTaskDto {
  name?: string;
  description?: string;
  open?: boolean;
  parent_id?: string;
  due_date?: number;
  schedule_date?: number;
}
