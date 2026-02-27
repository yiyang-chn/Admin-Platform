# CLAUDE.md — AI 协作上下文

> 本文件供 AI 编码助手（Claude Code 等）在参与本项目时快速建立上下文。
> 详细产品信息见 `PRODUCT_CONTEXT.md`，UI 规范与工作流规则见 `AGENTS.md`。

---

## 1. 产品简介

**INFSTONES Admin Platform** 是 INFSTONES 公司内部多业务线综合管理后台，整合了 DApp 生态、DevSuite 开发者服务、网站内容、运营中心与质押管理共 9 个子平台。当前为**纯前端 HTML 原型阶段**，已部署至 GitHub Pages 供设计评审，所有页面内容均为占位符，尚未接入任何后端服务。

---

## 2. 技术栈与目录结构

### 技术栈

| 类别 | 选型 |
|------|------|
| 语言 | 原生 JavaScript（ES5+ 兼容，无编译/打包） |
| 样式 | 原生 CSS3（Flexbox 布局，单一 `common.css`） |
| 路由 | 自实现 Hash 路由（`js/router.js`，无框架） |
| 状态管理 | URL Hash 即状态，无状态库 |
| 构建工具 | **无**（纯静态文件，push to main 自动部署） |
| 部署平台 | GitHub Pages |
| 依赖 | **零外部依赖** |

### 目录结构

```
Admin-Platform/
├── index.html                  # 入口：平台选择页（Hash: #/ 或空）
├── js/
│   ├── config.js               # ★ 子平台列表 + 菜单树（所有路由的数据来源）
│   ├── router.js               # ★ Hash 路由核心逻辑
│   └── app.js                  # ★ 主控制器：渲染与状态管理
├── assets/
│   ├── css/common.css          # ★ 唯一样式表（不可绕过）
│   ├── js/header-dropdown.js   # 交互行为：下拉菜单、侧边栏折叠
│   └── img/logo.png
└── pages/                      # 43 个静态 HTML 页面（按子平台分目录）
    ├── dapp-manager/           # 层级 1：pages/subplatform/page.html
    ├── dapp-data-center/
    │   └── loyalty-points/     # 层级 2：pages/subplatform/group/page.html
    ├── devsuite-data-center/
    │   ├── user-data/          # 层级 2（嵌套）
    │   ├── order-data/
    │   └── payment-data/
    ├── devsuite-manager/
    ├── staking-manager/
    ├── campaign-manager/
    ├── website-manager/
    ├── operation-center/
    └── access-control/
```

---

## 3. 代码约定与规范

### 3.1 UI 风格（强制执行，见 `AGENTS.md`）

- **禁止**引入任何新 UI 框架（React、Vue、Tailwind 等）
- **禁止**修改全局颜色、间距比例或排版系统
- **必须**复用 `assets/css/common.css`，不得在页面内写 `<style>` 块覆盖
- **必须**保持 Header（`#1a1d26`，56px）+ Sidebar（240px，`#fafafa`）+ Main 三栏布局不变
- 新增页面级样式应作为 class 追加到 `common.css` 末尾，命名需有业务前缀（如 `.dapp-table`）

### 3.2 JavaScript 规范

- 所有脚本使用原生 ES5 兼容写法（`var`，`function`，无 `class` / 箭头函数除非已有先例）
- 全局变量暴露在 `window` 上（`Router`、`SUBPLATFORMS`、`MENUS`、`getMenus`、`getPageIds`）
- 所有 HTML 内容动态生成时必须经过 `escapeHtml()` / `escapeAttr()`（已在 `app.js` 和 `header-dropdown.js` 实现）
- 事件处理禁止直接 `innerHTML` 拼接未转义字符串，防止 XSS

### 3.3 HTML 页面结构规范

每个 `pages/` 下的 HTML 文件必须遵循以下结构：

```html
<!-- 资源路径：层级1页面用 ../../，层级2页面用 ../../../ -->
<link rel="stylesheet" href="../../assets/css/common.css">
<script src="../../js/config.js"></script>
<script src="../../js/router.js"></script>
<script src="../../js/app.js"></script>
<script src="../../assets/js/header-dropdown.js"></script>

<!-- 标准布局骨架（不得修改结构） -->
<div class="workspace">
  <header class="app-header">…</header>
  <div class="workspace-body">
    <aside class="sidebar">…</aside>
    <main class="main">
      <div id="main-placeholder">…</div>
    </main>
  </div>
</div>
```

### 3.4 路由与菜单命名规范

- 子平台 ID：`kebab-case`，与 `pages/` 目录名完全一致（如 `dapp-manager`）
- 页面 ID：`kebab-case`，与 HTML 文件名（去 `.html`）完全一致（如 `dapp-order`）
- 嵌套页面 ID 用 `/` 分隔（如 `loyalty-points/rank-data`），对应 `pages/dapp-data-center/loyalty-points/rank-data.html`
- 新增页面必须同步在 `js/config.js` 的 `MENUS` 对象中添加对应条目

### 3.5 CSS 类名规范

