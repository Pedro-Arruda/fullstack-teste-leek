export interface Task {
  id: string;
  title: string;
  description: string;
  status: string;
  createdAt: string;
  finishedAt: string;
  userId: string;
}

export interface FieldsTask {
  title: string;
  description: string;
  status: string;
  finishedAt: string;
}
