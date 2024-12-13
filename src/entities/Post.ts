export class Post {
  id: string | undefined;
  constructor(public title: string, public content: string) {
    Post.validate({ title, content });
  }

  static validate(data: any) {
    if (!data.title || !data.content) {
      throw new Error("Invalid post data: title and content are required.");
    }

    if (typeof data.title !== "string" || typeof data.content !== "string") {
      throw new Error("Invalid post data: title and content must be strings.");
    }

    const minTitleLength = 5;
    const minContentLength = 10;

    if (data.title.length < minTitleLength) {
      throw new Error(
        `Invalid post data: title must be at least ${minTitleLength} characters long.`
      );
    }
    if (data.content.length < minContentLength) {
      throw new Error(
        `Invalid post data: content must be at least ${minContentLength} characters long.`
      );
    }
  }
}
