# PRODUCT_CONTEXT.md

> 本文档基于对项目所有源码的完整分析自动生成，供研发、设计和产品团队参考。
> 最后更新：2026-02-27

---

## 1. 产品定位与目标用户

### 产品定位

**INFSTONES Admin Platform** 是一个面向 INFSTONES 公司内部运营团队的多模块综合管理后台，整合了 DApp 生态、区块链开发者服务（DevSuite）、网站内容、运营中心、质押管理等多个业务线的管理能力。

当前阶段为 **高保真 HTML 原型（Prototype）**，已部署至 GitHub Pages 进行设计评审和干系人确认，尚未接入真实后端服务。

### 目标用户

| 角色 | 使用场景 |
|------|----------|
| 内部运营管理员 | 管理用户账户、积分、优惠券、推荐码、白名单等运营数据 |
| 开发者平台管理员 | 管理 DevSuite 用户、节点实例、API 配置、协议状态 |
| 网站内容编辑 | 管理官网新闻、博客、事件和质押页面内容 |
| 安全/运营值班人员 | 处理漏洞报告、在线故障、支持工单、Zendesk 票据 |
| 系统管理员 | 管理团队成员权限、角色分配、操作审计日志 |

---

## 2. 页面/模块列表及功能职责

平台共包含 **9 个子平台**，**43 个页面**，通过顶部平台选择器和左侧导航菜单进行切换。

### 2.1 首页 —— 平台选择页

**路径：** `index.html`（Hash: `#/` 或空）

平台入口，以分组卡片形式展示所有 9 个子平台，点击即可进入对应子平台的第一个页面。

---

### 2.2 Dapp Admin 分组（4 个子平台）

#### 子平台①：Dapp Manager（DApp 管理）

| 页面 | 路由 | 功能描述 |
|------|------|----------|
| Dapp | `#/dapp-manager/dapp` | DApp 列表管理，增删改查 DApp 配置信息 |
| BeraVaultDirectWhitelist | `#/dapp-manager/beravault-direct-whitelist` | BeraVault 白名单地址管理 |
| EigenLayer Milestones | `#/dapp-manager/eigenlayer-milestones` | EigenLayer 里程碑进度跟踪与管理 |
| Activity Log | `#/dapp-manager/activity-log` | DApp 管理模块的操作审计日志 |

#### 子平台②：Dapp Data Center（DApp 数据中心）

| 页面 | 路由 | 功能描述 |
|------|------|----------|
| Dapp Order | `#/dapp-data-center/dapp-order` | DApp 订单列表查询与管理 |
| Dapp User | `#/dapp-data-center/dapp-user` | DApp 用户账户管理 |
| Referral Code | `#/dapp-data-center/referral-code` | 邀请/推荐码系统管理 |
| Account Credit | `#/dapp-data-center/account-credit` | 用户账户积分/余额管理 |
| Loyalty Points → Rank Data | `#/dapp-data-center/loyalty-points/rank-data` | 忠诚度积分排行榜数据 |
| Loyalty Points → User Data | `#/dapp-data-center/loyalty-points/user-data` | 用户维度的忠诚度积分数据 |

#### 子平台③：Staking Manager（质押管理）

| 页面 | 路由 | 功能描述 |
|------|------|----------|
| Ethereum MEV Reward | `#/staking-manager/ethereum-mev-reward` | 以太坊 MEV 奖励分配管理 |
| Staking Metadata | `#/staking-manager/staking-metadata` | 质押参数与元数据配置 |
| Activity Log | `#/staking-manager/activity-log` | 质押管理操作审计日志 |

#### 子平台④：Campaign Manager（营销活动管理）

| 页面 | 路由 | 功能描述 |
|------|------|----------|
| Coupon Setting | `#/campaign-manager/coupon-setting` | 优惠券创建与配置管理 |
| Coupon Distribution | `#/campaign-manager/coupon-distribution` | 优惠券发放与分发管理 |

---

### 2.3 DevSuite Admin 分组（2 个子平台）

#### 子平台⑤：DevSuite Manager（开发者服务管理）

