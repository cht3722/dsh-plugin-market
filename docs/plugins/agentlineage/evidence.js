window.AGENTLINEAGE_EXAMPLES = {
  "scenarios": [
    {
      "project": "notes-demo",
      "file": "notes.txt",
      "before": "status=draft\n",
      "after": "status=reviewed\n",
      "confirmed_writes": 2,
      "recorded_calls": 2,
      "operations": [
        {
          "tool": "write",
          "description": "写入文件，收到成功回执",
          "request_ref": "e-7de6b19c5c6c",
          "result_ref": "e-2b873ec95d13"
        },
        {
          "tool": "edit",
          "description": "修改文件，收到成功回执",
          "request_ref": "e-70ccd17b5525",
          "result_ref": "e-d4fd37c7b14b"
        }
      ],
      "evidence_refs": [
        "e-7de6b19c5c6c",
        "e-2b873ec95d13",
        "e-70ccd17b5525",
        "e-d4fd37c7b14b"
      ]
    },
    {
      "project": "config-demo",
      "file": "settings.txt",
      "before": "theme=light\n",
      "after": "theme=dark\n",
      "confirmed_writes": 2,
      "recorded_calls": 2,
      "operations": [
        {
          "tool": "write",
          "description": "写入文件，收到成功回执",
          "request_ref": "e-99a1b31fbeb0",
          "result_ref": "e-5820dcd28f79"
        },
        {
          "tool": "edit",
          "description": "修改文件，收到成功回执",
          "request_ref": "e-3fdcae37d1b4",
          "result_ref": "e-601827809f3c"
        }
      ],
      "evidence_refs": [
        "e-99a1b31fbeb0",
        "e-5820dcd28f79",
        "e-3fdcae37d1b4",
        "e-601827809f3c"
      ]
    }
  ]
};
