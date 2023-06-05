### 系统功能

|     | 功能    | 描述                              |
|-----|-------|---------------------------------|
|     | 用户管理  | 用户是系统操作者，该功能主要完成系统用户配置          |
| ⭐️  | 在线用户  | 当前系统中活跃用户状态监控，支持手动踢下线           |
|     | 角色管理  | 角色菜单权限分配、设置角色按机构进行数据范围权限划分      |
|     | 菜单管理  | 配置系统菜单、操作权限、按钮权限标识等，本地缓存提供性能    |
|     | 部门管理  | 配置系统组织机构（公司、部门、小组），树结构展现支持数据权限  |
|     | 岗位管理  | 配置系统用户所属担任职务                    |
| 🚀  | 租户管理  | 配置系统租户，支持 SaaS 场景下的多租户功能        |
| 🚀  | 租户套餐  | 配置租户套餐，自定每个租户的菜单、操作、按钮的权限       |
|     | 字典管理  | 对系统中经常使用的一些较为固定的数据进行维护          |
| 🚀  | 短信管理  | 短信渠道、短息模板、短信日志，对接阿里云、腾讯云等主流短信平台 |
| 🚀  | 邮件管理  | 邮箱账号、邮件模版、邮件发送日志，支持所有邮件平台       |
| 🚀  | 站内信   | 系统内的消息通知，提供站内信模版、站内信消息          |
| 🚀  | 操作日志  | 系统正常操作日志记录和查询，集成 Swagger 生成日志内容 |
| ⭐️  | 登录日志  | 系统登录日志记录查询，包含登录异常               |
| 🚀  | 错误码管理 | 系统所有错误码的管理，可在线修改错误提示，无需重启服务     |
|     | 通知公告  | 系统通知公告信息发布维护                    |
| 🚀  | 敏感词   | 配置系统敏感词，支持标签分组                  |
| 🚀  | 应用管理  | 管理 SSO 单点登录的应用，支持多种 OAuth2 授权方式 |
| 🚀  | 地区管理  | 展示省份、城市、区镇等城市信息，支持 IP 对应城市      |

### 基础设施

|     | 功能       | 描述                                           |
|-----|----------|----------------------------------------------|
| 🚀  | 代码生成     | 前后端代码的生成（Java、Vue、SQL、单元测试），支持 CRUD 下载       |
| 🚀  | 系统接口     | 基于 Swagger 自动生成相关的 RESTful API 接口文档          |
| 🚀  | 数据库文档    | 基于 Screw 自动生成数据库文档，支持导出 Word、HTML、MD 格式      |
|     | 表单构建     | 拖动表单元素生成相应的 HTML 代码，支持导出 JSON、Vue 文件         |
| 🚀  | 配置管理     | 对系统动态配置常用参数，支持 SpringBoot 加载                 |
| ⭐️  | 定时任务     | 在线（添加、修改、删除)任务调度包含执行结果日志                     |
| 🚀  | 文件服务     | 支持将文件存储到 S3（MinIO、阿里云、腾讯云、七牛云）、本地、FTP、数据库等   | 
| 🚀  | API 日志   | 包括 RESTful API 访问日志、异常日志两部分，方便排查 API 相关的问题   |
|     | MySQL 监控 | 监视当前系统数据库连接池状态，可进行分析SQL找出系统性能瓶颈              |
|     | Redis 监控 | 监控 Redis 数据库的使用情况，使用的 Redis Key 管理           |
| 🚀  | 消息队列     | 基于 Redis 实现消息队列，Stream 提供集群消费，Pub/Sub 提供广播消费 |
| 🚀  | Java 监控  | 基于 Spring Boot Admin 实现 Java 应用的监控           |
| 🚀  | 链路追踪     | 接入 SkyWalking 组件，实现链路追踪                      |
| 🚀  | 日志中心     | 接入 SkyWalking 组件，实现日志中心                      |
| 🚀  | 分布式锁     | 基于 Redis 实现分布式锁，满足并发场景                       |
| 🚀  | 幂等组件     | 基于 Redis 实现幂等组件，解决重复请求问题                     |
| 🚀  | 服务保障     | 基于 Resilience4j 实现服务的稳定性，包括限流、熔断等功能          |
| 🚀  | 日志服务     | 轻量级日志中心，查看远程服务器的日志                           |
| 🚀  | 单元测试     | 基于 JUnit + Mockito 实现单元测试，保证功能的正确性、代码的质量等    |

### 系统功能

