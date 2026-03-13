const pages = document.querySelectorAll('.page');
const openPageButtons = document.querySelectorAll('[data-open-page]');

function showPage(pageId) {
  pages.forEach((page) => {
    page.classList.toggle('active', page.id === pageId);
  });
}

openPageButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    showPage(btn.dataset.openPage);
  });
});

const marqueeUi = {
  text: document.getElementById('marquee-text'),
  textColor: document.getElementById('marquee-text-color'),
  bgColor: document.getElementById('marquee-bg-color'),
  speed: document.getElementById('marquee-speed'),
  speedOutput: document.getElementById('marquee-speed-output'),
  useInheritFont: document.getElementById('marquee-inherit-font'),
  previewMarquee: document.getElementById('preview-marquee'),
  previewTrack: document.querySelector('#preview-marquee .marquee-track'),
  previewTexts: document.querySelectorAll('#preview-marquee .marquee-text'),
  codeOutput: document.getElementById('marquee-code-output'),
  copyBtn: document.getElementById('copy-marquee-btn'),
};

const formUi = {
  bgColor: document.getElementById('form-bg-color'),
  analytics: document.getElementById('form-analytics'),
  tab1Name: document.getElementById('tab1-name'),
  tab1Title: document.getElementById('tab1-title'),
  tab1Description: document.getElementById('tab1-description'),
  tab1ButtonText: document.getElementById('tab1-button-text'),
  tab1ButtonHref: document.getElementById('tab1-button-href'),
  tab1ButtonBlank: document.getElementById('tab1-button-blank'),
  tab2Name: document.getElementById('tab2-name'),
  tab2Title: document.getElementById('tab2-title'),
  tab2Description: document.getElementById('tab2-description'),
  tab2ButtonText: document.getElementById('tab2-button-text'),
  tab2ButtonHref: document.getElementById('tab2-button-href'),
  tab2ButtonBlank: document.getElementById('tab2-button-blank'),
  preview: document.getElementById('form-preview'),
  previewTab1Name: document.getElementById('preview-tab1-name'),
  previewTab2Name: document.getElementById('preview-tab2-name'),
  previewTitle: document.getElementById('preview-title'),
  previewDescription: document.getElementById('preview-description'),
  previewButton: document.getElementById('preview-button'),
  codeOutput: document.getElementById('form-code-output'),
  copyBtn: document.getElementById('copy-form-btn'),
};

function escapeHtml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function escapeJsSingleQuote(value) {
  return value.replaceAll('\\', '\\\\').replaceAll("'", "\\'");
}

