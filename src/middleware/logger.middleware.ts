import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const { method, originalUrl, ip, query, body, params } = req;
    const userAgent = req.get('user-agent') || '';
    const timestamp = new Date().toISOString();
    
    // 记录请求信息
    console.log('\n========================================');
    console.log(`[${timestamp}] REQUEST START`);
    console.log(`Method: ${method}`);
    console.log(`URL: ${originalUrl}`);
    console.log(`IP: ${ip}`);
    console.log(`User-Agent: ${userAgent}`);
    
    // 记录请求参数
    if (Object.keys(query).length > 0) {
      console.log(`Query Params: ${JSON.stringify(query, null, 2)}`);
    }
    if (Object.keys(params).length > 0) {
      console.log(`Path Params: ${JSON.stringify(params, null, 2)}`);
    }
    if (body && Object.keys(body).length > 0) {
      // 过滤敏感信息
      const sanitizedBody = { ...body };
      if (sanitizedBody.password) sanitizedBody.password = '******';
      console.log(`Body: ${JSON.stringify(sanitizedBody, null, 2)}`);
    }
    
    // 保存原始的 res.json 方法
    const originalJson = res.json.bind(res);
    let responseBody: any = null;
    
    // 重写 res.json 方法来捕获响应体
    res.json = (body: any) => {
      responseBody = body;
      return originalJson(body);
    };
    
    // 记录响应信息
    res.on('finish', () => {
      const { statusCode } = res;
      const responseTimestamp = new Date().toISOString();
      
      console.log(`[${responseTimestamp}] RESPONSE`);
      console.log(`Status: ${statusCode}`);
      
      if (responseBody) {
        // 限制响应体日志长度
        const responseStr = JSON.stringify(responseBody, null, 2);
        if (responseStr.length > 1000) {
          console.log(`Body: ${responseStr.substring(0, 1000)}... (truncated)`);
        } else {
          console.log(`Body: ${responseStr}`);
        }
      }
      
      console.log(`[${responseTimestamp}] REQUEST END`);
      console.log('========================================\n');
    });
    
    next();
  }
}
