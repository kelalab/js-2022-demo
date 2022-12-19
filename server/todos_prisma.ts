import express from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = express.Router();
export default router;

router.get("/todos", async (req, res) => {
  const todos = await prisma.todos.findMany();
  res.json(todos);
});

router.post("/todos", async (req, res) => {
  let todo = req.body;
  const result = await prisma.todos.create({
    data: {
      todo: todo.todo,
      DONE: Number(todo.DONE),
    },
  });

  console.log("result", result);
  res.json(result);
});

router.put("/todos", async (req, res) => {
  let todo = req.body;
  const result = await prisma.todos.update({
    where: {
      id: todo.id,
    },
    data: {
      todo: todo.todo,
      DONE: Number(todo.DONE),
    },
  });
  console.log("update result", result);
  res.json(result);
});

router.delete("/todos", async (req, res) => {
  let todo = req.body;
  const result = await prisma.todos.delete({
    where: {
      id: todo.id,
    },
  });
  console.log("result", result);
  res.json(result);
});
