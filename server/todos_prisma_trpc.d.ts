declare const todoRouter: import("@trpc/server").CreateRouterInner<import("@trpc/server").RootConfig<{
    ctx: {};
    meta: {};
    errorShape: never;
    transformer: import("@trpc/server").CombinedDataTransformer;
}>, {
    create: import("@trpc/server").BuildProcedure<"mutation", {
        _config: import("@trpc/server").RootConfig<{
            ctx: {};
            meta: {};
            errorShape: never;
            transformer: import("@trpc/server").CombinedDataTransformer;
        }>;
        _meta: {};
        _ctx_out: {};
        _input_in: {
            todo?: string;
            DONE?: boolean;
        };
        _input_out: {
            todo?: string;
            DONE?: boolean;
        };
        _output_in: typeof import("@trpc/server").unsetMarker;
        _output_out: typeof import("@trpc/server").unsetMarker;
    }, import(".prisma/client").todos>;
    list: import("@trpc/server").BuildProcedure<"query", {
        _config: import("@trpc/server").RootConfig<{
            ctx: {};
            meta: {};
            errorShape: never;
            transformer: import("@trpc/server").CombinedDataTransformer;
        }>;
        _ctx_out: {};
        _input_in: typeof import("@trpc/server").unsetMarker;
        _input_out: typeof import("@trpc/server").unsetMarker;
        _output_in: typeof import("@trpc/server").unsetMarker;
        _output_out: typeof import("@trpc/server").unsetMarker;
        _meta: {};
    }, import(".prisma/client").todos[]>;
    update: import("@trpc/server").BuildProcedure<"mutation", {
        _config: import("@trpc/server").RootConfig<{
            ctx: {};
            meta: {};
            errorShape: never;
            transformer: import("@trpc/server").CombinedDataTransformer;
        }>;
        _meta: {};
        _ctx_out: {};
        _input_in: {
            id?: number;
            todo?: string;
            DONE?: boolean;
        };
        _input_out: {
            id?: number;
            todo?: string;
            DONE?: boolean;
        };
        _output_in: typeof import("@trpc/server").unsetMarker;
        _output_out: typeof import("@trpc/server").unsetMarker;
    }, import(".prisma/client").todos>;
    delete: import("@trpc/server").BuildProcedure<"mutation", {
        _config: import("@trpc/server").RootConfig<{
            ctx: {};
            meta: {};
            errorShape: never;
            transformer: import("@trpc/server").CombinedDataTransformer;
        }>;
        _meta: {};
        _ctx_out: {};
        _input_in: {
            id?: number;
            todo?: string;
            DONE?: boolean;
        };
        _input_out: {
            id?: number;
            todo?: string;
            DONE?: boolean;
        };
        _output_in: typeof import("@trpc/server").unsetMarker;
        _output_out: typeof import("@trpc/server").unsetMarker;
    }, void>;
}>;
export default todoRouter;
