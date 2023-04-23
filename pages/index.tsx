import React from "react";
import Layout from "../components/Layout";
import TodoList from "../components/TodoList";
import AGGrid from "../components/AGGrid";
import Link from "next/link";

const Home: React.FC = () => {
  return (
    <div>
      <div className="mb-4">
        <Link href="/add-todo">Add Todo</Link>
      </div>
      <AGGrid path="/" />
    </div>
  );
};

export default Home;
