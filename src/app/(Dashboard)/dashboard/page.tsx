"use client";
import { useQuery } from "@tanstack/react-query";
import getMovies from "../../hooks/projects";
import Loading from "../../loading";

const Dashboard = () => {
  const { data, isLoading, isError } = useQuery({
    queryFn: async () => await getMovies(),
    queryKey: ["projects"],
  });

  if (isLoading) return <Loading />;
  if (isError) return <div>Sorry There was an Error</div>;
  console.log(data, "Data");
  return (
    <div>
      <p>Dashboard</p>
      <p>Data :{data?.length}</p>
    </div>
  );
};

export default Dashboard;
