import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { CreateCommentController } from "@modules/posts/useCases/createComment/CreateCommentController";
import { DeleteCommentController } from "@modules/posts/useCases/deleteComment/DeleteCommentController";
import { GiveCommentLikeController } from "@modules/posts/useCases/giveCommentLike/GiveCommentLikeController";
import { ListCommentsController } from "@modules/posts/useCases/listComments/ListCommentsController";
import { Router } from "express";

export const commentsRoutes = Router();


const createCommentController = new CreateCommentController();
const giveCommentLikeController = new GiveCommentLikeController();
const listCommentsController = new ListCommentsController();
const deleteCommentController = new DeleteCommentController();

commentsRoutes.post(
  "/post/:post_id",
  ensureAuthenticated,
  createCommentController.handle
);

commentsRoutes.patch(
  "/:comment_id/like",
  ensureAuthenticated,
  giveCommentLikeController.handle
);

commentsRoutes.get(
  "/post/:post_id",
  ensureAuthenticated,
  listCommentsController.handle
);

commentsRoutes.delete(
  "/post/:post_id/:comment_id",
  ensureAuthenticated,
  deleteCommentController.handle
);
