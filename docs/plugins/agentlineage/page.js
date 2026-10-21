(() => {
  'use strict';
  const evidence = window.AGENTLINEAGE_EXAMPLES;
  const byId = id => document.getElementById(id);
  if (!evidence || !Array.isArray(evidence.scenarios) || !evidence.scenarios.length) {
    byId('data-badge').textContent = '示例暂不可用';
    return;
  }
  const select = byId('project');
  select.replaceChildren(...evidence.scenarios.map((scenario, index) => {
    const option = document.createElement('option');
    option.value = String(index); option.textContent = scenario.project; return option;
  }));
  select.disabled = false;
  function render(index) {
    const scenario = evidence.scenarios[index];
    byId('filename').textContent = scenario.file;
    byId('before').textContent = scenario.before;
    byId('after').textContent = scenario.after;
    byId('write-count').textContent = String(scenario.confirmed_writes);
    byId('call-count').textContent = String(scenario.recorded_calls);
    byId('result-summary').textContent = `${scenario.confirmed_writes} 次写入，每次都保留对应的调用与成功回执。`;
    byId('call-list').replaceChildren(...scenario.operations.map((operation, i) => {
      const row = document.createElement('div'); row.className = 'call-row';
      const number = document.createElement('span'); number.className = 'ordinal'; number.textContent = String(i + 1).padStart(2, '0');
      const tool = document.createElement('strong'); tool.textContent = operation.tool;
      const result = document.createElement('span'); result.textContent = operation.description;
      row.append(number, tool, result); return row;
    }));
    byId('references').replaceChildren(...scenario.evidence_refs.map(ref => {
      const row = document.createElement('div'); row.className = 'ref-row'; row.textContent = ref; return row;
    }));
  }
  byId('data-badge').textContent = '交互示例';
  select.addEventListener('change', () => render(Number(select.value)));
  function setupTabs(tabs) {
    function activate(tab) {
      for (const item of tabs) {
        const selected = item === tab;
        item.setAttribute('aria-selected', String(selected)); item.tabIndex = selected ? 0 : -1;
        byId(item.getAttribute('aria-controls')).hidden = !selected;
      }
    }
    tabs.forEach((tab, index) => {
      tab.addEventListener('click', () => activate(tab));
      tab.addEventListener('keydown', event => {
        let next;
        if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
        if (event.key === 'ArrowLeft') next = (index + tabs.length - 1) % tabs.length;
        if (event.key === 'Home') next = 0;
        if (event.key === 'End') next = tabs.length - 1;
        if (next !== undefined) { event.preventDefault(); activate(tabs[next]); tabs[next].focus(); }
      });
    });
  }
  setupTabs([...document.querySelectorAll('.tabs [role=tab]')]);
  setupTabs([...document.querySelectorAll('.comparison-tabs [role=tab]')]);
  const dialog = byId('screenshot-dialog');
  document.querySelectorAll('[data-screenshot]').forEach(button => {
    button.addEventListener('click', () => {
      byId('screenshot-title').textContent = button.dataset.imageTitle;
      byId('screenshot-full').src = button.dataset.screenshot;
      byId('screenshot-full').alt = button.querySelector('img').alt;
      dialog.showModal();
    });
  });
  byId('close-screenshot').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
  render(0);
})();
