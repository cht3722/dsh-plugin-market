// Illustrative data for this page, not a live plugin connection.
window.PLUGIN_DEMO = {
  "title": "用一个小例子说明操作",
  "description": "说明先点哪一步、在哪里看结果，以及结果应是什么。",
  "label": "交互演示 · 固定示意数据",
  "file": "example.txt",
  "question": "输入为什么会得到这个结果？",
  "answer": "填写该例子的具体答案，能够与下面的操作和输出对照。",
  "session": "demo-context-01",
  "ui": {
    "events": "演示步骤",
    "context": "演示上下文",
    "changeTab": "输入与输出",
    "evidenceTab": "运行细节",
    "action": "操作",
    "contextField": "上下文",
    "request": "输入位置",
    "result": "输出位置",
    "resultText": "执行结果",
    "status": "已完成"
  },
  "operations": [
    {
      "tool": "input",
      "title": "准备输入",
      "description": "说明最小输入。",
      "removed": [],
      "added": [
        "一段最小输入"
      ],
      "result": "输入已准备",
      "requestRef": "demo:input-01",
      "resultRef": "demo:output-01"
    },
    {
      "tool": "run",
      "title": "得到结果",
      "description": "说明插件做了什么。",
      "removed": [
        "一段最小输入"
      ],
      "added": [
        "一个具体结果"
      ],
      "result": "填写可核对的输出",
      "requestRef": "demo:input-02",
      "resultRef": "demo:output-02"
    }
  ],
  "prompt": "填写可以在 DSH 中复现此例的真实提示词；不要虚构命令或工具。",
  "note": "步骤与结果均为填写示例，发布前替换为真实内容。"
};
