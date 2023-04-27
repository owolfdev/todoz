import React from "react";
import AddTodo from "../components/AddTodo";

const DocsPage = () => {
  return (
    <div>
      <h2 className="mb-4 text-3xl font-bold">How to use Todos App</h2>
      <div>
        <div className="flex flex-col space-y-2">
          <h3>Introduction:</h3>
          <p>
            The Todo App is a web-based application that allows users to create
            and manage todo lists. It provides a simple and intuitive user
            interface that makes it easy to add, update, and delete tasks. Users
            can log in and view todos assigned to them, and can also mark them
            as completed. The app provides a comprehensive list of features that
            make it an ideal tool for managing tasks.
          </p>

          <h3>Authentication:</h3>
          <p>
            Users are required to sign in to use the Todo App. If their email
            address is authorized, they will be logged in. The app supports
            authentication using email and password or through third-party
            providers like Google or Facebook. Once logged in, users can view
            their assigned tasks.
          </p>

          <h3>View Todos:</h3>
          <p>
            The main page of the Todo App displays all the todos assigned to the
            user. The page contains a list of todos with their title, due date,
            and a short description. Each todo has a checkbox next to it
            indicating whether it is complete or not. If the user has not
            interacted with the todo, a raised hand icon will be displayed next
            to their name. However, if the user has interacted with the todo, a
            check mark will be displayed instead. This suggests that the user
            has acknowledged the todo.
          </p>

          <h3>Add Notes and Images:</h3>
          <p>
            Users can add notes and images to a todo by clicking on it. This
            opens a new page that allows the user to add additional details
            about the task. Users can write notes and upload images to provide
            more information about the todo.
          </p>
        </div>
        <div>
          <h3>Set as Complete:</h3>
          <p>
            Once a todo is complete, users can click the "Done" button to set
            the todo in the Completed state. This removes it from the list of
            todos and archives it for future reference.
          </p>
        </div>
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
