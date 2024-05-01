export type Task = {
  task_id: number;
  task_title: string;
  task_description: string;
  task_status: { status_id: number };
  assign_to: number[];
  deadline: string;
};

type RecentActivity = {
  status_id: number;
  date: string;
};

export type Project = {
  project_id: number;
  title: string;
  description: string;
  tasks: Task[];
  recent_activities: RecentActivity[];
  member: number[];
};

type ProjectsData = Project[];
