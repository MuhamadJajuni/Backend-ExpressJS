import { PostRepository } from "../repositories/PostRepositories";

export class PostUseCase {
  private postRepository: PostRepository;

  constructor() {
    this.postRepository = new PostRepository();
  }

  async createPost(data: any) {
    return await this.postRepository.createPost(data);
  }

  async getAllPosts() {
    return await this.postRepository.getAllPosts();
  }

  async getPostById(id: string) {
    return await this.postRepository.getPostById(id);
  }

  async updatePost(id: string, data: any) {
    return await this.postRepository.updatePost(id, data);
  }

  async deletePost(id: string) {
    return await this.postRepository.deletePost(id);
  }
}
