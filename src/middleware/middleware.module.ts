import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { LoggerMiddleware } from './logger.middleware';
import { TraceMiddleware } from './trace.middleware';
import { AuthMiddleware } from './auth.middleware';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
    }),
  ],
  providers: [LoggerMiddleware, TraceMiddleware, AuthMiddleware],
  exports: [LoggerMiddleware, TraceMiddleware, AuthMiddleware],
})
export class MiddlewareModule {}
