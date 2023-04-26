import { useRouter } from "next/router";
import { useEffect, useState, ChangeEvent } from "react";

type Todo = {
  id: string;
  created_at: string;
  due_date: string;
  title: string;
  description: string;
  images: string[];
  completed: boolean;
  assigned_to: string;
  notes: string | null;
};

const TodoPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [todo, setTodo] = useState<Todo | null>(null);
  const [updateNotesTimeout, setUpdateNotesTimeout] = useState<number | null>(
    null
  );
  const [notes, setNotes] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTodo() {
      if (typeof id === "string") {
        const res = await fetch(`/api/todo?id=${id}`);
        const data: Todo = await res.json();
        setTodo(data);
      }
    }

    if (id) {
      fetchTodo();
    }
  }, [id]);

  const updateNotes = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const newNotes = event.target.value;
    setNotes(newNotes);

    if (updateNotesTimeout) {
      clearTimeout(updateNotesTimeout);
    }

    setUpdateNotesTimeout(
      window.setTimeout(async () => {
        if (todo && typeof id === "string") {
          const response = await fetch("/api/updateTodo", {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ ...todo, id, notes: newNotes }),
          });

          if (response.ok) {
            setTodo({ ...todo, notes: newNotes });
          }
        }
      }, 500)
    );
  };

  const getBackgroundColor = (dueDate: string, completed: boolean): string => {
    const now = new Date();
    const due = new Date(dueDate);
    const timeDiff = due.getTime() - now.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

    if (completed) {
      return "lightgray";
    }

    if (daysDiff < 0) {
      return "red";
    } else if (daysDiff <= 2) {
      return "deeppink";
    } else if (daysDiff <= 5) {
      return "orange";
    } else if (daysDiff <= 10) {
      return "yellow";
    } else {
      return "lightgreen";
    }
  };

  const getStatus = (dueDate: string, completed: boolean): string => {
    const backgroundColor = getBackgroundColor(dueDate, completed);

    switch (backgroundColor) {
      case "red":
        return "Over-due";
      case "deeppink":
        return "Urgent";
      case "orange":
        return "In Queue";
      case "yellow":
        return "Coming Up";
      case "lightgreen":
        return "Not Urgent";
      case "lightgray":
        return "Completed";
      default:
        return "";
    }
  };

  return (
    <div>
      {todo && (
        <div
          style={{
            border: "2px solid #ccc",
            padding: "1rem",
            borderRadius: "10px",
          }}
        >
          <div className="mb-4">
            <h2 className="text-3xl font-bold">{todo.title}</h2>
            <button
              className="px-2 bg-gray-200 border border-gray-300 rounded hover:text-gray-600"
              onClick={() => router.push(`/edit/${id}`)}
            >
              Edit
            </button>
          </div>
          <p>
            <strong>Assigned to:</strong> {todo.assigned_to}
          </p>
          <p>
            <strong>Created:</strong>{" "}
            {new Date(todo.created_at).toLocaleDateString()}
          </p>
          <p>
            <strong>Due date:</strong>{" "}
            {new Date(todo.due_date).toLocaleDateString()}
          </p>
          <p>
            <strong>Status:</strong>{" "}
            <span
              className="px-1 rounded"
              style={{
                backgroundColor: getBackgroundColor(
                  todo.due_date,
                  todo.completed
                ),
              }}
            >
              {getStatus(todo.due_date, todo.completed)}
            </span>
          </p>
          <p>
            <strong>Completed:</strong>{" "}
            {todo.completed ? (
              <button className="px-2 bg-gray-200 border border-gray-300 rounded hover:text-gray-600">
                Yes
              </button>
            ) : (
              <button className="px-2 bg-gray-200 border border-gray-300 rounded hover:text-gray-600">
                No
              </button>
            )}
          </p>
          <div className="mt-4">
            {" "}
            <p>
              <strong>Description:</strong> {todo.description}
            </p>
          </div>
          <div className="flex flex-col mt-4">
            <label htmlFor="notes">
              <strong>Notes:</strong>
            </label>
            <textarea
              id="notes"
              rows={6}
              cols={40}
              value={
                notes !== null ? notes : todo.notes !== null ? todo.notes : ""
              }
              onChange={updateNotes}
              style={{ resize: "none" }}
              className="px-3 py-2 border border-gray-300 rounded-md"
              placeholder="Provide links, feedback, or additonal information here..."
            ></textarea>
          </div>
          <div>
            <button className="px-2 mt-4 bg-gray-200 border border-gray-300 rounded hover:text-gray-600">
              Add Image
            </button>
          </div>
          {todo.images.length > 0 && (
            <div className="mt-12">
              <ul>
                {todo.images.map((image, index) => (
                  <li key={index}>
                    <img src={image} alt={`Image ${index + 1}`} />
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TodoPage;
