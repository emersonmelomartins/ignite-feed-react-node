import { Request, Response, Router } from "express";
import { commentsRoutes } from "./comments.routes";
import { postsRoutes } from "./posts.routes";
import { sessionsRoutes } from "./sessions.routes";
import { usersRoutes } from "./users.routes";

export const routes = Router();

routes.get("/", (request: Request, response: Response) => {
  const html = `
  <h1>API Ignite Feed</h1>
  <hr>
  <h3>A API desse projeto foi desenvolvida com NodeJS + Express + Typescript + + TypeORM + Sqlite</h3>

  <p>Esse projeto tem a finalidade de aplicar na prática o aprendizado do bootcamp da Rocketseat trilha Node.</p>

  <p>Acesse o repositório desse projeto <a href='https://github.com/emersonmelomartins/ignite-feed-react-node' target='_blank'>clicando aqui.</a></p>
  <strong>Acesse a documentação da aplicação feito no swagger <a href='/swagger'>clicando aqui</a></strong>
  `;

  return response.send(html);
});

routes.use("/users", usersRoutes);
routes.use("/sessions", sessionsRoutes);
routes.use("/posts", postsRoutes);
routes.use("/comments", commentsRoutes);