| 页面 | 路由 | 功能描述 |
|------|------|----------|
| DevSuite User | `#/devsuite-manager/devsuite-user` | 开发者用户账户管理 |
| Fast API | `#/devsuite-manager/fast-api` | Fast API 产品配置管理 |
| Power Node | `#/devsuite-manager/power-node` | Power Node 节点管理 |
| Protocol Status | `#/devsuite-manager/protocol-status` | 区块链协议状态监控 |
| Promotion Code | `#/devsuite-manager/promotion-code` | 推广码管理 |
| Email Center | `#/devsuite-manager/email-center` | 邮件营销/通知中心管理 |
| Node Instance | `#/devsuite-manager/node-instance` | 节点实例管理 |
| Activity Log | `#/devsuite-manager/activity-log` | DevSuite 管理操作审计日志 |

#### 子平台⑥：DevSuite Data Center（开发者服务数据中心）

| 页面 | 路由 | 功能描述 |
|------|------|----------|
| User Data → Weekly Data | `#/devsuite-data-center/user-data/weekly-data` | 用户周维度数据报表 |
| User Data → User Summary | `#/devsuite-data-center/user-data/user-summary` | 用户汇总分析 |
| Order Data → Order Details | `#/devsuite-data-center/order-data/order-details` | 订单详情查询 |
| Order Data → Order Summary | `#/devsuite-data-center/order-data/order-summary` | 订单汇总分析 |
| Payment Data → Credit History | `#/devsuite-data-center/payment-data/credit-history` | 用户信用额度变动历史 |
| Payment Data → All Payments | `#/devsuite-data-center/payment-data/all-payments` | 全量支付记录 |
| Payment Data → Monthly Data | `#/devsuite-data-center/payment-data/monthly-data` | 支付月度数据报表 |

---

### 2.4 Website Admin 分组（1 个子平台）

#### 子平台⑦：Website Manager（官网内容管理）

| 页面 | 路由 | 功能描述 |
|------|------|----------|
| News and Blogs | `#/website-manager/news-and-blogs` | 官网新闻与博客内容管理 |
| Events | `#/website-manager/events` | 官网活动/事件内容管理 |
| Staking | `#/website-manager/staking` | 官网质押页面内容管理 |

---

### 2.5 Operation Center 分组（1 个子平台）

#### 子平台⑧：Operation Center（运营中心）

| 页面 | 路由 | 功能描述 |
|------|------|----------|
| Vulnerability Report | `#/operation-center/vulnerability-report` | 安全漏洞报告管理 |
| Online Issue | `#/operation-center/online-issue` | 线上故障实时监控与处理 |
| Product Feature Request | `#/operation-center/product-feature-request` | 产品功能需求收集与跟踪 |
| DevSuite Support Request | `#/operation-center/devsuite-support-request` | DevSuite 平台支持工单 |
| Website Support Request | `#/operation-center/website-support-request` | 官网支持工单 |
| Zendesk Ticket | `#/operation-center/zendesk-ticket` | Zendesk 集成工单管理 |
| Activity Log | `#/operation-center/activity-log` | 运营中心操作审计日志 |

---

### 2.6 Access Control 分组（1 个子平台）

#### 子平台⑨：Access Control（访问控制）

| 页面 | 路由 | 功能描述 |
|------|------|----------|
| Role Management | `#/access-control/role-management` | 用户角色与权限定义管理 |
| Member Management | `#/access-control/member-management` | 团队成员账户管理 |
| Activity Log | `#/access-control/activity-log` | 访问控制操作审计日志 |

---

## 3. 核心业务逻辑与数据流

### 3.1 整体架构

本项目为纯前端静态原型，采用**基于 URL Hash 的客户端路由**，所有状态通过 URL Hash 传递：

```
用户操作（点击导航/平台切换）
    ↓
URL Hash 变化（window.location.hash）
    ↓
Router.parseHash() → 解析出 { subplatformId, pageId }
    ↓
Router.onHashChange() → 通知监听者
    ↓
app.js: applyState()
    ├─ selectionPage 为 true → renderSelectionPage()（渲染平台选择页）
    └─ selectionPage 为 false → renderWorkspace()
           ├─ renderDropdown()     渲染顶部平台切换下拉
           ├─ renderSidebar()      渲染左侧导航菜单
           └─ renderMainPlaceholder()  渲染主内容区（当前为占位符）
                    ↓
           header-dropdown.js: 初始化交互行为
               ├─ initPlatformDropdown()   平台下拉菜单开关
               ├─ initUserDropdown()       用户下拉（登出）
               └─ initSidebarExpandCollapse()  菜单折叠展开
```

### 3.2 路由状态模型

