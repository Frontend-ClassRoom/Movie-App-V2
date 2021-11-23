import { v1 as uuid } from 'uuid';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Post, PostStatus } from './model/post.model';
import { CreatePostDto } from './dto/create-post-dto';

@Injectable()
export class PostsService {
  private posts: Post[] = [];

  getAllPosts(): Post[] {
    return this.posts;
  }

  getPostsById(id: string): Post {
    const found = this.posts.find((post) => post.id === id);
    const isNotFound = found === undefined || found === null;
    if (isNotFound) {
      throw new NotFoundException(`포스트가 존재하지 않습니다. id=${id}`);
    }
    return found;
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
    /**
     * @description
     * - 없는 포스트를 지우려고 할 때
     *   getPostsById를 이용해 found 값을 찾아서 사용
     *   만약 found 가 없다면 에러발생 ( getPostsById 에서 에러가 발생된다. )
     */
    const found = this.getPostsById(id);
    this.posts = this.posts.filter((post) => post.id !== found.id);
  }

  updatePostStatus(id: string, status: PostStatus): Post {
    const post = this.getPostsById(id);
    post.status = status;
    return post;
  }
}
