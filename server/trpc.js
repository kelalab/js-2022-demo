import { initTRPC } from "@trpc/server";
var t = initTRPC.create();
export var middleware = t.middleware;
export var router = t.router;
export var publicProcedure = t.procedure;