| 模块       | biu                                                                | biu                                                              | biu                                                              |
|------------|--------------------------------------------------------------------|------------------------------------------------------------------|------------------------------------------------------------------|
| 登录 & 首页  | ![登录](https://static.iocoder.cn/images/ruoyi-vue-pro/登录.jpg?imageView2/2/format/webp/w/1280)       | ![首页](https://static.iocoder.cn/images/ruoyi-vue-pro/首页.jpg?imageView2/2/format/webp/w/1280)     | ![个人中心](https://static.iocoder.cn/images/ruoyi-vue-pro/个人中心.jpg?imageView2/2/format/webp/w/1280) |
| 用户 & 应用  | ![用户管理](https://static.iocoder.cn/images/ruoyi-vue-pro/用户管理.jpg?imageView2/2/format/webp/w/1280)   | ![令牌管理](https://static.iocoder.cn/images/ruoyi-vue-pro/令牌管理.jpg?imageView2/2/format/webp/w/1280) | ![应用管理](https://static.iocoder.cn/images/ruoyi-vue-pro/应用管理.jpg?imageView2/2/format/webp/w/1280)                                                                |
| 租户 & 套餐  | ![租户管理](https://static.iocoder.cn/images/ruoyi-vue-pro/租户管理.jpg?imageView2/2/format/webp/w/1280)   | ![租户套餐](https://static.iocoder.cn/images/ruoyi-vue-pro/租户套餐.png) | -                                                                |
| 部门 & 岗位  | ![部门管理](https://static.iocoder.cn/images/ruoyi-vue-pro/部门管理.jpg?imageView2/2/format/webp/w/1280)   | ![岗位管理](https://static.iocoder.cn/images/ruoyi-vue-pro/岗位管理.jpg?imageView2/2/format/webp/w/1280) | -                                                                |
| 菜单 & 角色  | ![菜单管理](https://static.iocoder.cn/images/ruoyi-vue-pro/菜单管理.jpg?imageView2/2/format/webp/w/1280)   | ![角色管理](https://static.iocoder.cn/images/ruoyi-vue-pro/角色管理.jpg?imageView2/2/format/webp/w/1280) | -                                                                |
| 审计日志     | ![操作日志](https://static.iocoder.cn/images/ruoyi-vue-pro/操作日志.jpg?imageView2/2/format/webp/w/1280)   | ![登录日志](https://static.iocoder.cn/images/ruoyi-vue-pro/登录日志.jpg?imageView2/2/format/webp/w/1280) | -                                                                |
| 短信       | ![短信渠道](https://static.iocoder.cn/images/ruoyi-vue-pro/短信渠道.jpg?imageView2/2/format/webp/w/1280)   | ![短信模板](https://static.iocoder.cn/images/ruoyi-vue-pro/短信模板.jpg?imageView2/2/format/webp/w/1280) | ![短信日志](https://static.iocoder.cn/images/ruoyi-vue-pro/短信日志.jpg?imageView2/2/format/webp/w/1280) |
| 字典 & 敏感词 | ![字典类型](https://static.iocoder.cn/images/ruoyi-vue-pro/字典类型.jpg?imageView2/2/format/webp/w/1280)   | ![字典数据](https://static.iocoder.cn/images/ruoyi-vue-pro/字典数据.jpg?imageView2/2/format/webp/w/1280) | ![敏感词](https://static.iocoder.cn/images/ruoyi-vue-pro/敏感词.jpg?imageView2/2/format/webp/w/1280)                                                                |
| 错误码 & 通知 | ![错误码管理](https://static.iocoder.cn/images/ruoyi-vue-pro/错误码管理.jpg?imageView2/2/format/webp/w/1280) | ![通知公告](https://static.iocoder.cn/images/ruoyi-vue-pro/通知公告.jpg?imageView2/2/format/webp/w/1280) | -                                                                |

### 工作流程

| 模块      | biu                                                                    | biu                                                                    | biu                                                                    |
|---------|------------------------------------------------------------------------|------------------------------------------------------------------------|------------------------------------------------------------------------|
| 流程模型    | ![流程模型-列表](https://static.iocoder.cn/images/ruoyi-vue-pro/流程模型-列表.jpg?imageView2/2/format/webp/w/1280) | ![流程模型-设计](https://static.iocoder.cn/images/ruoyi-vue-pro/流程模型-设计.jpg?imageView2/2/format/webp/w/1280) | ![流程模型-定义](https://static.iocoder.cn/images/ruoyi-vue-pro/流程模型-定义.jpg?imageView2/2/format/webp/w/1280) |
| 表单 & 分组 | ![流程表单](https://static.iocoder.cn/images/ruoyi-vue-pro/流程表单.jpg?imageView2/2/format/webp/w/1280)       | ![用户分组](https://static.iocoder.cn/images/ruoyi-vue-pro/用户分组.jpg?imageView2/2/format/webp/w/1280)       | -                                                                      |
| 我的流程    | ![我的流程-列表](https://static.iocoder.cn/images/ruoyi-vue-pro/我的流程-列表.jpg?imageView2/2/format/webp/w/1280) | ![我的流程-发起](https://static.iocoder.cn/images/ruoyi-vue-pro/我的流程-发起.jpg?imageView2/2/format/webp/w/1280) | ![我的流程-详情](https://static.iocoder.cn/images/ruoyi-vue-pro/我的流程-详情.jpg?imageView2/2/format/webp/w/1280) |
| 待办 & 已办 | ![任务列表-审批](https://static.iocoder.cn/images/ruoyi-vue-pro/任务列表-审批.jpg?imageView2/2/format/webp/w/1280) | ![任务列表-待办](https://static.iocoder.cn/images/ruoyi-vue-pro/任务列表-待办.jpg?imageView2/2/format/webp/w/1280) | ![任务列表-已办](https://static.iocoder.cn/images/ruoyi-vue-pro/任务列表-已办.jpg?imageView2/2/format/webp/w/1280) |
| OA 请假   | ![OA请假-列表](https://static.iocoder.cn/images/ruoyi-vue-pro/OA请假-列表.jpg?imageView2/2/format/webp/w/1280) | ![OA请假-发起](https://static.iocoder.cn/images/ruoyi-vue-pro/OA请假-发起.jpg?imageView2/2/format/webp/w/1280) | ![OA请假-详情](https://static.iocoder.cn/images/ruoyi-vue-pro/OA请假-详情.jpg?imageView2/2/format/webp/w/1280) |
