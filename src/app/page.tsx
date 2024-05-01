"use client";
import React from "react";
import { useStore } from "./zustand/store";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const bears = useStore((state: any) => state.bears);
  const increaseBears = useStore((state: any) => state.increasePopulation);
  if (typeof window !== "undefined") {
    // Perform localStorage action
    const user = localStorage.getItem("user");
    if (user) {
      router.push("/dashboard");
    }
  }
  // async redirects() {
  //   return [
  //     {
  //       source: "/", // this path will be redirected to 404
  //       destination: "/login",
  //       permanent: true,
  //     },
  //   ];
  // },
  return <main></main>;
}
