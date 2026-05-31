import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTodoDto, UpdateTodoDto } from './dto/todo.dto';

@Injectable()
export class TodoService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, createDto: CreateTodoDto) {
    return this.prisma.todo.create({
      data: { ...createDto, userId },
      include: { project: true },
    });
  }

  async findAll(userId: string) {
    return this.prisma.todo.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      include: { project: true },
    });
  }

  async findOne(userId: string, id: string) {
    const todo = await this.prisma.todo.findUnique({
      where: { id },
      include: { project: true },
    });
    if (!todo || todo.userId !== userId) {
      throw new NotFoundException('Todo not found');
    }
    return todo;
  }

  async update(userId: string, id: string, updateDto: UpdateTodoDto) {
    await this.findOne(userId, id);
    return this.prisma.todo.update({
      where: { id },
      data: updateDto,
      include: { project: true },
    });
  }

  async remove(userId: string, id: string) {
    await this.findOne(userId, id);
    return this.prisma.todo.delete({
      where: { id },
    });
  }
}
