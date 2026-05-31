import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { TodoService } from './todo.service';
import { CreateTodoDto, UpdateTodoDto } from './dto/todo.dto';

@Controller('todos')
@ApiTags('todos')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class TodoController {
  constructor(private todoService: TodoService) {}

  @Post()
  create(@Request() req, @Body() createDto: CreateTodoDto) {
    return this.todoService.create(req.user.id, createDto);
  }

  @Get()
  findAll(@Request() req) {
    return this.todoService.findAll(req.user.id);
  }

  @Get(':id')
  findOne(@Request() req, @Param('id') id: string) {
    return this.todoService.findOne(req.user.id, id);
  }

  @Patch(':id')
  update(@Request() req, @Param('id') id: string, @Body() updateDto: UpdateTodoDto) {
    return this.todoService.update(req.user.id, id, updateDto);
  }

  @Delete(':id')
  remove(@Request() req, @Param('id') id: string) {
    return this.todoService.remove(req.user.id, id);
  }
}
