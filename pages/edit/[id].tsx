import { useRouter } from "next/router";
import { useEffect, useState, ChangeEvent, FormEvent } from "react";

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

const EditTodoPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [todo, setTodo] = useState<Todo | null>(null);

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

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (todo) {
      await fetch("/api/updateTodo", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(todo),
      });
      router.push(`/todo/${id}`);
    }
  };

  const handleChange = (
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
    field: keyof Todo
  ) => {
    const newValue = event.target.value;
    if (todo) {
      setTodo({ ...todo, [field]: newValue });
    }
  };

  const handleCancel = () => {
    if (id) {
      router.push(`/todo/${id}`);
    }
  };

  return (
    <div>
      {todo && (
        <form
          onSubmit={handleSubmit}
          style={{
            border: "2px solid #ccc",
            padding: "1rem",
            borderRadius: "10px",
          }}
        >
          <h2 className="mb-4 text-3xl font-bold">
            <input
              type="text"
              value={todo.title}
              onChange={(e) => handleChange(e, "title")}
              className="text-3xl font-bold border-none focus:ring-0"
            />
          </h2>

          {/* Assigned_to */}
          <p>
            <strong>Assigned to:</strong>
          </p>
          <input
            type="text"
            value={todo.assigned_to}
            onChange={(e) => handleChange(e, "assigned_to")}
            className="w-full p-2 text-gray-900 border-2 border-gray-400 rounded"
          />

          {/* Due_date */}
          <p className="mt-4">
            <strong>Due date:</strong>
          </p>
          <input
            type="date"
            value={todo.due_date}
            onChange={(e) => handleChange(e, "due_date")}
            className="w-full p-2 text-gray-900 border-2 border-gray-400 rounded"
          />

          {/* Description */}
          <p className="mt-4">
            <strong>Description:</strong>
          </p>
          <textarea
            value={todo.description}
            onChange={(e) => handleChange(e, "description")}
            className="w-full p-2 text-gray-900 border-2 border-gray-400 rounded"
          />

          {/* Submit and Cancel buttons */}
          <div className="flex mt-4 space-x-4">
            <button
              type="submit"
              className="px-4 py-2 font-semibold text-white bg-green-500 rounded"
            >
              Submit
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="px-4 py-2 font-semibold text-white bg-red-500 rounded"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default EditTodoPage;
