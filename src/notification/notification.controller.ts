import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { NotificationService } from './notification.service';
import { CreateNotificationDto, UpdateNotificationDto } from './dto/notification.dto';

@Controller('notifications')
@ApiTags('notifications')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class NotificationController {
  constructor(private notificationService: NotificationService) {}

  @Post()
  create(@Request() req, @Body() createDto: CreateNotificationDto) {
    return this.notificationService.create(req.user.id, createDto);
  }

  @Get()
  findAll(@Request() req) {
    return this.notificationService.findAll(req.user.id);
  }

  @Get(':id')
  findOne(@Request() req, @Param('id') id: string) {
    return this.notificationService.findOne(req.user.id, id);
  }

  @Patch(':id')
  update(@Request() req, @Param('id') id: string, @Body() updateDto: UpdateNotificationDto) {
    return this.notificationService.update(req.user.id, id, updateDto);
  }

  @Patch('mark-all-read')
  markAllAsRead(@Request() req) {
    return this.notificationService.markAllAsRead(req.user.id);
  }

  @Delete(':id')
  remove(@Request() req, @Param('id') id: string) {
    return this.notificationService.remove(req.user.id, id);
  }
}