```javascript
// 平台选择页
{ selectionPage: true }

// 工作台页面
{
  selectionPage: false,
  subplatformId: "dapp-manager",           // 当前子平台 ID
  pageId: "loyalty-points/user-data"       // 当前页面路径（支持嵌套 /）
}
```

### 3.3 URL Hash 规则

| URL Hash | 解析结果 |
|----------|----------|
| `#` / `#/` / 空 | 平台选择页 |
| `#/dapp-manager` | 跳转到 dapp-manager 第一个页面（自动重定向） |
| `#/dapp-manager/dapp` | dapp-manager 子平台 → dapp 页面 |
| `#/devsuite-data-center/user-data/weekly-data` | devsuite-data-center → user-data/weekly-data 嵌套页面 |

### 3.4 导航交互流程

1. **平台选择页 → 子平台**：点击平台卡片，通过 `<a href>` 跳转并设置 Hash，Router 解析后渲染工作台。
2. **顶部下拉切换子平台**：点击平台 Dropdown，选中目标平台，调用 `Router.navigateToSubplatform()` 跳转到该平台首页。
3. **侧边栏页面导航**：点击菜单项，阻止默认跳转，调用 `Router.navigateToPage()` 更新 Hash。
4. **菜单折叠展开**：点击有子菜单的 `.has-children` 项，切换 `.expanded` 类，CSS 控制子菜单显隐。
5. **登出**：点击用户下拉中的 "Log Out"，跳转至 `../../index.html`（相对路径回到首页）。

---

## 4. 技术栈与项目目录结构

### 4.1 技术栈

| 类别 | 技术选型 |
|------|----------|
| 语言 | 原生 JavaScript（ES5+，无编译/打包） |
| 样式 | 原生 CSS3（Flexbox 布局） |
| 标记语言 | 静态 HTML5 |
| 路由 | 自实现 Hash 路由（无框架依赖） |
| 状态管理 | URL Hash 即状态，无额外状态库 |
| 构建工具 | 无（纯静态文件，直接部署） |
| 部署平台 | GitHub Pages（push to main 自动部署） |
| 包管理器 | 无（无 npm / yarn / bun 依赖） |
| 测试框架 | 无 |

### 4.2 项目目录结构

```
Admin-Platform/
│
├── index.html                    # 入口页：平台选择页
├── README.md                     # 项目简介
├── AGENTS.md                     # 项目规范与治理文档（AI 协作规则）
├── PRODUCT_CONTEXT.md            # 本文档
│
├── js/                           # 核心应用逻辑
│   ├── config.js                 # 静态配置：子平台定义 + 菜单树（133 行）
│   ├── router.js                 # Hash 路由实现（118 行）
│   └── app.js                    # 主控制器：渲染与状态管理（245 行）
│
├── assets/
│   ├── css/
│   │   └── common.css            # 统一样式表（460 行）
│   ├── js/
│   │   └── header-dropdown.js    # 交互行为：下拉菜单、侧边栏折叠（176 行）
│   └── img/
│       └── logo.png              # INFSTONES Logo
│
└── pages/                        # 43 个静态 HTML 页面模板
    ├── access-control/           # 3 个页面
    │   ├── role-management.html
    │   ├── member-management.html
    │   └── activity-log.html
    ├── campaign-manager/         # 2 个页面
    │   ├── coupon-setting.html
    │   └── coupon-distribution.html
    ├── dapp-data-center/         # 6 个页面（含嵌套目录）
    │   ├── dapp-order.html
    │   ├── dapp-user.html
    │   ├── referral-code.html
    │   ├── account-credit.html
    │   └── loyalty-points/
    │       ├── rank-data.html
    │       └── user-data.html
    ├── dapp-manager/             # 4 个页面
    │   ├── dapp.html
    │   ├── beravault-direct-whitelist.html
    │   ├── eigenlayer-milestones.html
    │   └── activity-log.html
    ├── devsuite-data-center/     # 7 个页面（多级嵌套）
    │   ├── user-data/
    │   │   ├── weekly-data.html
    │   │   └── user-summary.html
    │   ├── order-data/
    │   │   ├── order-details.html
    │   │   └── order-summary.html
    │   └── payment-data/
    │       ├── credit-history.html
    │       ├── all-payments.html
    │       └── monthly-data.html
    ├── devsuite-manager/         # 8 个页面
    │   ├── devsuite-user.html
    │   ├── fast-api.html
    │   ├── power-node.html
    │   ├── protocol-status.html
    │   ├── promotion-code.html
    │   ├── email-center.html
    │   ├── node-instance.html
    │   └── activity-log.html
    ├── operation-center/         # 7 个页面
    │   ├── vulnerability-report.html
    │   ├── online-issue.html
    │   ├── product-feature-request.html
    │   ├── devsuite-support-request.html
    │   ├── website-support-request.html
    │   ├── zendesk-ticket.html
    │   └── activity-log.html
    ├── staking-manager/          # 3 个页面
    │   ├── ethereum-mev-reward.html
    │   ├── staking-metadata.html
    │   └── activity-log.html
    └── website-manager/          # 3 个页面
        ├── news-and-blogs.html
        ├── events.html
        └── staking.html
```

