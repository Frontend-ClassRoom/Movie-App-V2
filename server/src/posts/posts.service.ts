import { v1 as uuid } from 'uuid';
import { Injectable } from '@nestjs/common';
import { Post, PostStatus } from './model/post.model';
import { CreatePostDto } from './dto/create-post-dto';

@Injectable()
export class PostsService {
  private posts: Post[] = [];

  getAllPosts(): Post[] {
    return this.posts;
  }

  getPostById(id: string): Post {
    return this.posts.find((post) => post.id === id);
  }

  createPost(createPostDto: CreatePostDto): Post {
    const { title, desc } = createPostDto;
    const postParams: Post = {
      id: uuid(),
      title,
      desc,
      status: PostStatus.PUBLIC,
    };
    this.posts.push(postParams);
    return postParams;
  }

  deletePost(id: string): void {
    this.posts = this.posts.filter((post) => post.id !== id);
  }

  updatePostStatus(id: string, status: PostStatus): Post {
    const post = this.getPostById(id);
    post.status = status;
    return post;
  }
}
