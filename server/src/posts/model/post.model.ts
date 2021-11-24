export interface Post {
  id: string;
  title: string;
  desc: string;
  status: PostStatus;
}

export enum PostStatus {
  PUBLIC = 'PUBLIC',
  PRIVATE = 'PRIVATE',
}
