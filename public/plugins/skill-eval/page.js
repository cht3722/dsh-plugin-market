(() => {
  'use strict';
  const byId = id => document.getElementById(id);

  function manualCopy(text, opener) {
    const dialog = document.createElement('dialog');
    dialog.className = 'copy-fallback';
    dialog.setAttribute('aria-label', '手动复制内容');
    const message = document.createElement('p');
    message.textContent = '无法自动复制，请手动复制下面的内容。';
    const input = document.createElement('textarea');
    input.value = text;
    input.readOnly = true;
    const close = document.createElement('button');
    close.type = 'button';
    close.className = 'button secondary';
    close.textContent = '关闭';
    close.addEventListener('click', () => dialog.close());
    dialog.addEventListener('close', () => { dialog.remove(); opener.focus(); });
    dialog.append(message, input, close);
    document.body.append(dialog);
    dialog.showModal();
    input.select();
  }

  document.querySelectorAll('[data-copy]').forEach(button => {
    let reset;
    const original = button.innerHTML;
    button.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(button.dataset.copy);
        clearTimeout(reset);
        button.classList.add('is-copied');
        button.textContent = '已复制 ✓';
        const status = byId('copy-status');
        if (status) status.textContent = '内容已复制。';
        reset = setTimeout(() => { button.innerHTML = original; button.classList.remove('is-copied'); }, 1800);
      } catch {
        manualCopy(button.dataset.copy, button);
      }
    });
  });

  const dialog = byId('screenshot-dialog');
  document.querySelectorAll('[data-screenshot]').forEach(button => {
    button.addEventListener('click', () => {
      byId('screenshot-title').textContent = button.dataset.title;
      byId('screenshot-full').src = button.dataset.screenshot;
      byId('screenshot-full').alt = button.querySelector('img').alt;
      dialog.showModal();
    });
  });
  byId('close-screenshot').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const rect = dialog.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
  });
})();
