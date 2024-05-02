import Loading from "@/app/loading";
import { Project, Task } from "@/types/project";
import { DatePicker, Modal } from "antd";
import React, { useState } from "react";
import Input from "./Input";
import { MdDelete } from "react-icons/md";
import { useProjectStore } from "@/app/zustand/projects";

interface EditProjectModalProps {
  handleOk: () => void;
  confirmLoading: boolean;
  handleCancel: () => void;
  open: boolean;
  task: Task;
  projectId: number;
  users: any;
}

type Inputs = {
  title: string;
  description: string;
};

const EditTaskModal = ({
  handleOk,
  confirmLoading,
  handleCancel,
  task,
  open,
  projectId,
  users,
}: EditProjectModalProps) => {
  const [loading, setLoading] = useState(false);
  const [taskDate, setTaskDate] = useState(null);
  const projects = useProjectStore((state: any) => state.projects);
  const setProjects = useProjectStore((state: any) => state.setProjects);

  const onChange = (date: any, dateString: any) => {
    console.log(date.$d, dateString);
    setTaskDate(date.$d);
  };

  const handleUpdateTask = (e: any) => {
    e.preventDefault();
    const projectIndex = projects.findIndex(
      (project: Project) => project.project_id === projectId
    );

    if (projectIndex !== -1) {
      const taskIndex = projects[projectIndex].tasks.findIndex(
        (t: any) => t.task_id === task.task_id
      );
      const newTask = {
        task_id: task.task_id,
        task_title:
          e.target.title.value == "" ? task.task_title : e.target.title.value,
        task_description:
          e.target.description.value == ""
            ? task.task_description
            : e.target.description.value,
        task_status: { status_id: task.task_status.status_id },
        assign_to: [e.target.user.value],
        deadline: taskDate ? taskDate : task.deadline,
      };
      if (taskIndex !== -1) {
        const updatedProject = { ...projects[projectIndex] };

        updatedProject.tasks[taskIndex] = { ...newTask };

        const updatedProjects = [...projects];

        updatedProjects[projectIndex] = updatedProject;

        setProjects(updatedProjects);
        handleOk();
      } else {
        console.error("Task not found");
      }
    } else {
      console.error("Project not found");
    }
  };

  if (loading) return <Loading />;
  return (
    <div>
      <>
        <Modal
          open={open}
          confirmLoading={confirmLoading}
          onCancel={handleCancel}>
          <div>
            <p className="text-center font-bold text-3xl">{task.task_title}</p>
            <form action="" onSubmit={handleUpdateTask} className="mt-6 w-full">
              <Input
                defaultValue={task.task_title}
                type="text"
                name="title"
                placeholder="Enter task name"
                className="my-3 w-full bg-[#22272B] placeholder:text-white text-white"
              />
              <Input
                defaultValue={task.task_description}
                type="text"
                name="description"
                placeholder="Enter description"
                className="my-3 w-full bg-[#22272B] placeholder:text-white text-white"
              />
              <div className="my-3 flex justify-between">
                <DatePicker
                  onChange={onChange}
                  style={{
                    padding: "12px",
                    backgroundColor: "#22272B",
                    color: "#fffff",
                    textDecorationColor: "#ffff",
                  }}
                />
                <select
                  name="user"
                  id=""
                  className="p-3 rounded-lg bg-[#22272B] placeholder:text-white text-white">
                  {users?.map((user: any) => {
                    return (
                      <option key={user.id} value={user.id}>
                        {user.name}
                      </option>
                    );
                  })}
                </select>
              </div>
              <Input
                type="submit"
                value="Update Task"
                className="w-full my-4 cursor-pointer bg-blue-500"
              />
            </form>
          </div>
        </Modal>
      </>
    </div>
  );
};

export default EditTaskModal;
