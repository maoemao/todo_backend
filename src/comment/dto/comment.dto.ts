import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentDto {
  @ApiProperty({ example: 'This is a comment' })
  @IsNotEmpty()
  @IsString()
  content: string;

  @ApiProperty({ example: 'todo-id' })
  @IsNotEmpty()
  @IsString()
  todoId: string;
}

export class UpdateCommentDto {
  @ApiProperty({ example: 'Updated comment' })
  @IsNotEmpty()
  @IsString()
  content: string;
}
