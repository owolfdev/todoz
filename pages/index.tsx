import React from "react";
import Layout from "../components/Layout";
import TodoList from "../components/TodoList";
import AGGrid from "../components/AGGrid";
import AGGridCompleted from "../components/AGGrid_completed";
import Link from "next/link";

const Home: React.FC = () => {
  return (
    <div>
      <div className="mb-4">
        <Link href="/add-todo">Add Todo</Link>
      </div>
      <div>
        <h1 className="mb-4 text-4xl font-bold">Todos</h1>
        <AGGrid path="/" />
      </div>
      <div className="mt-5">
        <h1 className="mb-4 text-4xl font-bold">Completed Todos</h1>
        <AGGridCompleted path="/completed" />
      </div>
    </div>
  );
};

export default Home;
