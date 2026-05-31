import { Module, MiddlewareConsumer } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ProjectModule } from './project/project.module';
import { TodoModule } from './todo/todo.module';
import { CommentModule } from './comment/comment.module';
import { NotificationModule } from './notification/notification.module';
import { PrismaModule } from './prisma/prisma.module';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { TraceMiddleware } from './middleware/trace.middleware';

@Module({
  imports: [
    AuthModule,
    ProjectModule,
    TodoModule,
    CommentModule,
    NotificationModule,
    PrismaModule,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware, TraceMiddleware).forRoutes('*');
  }
}
