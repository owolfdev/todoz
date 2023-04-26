// pages/api/createTodo.ts
import type { NextApiRequest, NextApiResponse } from "next";
import supabase from "../../lib/supabaseClient";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const {
      title,
      description,
      due_date,
      images,
      assigned_to,
      author,
      user_id,
    } = req.body;

    if (!title) {
      return res.status(400).json({ error: "Title is required" });
    }

    const { data, error } = await supabase
      .from("todos_for_todo_demo")
      .insert([
        { title, description, due_date, images, assigned_to, author, user_id },
      ]);

    if (error) {
      res.status(400).json({ error });
    } else {
      res.status(200).json(data && data[0]);
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
