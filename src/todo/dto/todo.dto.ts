import { IsNotEmpty, IsString, IsOptional, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTodoDto {
  @ApiProperty({ example: 'Buy groceries' })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({ example: 'Milk, eggs, bread', required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ example: 'pending', required: false })
  @IsOptional()
  status?: string;

  @ApiProperty({ example: 'high', required: false })
  @IsOptional()
  priority?: string;

  @ApiProperty({ example: '2024-12-31', required: false })
  @IsOptional()
  @IsDateString()
  dueDate?: Date;

  @ApiProperty({ example: 'project-id', required: false })
  @IsOptional()
  @IsString()
  projectId?: string;
}

export class UpdateTodoDto {
  @ApiProperty({ example: 'Updated title', required: false })
  @IsOptional()
  title?: string;

  @ApiProperty({ example: 'Updated description', required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ example: 'completed', required: false })
  @IsOptional()
  status?: string;

  @ApiProperty({ example: 'low', required: false })
  @IsOptional()
  priority?: string;

  @ApiProperty({ example: '2024-12-31', required: false })
  @IsOptional()
  @IsDateString()
  dueDate?: Date;

  @ApiProperty({ example: 'project-id', required: false })
  @IsOptional()
  @IsString()
  projectId?: string;
}
