# 插件介绍页模板

介绍页帮助第一次来的用户判断：插件解决什么问题、自己是否需要、实际效果如何，以及怎么开始使用。

[模板预览](https://fuxi-ailabs.github.io/dsh-plugin-market/templates/plugin-page/)与 [AgentLineage 实例](https://fuxi-ailabs.github.io/dsh-plugin-market/plugins/agentlineage/)使用同一个生成器和样式。预览页可以隐藏填写提示、操作示例、放大占位图和下载内容骨架；这些作者工具不会出现在插件页面中。

## 页面顺序

| 位置 | 用户要知道什么 | 填写内容 |
|---|---|---|
| 用途 | 它能帮我完成什么？ | 名称、版本、一句话说明、一个具体问题；首屏同时显示必要依赖和使用条件入口 |
| 使用场景 | 我什么时候会用？ | 至少两个具体问题，说明输入、操作和结果，每个附可复制提问 |
| 最小例子 | 实际怎么用，结果长什么样？ | 一组小输入、操作和输出；标明示意数据或真实运行，可选录屏 |
| 前后对比 | 原来的操作发生了什么变化？ | 同一任务的两张截图及说明 |
| 使用条件 | 安装前要准备什么，有哪些限制？ | 系统、DSH 版本、本机依赖、记录或输入覆盖范围 |
| 安装与验证 | 怎样完成第一次使用？ | 一至五步，每步给出操作、可复制内容和成功标志；提供完整文档入口 |

安装验证复用最小例子，避免用户看完一个例子后，又要理解另一组输入和结果。安装、配置、工具参考和排错的完整说明放在文档中。

## 文案怎么写

直接写用户遇到的问题、要做的操作和能看到的结果。例如“查询这个文件的三次改动”，比“洞察完整任务链路”更容易理解。

- 场景写具体问题，例如“昨天的 Agent 改了哪些文件”，并说明用户下一步可以做什么。
- 标题说明这一段的内容。去掉装饰性的英文小标题、重复口号和与操作无关的标注。
- 用完整、自然的句子解释必要内容。不要把所有说明拆成“一个问题、一个输入、一个结果”一类的短口号。
- 英文保留产品名、实际工具名、代码和引用。中文说明不需要再附一遍英文标签。
- 区分固定示意、真实截图和真实录屏。版本、依赖和已知限制会影响用户选择，应当说清楚。
- 不编造命令、工具名、效果数据或加速比例。安装内容应与市场固定的插件版本一致。

## 字号与布局

浏览器保持 100% 缩放即可阅读。桌面正文为 17px，首屏介绍为 19px；手机正文为 16px。代码为 15px，辅助文字不小于 14px。字号使用 `rem`，随浏览器的默认字号设置变化。

按钮点击区域至少 44px 高。窄屏使用单列布局、换行和纵向步骤，不靠缩小字体容纳内容。正文、代码和次要说明保持足够对比度。

交互支持步骤切换、文件变化与细节标签页、手动启动的自动演示、复制和截图放大。剪贴板不可用时提供手动复制框。自动演示可手动打断；截图可按 Escape 关闭；页面保留键盘操作和减少动态效果设置。

## 内容与生成

```text
templates/plugin-page/
  content.example.json   # 内容骨架
  render.mjs             # 页面结构
  styles.css             # 共用样式
  page.js                # 共用交互
  preview.mjs            # 预览映射与占位图
  review.css / review.js # 仅预览页的作者工具
content/plugins/<slug>.json
public/plugins/<slug>/
  index.html / styles.css / page.js / demo-data.js
  assets/                # 已审核的截图和录屏
public/templates/plugin-page/
  ...                    # 同源生成的预览与可下载骨架
```

不要直接编辑生成后的页面文件。修改内容时编辑 JSON，修改结构或样式时编辑 `templates/plugin-page/`，然后重新生成。

1. 将 `content.example.json` 复制到 `content/plugins/<slug>.json`，替换插件名和所有填写示例。`links[0]` 指向对应版本的安装文档。
2. `requirements.summary` 在首屏简要说明依赖，`description` 和 `items` 在安装前列出条件。每个 `items` 条目包含 `label`、`value`。
3. `useCases` 写具体问题及提问；`example.operations` 写可点选的步骤；`removed`、`added` 表达前后变化。通过 `example.ui` 设置字段名，演示引用使用 `demo:` 前缀。
4. `quickstart.steps` 填一至五步，每步必须有 `title`、`description`、`code`、`codeLabel` 和 `expected`。`expected` 说明完成后应看到的结果；额外说明用可选的 `note`。
5. 将已审核的两张 JPEG 截图放在 `public/plugins/<slug>/assets/`，填写 `comparison.before/after` 的路径、说明和 alt。文件名使用小写字母、数字和连字符。
6. 在 `scripts/validate.mjs` 的 `publicPages` 逐项登记发布资源，在 `publicLinks` 登记精确的 HTTPS 文档地址，并在 `public/index.json` 设置介绍页 `homepage`。
7. 运行 `npm run build:pages`、`npm run ci` 和 `npm run preview`。本地预览地址为 `http://127.0.0.1:4173/plugins/<slug>/`。提交源内容和生成结果。

## 可选视频

有已审核的真实录屏时，在 `example` 添加：

```json
"video": {
  "title": "说明这次操作的任务",
  "description": "说明真实运行的版本、结果和必要的剪辑处理",
  "src": "assets/demo.webm",
  "poster": "assets/demo-poster.jpg",
  "captions": "assets/demo-zh.vtt"
}
```

支持 `.mp4`、`.webm`，提供播放控件、封面和中文字幕，默认不播放、不预加载视频内容。视频、封面与字幕必须加入发布资源清单，并人工核对来源和隐私信息。页面演示的录屏不能标成插件真实运行录像。

## 提交前检查

确认首屏能说明用途，场景能帮助用户判断是否需要，最小例子与安装验证使用相同任务，每步的成功标志足够具体。检查 100% 缩放下的正文、手机换行、步骤跳转、复制、标签页、截图放大和键盘操作。

提交与上线遵循 [PR 与合并策略](pr-merge-policy.md)。
