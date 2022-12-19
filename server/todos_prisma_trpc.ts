import { PrismaClient } from "@prisma/client";
import { router, publicProcedure } from "./trpc";
import { z } from "zod";

const prisma = new PrismaClient();

const todoRouter = router({
  create: publicProcedure
    .input(z.object({ todo: z.string(), DONE: z.boolean() }))
    .mutation(async ({ input }) => {
      console.log("input", input);
      const result = await prisma.todos.create({
        data: {
          todo: input?.todo,
          DONE: Number(input?.DONE),
        },
      });
      console.log("result", result);
      return result;
    }),
  list: publicProcedure.query(async () => {
    const todos = await prisma.todos.findMany();
    return todos;
  }),
  update: publicProcedure
    .input(z.object({ id: z.number(), todo: z.string(), DONE: z.boolean() }))
    .mutation(async ({ input }) => {
      const result = await prisma.todos.update({
        where: {
          id: input.id,
        },
        data: {
          todo: input.todo,
          DONE: Number(input.DONE),
        },
      });
      return result;
    }),
  delete: publicProcedure
    .input(z.object({ id: z.number(), todo: z.string(), DONE: z.boolean() }))
    .mutation(async ({ input }) => {
      const result = await prisma.todos.delete({
        where: {
          id: input.id,
        },
      });
    }),
});

export default todoRouter;
