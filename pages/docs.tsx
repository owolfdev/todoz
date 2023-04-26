import React from "react";
import AddTodo from "../components/AddTodo";

const DocsPage = () => {
  return (
    <div>
      <h2 className="mb-4 text-3xl font-bold">How to use Todos App</h2>

      <div>
        <h3 className="mb-2 text-xl font-bold">Todo Color Coding</h3>
        <p className="mb-2">
          Color-coded background highlights provide a visual cue for users to
          quickly identify and prioritize their tasks based on their deadlines
          and completion status.
        </p>
        <p className="mb-2">
          The background color of a todo item varies according to the following
          rules:
        </p>
        <ol className="pl-6 list-decimal list-outside">
          <li className="mb-2">
            If the todo item is marked as completed, its background color will
            be light gray.
          </li>
          <li className="mb-2">
            If the todo item is overdue (due date has already passed), its
            background color will be red.
          </li>
          <li className="mb-2">
            If the todo item is due within the next 2 days (including today),
            its background color will be deep pink.
          </li>
          <li className="mb-2">
            If the todo item is due within the next 5 days (excluding the
            previous category), its background color will be orange.
          </li>
          <li className="mb-2">
            If the todo item is due within the next 10 days (excluding the
            previous categories), its background color will be yellow.
          </li>
          <li className="mb-2">
            If the todo item is due more than 10 days from now, its background
            color will be light green.
          </li>
        </ol>
      </div>
    </div>
  );
};

export default DocsPage;
