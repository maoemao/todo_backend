import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, Query } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { CommentService } from './comment.service';
import { CreateCommentDto, UpdateCommentDto } from './dto/comment.dto';

@Controller('comments')
@ApiTags('comments')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class CommentController {
  constructor(private commentService: CommentService) {}

  @Post()
  create(@Request() req, @Body() createDto: CreateCommentDto) {
    return this.commentService.create(req.user.id, createDto);
  }

  @Get()
  findAll(@Request() req, @Query('todoId') todoId?: string) {
    return this.commentService.findAll(req.user.id, todoId);
  }

  @Get(':id')
  findOne(@Request() req, @Param('id') id: string) {
    return this.commentService.findOne(req.user.id, id);
  }

  @Patch(':id')
  update(@Request() req, @Param('id') id: string, @Body() updateDto: UpdateCommentDto) {
    return this.commentService.update(req.user.id, id, updateDto);
  }

  @Delete(':id')
  remove(@Request() req, @Param('id') id: string) {
    return this.commentService.remove(req.user.id, id);
  }
}
