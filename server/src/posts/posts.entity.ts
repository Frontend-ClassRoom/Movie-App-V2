import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { PostStatus } from './model/post.model';

@Entity()
export class Posts extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  movieId: number;

  @Column()
  title: string;

  @Column()
  contents: string;

  @Column()
  rate: number;

  @Column()
  watchedDate: Date;

  @Column()
  regDate: Date;

  @Column()
  status: PostStatus;
}
