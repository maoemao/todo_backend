import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateNotificationDto {
  @ApiProperty({ example: 'todo_updated' })
  @IsNotEmpty()
  @IsString()
  type: string;

  @ApiProperty({ example: 'Your todo has been updated' })
  @IsNotEmpty()
  @IsString()
  message: string;

  @ApiProperty({ example: 'todo-id', required: false })
  todoId?: string;
}

export class UpdateNotificationDto {
  @ApiProperty({ example: true })
  read?: boolean;
}
