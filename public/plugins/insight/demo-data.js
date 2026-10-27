// Illustrative data for this page, not a live plugin connection.
window.PLUGIN_DEMO = {
  "title": "一次会话，五个维度。",
  "description": "固定一组会话输入和评分卡结果，展示从导入到读分的完整链路。",
  "label": "交互演示 · 固定示意数据",
  "file": "session.v4.jsonl",
  "question": "这次会话在 Insight 里得了多少分？",
  "answer": "总分 8.2/10，导入覆盖度 95%，五个维度均已返回分数；其中一项被标记为需要人工确认。",
  "session": "demo-insight-01",
  "ui": {
    "events": "演示步骤",
    "context": "DSH SESSION",
    "contextNote": "固定示意会话，不连接真实用户数据",
    "changeTab": "导入与评分",
    "evidenceTab": "运行细节",
    "action": "操作",
    "contextField": "会话",
    "request": "输入位置",
    "result": "输出位置",
    "resultText": "执行结果",
    "status": "已完成"
  },
  "operations": [
    {
      "tool": "/insight",
      "title": "导入当前会话",
      "description": "从当前 DSH 会话导出带子会话的 canonical 记录，并提交给 Insight。",
      "removed": [
        "手动导出会话文件",
        "复制文件路径并登录 Insight 上传"
      ],
      "added": [
        "当前会话已导入",
        "会话页可直接打开"
      ],
      "result": "导入成功，Session 页面返回",
      "requestRef": "demo:session-01",
      "resultRef": "demo:import-01"
    },
    {
      "tool": "/score",
      "title": "读回评分卡",
      "description": "从 Insight 读取评分卡，并核对导入覆盖度与维度分数。",
      "removed": [
        "在 Insight 页面逐项抄录结果"
      ],
      "added": [
        "总分 8.2/10",
        "覆盖度 95%",
        "五个维度分数"
      ],
      "result": "评分卡与待确认项回到 DSH 回执",
      "requestRef": "demo:score-request-01",
      "resultRef": "demo:score-result-01"
    }
  ],
  "prompt": "把当前会话导入 Insight，然后读取评分卡；列出总分、覆盖度、各维度分数和需要人工确认的项目。",
  "note": "这是固定示意数据，不连接用户会话。真实结果取决于 Insight 服务版本、会话导入覆盖度和评分配置。"
};
