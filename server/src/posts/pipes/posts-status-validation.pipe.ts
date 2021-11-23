import { BadRequestException, PipeTransform } from '@nestjs/common';
import { PostStatus } from '../model/post.model';

export class PostStatusValidationPipe implements PipeTransform {
  readonly StatusOption = [PostStatus.PRIVATE, PostStatus.PUBLIC];

  transform(value: any) {
    const isError = this.isStatusValid(value) === false;
    value = value.toUpperCase();
    if (isError) {
      throw new BadRequestException(`${value} isn't in the status options`);
    }
    return value;
  }

  private isStatusValid(status: PostStatus) {
    const statusIndex = this.StatusOption.indexOf(status);
    return statusIndex !== -1;
  }
}
