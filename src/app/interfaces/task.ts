export interface Task {
  id: string;
  name: string;
  user_id: string;
  create_date: number;
  description: string;
  open: boolean;
  parent_id?: string;
  due_date?: number;
  schedule_date?: number;
}

export const emptyTask: Task = {
  id: "",
  name: "",
  user_id: "",
  create_date: Date.now(),
  description: "",
  open: true,
  parent_id: "",
  due_date: null,
  schedule_date: null,
};
