import { Project } from "@/types/project";
import { Button } from "antd";
import React, { useState } from "react";
import EditProjectModal from "./Shared/EditProjectModal";
import { CiEdit } from "react-icons/ci";
import { useRouter } from "next/navigation";
interface Props {
  project: Project;
  handleDelete: (id: number) => void;
  setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
  projects: Project[];
}

const ProjectCard = ({
  project,
  handleDelete,
  setProjects,
  projects,
}: Props) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("Content of the modal");

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setModalText("The modal will be closed after two seconds");
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };
  return (
    <>
      <div className="bg-white p-3 rounded-lg shadow-lg h-[200px]">
        <p className="text-bold text-3xl text-center h-[80px]">
          {project.title}
        </p>
        <hr />
        <p>{project.description}</p>
        <div className="flex justify-around">
          <Button
            onClick={() =>
              router.push(`/dashboard/project/${project.project_id}`)
            }
            type="primary">
            View
          </Button>
          {/* <Button style={{ backgroundColor: "rgb(34 197 94)" }} type="primary">
            Edit
          </Button> */}
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
          <Button danger onClick={() => handleDelete(project.project_id)}>
            Delete
          </Button>
        </div>
      </div>
      <EditProjectModal
        open={open}
        handleCancel={handleCancel}
        handleOk={handleOk}
        project={project}
        confirmLoading={confirmLoading}
        setProjects={setProjects}
        projects={projects}
      />
    </>
  );
};

export default ProjectCard;
