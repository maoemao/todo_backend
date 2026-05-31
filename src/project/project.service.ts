import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProjectDto, UpdateProjectDto } from './dto/project.dto';

@Injectable()
export class ProjectService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, createDto: CreateProjectDto) {
    return this.prisma.project.create({
      data: { ...createDto, userId },
    });
  }

  async findAll(userId: string) {
    return this.prisma.project.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(userId: string, id: string) {
    const project = await this.prisma.project.findUnique({
      where: { id },
    });
    if (!project || project.userId !== userId) {
      throw new NotFoundException('Project not found');
    }
    return project;
  }

  async update(userId: string, id: string, updateDto: UpdateProjectDto) {
    await this.findOne(userId, id);
    return this.prisma.project.update({
      where: { id },
      data: updateDto,
    });
  }

  async remove(userId: string, id: string) {
    await this.findOne(userId, id);
    return this.prisma.project.delete({
      where: { id },
    });
  }
}
