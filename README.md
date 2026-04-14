# AIlearn

## 技术栈

- React+ Vite 6
- TypeScript
- Express
- better-auth
- PostgreSQL + Drizzle ORM
- Chroma

## 目录

```text
src/        应用源码
public/     静态资源
scripts/    CLI 脚本
server.ts   开发/生产服务入口
```

## 本地启动

```bash
npm install
cp .env.example .env.local
npm run dev
```

默认访问地址：

```text
http://localhost:3000
```

## 常用命令

```bash
npm run dev
npm run build
npm run lint
npm run cli
npm run cli:auth
```

## 基础依赖

至少需要配置：

```bash
BETTER_AUTH_SECRET=your-secret
DATABASE_URL=postgresql://opensynapse:password@localhost:5432/opensynapse
CHROMA_URL=http://localhost:8000
```

如需调用模型，再按需配置对应 provider 的 API Key。

## 本地服务

仓库保留了 `docker-compose.yml`，可直接启动 PostgreSQL 和 Chroma：

```bash
docker compose up -d
```