### 4.3 核心文件说明

#### `js/config.js` — 静态配置
定义了所有子平台信息和导航菜单树，是整个路由和导航的数据来源：
- `SUBPLATFORMS[]`：9 个子平台定义（id、label、group 分组）
- `MENUS{}`：每个子平台对应的菜单树（支持单层和两级嵌套）
- `DEFAULT_SUBPLATFORM_ID`：默认子平台（`"dapp-manager"`）
- `getMenus(id)`：获取指定子平台菜单
- `getPageIds(id)`：获取子平台所有页面的扁平路径列表

#### `js/router.js` — Hash 路由
- `parseHash()`：解析 `window.location.hash` 为状态对象
- `getState()`：获取当前路由状态
- `navigateToSubplatform(id, pageId?)`：跳转到指定子平台
- `navigateToPage(subplatformId, pageId)`：跳转到指定页面
- `onHashChange(callback)`：注册路由变化监听器

#### `js/app.js` — 主应用控制器
- `renderSelectionPage()`：渲染平台选择页内容
- `renderWorkspace(state)`：渲染工作台布局（顶栏 + 侧边栏 + 主内容）
- `renderDropdown(activeSubplatformId)`：渲染平台切换下拉选项
- `renderSidebar(subplatformId, pageId)`：渲染左侧导航菜单并高亮当前项
- `renderMainPlaceholder(subplatformId, pageId)`：渲染主内容区（当前为占位符）
- `applyState(state)`：根据路由状态决定渲染分支

#### `assets/js/header-dropdown.js` — 交互行为
- `getBasePath()`：根据当前页面路径计算相对路径前缀
- `renderPanel()`：渲染平台切换下拉面板
- `initUserDropdown()`：初始化用户下拉（Log Out）
- `initSidebarExpandCollapse()`：初始化侧边栏菜单折叠/展开

#### `assets/css/common.css` — 统一样式
涵盖：Reset 样式、平台选择页卡片、工作台 Flexbox 布局、Header 样式（高度 56px，背景 `#1a1d26`）、平台下拉面板、侧边栏导航（宽度 240px，背景 `#fafafa`）、主内容区样式。

---

## 5. 当前已完成的功能

### 5.1 基础框架与导航

- [x] 平台选择页：9 个子平台以分组卡片形式展示，支持点击进入
- [x] 工作台布局：Header + Sidebar + Main 三栏 Flexbox 布局
- [x] Hash 路由：完整实现基于 URL Hash 的客户端路由（含嵌套路径）
- [x] 平台切换下拉：顶部 Header 中可展开/收起平台选择面板，切换子平台
- [x] 左侧导航菜单：支持单层菜单和两级嵌套菜单，当前激活项高亮
- [x] 菜单折叠展开：有子菜单的菜单组支持点击展开/收起
- [x] 用户信息区：Header 右侧展示用户邮件 + 下拉菜单（含 Log Out 入口）
- [x] 自动重定向：访问子平台根路径时自动跳转到该子平台第一个页面

### 5.2 页面结构

- [x] 43 个页面 HTML 模板：全部创建完成，包含标准工作台布局
- [x] 9 个子平台、65+ 个导航菜单项配置完整

### 5.3 样式

- [x] 整体视觉风格统一（深色 Header + 浅灰侧边栏 + 白色主内容区）
- [x] INFSTONES 品牌 Logo 集成
- [x] 响应式基础布局（Flexbox）

---

## 6. 尚未完成或需要优化的部分

### 6.1 核心功能缺失（高优先级）

