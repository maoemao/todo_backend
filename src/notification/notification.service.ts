import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateNotificationDto, UpdateNotificationDto } from './dto/notification.dto';

@Injectable()
export class NotificationService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, createDto: CreateNotificationDto) {
    return this.prisma.notification.create({
      data: { ...createDto, userId },
    });
  }

  async findAll(userId: string) {
    return this.prisma.notification.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      include: { todo: true },
    });
  }

  async findOne(userId: string, id: string) {
    const notification = await this.prisma.notification.findUnique({
      where: { id },
      include: { todo: true },
    });
    if (!notification || notification.userId !== userId) {
      throw new NotFoundException('Notification not found');
    }
    return notification;
  }

  async update(userId: string, id: string, updateDto: UpdateNotificationDto) {
    await this.findOne(userId, id);
    return this.prisma.notification.update({
      where: { id },
      data: updateDto,
    });
  }

  async remove(userId: string, id: string) {
    await this.findOne(userId, id);
    return this.prisma.notification.delete({
      where: { id },
    });
  }

  async markAllAsRead(userId: string) {
    return this.prisma.notification.updateMany({
      where: { userId, read: false },
      data: { read: true },
    });
  }
}
