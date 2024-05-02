import { Task } from "@/types/project";
import { Button } from "antd";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { CiEdit } from "react-icons/ci";
import { FaCircleUser } from "react-icons/fa6";
import EditTaskModal from "./Shared/EditTaskModal";

type TaskCardProps = {
  task: Task;
  index: number;
  users?: any;
  handleTaskDelete: (taskId: number, projectId: number) => void;
};

const TaskCard = ({ task, index, users, handleTaskDelete }: TaskCardProps) => {
  const param: Params = useParams();
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 1000);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };
  return (
    <Draggable draggableId={task.task_id.toString()} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className="bg-[#22272B] my-5 p-5 rounded-2xl w-11/12 mx-auto cursor-pointer transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300 text-white">
          <p className="text-2xl font-bold text-center">{task?.task_title}</p>
          <p className="text-center">{task?.task_description}</p>
          <div className="flex justify-center items-center gap-3 border border-black">
            <FaCircleUser />
            {users.find((user: any) => user.id == task.assign_to).name}
          </div>
          <p>Deadline: {task.deadline}</p>
          <div className="flex justify-around">
            <Button
              type="primary"
              style={{
                display: "flex",
                justifyContent: "space-around",
                gap: "10px",
                backgroundColor: "rgb(34 197 94)",
              }}
              onClick={showModal}>
              <CiEdit />
              <span>Edit</span>
            </Button>
            <Button
              danger
              onClick={() => handleTaskDelete(task.task_id, Number(param.id))}>
              Delete
            </Button>
          </div>
          <EditTaskModal
            open={open}
            handleOk={handleOk}
            handleCancel={handleCancel}
            task={task}
            users={users}
            projectId={Number(param.id)}
            confirmLoading={confirmLoading}
          />
        </div>
      )}
    </Draggable>
  );
};

export default TaskCard;
