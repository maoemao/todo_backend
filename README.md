# Todo List Backend API

基于 NestJS + PostgreSQL + Prisma + JWT 的 Todo List 后端系统。

## 技术栈

- **NestJS** - 企业级 Node.js 框架
- **PostgreSQL** - 关系型数据库
- **Prisma 5.22.0** - ORM 框架
- **JWT** - 用户身份验证
- **Swagger** - API 文档

## 功能模块

### Auth 认证模块
- `POST /auth/register` - 用户注册
- `POST /auth/login` - 用户登录

### Project 项目模块
- `POST /projects` - 创建项目
- `GET /projects` - 获取所有项目
- `GET /projects/:id` - 获取单个项目
- `PATCH /projects/:id` - 更新项目
- `DELETE /projects/:id` - 删除项目

### Todo 待办模块
- `POST /todos` - 创建待办
- `GET /todos` - 获取所有待办
- `GET /todos/:id` - 获取单个待办
- `PATCH /todos/:id` - 更新待办
- `DELETE /todos/:id` - 删除待办

### Comment 评论模块
- `POST /comments` - 添加评论
- `GET /comments` - 获取所有评论
- `GET /comments/:id` - 获取单个评论
- `PATCH /comments/:id` - 更新评论
- `DELETE /comments/:id` - 删除评论

### Notification 通知模块
- `POST /notifications` - 创建通知
- `GET /notifications` - 获取所有通知
- `GET /notifications/:id` - 获取单个通知
- `PATCH /notifications/:id` - 更新通知
- `PATCH /notifications/mark-all-read` - 标记所有通知为已读
- `DELETE /notifications/:id` - 删除通知

## 快速开始

### 环境要求

- Node.js >= 18.x
- PostgreSQL >= 14.x

### 安装

```bash
npm install
```

### 配置

在 `.env` 文件中配置数据库连接：

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/todo_db?schema=public"
JWT_SECRET="your-secret-key-here-change-in-production"
JWT_EXPIRES_IN="1d"
```

### 数据库初始化

```bash
npx prisma migrate dev --name init
npx prisma generate
```

### 启动服务

```bash
npx ts-node -r tsconfig-paths/register src/main.ts
```

或者使用开发模式：

```bash
npm run start:dev
```

## Docker 部署

### 环境要求

- Docker >= 20.x
- Docker Compose >= 2.x

### 使用 Docker Compose 启动

```bash
docker-compose up -d --build
```

### 首次启动时执行数据库迁移

```bash
docker exec -it todo-backend npx prisma migrate deploy
```

### 服务访问

- API 服务器: `http://localhost:3000`
- Swagger UI: `http://localhost:3000/api`
- PostgreSQL: `localhost:5432`

### Docker Compose 配置说明

`docker-compose.yml` 包含两个服务：

1. **postgres** - PostgreSQL 数据库服务
   - 端口映射: `5432:5432`
   - 默认数据库: `todo_db`
   - 默认用户: `postgres`
   - 默认密码: `postgres`

2. **app** - NestJS 应用服务
   - 端口映射: `3000:3000`
   - 依赖 PostgreSQL 服务启动

### 停止服务

```bash
docker-compose down
```

### 查看日志

```bash
docker-compose logs -f
```

## API 文档

启动服务后访问 Swagger UI：`http://localhost:3000/api`

## 项目结构

```
todo_backend/
├── prisma/
│   ├── schema.prisma      # Prisma 数据模型
│   └── migrations/        # 数据库迁移
├── src/
│   ├── auth/              # 认证模块
│   ├── project/           # 项目模块
│   ├── todo/              # 待办模块
│   ├── comment/           # 评论模块
│   ├── notification/      # 通知模块
│   ├── prisma/            # Prisma 服务
│   ├── middleware/        # 中间件
│   ├── app.module.ts      # 根模块
│   └── main.ts            # 入口文件
├── Dockerfile
├── docker-compose.yml
├── postman-collection.json
├── postman-environment.json
├── package.json
├── tsconfig.json
└── .env
```

## 中间件

- **LoggerMiddleware** - 请求日志记录
- **TraceMiddleware** - 请求追踪（X-Trace-ID）
- **AuthMiddleware** - JWT 认证

## 许可证

MIT
