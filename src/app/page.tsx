"use client";
import React from "react";
import { useStore } from "./zustand/store";

export default function Home() {
  const bears = useStore((state: any) => state.bears);
  const increaseBears = useStore((state: any) => state.increasePopulation);
  return (
    <main>
      Bears: {bears}
      <button onClick={() => increaseBears(1)}>Increase</button>
    </main>
  );
}
