import prisma from "../../prisma/client/index";

export class PostRepository {
  async createPost(data: any) {
    return await prisma.post.create({
      data,
    });
  }

  async getAllPosts() {
    return await prisma.post.findMany();
  }

  async getPostById(id: string) {
    return await prisma.post.findUnique({
      where: { id },
    });
  }

  async updatePost(id: string, data: any) {
    return await prisma.post.update({
      where: { id },
      data,
    });
  }

  async deletePost(id: string) {
    return await prisma.post.delete({
      where: { id },
    });
  }
}
