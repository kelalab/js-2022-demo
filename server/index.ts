import express from "express";
import * as trpcExpress from "@trpc/server/adapters/express";
import todos from "./todos";
import todosRouter from "./todos_prisma_trpc";
import { router } from "./trpc";

const port = 8080;

const createContext = ({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) => ({}); // no context

const appRouter = router({
  todos: todosRouter,
});
export type AppRouter = typeof appRouter;

const app = express();
app.use(express.json());

app.use(
  "/trpc",
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
  })
);
app.use(todos);

app.use(express.static("../solid/dist"));

app.listen(port, () => {
  console.log(`backend listening at port ${port}`);
});
