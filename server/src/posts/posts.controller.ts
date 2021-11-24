import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreatePostDto } from './dto/create-post-dto';
import { PostStatus } from './model/post.model';
import { PostStatusValidationPipe } from './pipes/posts-status-validation.pipe';
import { Posts } from './posts.entity';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  @Get()
  getAllPosts(): Promise<Posts[]> {
    return this.postsService.getAllPosts();
  }

  @Get('/:id')
  getPostsById(@Param('id') id: number): Promise<Posts> {
    return this.postsService.getPostsById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createPost(@Body() createPostDto: CreatePostDto): Promise<Posts> {
    return this.postsService.createPost(createPostDto);
  }

  @Delete('/:id')
  deletePost(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.postsService.deletePost(id);
  }

  @Patch('/:id/status')
  updatePostStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', PostStatusValidationPipe) status: PostStatus,
  ) {
    return this.postsService.updatePostStatus(id, status);
  }
}
