import { publicProcedure, router } from "../trpc";
import { poemRequestRouter } from "./poemRequest";

export const appRouter = router({
  healthcheck: publicProcedure.query(() => "yay!"),

  poemRequest: poemRequestRouter,
});

export type AppRouter = typeof appRouter;
