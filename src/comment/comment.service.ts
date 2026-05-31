import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCommentDto, UpdateCommentDto } from './dto/comment.dto';

@Injectable()
export class CommentService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, createDto: CreateCommentDto) {
    const todo = await this.prisma.todo.findUnique({
      where: { id: createDto.todoId },
    });
    if (!todo || todo.userId !== userId) {
      throw new NotFoundException('Todo not found');
    }

    return this.prisma.comment.create({
      data: { ...createDto, userId },
      include: { user: true },
    });
  }

  async findAll(userId: string, todoId?: string) {
    const where: { userId?: string; todoId?: string } = { userId };
    if (todoId) {
      where.todoId = todoId;
    }

    return this.prisma.comment.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      include: { user: true },
    });
  }

  async findOne(userId: string, id: string) {
    const comment = await this.prisma.comment.findUnique({
      where: { id },
      include: { user: true },
    });
    if (!comment || comment.userId !== userId) {
      throw new NotFoundException('Comment not found');
    }
    return comment;
  }

  async update(userId: string, id: string, updateDto: UpdateCommentDto) {
    await this.findOne(userId, id);
    return this.prisma.comment.update({
      where: { id },
      data: updateDto,
      include: { user: true },
    });
  }

  async remove(userId: string, id: string) {
    await this.findOne(userId, id);
    return this.prisma.comment.delete({
      where: { id },
    });
  }
}