#### 所有页面内容均为占位符
当前 43 个页面的主内容区全部显示 `"Page content will be implemented here"`，无任何实际 UI 组件。需要针对每个页面实现：
- 数据列表/表格（含搜索、筛选、分页）
- 表单（创建/编辑/删除）
- 详情查看弹窗或跳转页
- 数据可视化图表（数据中心类页面）
- 操作按钮与确认流程

#### 认证与授权未实现
- 用户邮件硬编码为 `yi@infstones.com`，需接入真实登录态
- 无 Session/Token 管理
- 无权限校验（RBAC 要求在 AGENTS.md 中明确列出但未实现）
- 登出逻辑仅为页面跳转，无真实会话销毁

#### 后端 API 未接入
- 所有数据均为静态占位，无任何 HTTP 请求
- 需要定义并接入后端接口

### 6.2 各模块具体待实现功能

| 模块 | 待实现功能 |
|------|-----------|
| Dapp Manager | DApp CRUD、白名单地址增删查改、EigenLayer 里程碑进度展示与编辑 |
| Dapp Data Center | 订单列表与筛选、用户管理、推荐码生成与管理、积分充值/扣减、忠诚度积分排行/明细 |
| Staking Manager | MEV 奖励分配记录与操作、质押元数据配置表单 |
| Campaign Manager | 优惠券创建/编辑/删除表单、优惠券发放向导（批量/指定用户） |
| DevSuite Manager | 开发者用户 CRUD、API Key 管理、节点实例部署/监控、协议状态告警、邮件模板与发送 |
| DevSuite Data Center | 数据图表（折线图、柱图）、多维度筛选、数据导出（CSV/Excel） |
| Website Manager | 富文本编辑器、博客/事件 CRUD、内容发布状态管理 |
| Operation Center | 工单状态流转、漏洞等级分类、Zendesk API 集成、实时告警 |
| Access Control | 角色权限矩阵编辑器、成员邀请/移除、权限继承逻辑 |

### 6.3 技术债务与优化项

#### 代码结构

- **配置重复**：`header-dropdown.js` 中 `PLATFORMS` 数组与 `config.js` 中 `SUBPLATFORMS` 重复定义，违反单一数据源原则，需合并。
- **路径硬编码**：各页面 HTML 中使用相对路径（`../../`、`../../../`）引用资源，容易出错，层级越深维护难度越大。
- **用户邮件硬编码**：每个页面 HTML 均包含 `<span>yi@infstones.com</span>`，应改为动态注入。
- **无组件化**：43 个页面每个都完整复制了工作台 HTML 结构，缺乏模板/组件复用机制。

#### 工程化

- **无构建工具**：缺少 Vite/Webpack 等打包工具，无代码分割、Tree Shaking、资源 Hash。
- **无 TypeScript**：无类型安全保障，大型功能扩展容易引入 Bug。
- **无自动化测试**：无单元测试、集成测试、E2E 测试。
- **无热重载**：开发时需手动刷新，效率低。

#### 样式

- **组件样式缺失**：`common.css` 仅定义布局骨架，缺少表格、表单、按钮、输入框、模态框、标签页、通知/Toast 等通用组件样式。
- **无设计 Token 系统**：颜色、间距、字体等未通过 CSS Variables 系统化管理。

#### 无障碍 & 用户体验

- **键盘导航不完整**：仅有基础 `tabindex` 和 `aria` 属性，缺乏焦点管理。
- **无 404 页面**：路由匹配失败无任何错误提示。
- **无加载状态**：未来接入 API 后需要 Loading/Skeleton 状态。
- **无空状态设计**：数据列表为空时的 Empty State 未规划。

#### 安全

- **RBAC 未实现**（AGENTS.md 明确要求）：所有用户可访问所有页面，无权限隔离。
- **审计日志仅为页面占位**：Activity Log 页面存在但无实际数据。

---

## 附录：统计数据

| 项目 | 数值 |
|------|------|
| 子平台数量 | 9 |
| 页面数量 | 43 |
| 导航菜单项（含嵌套） | 65+ |
| JS 代码总行数 | ~672 行 |
| CSS 代码行数 | ~460 行 |
| 图片资源 | 1（logo.png） |
| 外部依赖 | 0 |
| API 接口 | 0（纯前端原型） |
| 测试覆盖率 | 0% |
| 部署地址 | https://yiyang-chn.github.io/Admin-Platform/ |
