import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const TodoPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [todo, setTodo] = useState(null);

  useEffect(() => {
    async function fetchTodo() {
      const res = await fetch(`/api/todo?id=${id}`);
      const data = await res.json();
      setTodo(data);
    }

    if (id) {
      fetchTodo();
    }
  }, [id]);

  return (
    <div>
      Todo page with ID: {id}
      {todo && <pre>{JSON.stringify(todo, null, 2)}</pre>}
    </div>
  );
};

export default TodoPage;
