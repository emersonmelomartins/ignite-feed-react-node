import { Request, Response, Router } from "express";
import { commentsRoutes } from "./comments.routes";
import { postsRoutes } from "./posts.routes";
import { sessionsRoutes } from "./sessions.routes";
import { usersRoutes } from "./users.routes";

export const routes = Router();

routes.get("/", (request: Request, response: Response) => {
  return response.json({
    msg: "A aplicação está em execução, acesse a documentação em /swagger",
  });
});

routes.use("/users", usersRoutes);
routes.use("/sessions", sessionsRoutes);
routes.use("/posts", postsRoutes);
routes.use("/comments", commentsRoutes);
