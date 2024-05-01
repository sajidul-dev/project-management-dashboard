"use client";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../loading";
import getProjects from "../../hooks/projects";
import ProjectCard from "@/app/components/ProjectCard";
import { Project } from "@/types/project";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const [projects, setProjects] = useState<Project[]>([]);

  const { data, isLoading, isError } = useQuery({
    queryFn: async () => await getProjects(),
    queryKey: ["projects"],
  });

  useEffect(() => {
    setProjects(data);
  }, [data]);
  if (isLoading) return <Loading />;
  if (isError) return <div>Sorry There was an Error</div>;

  const handleDelete = (id: number) => {
    const restProjects = projects.filter(
      (project) => project?.project_id !== id
    );
    console.log(restProjects, "Rest");
    setProjects(restProjects);
  };

  return (
    <div>
      <p className="text-4xl text-white font-bold pb-4">Project Overview</p>
      <div className="grid grid-cols-12 gap-6">
        {projects?.length > 0 &&
          projects.map((project: Project) => {
            return (
              <div key={project.project_id} className="col-span-3">
                <ProjectCard
                  project={project}
                  handleDelete={handleDelete}
                  setProjects={setProjects}
                  projects={projects}
                />
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Dashboard;