| 层次 | 类名 | 说明 |
|------|------|------|
| 工作台容器 | `.workspace` | 顶级布局容器 |
| 顶栏 | `.app-header` | 固定高度 56px |
| 侧边栏 | `.sidebar`, `.nav-menu`, `.nav-item`, `.nav-subitem` | 不得修改 |
| 主内容区 | `.main`, `.main-placeholder` | 页面内容写在此内 |
| 激活态 | `.active`（链接）、`.expanded`（菜单组） | 由 JS 动态添加 |

---

## 4. 核心模块——修改时需特别小心

以下文件是整个原型的运行骨架，**任何改动都会影响全部 43 个页面**：

### `js/config.js` ⚠️ 高风险

- 是路由、侧边栏、下拉菜单的**唯一数据来源**
- `MENUS` 中的 `id` 字段必须与 `pages/` 目录下的文件名完全对应
- 嵌套菜单项（有 `children`）不会生成直接链接，只作为折叠分组；叶子节点才对应实际页面
- 修改任何 `id` 时，必须同步重命名对应 HTML 文件

### `js/router.js` ⚠️ 高风险

- Hash 路由核心：`parseHash()` 负责将 URL 解析为状态，`getState()` 负责自动重定向（子平台根路径 → 第一个页面）
- `Router` 对象暴露到 `window`，被 `app.js` 和 `header-dropdown.js` 共同依赖
- 修改解析逻辑可能导致所有导航失效

### `js/app.js` ⚠️ 高风险

- 控制选择页 ↔ 工作台的切换（`showSelectionPage` / `showWorkspace`）
- 控制 Sidebar 渲染与激活项高亮
- `escapeHtml` / `escapeAttr` 是安全屏障，禁止删除

### `assets/css/common.css` ⚠️ 高风险

- 全站唯一样式文件，所有 43 个页面均引用
- 修改已有选择器会全局生效；只在末尾追加新样式，不要修改现有规则

### `assets/js/header-dropdown.js` 中风险

- **已知重复**：内部 `PLATFORMS` 数组与 `config.js` 的 `SUBPLATFORMS` 重复，修改子平台时需**同步更新两处**
- `getBasePath()` 依赖 `location.pathname` 层级计算相对路径，层级判断逻辑脆弱（仅支持层级 1 和层级 2）

---

## 5. Mock / 占位内容——后续需替换

### 5.1 所有页面主内容区（43 个页面）

`app.js` 的 `renderMainPlaceholder()` 会向 `#main-placeholder` 写入：
```html
<h2>页面标题</h2>
<p>Page content will be implemented here.</p>
```
实现某页面时，**替换此占位内容**，在对应 HTML 的 `<div id="main-placeholder">` 内编写真实 UI。

### 5.2 硬编码用户信息

每个 `pages/` HTML 文件的 Header 中：
```html
<span>yi@infstones.com</span>
```
这是硬编码的占位邮箱，真实实现时应从认证 Context 动态注入。

### 5.3 登出逻辑

`header-dropdown.js` 的 `getLogoutRedirect()` 返回相对路径 `../../index.html`，仅做页面跳转，无实际会话销毁。

### 5.4 认证与权限

- 无登录态校验，所有页面直接可访问
- 无 RBAC 权限判断，菜单对所有人完全展示
- 所有 Activity Log 页面为空壳，无实际审计数据

### 5.5 `header-dropdown.js` 中的 `PLATFORMS` 数组

```javascript
// header-dropdown.js 第 5-15 行
var PLATFORMS = [ ... ];  // ← 与 config.js SUBPLATFORMS 重复，是临时方案
```
后续应统一从 `config.js` 读取，消除重复。

---

## 6. 当前版本已知问题与限制

### 关键限制

| 问题 | 位置 | 影响 |
|------|------|------|
| 子平台列表双重维护 | `config.js` + `header-dropdown.js` | 新增子平台必须改两处，易遗漏 |
| 嵌套层级仅支持 2 级 | `header-dropdown.js:getBasePath()` | 3 级嵌套页面的资源路径计算会出错 |
| 菜单仅支持 2 级嵌套 | `js/config.js` + `app.js:renderSidebar()` | 若需 3 级菜单需改造渲染逻辑 |
| 路由仅支持单个 `onHashChange` 回调 | `router.js` | 多处注册监听会覆盖，不能多处监听路由 |

### 功能空白

- 无任何 API 请求（零 HTTP 调用）
- 无表单、表格、弹窗、图表等业务 UI 组件（仅有布局样式）
- 无错误页面（无效路由静默 fallback 到默认子平台）
- 无加载状态、空状态设计
- 无响应式适配（移动端未支持）

### 工程约束

- 无构建工具：不能使用 `import/export`、不能使用 `npm` 包，所有代码必须是可直接在浏览器运行的原生 JS
- 无 TypeScript：无类型检查，注意保持函数签名一致
- 无测试：修改核心文件后需手动验证所有导航路径
- 部署即 push：合并到 `main` 分支立即生效，无预发布环境
