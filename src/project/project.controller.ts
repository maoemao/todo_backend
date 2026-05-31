import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { ProjectService } from './project.service';
import { CreateProjectDto, UpdateProjectDto } from './dto/project.dto';

@Controller('projects')
@ApiTags('projects')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class ProjectController {
  constructor(private projectService: ProjectService) {}

  @Post()
  create(@Request() req, @Body() createDto: CreateProjectDto) {
    return this.projectService.create(req.user.id, createDto);
  }

  @Get()
  findAll(@Request() req) {
    return this.projectService.findAll(req.user.id);
  }

  @Get(':id')
  findOne(@Request() req, @Param('id') id: string) {
    return this.projectService.findOne(req.user.id, id);
  }

  @Patch(':id')
  update(@Request() req, @Param('id') id: string, @Body() updateDto: UpdateProjectDto) {
    return this.projectService.update(req.user.id, id, updateDto);
  }

  @Delete(':id')
  remove(@Request() req, @Param('id') id: string) {
    return this.projectService.remove(req.user.id, id);
  }
}
