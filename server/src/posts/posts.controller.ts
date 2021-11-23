import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreatePostDto } from './dto/create-post-dto';
import { Post as PostModel, PostStatus } from './model/post.model';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  @Get()
  getAllBoard(): PostModel[] {
    return this.postsService.getAllPosts();
  }

  @Get('/:id')
  getPostsById(@Param('id') id: string): PostModel {
    /**
     * @argument
     * - @Param() params: string[]
     *   @description
     *   - params가 1개 이상의 경우
     *
     * - @Param('id') id: string
     *   @description
     *   - 1개의 params를 가져올 때
     */
    return this.postsService.getPostsById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createPost(@Body() createPostDto: CreatePostDto): PostModel {
    /**
     * @argument
     * - @Body() body,
     *
     * - @Body('title') title : string,
     * - @Body('desc') desc : string,
     *
     * @description
     * - Body 전체를 사용하거나 Body 내부의 값을 인자로 사용
     */
    return this.postsService.createPost(createPostDto);
  }

  @Delete('/:id')
  deletePost(@Param('id') id: string): void {
    this.postsService.deletePost(id);
  }

  @Patch('/:id/status')
  updatePostStatus(
    @Param('id') id: string,
    @Body('status') status: PostStatus,
  ): PostModel {
    return this.updatePostStatus(id, status);
  }
}
