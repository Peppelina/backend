import {Router} from "express";
import PostController from "../Controllers/PostController.js";

const postRouter = new Router()

postRouter.post('/posts' , PostController.create)
postRouter.get('/posts', PostController.getAll)
postRouter.get('/posts/:id', PostController.getOne)
postRouter.put('/posts', PostController.update)
postRouter.delete('/posts/:id', PostController.delete)

export default postRouter;