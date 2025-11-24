## Traveritas | Digital Observatory

项目访问地址 (GitHub Pages): https://traveritas.github.io/TRAVERITAS/

### 部署说明 (GitHub Pages)

本项目为 Vite + React 单页应用 (SPA)。由于是项目页而非用户根页，需要在构建时指定 `base: '/TRAVERITAS/'`，否则生成的资源引用使用绝对根路径会导致 404。

#### 目录与关键点
- `vite.config.ts` 已设置 `base: '/TRAVERITAS/'`。
- 添加了 `404.html` 解决刷新深层路由时的 GitHub Pages 404 问题。
- 新增脚本：`npm run deploy` 使用 `gh-pages` 推送 `dist` 到 `gh-pages` 分支。
- 可选：已提供 GitHub Actions 自动化工作流，推送到 `main` 自动发布。

#### 手动部署步骤
```powershell
npm install
npm run build
npm run deploy
```
完成后在仓库 Settings -> Pages 中确认 Source 指向 `gh-pages` 分支根目录。

#### 自动部署 (GitHub Actions)
1. 确认默认分支为 `main` 并推送最新代码。
2. 打开仓库 Settings -> Pages，选择 Build and deployment: GitHub Actions。
3. 每次推送到 `main`，Actions 会自动构建并发布。

#### 常见问题
| 问题 | 原因 | 解决 |
|------|------|------|
| 访问首页 404 | 未设置 `base` | 保持 `vite.config.ts` 中的 `base: '/TRAVERITAS/'` |
| 刷新二级路由 404 | Pages 不识别 SPA 前端路由 | 保留 `404.html` 与 `index.html` 同逻辑 |
| 资源 404 (CSS/JS) | 构建产物引用根路径 | 确认重新构建后再发布 |
| 发布后仍旧旧版本 | 浏览器缓存 | Ctrl+F5 强制刷新或改版本号 |

#### 本地开发
```powershell
npm run dev
```
访问: http://localhost:3000

#### 环境变量
在根目录创建 `.env` 并设置 `GEMINI_API_KEY=xxxx` (构建时通过 `define` 注入)。

#### 后续可改进
- 引入路由与状态管理
- 设置更严格的构建与缓存策略
- 添加 Lighthouse 性能与无障碍检测

---
In transitu ad veritatem.
