import Loading from "@/app/loading";
import { Project, Task } from "@/types/project";
import { Button, Modal } from "antd";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Input from "./Input";
import { MdDelete } from "react-icons/md";

interface EditProjectModalProps {
  handleOk: () => void;
  confirmLoading: boolean;
  handleCancel: () => void;
  project: Project;
  open: boolean;
  setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
  projects: Project[];
}

type Inputs = {
  title: string;
  description: string;
};

const EditProjectModal = ({
  handleOk,
  confirmLoading,
  handleCancel,
  project,
  open,
  setProjects,
  projects,
}: EditProjectModalProps) => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setLoading(true);
    setProjects(
      projects.map((singleProject) => {
        if (singleProject.project_id === project.project_id) {
          return {
            ...project,
            title: data.title == "" ? project.title : data.title,
            description:
              data.description == "" ? project.description : data.description,
          };
        }
        return singleProject;
      })
    );
    setLoading(false);
    handleOk();
  };

  const handleDeleteTask = (projectId: number, taskId: number) => {
    const projectIndex = projects.findIndex(
      (project: Project) => project.project_id === projectId
    );

    if (projectIndex !== -1) {
      const taskIndex = projects[projectIndex].tasks.findIndex(
        (task: Task) => task.task_id === taskId
      );

      if (taskIndex !== -1) {
        const updatedTasks = [
          ...projects[projectIndex].tasks.slice(0, taskIndex),
          ...projects[projectIndex].tasks.slice(taskIndex + 1),
        ];

        const updatedProject = {
          ...projects[projectIndex],
          tasks: updatedTasks,
        };

        const updatedProjects = [
          ...projects.slice(0, projectIndex),
          updatedProject,
          ...projects.slice(projectIndex + 1),
        ];

        setProjects(updatedProjects);
      }
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
            <p className="text-center font-bold text-3xl">{project.title}</p>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="w-full flex flex-col gap-y-8 px-5 py-5">
              <Input
                register={register("title", {
                  required: {
                    value: true,
                    message: "Title is required",
                  },
                })}
                type="text"
                label="Title"
                defaultValue={project.title}
                placeholder="Type your project title"
                className="mt-4 w-full"
                error={errors.title?.message}
              />
              <Input
                register={register("description", {
                  required: {
                    value: true,
                    message: "Description is required",
                  },
                })}
                type="text"
                label="Description"
                defaultValue={project.description}
                placeholder="Type your project description"
                className="mt-4 w-full"
                error={errors.description?.message}
              />
              {project.tasks.length > 0 && (
                <div>
                  <p className="text-bold text-lg">Created Task</p>
                  <hr />
                  {project.tasks.map((task) => {
                    return (
                      <div key={task.task_id} className="flex justify-between">
                        <p>{task.task_title}</p>
                        <Button
                          onClick={() =>
                            handleDeleteTask(project.project_id, task.task_id)
                          }
                          type="text"
                          danger>
                          <MdDelete />
                        </Button>
                      </div>
                    );
                  })}
                </div>
              )}

              <Input
                type="submit"
                value="Confirm Changes"
                className="cursor-pointer w-full bg-blue-500 hover:bg-opacity-70"
              />
            </form>
          </div>
        </Modal>
      </>
    </div>
  );
};

export default EditProjectModal;
