import express from "express";
import * as trpcExpress from "@trpc/server/adapters/express";
import todos from "./todos";
import todosRouter from "./todos_prisma_trpc";
import { router } from "./trpc";
var port = 8080;
var createContext = function (_a) {
    var req = _a.req, res = _a.res;
    return ({});
}; // no context
var appRouter = router({
    todos: todosRouter
});
var app = express();
app.use(express.json());
app.use("/trpc", trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext: createContext
}));
app.use(todos);
app.use(express.static("../solid/dist"));
app.listen(port, function () {
    console.log("backend listening at port ".concat(port));
});