function getMarqueeSnippet(config) {
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

function getFormSnippet(config) {
  const onSuccessSubmit = config.analytics
    ? `\n                onSuccessSubmit: () => {\n                  if(window.dataLayer) {\n                    window.dataLayer.push({event: 'default_form_request'});\n                  }\n                },`
    : '';

  return `<div id="universal-form"></div>
<script src="https://tochka.com/resources/form/digital-form/digital-form.js" onload="
  new window.UniversalForm('universal-form', {
                bgColor: '${config.bgColor}',${onSuccessSubmit}
                params: [
       {
          title: '${escapeJsSingleQuote(config.tab1.title)}',
          description: '${escapeJsSingleQuote(config.tab1.description)}',
          tabName: '${escapeJsSingleQuote(config.tab1.name)}',
          button: {
               text: '${escapeJsSingleQuote(config.tab1.buttonText)}',
               href: ['${escapeJsSingleQuote(config.tab1.href)}'],
               isTargetBlank: ${config.tab1.blank},
                        },
         },
       {
          title: '${escapeJsSingleQuote(config.tab2.title)}',
          description: '${escapeJsSingleQuote(config.tab2.description)}',
          tabName: '${escapeJsSingleQuote(config.tab2.name)}',
          button: {
               text: '${escapeJsSingleQuote(config.tab2.buttonText)}',
               href: ['${escapeJsSingleQuote(config.tab2.href)}'],
               isTargetBlank: ${config.tab2.blank},
                        },
         },
            ]
        });
"></script>`;
}

function refreshMarquee() {
  const config = {
    text: marqueeUi.text.value.trim() || 'Текст бегущей строки',
    textColor: marqueeUi.textColor.value,
    bgColor: marqueeUi.bgColor.value,
    speed: Number(marqueeUi.speed.value),
    useInheritFont: marqueeUi.useInheritFont.checked,
  };

  marqueeUi.speedOutput.value = String(config.speed);
  marqueeUi.previewMarquee.style.background = config.bgColor;
  marqueeUi.previewTrack.style.animationDuration = `${config.speed}s`;

  marqueeUi.previewTexts.forEach((item) => {
    item.textContent = `${config.text}   `;
    item.style.color = config.textColor;
    item.style.fontFamily = config.useInheritFont
      ? 'inherit'
      : 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  });

  marqueeUi.codeOutput.textContent = getMarqueeSnippet(config);
}

function formConfig() {
  return {
    bgColor: formUi.bgColor.value,
    analytics: formUi.analytics.checked,
    tab1: {
      name: formUi.tab1Name.value.trim() || 'Tab 1',
      title: formUi.tab1Title.value.trim() || 'Заголовок 1',
      description: formUi.tab1Description.value.trim() || 'Описание 1',
      buttonText: formUi.tab1ButtonText.value.trim() || 'Кнопка 1',
      href: formUi.tab1ButtonHref.value.trim() || 'https://example.com',
      blank: formUi.tab1ButtonBlank.checked,
    },
    tab2: {
      name: formUi.tab2Name.value.trim() || 'Tab 2',
      title: formUi.tab2Title.value.trim() || 'Заголовок 2',
      description: formUi.tab2Description.value.trim() || 'Описание 2',
      buttonText: formUi.tab2ButtonText.value.trim() || 'Кнопка 2',
      href: formUi.tab2ButtonHref.value.trim() || 'https://example.com',
      blank: formUi.tab2ButtonBlank.checked,
    },
  };
}

function setActivePreviewTab(tab) {
  const useFirst = tab === 1;
  const config = formConfig();
  const selected = useFirst ? config.tab1 : config.tab2;

  formUi.previewTab1Name.classList.toggle('active', useFirst);
  formUi.previewTab2Name.classList.toggle('active', !useFirst);
  formUi.previewTitle.innerHTML = selected.title;
  formUi.previewDescription.innerHTML = selected.description;
  formUi.previewButton.textContent = selected.buttonText;
  formUi.previewButton.href = selected.href;
  formUi.previewButton.target = selected.blank ? '_blank' : '_self';
}

function refreshForm() {
  const config = formConfig();

  formUi.preview.style.background = config.bgColor;
  formUi.previewTab1Name.textContent = config.tab1.name;
  formUi.previewTab2Name.textContent = config.tab2.name;

  if (!formUi.previewTab1Name.classList.contains('active') && !formUi.previewTab2Name.classList.contains('active')) {
    formUi.previewTab1Name.classList.add('active');
  }

  setActivePreviewTab(formUi.previewTab1Name.classList.contains('active') ? 1 : 2);
  formUi.codeOutput.textContent = getFormSnippet(config);
}

async function copyToClipboard(button, contentNode) {
  const initialText = button.textContent;

  try {
    await navigator.clipboard.writeText(contentNode.textContent);
    button.textContent = 'Скопировано!';
  } catch {
    button.textContent = 'Не удалось скопировать';
  }

  setTimeout(() => {
    button.textContent = initialText;
  }, 1200);
}

[
  marqueeUi.text,
  marqueeUi.textColor,
  marqueeUi.bgColor,
  marqueeUi.speed,
  marqueeUi.useInheritFont,
].forEach((node) => node.addEventListener('input', refreshMarquee));

[
  formUi.bgColor,
  formUi.analytics,
  formUi.tab1Name,
  formUi.tab1Title,
  formUi.tab1Description,
  formUi.tab1ButtonText,
  formUi.tab1ButtonHref,
  formUi.tab1ButtonBlank,
  formUi.tab2Name,
  formUi.tab2Title,
  formUi.tab2Description,
  formUi.tab2ButtonText,
  formUi.tab2ButtonHref,
  formUi.tab2ButtonBlank,
].forEach((node) => node.addEventListener('input', refreshForm));

formUi.previewTab1Name.addEventListener('click', () => {
  setActivePreviewTab(1);
});

formUi.previewTab2Name.addEventListener('click', () => {
  setActivePreviewTab(2);
});

marqueeUi.copyBtn.addEventListener('click', () => {
  copyToClipboard(marqueeUi.copyBtn, marqueeUi.codeOutput);
});

formUi.copyBtn.addEventListener('click', () => {
  copyToClipboard(formUi.copyBtn, formUi.codeOutput);
});

refreshMarquee();
refreshForm();
showPage('gallery-page');
