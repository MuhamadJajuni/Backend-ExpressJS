import express, {
  type NextFunction,
  type Request,
  type Response,
} from "express";
import { PostController } from "../controllers/PostControllers";
import { Post } from "../entities/Post";

const router = express.Router();
const postController = new PostController();

router.post(
  "/create",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const postData: Post = req.body;
      const createdPost = await postController.createPost({ body: postData });
      res.status(201).json({ success: true, data: createdPost });
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  "/getAll",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const posts = await postController.getAllPosts();
      res.json(posts);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  "/:id",
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;

      // Validate if ID is provided in the request
      if (!id) {
        res.status(400).json({
          success: false,
          message: "Post ID is required",
        });
        return;
      }

      // Call the controller's `getPostById` method
      const response = await postController.getPostById({ params: { id } });

      // Check for errors returned by the controller
      if (response && typeof response === "object" && "status" in response) {
        res.status(response.status).json({
          success: false,
          message: response.message,
        });
        return;
      }

      // If no post is found, respond with a 404
      if (!response) {
        res.status(404).json({
          success: false,
          message: "Post not found",
        });
        return;
      }

      // If post is found, return the data
      res.status(200).json({
        success: true,
        data: response,
      });
    } catch (error) {
      // Pass unexpected errors to the error-handling middleware
      next(error);
    }
  }
);

router.put("/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    const updatedPost = await postController.updatePost({
      params: { id },
      body: updateData,
    });
    res.json(updatedPost);
  } catch (error) {
    next(error);
  }
});

router.delete(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const result = await postController.deletePost(id);
      res.status(200).json({
        success: true,
        message: "Post deleted successfully",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
);

router.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error("Error occurred:", err.message || err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

export default router;
