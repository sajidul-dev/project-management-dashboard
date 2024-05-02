"use client";
import Input from "@/app/components/Shared/Input";
import TaskCard from "@/app/components/TaskCard";
import Loading from "@/app/loading";
import { useProjectStore } from "@/app/zustand/projects";
import { useTaskStore } from "@/app/zustand/tasks";
import { Project, Task } from "@/types/project";
import { uuid } from "uuidv4";
import React, { useEffect, useState } from "react";
import { DragDropContext, DropResult, Droppable } from "react-beautiful-dnd";
import { DatePicker } from "antd";
import { useQuery } from "@tanstack/react-query";
import getUsers from "@/app/hooks/users";

type ProjectDetailsProps = {
  params: { id: string };
};

const ProjectDetails = ({ params }: ProjectDetailsProps) => {
  const [filteredTask, setFilteredTask] = useState<Task[]>([]);

  const [project, setProject] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const [taskDate, setTaskDate] = useState(null);
  const projects = useProjectStore((state: any) => state.projects);
  const setProjects = useProjectStore((state: any) => state.setProjects);
  const fetchProjects = useProjectStore((state: any) => state.fetch);
  const toDo = useTaskStore((state: any) => state.toDo);
  const setToDo = useTaskStore((state: any) => state.setToDo);
  const inProgress = useTaskStore((state: any) => state.inProgress);
  const setInProgress = useTaskStore((state: any) => state.setInProgress);
  const done = useTaskStore((state: any) => state.done);
  const setDone = useTaskStore((state: any) => state.setDone);

  const { data, isLoading, isError } = useQuery({
    queryFn: async () => await getUsers(),
    queryKey: ["users"],
  });

  useEffect(() => {
    const result = fetchProjects("/data.json");
  }, [fetchProjects]);

  useEffect(() => {
    setLoading(true);
    const findedProject = projects.find(
      (p: Project) => p.project_id === Number(params.id)
    );
    setProject(findedProject);
    if (findedProject) {
      const newToDo = findedProject.tasks.filter(
        (task: Task) => task.task_status.status_id == 1
      );
      setToDo(newToDo);
      const newInProgress = findedProject.tasks.filter(
        (task: Task) => task.task_status.status_id == 2
      );
      setInProgress(newInProgress);
      const newDone = findedProject.tasks.filter(
        (task: Task) => task.task_status.status_id == 3
      );
      setDone(newDone);
    }
    setLoading(false);
  }, [projects]);

  const onDragEnd = (result: DropResult) => {
    const { destination, source } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    let add;
    let active = toDo;
    let running = inProgress;
    let complete = done;

    if (source.droppableId === "ToDosList") {
      add = active[source.index];
      active.splice(source.index, 1);
    } else if (source.droppableId === "InProgress") {
      add = running[source.index];
      running.splice(source.index, 1);
    } else {
      add = complete[source.index];
      complete.splice(source.index, 1);
    }

    if (destination.droppableId === "ToDosList") {
      active.splice(destination.index, 0, add);
    } else if (destination.droppableId === "InProgress") {
      running.splice(destination.index, 0, add);
    } else {
      complete.splice(destination.index, 0, add);
    }

    setDone(complete);
    setInProgress(running);
    setToDo(active);
  };

  const onChange = (date: any, dateString: any) => {
    setTaskDate(dateString);
  };

  const handleAddTask = (e: any) => {
    e.preventDefault();
    const newTask = {
      task_id: uuid(),
      task_title: e.target.title.value,
      task_description: e.target.description.value,
      task_status: { status_id: 1 },
      assign_to: [e.target.user.value],
      deadline: taskDate,
    };
    setProjects(
      projects.map((p: Project) => {
        if (p.project_id === project.project_id) {
          return {
            ...project,
            tasks: [...project.tasks, newTask],
          };
        }
        return p;
      })
    );
  };

  const handleTaskDelete = (taskId: number, projectId: number) => {
    const projectIndex = projects.findIndex(
      (project: Project) => project.project_id === projectId
    );

    if (projectIndex !== -1) {
      const taskIndex = projects[projectIndex].tasks.findIndex(
        (task: Task) => task.task_id === taskId
      );

      if (taskIndex !== -1) {
        const updatedProject = { ...projects[projectIndex] };

        updatedProject.tasks.splice(taskIndex, 1);

        const updatedProjects = [...projects];

        updatedProjects[projectIndex] = updatedProject;

        setProjects(updatedProjects);
      } else {
        console.error("Task not found");
      }
    } else {
      console.error("Project not found");
    }
  };

  const handleSearch = (e: any) => {
    e.preventDefault;
    const searchKey = e.target.value;
    const allTask = [...toDo, ...inProgress, ...done];
    const filtered = allTask.filter(
      (task) =>
        task.task_title.toLowerCase().includes(searchKey.toLowerCase()) ||
        task.task_description.toLowerCase().includes(searchKey.toLowerCase()) ||
        data.find((user: any) => {
          if (user.id == task.assign_to) {
            return user.name.toLowerCase().includes(searchKey.toLowerCase());
          }
        })
    );

    setFilteredTask(filtered);
  };

  if (loading || isLoading) return <Loading />;
  if (isError) return <div>Sorry There was an Error</div>;

  return (
    <div className="bg-[#8F3F65] h-full relative">
      <p className="text-3xl font-bold text-center">{project?.title}</p>
      <p className="text-center">{project?.description}</p>
      <div className="flex justify-center gap-6">
        <form action="" onSubmit={handleAddTask} className="mt-6">
          <Input
            type="text"
            name="title"
            placeholder="Enter task name"
            className="my-3 bg-[#22272B] placeholder:text-white text-white"
          />
          <Input
            type="text"
            name="description"
            placeholder="Enter description"
            className="bg-[#22272B] placeholder:text-white text-white"
          />
          <div className="my-3 flex justify-between">
            <DatePicker
              onChange={onChange}
              className="p-5"
              style={{
                padding: "12px",
                backgroundColor: "#22272B",
                color: "#fffff",
              }}
            />
            <select
              name="user"
              id=""
              className="p-3 rounded-lg bg-[#22272B] placeholder:text-white text-white">
              {data?.map((user: any) => {
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
            value="Add Task"
            className="w-full my-4 cursor-pointer bg-blue-500"
          />
        </form>
      </div>
      <div className="absolute right-5 top-5">
        <Input type="text" placeholder="Search Here" onChange={handleSearch} />
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-12 gap-6 mt-8 px-4 overflow-y-clip">
          <Droppable droppableId="ToDosList">
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="col-span-4 bg-[#101204] rounded-xl">
                <span className="text-white text-xl p-4">To do </span>
                {toDo?.map((task: Task, index: number) => {
                  return (
                    <TaskCard
                      index={index}
                      key={index}
                      task={task}
                      users={data}
                      handleTaskDelete={handleTaskDelete}
                    />
                  );
                })}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
          <Droppable droppableId="InProgress">
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="col-span-4 bg-[#101204] rounded-xl">
                <span className="text-white text-xl p-4 ">In Progress</span>
                {inProgress?.map((task: Task, index: number) => {
                  return (
                    <TaskCard
                      index={index}
                      key={index}
                      task={task}
                      users={data}
                      handleTaskDelete={handleTaskDelete}
                    />
                  );
                })}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
          <Droppable droppableId="Done">
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="col-span-4 bg-[#101204] rounded-xl">
                <span className="text-white text-xl p-4">Done</span>
                {done?.map((task: Task, index: number) => {
                  return (
                    <TaskCard
                      index={index}
                      key={index}
                      task={task}
                      users={data}
                      handleTaskDelete={handleTaskDelete}
                    />
                  );
                })}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      </DragDropContext>
    </div>
  );
};

export default ProjectDetails;
