import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { PostStatus } from './model/post.model';

@Entity()
export class Posts extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  desc: string;

  @Column()
  status: PostStatus;
}
