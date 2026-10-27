// Content is plain text. Keep escaping here so a new plugin cannot inject markup.
const escape = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;'}[c]));
const e = escape;
const copy = (text, label = '复制') => `<button type="button" class="copy-button" data-copy="${e(text)}" aria-label="${e(label)}">${e(label)} <span aria-hidden="true">⧉</span></button>`;
const code = (text, label) => `<div class="code-block"><div class="code-bar"><span>${e(label)}</span>${copy(text)}</div><pre><code>${e(text)}</code></pre></div>`;
const sectionHead = (title, description) => `<div class="section-heading"><h2>${e(title)}</h2><p class="section-description">${e(description)}</p></div>`;

export function renderPage(p, {preview = false} = {}) {
  const x = p.example;
  const notes = {
    overview: ['用途', '用一句话说清用户遇到的问题，以及插件能提供的结果。'],
    example: ['最小例子', '准备最小输入、执行动作、预期结果和复现提问。上方是固定交互；真实视频可以放在下面。'],
    comparison: ['使用前后', '使用同一个任务与输入做对照。这里是布局占位图，发布插件时替换成经审核的真实材料。'],
    cases: ['使用场景', '每个场景写清：谁在什么情况下，遇到什么问题，如何提问，最后得到什么。'],
    start: ['安装与验证', '每一步写清操作和成功标志，首次验证复用上面的例子。填写示例会显示在下方，请替换成真实内容。'],
    details: ['使用条件', '先说明系统、版本和依赖，再说明哪些操作或输入不在覆盖范围内。'],
  };
  const note = key => preview ? `<aside class="author-note" data-review-note><span>${notes[key][0]}</span><p>${notes[key][1]}</p></aside>` : '';
  return `<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <meta name="description" content="${e(p.description)}">
  <meta name="color-scheme" content="dark">
  <meta name="theme-color" content="#090c10">
  <title>${preview ? '插件介绍页模板 · 预览与评审' : e(p.name) + ' · Fuxi DSH 插件市场'}</title>
  <link rel="stylesheet" href="styles.css">${preview ? '\n  <link rel="stylesheet" href="review.css">' : ''}
  <script src="demo-data.js" defer></script>
  <script src="page.js" defer></script>${preview ? '\n  <script src="review.js" defer></script>' : ''}
</head>
<body>
  <a class="skip-link" href="#overview">跳到主要内容</a>${preview ? `
  <aside class="template-banner" aria-label="模板预览与评审"><div class="wrap">
    <div class="review-topline"><div><h2>插件介绍页模板</h2><p>以下是填写示例，用来预览布局和交互。下载内容骨架后，替换成自己的插件信息。</p></div><div class="review-actions"><button id="toggle-notes" type="button" aria-pressed="true">隐藏填写提示</button><a href="content.example.json" download="plugin-page-content.example.json">下载内容骨架 ↓</a><a href="https://fuxi-ailabs.github.io/dsh-plugin-market/plugins/agentlineage/">查看已套用实例 ↗</a></div></div>
    <nav class="review-questions" aria-label="模板检查"><a href="#overview">用途是否清楚</a><a href="#use-cases">场景是否具体</a><a href="#example">例子能否看懂</a><a href="#quickstart">步骤能否完成</a></nav>
    <p class="review-status" id="review-status" role="status">填写提示已显示。</p>
  </div></aside>` : ''}
  <header class="site-header"><div class="wrap header-inner">
    <a class="brand" href="#overview"><span class="brand-mark" aria-hidden="true">f<span>_</span></span> FUXI <span class="brand-sub">/ DSH 插件</span></a>
    <nav aria-label="页面导航"><a href="#use-cases">使用场景</a><a href="#example">看例子</a><a class="nav-docs" href="${e(p.links[0].url)}">使用文档 ↗</a><a class="nav-cta" href="#quickstart">安装使用</a></nav>
  </div></header>
  <main>
    <section id="overview" class="wrap hero" aria-labelledby="page-title">
      <div class="hero-copy">${note('overview')}
        <div class="plugin-name">${e(p.name)} <span class="version">v${e(p.version)}</span></div>
        <h1 id="page-title">${p.headline.map((line, i) => `<span${i ? ' class="accent"' : ''}>${e(line)}</span>`).join('')}</h1>
        <p class="lede">${e(p.description)}</p>
        <div class="actions"><a class="button primary" href="#example">先看一个例子</a><a class="button secondary" href="#quickstart">安装使用</a></div>
        <p class="compatibility">${e(p.compatibility)}</p>
        <p class="requirements-link">${e(p.requirements.summary)} <a href="#details">查看使用条件 ↓</a></p>
      </div>
      <div class="hero-visual" aria-label="${e(p.promise)}">
        <div class="trace-question"><span class="prompt-sign">›</span> ${e(p.heroQuestion)}</div>
        <div class="trace-map"><div class="trace-file"><span aria-hidden="true">▤</span><strong>${e(p.heroFile)}</strong></div><div class="trace-connector" aria-hidden="true"></div><div class="trace-nodes">${p.heroNodes.map(n => `<div><span>${e(n)}</span></div>`).join('')}</div><div class="trace-session"><span aria-hidden="true">⌁</span> ${e(p.preview.contextLabel)}</div></div>
        <div class="trace-answer"><span class="accent" aria-hidden="true">↳</span><p>${e(p.heroAnswer)}</p></div>
      </div>
    </section>

    <section id="use-cases" class="wrap section" aria-labelledby="cases-title">${note('cases')}
      ${sectionHead('什么时候用', '遇到这些问题时，可以复制提问到 DSH。').replace('<h2>', '<h2 id="cases-title">')}
      <div class="case-grid">${p.useCases.map(c=>`<article class="case-card"><h3>${e(c.title)}</h3><blockquote>${e(c.question)}</blockquote><p>${e(c.description)}</p>${copy(c.prompt, '复制提问')}</article>`).join('')}</div>
    </section>

    <section id="example" class="wrap section" aria-labelledby="example-title">${note('example')}
      ${sectionHead(x.title, x.description).replace('<h2>', '<h2 id="example-title">')}
      <div class="demo-shell"><div class="demo-toolbar"><span>${e(x.file)}</span><span class="demo-badge">${e(x.label)}</span></div>
        <div class="demo-question"><p>${e(x.question)}</p><button id="play-demo" type="button" class="play-button"><span aria-hidden="true">▶</span> 自动演示</button></div>
        <div class="demo-workspace"><aside class="demo-timeline" aria-label="选择一次演示操作"><div class="timeline-label"><span>${e(x.ui.events)}</span><span>${x.operations.length} 条</span></div>
          ${x.operations.map((op,i)=>`<button type="button" class="event-button${i===x.operations.length-1?' is-active':''}" data-operation="${i}" aria-pressed="${i===x.operations.length-1}"><span class="event-index">0${i+1}</span><span><strong>${e(op.title)}</strong><small>${e(op.tool)} <span aria-hidden="true">·</span> ${e(x.ui.status)}</small></span><span class="event-arrow" aria-hidden="true">↗</span></button>`).join('')}
          <div class="timeline-session"><span class="mono">${e(x.ui.context)}</span><code>${e(x.session)}</code></div></aside>
          <div class="demo-detail"><div class="detail-top"><p class="mono" id="operation-label">${e(x.operations.at(-1).tool.toUpperCase())} / ${String(x.operations.length).padStart(2,'0')}</p><span class="success-badge">✓ ${e(x.ui.status)}</span></div><h3 id="operation-title">${e(x.operations.at(-1).title)}</h3><p id="operation-description">${e(x.operations.at(-1).description)}</p>
            <div class="demo-tabs" role="tablist" aria-label="查看演示结果"><button id="tab-diff" type="button" role="tab" aria-selected="true" aria-controls="panel-diff" tabindex="0">${e(x.ui.changeTab)}</button><button id="tab-evidence" type="button" role="tab" aria-selected="false" aria-controls="panel-evidence" tabindex="-1">${e(x.ui.evidenceTab)}</button></div>
            <div id="panel-diff" role="tabpanel" aria-labelledby="tab-diff"><div class="diff-file mono">${e(x.file)}</div><pre class="diff-lines" id="diff-lines"></pre></div>
            <div id="panel-evidence" role="tabpanel" aria-labelledby="tab-evidence" hidden><dl class="evidence-list"><div><dt>${e(x.ui.action)}</dt><dd id="evidence-tool"></dd></div><div><dt>${e(x.ui.contextField)}</dt><dd>${e(x.session)}</dd></div><div><dt>${e(x.ui.request)}</dt><dd id="request-ref"></dd></div><div><dt>${e(x.ui.result)}</dt><dd id="result-ref"></dd></div><div><dt>${e(x.ui.resultText)}</dt><dd id="evidence-result"></dd></div></dl></div>
          </div></div>
        <div class="demo-answer"><span class="answer-icon" aria-hidden="true">↳</span><p><strong>这个例子的结果</strong>${e(x.answer)}</p></div>
      </div>
      <p class="media-note">${e(x.note)}</p>
      ${x.video ? `<figure id="recording" class="video-demo"><figcaption><strong>${e(x.video.title)}</strong>${x.video.description ? `<p>${e(x.video.description)}</p>` : ''}</figcaption><video controls playsinline preload="none" poster="${e(x.video.poster)}" aria-label="${e(x.video.title)}"><source src="${e(x.video.src)}" type="${x.video.src.endsWith('.webm')?'video/webm':'video/mp4'}"><track kind="captions" src="${e(x.video.captions)}" srclang="zh" label="中文字幕" default>浏览器不支持视频播放。</video></figure>` : preview ? `<figure id="recording" class="video-demo"><figcaption><strong>可选：真实操作视频</strong><p>有视频时使用封面、原生播放控件和中文字幕；没有视频时保留上方交互示例即可。</p></figcaption><div class="video-placeholder"><span class="mono">操作录像 · 建议 30–60 秒</span><p>展示一次完整操作和结果</p><span>此处是布局示意。</span><a href="https://fuxi-ailabs.github.io/dsh-plugin-market/plugins/agentlineage/#recording">看真实视频实例 ↗</a></div></figure>` : ''}
      <details class="reproduce"><summary><span><span class="accent" aria-hidden="true">⌘</span> ${preview ? '填写复现这个例子的提问' : '安装后，在自己的 DSH 里运行这个例子'}</span><span aria-hidden="true">＋</span></summary><div>${code(x.prompt, preview ? '可复制的提问' : '发送给 DSH')}</div></details>
      <noscript><p class="noscript-note">启用 JavaScript 后可切换演示步骤。例子结论和安装步骤仍可直接阅读。</p></noscript>
    </section>

    <section id="comparison" class="wrap section" aria-labelledby="comparison-title">${note('comparison')}
      ${sectionHead(p.comparison.title, p.comparison.description).replace('<h2>', '<h2 id="comparison-title">')}
      <div class="comparison-grid">${['before','after'].map(key=>{const c=p.comparison[key];return `<article class="comparison-card ${key}"><div class="comparison-copy"><h3>${e(c.title)}</h3><p>${e(c.description)}</p></div><button type="button" class="screenshot-button" data-screenshot="${e(c.image)}" data-title="${e(c.title)}" aria-label="放大查看：${e(c.title)}"><img src="${e(c.image)}" width="1280" height="720" alt="${e(c.alt)}" loading="lazy"><span>${preview ? '布局占位示意' : '运行截图 · 点击放大'} <span aria-hidden="true">⤢</span></span></button></article>`;}).join('')}</div>
      <div class="takeaways">${p.comparison.takeaways.map(t=>`<p><span aria-hidden="true">↳</span> ${e(t)}</p>`).join('')}</div>
    </section>

    <section id="details" class="wrap section" aria-labelledby="details-title">${note('details')}
      ${sectionHead('安装前先确认', p.requirements.description).replace('<h2>', '<h2 id="details-title">')}
      <dl class="requirements-grid">${p.requirements.items.map(r=>`<div><dt>${e(r.label)}</dt><dd>${e(r.value)}</dd></div>`).join('')}</dl>
      <div class="boundary-list">${p.boundaries.map(b=>`<details><summary>${e(b.title)}<span aria-hidden="true">＋</span></summary><p>${e(b.description)}</p></details>`).join('')}</div>
    </section>

    <section id="quickstart" class="wrap section" aria-labelledby="start-title">${note('start')}
      ${sectionHead(p.quickstart.title, p.quickstart.description).replace('<h2>', '<h2 id="start-title">')}
      <div class="quickstart-layout"><aside class="setup-summary"><h3>本页步骤</h3><ol>${p.quickstart.steps.map((s,i)=>`<li><a href="#step-${i+1}">${e(s.title)}</a></li>`).join('')}</ol><a class="text-link" href="${e(p.links[0].url)}">${preview ? '模板填写说明' : '完整安装文档'} ↗</a></aside>
        <ol class="steps">${p.quickstart.steps.map((s,i)=>`<li id="step-${i+1}"><span class="step-index" aria-hidden="true">0${i+1}</span><div><h3>${e(s.title)}</h3><p>${e(s.description)}</p>${code(s.code, s.codeLabel)}<p class="step-expected"><strong>完成后应看到</strong>${e(s.expected)}</p>${s.note?`<p class="step-note">${e(s.note)}</p>`:''}</div></li>`).join('')}</ol>
      </div>
          <p class="help-link">${preview ? '安装、配置和排错的详细说明放在文档中。' : '安装或检查未通过时，先核对本地运行环境，再按文档排查。'} <a href="${e(p.links[0].url)}">${preview ? '查看填写说明' : '查看安装与使用文档'} ↗</a></p>
    </section>
  </main>
  <footer class="wrap footer"><span>Fuxi AI Labs</span><div>${p.links.map(l=>`<a href="${e(l.url)}">${e(l.label)}</a>`).join('')}<a href="#overview">回到顶部 ↑</a></div></footer>
  <p id="copy-status" class="sr-only" role="status" aria-live="polite"></p>
  <dialog id="screenshot-dialog" class="screenshot-dialog" aria-labelledby="screenshot-title"><div class="dialog-bar"><h2 id="screenshot-title">运行截图</h2><button id="close-screenshot" type="button">关闭 ×</button></div><img id="screenshot-full" alt=""></dialog>
</body>
</html>
`.replace(/^[ \t]+$/gm, '');
}
