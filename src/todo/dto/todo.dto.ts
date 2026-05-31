import { IsNotEmpty, IsString, IsOptional, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTodoDto {
  @ApiProperty({ example: 'Buy groceries' })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({ example: 'Milk, eggs, bread', required: false })
  description?: string;

  @ApiProperty({ example: 'pending', required: false })
  status?: string;

  @ApiProperty({ example: 'high', required: false })
  priority?: string;

  @ApiProperty({ example: '2024-12-31', required: false })
  @IsDateString()
  dueDate?: Date;

  @ApiProperty({ example: 'project-id', required: false })
  projectId?: string;
}

export class UpdateTodoDto {
  @ApiProperty({ example: 'Updated title', required: false })
  title?: string;

  @ApiProperty({ example: 'Updated description', required: false })
  description?: string;

  @ApiProperty({ example: 'completed', required: false })
  status?: string;

  @ApiProperty({ example: 'low', required: false })
  priority?: string;

  @ApiProperty({ example: '2024-12-31', required: false })
  @IsDateString()
  dueDate?: Date;

  @ApiProperty({ example: 'project-id', required: false })
  projectId?: string;
}
