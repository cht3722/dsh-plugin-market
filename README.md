# Fuxi DSH 插件市场

Fuxi 团队插件目录

索引地址：**https://fuxi-ailabs.github.io/dsh-plugin-market/index.json**

## 在 DSH 中添加

以 `0.2.1-rc.2` 为例：打开「插件」→「实验性插件」旁的「更多」→ 启用「自定义插件市场」→「发现」→「添加索引源」，输入上面的完整 `index.json` 地址。索引按 profile 保存；以后新增插件仍使用这个地址，重新读取目录即可发现。

## 当前目录

| 插件 | 版本 | DSH 兼容范围 |
|---|---|---|
| AgentLineage | `0.1.0-alpha.3` | `0.2.1-rc.2` |

AgentLineage 支持追溯文件改动来源、查询原生会话证据和打开溯源视图。参见 [插件介绍与效果对比](https://fuxi-ailabs.github.io/dsh-plugin-market/plugins/agentlineage/)。安装准备见 [AgentLineage 使用说明](https://github.com/fuxi-ailabs/AgentLineage/blob/dsh-agentlineage-v0.1.0-alpha.3/integrations/dsh/README.md)。

## 添加后续插件或版本

1. 在插件自己的仓库准备可安装 Bundle，核实 `package.json` 中的包名、版本、`dsh.bundle` 和 DSH 兼容范围；验证 npm/Git 安装及构建产物。
2. 在 `docs/index.json` 的 `plugins` 数组追加条目；已有插件则向 `versions` 追加版本。Git 来源必须固定完整 40 位 commit SHA，并填写真实的子目录。`publishTimestamp` 使用来源提交的 Unix 秒时间。
3. 图标放进 `docs/icons/`。介绍页与经审核的图片放进 `docs/plugins/<插件目录>/`，在校验脚本 `publicPages` 中登记逐文件清单，并通过 `homepage` 关联。具体内容与呈现方式由接口负责人维护，before/after 不强制。标题和描述可提供 `en`、`zh`，其中英文必须存在。
4. 运行 `npm ci --ignore-scripts` 和 `npm run validate`。校验使用 DSH 官方 `parseMarketIndex`，并限制 Pages 发布目录中的文件类型。
5. 合入 `main` 后，GitHub Actions 校验并部署 `docs/`。核对工作流成功、索引匿名访问返回 HTTP 200，再在 DSH 的「发现」页重新读取目录。

官方格式：[DSH 插件市场文档](https://github.com/deepseek-ai/deepseek-harness/blob/dsh-v0.2.1-rc.2/docs/user/guide/plugin-market.zh.md)。
