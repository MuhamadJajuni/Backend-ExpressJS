import { PostUseCase } from "../usecase/PostUsecase";

const postUseCase = new PostUseCase();

export class PostController {
  async createPost({ body }: any) {
    try {
      const newPost = await postUseCase.createPost(body);
      return newPost;
    } catch (error) {
      console.error("Error creating post:", error);
      return { status: 500, message: "Failed to create new post" };
    }
  }

  async getAllPosts() {
    try {
      const allPost = await postUseCase.getAllPosts();
      return allPost;
    } catch (error) {
      console.error("Error fetching post:", error);
      return { status: 500, message: "Failed to fetch post" };
    }
  }

  async updatePost({ params, body }: any) {
    try {
      if (!params || !params.id) {
        return { status: 400, message: "Invalid request: Missing post ID" };
      }

      if (!body || Object.keys(body).length === 0) {
        throw new Error("Update data is missing or empty");
      }

      const updatedPost = await postUseCase.updatePost(params.id, body);
      return { success: true, message: "Post updated", data: updatedPost };
    } catch (error) {
      console.error("Error updating post:", error);
      return {
        status: 500,
        message: "Failed to update post",
        error: error,
      };
    }
  }

  async getPostById({ params }: any) {
    console.log("Received params:", params);

    if (!params || !params.id) {
      return { status: 400, message: "Invalid request: Missing post ID" };
    }

    try {
      const post = await postUseCase.getPostById(params.id);
      return post;
    } catch (error) {
      console.error("Error fetching post:", error);
      return { status: 500, message: "Failed to fetch post" };
    }
  }

  async deletePost(id: string) {
    try {
      console.log("Attempting to delete post with ID:", id);
      const result = await postUseCase.deletePost(id);

      if (!result) {
        throw new Error("Post not found or failed to delete");
      }

      console.log("Post deleted successfully:", result);
      return result;
    } catch (error) {
      console.error("Error in deletePost controller:", error);
      throw error;
    }
  }
}
