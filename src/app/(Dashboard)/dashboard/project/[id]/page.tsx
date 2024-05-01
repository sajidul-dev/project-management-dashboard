import React from "react";

type ProjectDetailsProps = {
  params: { id: string };
};

const ProjectDetails = ({ params }: ProjectDetailsProps) => {
  console.log(params.id);
  return <div>hi</div>;
};

export default ProjectDetails;
