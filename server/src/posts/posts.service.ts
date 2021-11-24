import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostRepository } from './posts.repository';
import { CreatePostDto } from './dto/create-post-dto';
import { Posts } from './posts.entity';
import { PostStatus } from './model/post.model';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(PostRepository)
    private postRepository: PostRepository,
  ) {}

  async getAllPosts(): Promise<Posts[]> {
    return this.postRepository.find();
  }

  async getPostsById(id: number): Promise<Posts> {
    const found = await this.postRepository.findOne(id);
    const isNotFound = found === undefined || found === null;
    if (isNotFound) {
      throw new NotFoundException('포스트가 존재하지 않습니다.');
    }
    return found;
  }

  createPost(createPostDto: CreatePostDto): Promise<Posts> {
    return this.postRepository.createPost(createPostDto);
  }

  deletePost(id: number): Promise<void> {
    return this.postRepository.deletePost(id);
  }

  async updatePostStatus(id: number, status: PostStatus): Promise<Posts> {
    const post = await this.getPostsById(id);
    post.status = status;
    await this.postRepository.save(post);
    return post;
  }
}
