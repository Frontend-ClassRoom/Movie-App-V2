import { NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post-dto';
import { EntityRepository, Repository } from 'typeorm';
import { Posts } from './posts.entity';
import { PostStatus } from './model/post.model';

@EntityRepository(Posts)
export class PostRepository extends Repository<Posts> {
  async createPost(createPostDto: CreatePostDto): Promise<Posts> {
    const { title, desc } = createPostDto;
    const post = this.create({
      title,
      desc,
      status: PostStatus.PUBLIC,
    });
    await this.save(post);
    return post;
  }

  async deletePost(id: number): Promise<void> {
    const result = await this.delete(id);
    const isNotFound = result.affected === 0;
    if (isNotFound) {
      throw new NotFoundException(`포스트가 존재하지 않습니다.`);
    }
  }

  async getPostsById(id: number): Promise<Posts> {
    const found = await this.findOne(id);
    const isNotFound = found === undefined || found === null;
    if (isNotFound) {
      throw new NotFoundException(`포스트가 존재하지 않습니다.`);
    }
    return found;
  }
}
