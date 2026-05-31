import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProjectDto {
  @ApiProperty({ example: 'My Project' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: 'A description of my project', required: false })
  description?: string;

  @ApiProperty({ example: '#007bff', required: false })
  color?: string;
}

export class UpdateProjectDto {
  @ApiProperty({ example: 'Updated Project', required: false })
  name?: string;

  @ApiProperty({ example: 'Updated description', required: false })
  description?: string;

  @ApiProperty({ example: '#ff0000', required: false })
  color?: string;
}

export class ProjectResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  description?: string;

  @ApiProperty()
  color: string;

  @ApiProperty()
  userId: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
