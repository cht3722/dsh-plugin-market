# Fuxi DSH 插件市场

公开的 DSH Custom Plugin Market 目录，由 GitHub Pages 托管。

索引地址：**https://fuxi-ailabs.github.io/dsh-plugin-market/index.json**

## 在 DSH 中添加

以 `0.2.1-rc.2` 为例：打开「插件」→「实验性插件」旁的「更多」→ 启用「自定义插件市场」→「发现」→「添加索引源」，输入上面的完整 `index.json` 地址。索引按 profile 保存；以后新增插件仍使用这个地址，重新读取目录即可发现。

## 发布范围

这个仓库公开市场 JSON、图标、静态说明页及维护配置。部署工作流只上传 `docs/`，不拉取插件源码，不保存私有仓库凭据，不上传插件安装包、运行日志或会话数据。GitHub Pages 的公开不改变其他仓库的可见性。

索引中的包名、简介、版本、仓库 URL、commit 和包目录是公开元数据。插件实际由 DSH 从索引指定的 npm/Git 来源安装；私有来源仍要求安装者拥有权限。不要在索引、URL 或工作流中填入 token。

## 当前目录

| 插件 | 目录版本 | DSH 兼容范围 | 来源 |
|---|---|---|---|
| AgentLineage | `0.1.0-alpha.1` | `0.1.6-alpha.1` | 私有 `fuxi-ailabs/AgentLineage`，目录 `integrations/dsh` |

该条目固定到原仓库中实际存在的 commit。其兼容范围来自该包的 DSH peer 依赖，因此 DSH `0.2.1-rc.2` 可以发现和浏览该条目，但会显示版本不兼容。当前验证范围是市场 URL 导入、插件发现和详情展示；不代表从市场安装或运行通过。新版本完成私有来源发布及独立安装验收后，再追加对应版本。

## 添加后续插件或版本

1. 在插件自己的仓库准备可安装 Bundle，核实 `package.json` 中的包名、版本、`dsh.bundle` 和 DSH 兼容范围；验证 npm/Git 安装及构建产物。
2. 在 `docs/index.json` 的 `plugins` 数组追加条目；已有插件则向 `versions` 追加版本。Git 来源必须固定完整 40 位 commit SHA，并填写真实的子目录。`publishTimestamp` 使用来源提交的 Unix 秒时间。
3. 图标放进 `docs/icons/`。标题和描述可提供 `en`、`zh`，其中英文必须存在。
4. 运行 `npm ci --ignore-scripts` 和 `npm run validate`。校验使用 DSH 官方 `parseMarketIndex`，并限制 Pages 发布目录中的文件类型。
5. 合入 `main` 后，GitHub Actions 校验并部署 `docs/`。核对工作流成功、索引匿名访问返回 HTTP 200，再在 DSH 的「发现」页重新读取目录。

官方格式：[DSH 插件市场文档](https://github.com/deepseek-ai/deepseek-harness/blob/dsh-v0.2.1-rc.2/docs/user/guide/plugin-market.zh.md)。
