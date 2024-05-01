"use client";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../loading";
import getProjects from "../../hooks/projects";
import ProjectCard from "@/app/components/ProjectCard";
import { Project } from "@/types/project";

const Dashboard = () => {
  const { data, isLoading, isError } = useQuery({
    queryFn: async () => await getProjects(),
    queryKey: ["projects"],
  });

  if (isLoading) return <Loading />;
  if (isError) return <div>Sorry There was an Error</div>;
  console.log(data, "Data");
  return (
    <div>
      <p>Dashboard</p>
      <p>Data :{data?.length}</p>
      {data &&
        data.map((project: Project) => {
          return (
            <div key={project.project_id}>
              <ProjectCard project={project} />
            </div>
          );
        })}
    </div>
  );
};

export default Dashboard;
