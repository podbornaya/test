const ui = {
  text: document.getElementById('marquee-text'),
  textColor: document.getElementById('text-color'),
  bgColor: document.getElementById('bg-color'),
  speed: document.getElementById('speed'),
  speedOutput: document.getElementById('speed-output'),
  useInheritFont: document.getElementById('use-inherit-font'),
  previewMarquee: document.getElementById('preview-marquee'),
  previewTrack: document.querySelector('#preview-marquee .marquee-track'),
  previewTexts: document.querySelectorAll('#preview-marquee .marquee-text'),
  codeOutput: document.getElementById('code-output'),
  copyBtn: document.getElementById('copy-btn'),
};

function escapeHtml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function getSnippet(config) {
  const fontFamily = config.useInheritFont
    ? 'inherit'
    : 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';

  return `<!-- Tilda custom block: marquee -->
<style>
  .tp-marquee {
    overflow: hidden;
    width: 100%;
    background: ${config.bgColor};
  }

  .tp-marquee__track {
    display: flex;
    width: max-content;
    white-space: nowrap;
    animation: tpMarqueeScroll ${config.speed}s linear infinite;
  }

  .tp-marquee__text {
    display: inline-flex;
    align-items: center;
    padding: 12px 8px;
    font-size: 22px;
    line-height: 1.25;
    font-weight: 600;
    color: ${config.textColor};
    font-family: ${fontFamily};
  }

  @keyframes tpMarqueeScroll {
    from { transform: translateX(0); }
    to   { transform: translateX(-50%); }
  }
</style>

<div class="tp-marquee" aria-label="Бегущая строка">
  <div class="tp-marquee__track">
    <span class="tp-marquee__text">${escapeHtml(config.text)}&nbsp;&nbsp;&nbsp;</span>
    <span class="tp-marquee__text" aria-hidden="true">${escapeHtml(config.text)}&nbsp;&nbsp;&nbsp;</span>
  </div>
</div>`;
}

function refresh() {
  const config = {
    text: ui.text.value.trim() || 'Текст бегущей строки',
    textColor: ui.textColor.value,
    bgColor: ui.bgColor.value,
    speed: Number(ui.speed.value),
    useInheritFont: ui.useInheritFont.checked,
  };

  ui.speedOutput.value = String(config.speed);
  ui.previewMarquee.style.background = config.bgColor;
  ui.previewTrack.style.animationDuration = `${config.speed}s`;

  ui.previewTexts.forEach((item) => {
    item.textContent = `${config.text}   `;
    item.style.color = config.textColor;
    item.style.fontFamily = config.useInheritFont
      ? 'inherit'
      : 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  });

  ui.codeOutput.textContent = getSnippet(config);
}

async function copyCode() {
  try {
    await navigator.clipboard.writeText(ui.codeOutput.textContent);
    ui.copyBtn.textContent = 'Скопировано!';
    setTimeout(() => {
      ui.copyBtn.textContent = 'Скопировать код блока';
    }, 1200);
  } catch {
    ui.copyBtn.textContent = 'Не удалось скопировать';
    setTimeout(() => {
      ui.copyBtn.textContent = 'Скопировать код блока';
    }, 1200);
  }
}

Object.values(ui).forEach((node) => {
  if (node instanceof HTMLElement && ['INPUT', 'TEXTAREA'].includes(node.tagName)) {
    node.addEventListener('input', refresh);
  }
});

ui.copyBtn.addEventListener('click', copyCode);

refresh();
