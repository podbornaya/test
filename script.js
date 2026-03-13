const BRAND_COLORS = ['#7F42E1', '#191919', '#F6F6F6', '#E7DBFD', '#39007B'];

const pages = document.querySelectorAll('.page');
const openPageButtons = document.querySelectorAll('[data-open-page]');

function showPage(pageId) {
  pages.forEach((page) => page.classList.toggle('active', page.id === pageId));
}

openPageButtons.forEach((btn) => {
  btn.addEventListener('click', () => showPage(btn.dataset.openPage));
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
  variant: document.getElementById('form-variant'),
  customControls: document.getElementById('custom-form-controls'),
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

const formVariants = {
  'two-tabs-two-buttons': `new window.UniversalForm('universal-form', {\n  bgColor: '#E7DBFD',\n  onSuccessSubmit: () => { if(window.dataLayer) { window.dataLayer.push({event: 'default_form_request'}); } },\n  params: [\n    {\n      title: 'Создайте собственный сайт с&nbsp;витриной товаров и&nbsp;услуг',\n      description: 'Зарегистрируйтесь и&nbsp;создайте интернет-магазин — для&nbsp;этого не&nbsp;обязательно иметь счёт в&nbsp;Точка Банке',\n      tabName: 'Я не клиент',\n      button: { text: 'Зарегистрироваться', href: ['https://store.tochka.com/api/v1/auth/oauth/start?extra=eyAiYWN0aW9uIjogInJlZyIgfQ&application=store'], isTargetBlank: true },\n    },\n    {\n      title: 'Создайте собственный сайт с&nbsp;витриной товаров и&nbsp;услуг',\n      description: 'Перейдите по&nbsp;ссылке и&nbsp;создайте собственный интернет-магазин',\n      tabName: 'Я уже клиент',\n      button: { text: 'Создать магазин', href: ['https://store.tochka.com/'], isTargetBlank: true },\n    },\n  ]\n});`,
  'two-tabs-input-button': `new window.UniversalForm('universal-form', {\n  referer1: 'строка для рефера партнёра',\n  bgColor: '#E7DBFD',\n  onSuccessSubmit: () => { if(window.dataLayer) { window.dataLayer.push({event: 'default_form_request'}); } },\n  params: [\n    {\n      title: 'Я заголовок формы',\n      subtitle: 'Я редкий гость, я подзаголовок!',\n      description: 'А я текст над временем перезвона',\n      tabName: 'Текст в первом табе',\n      form: { crmType: 'cross', product: 'terminal', hideReservationInAgreement: true, hideCallTime: true, hideAgreeAd: true },\n    },\n    {\n      title: 'Заголовок формы без инпутов, только с кнопкой',\n      subtitle: 'Я редкий гость, я подзаголовок!',\n      description: 'Я текст над кнопкой!',\n      tabName: 'Текст во втором табе',\n      button: { text: 'Кнопка form-request', href: ['https://example.com'], isTargetBlank: true },\n    },\n  ]\n});`,
  'terminal-offer': `new window.UniversalForm('universal-form', {\n  bgColor: '#E7DBFD',\n  onSuccessSubmit: () => { if(window.dataLayer) { window.dataLayer.push({event: 'default_form_request'}); } },\n  params: [\n    {\n      title: 'Закажите новый терминал и&nbsp;выделяйтесь на&nbsp;фоне конкурентов',\n      description: 'Чтобы подключить торговый эквайринг по&nbsp;акции, нужно быть клиентом Точка Банка.',\n      tabName: 'Нужен счёт',\n      form: { crmType: 'signup', hideCallTime: true, hideReservationInAgreement: true, hideAgreeAd: true },\n    },\n    {\n      title: 'Закажите новый терминал и&nbsp;выделяйтесь на&nbsp;фоне конкурентов',\n      description: 'Перейдите в интернет-банк, чтобы оставить заявку на&nbsp;подключение',\n      tabName: 'Я уже клиент',\n      button: { text: 'Войти в интернет-банк', href: ['https://i.tochka.com/a/acquiring'], isTargetBlank: true },\n    },\n  ]\n});`,
  'no-tabs-all-fields': `new window.UniversalForm('universal-form',{\n  referer1: 'строка для рефера партнёра',\n  bgColor: '#E7DBFD',\n  onSuccessSubmit: () => { if(window.dataLayer) { window.dataLayer.push({event: 'default_form_request'}); } },\n  params: [{\n    title: 'Я заголовок формы',\n    subtitle: 'Я редкий гость, я подзаголовок!',\n    description: 'А я текст над временем перезвона',\n    tabName: '',\n    form: { crmType: 'cross', product: 'terminal', hideReservationInAgreement: true, hideCallTime: true, hideAgreeAd: true, inputs: [{name:'inn'},{name:'clientName'},{name:'city'},{name:'email'},{name:'snils'},{name:'promo'}] },\n  }]\n});`,
  'no-tabs-name-phone': `new window.UniversalForm('universal-form',{\n  referer1: 'строка для рефера партнёра',\n  bgColor: '#E7DBFD',\n  onSuccessSubmit: () => { if(window.dataLayer) { window.dataLayer.push({event: 'default_form_request'}); } },\n  params: [{\n    title: 'Начните принимать платежи без&nbsp;комиссии в&nbsp;вашем ресторане!',\n    description: 'Оставьте заявку, и&nbsp;мы перезвоним вам в&nbsp;течение рабочего дня',\n    tabName: '',\n    form: { crmType: 'signup', hideCallTime: true, hideReservationInAgreement: true, hideAgreeAd: true, inputs: [{name:'clientName', placeholder:'Имя', type:'text', required:true}] },\n  }]\n});`,
  'redirect-success': `new window.UniversalForm('universal-form',{\n  referer1: 'строка для рефера партнёра',\n  bgColor: '#E7DBFD',\n  onSuccessSubmit: () => { if(window.dataLayer) { window.dataLayer.push({event: 'default_form_request'}); } window.location.href = 'https://service.tochka.com/spasibo-mpstats'; },\n  params: [{\n    title: 'Стать партнёром Точка&nbsp;Банк',\n    description: 'Оставьте свой номер телефона и&nbsp;укажите город. Мы перезвоним в&nbsp;течение рабочего&nbsp;дня',\n    tabName: '',\n    form: { crmType: 'cross', product: 'partnership', hideCallTime: true, hideReservationInAgreement: true, hideAgreeAd: true, inputs: [{name:'city', placeholder:'Город', type:'text', required:true}] },\n  }]\n});`,
};

function escapeHtml(value) {
  return value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#39;');
}
function escapeJsSingleQuote(value) {
  return value.replaceAll('\\', '\\\\').replaceAll("'", "\\'");
}

function mountBrandPalettes() {
  document.querySelectorAll('.brand-palette').forEach((palette) => {
    const target = document.getElementById(palette.dataset.target);
    BRAND_COLORS.forEach((color) => {
      const sw = document.createElement('button');
      sw.type = 'button';
      sw.className = 'brand-swatch';
      sw.style.background = color;
      sw.title = color;
      sw.addEventListener('click', () => {
        target.value = color;
        target.dispatchEvent(new Event('input', { bubbles: true }));
      });
      palette.appendChild(sw);
    });
  });
}

function getMarqueeSnippet(config) {
  const fontFamily = config.useInheritFont ? 'inherit' : "'TT Norms Tochka', Inter, sans-serif";
  return `<!-- Tilda custom block: marquee -->\n<style>\n  .tp-marquee { overflow:hidden; width:100%; background:${config.bgColor}; }\n  .tp-marquee__track { display:flex; width:max-content; white-space:nowrap; animation:tpMarqueeScroll ${config.speed}s linear infinite; }\n  .tp-marquee__text { display:inline-flex; align-items:center; padding:12px 8px; font-size:22px; line-height:1.25; font-weight:600; color:${config.textColor}; font-family:${fontFamily}; }\n  @keyframes tpMarqueeScroll { from{transform:translateX(0);} to{transform:translateX(-50%);} }\n</style>\n<div class="tp-marquee"><div class="tp-marquee__track"><span class="tp-marquee__text">${escapeHtml(config.text)}&nbsp;&nbsp;&nbsp;</span><span class="tp-marquee__text" aria-hidden="true">${escapeHtml(config.text)}&nbsp;&nbsp;&nbsp;</span></div></div>`;
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
  });
  marqueeUi.codeOutput.textContent = getMarqueeSnippet(config);
}

function formConfigCustom() {
  return {
    bgColor: formUi.bgColor.value,
    analytics: formUi.analytics.checked,
    tab1: { name: formUi.tab1Name.value.trim(), title: formUi.tab1Title.value.trim(), description: formUi.tab1Description.value.trim(), buttonText: formUi.tab1ButtonText.value.trim(), href: formUi.tab1ButtonHref.value.trim(), blank: formUi.tab1ButtonBlank.checked },
    tab2: { name: formUi.tab2Name.value.trim(), title: formUi.tab2Title.value.trim(), description: formUi.tab2Description.value.trim(), buttonText: formUi.tab2ButtonText.value.trim(), href: formUi.tab2ButtonHref.value.trim(), blank: formUi.tab2ButtonBlank.checked },
  };
}

function getFormSnippetCustom(config) {
  const analyticsChunk = config.analytics ? "\n    onSuccessSubmit: () => { if(window.dataLayer) { window.dataLayer.push({event: 'default_form_request'}); } }," : '';
  return `<div id="universal-form"></div>\n<script src="https://tochka.com/resources/form/digital-form/digital-form.js" onload="\n  new window.UniversalForm('universal-form', {\n    bgColor: '${config.bgColor}',${analyticsChunk}\n    params: [\n      {\n        title: '${escapeJsSingleQuote(config.tab1.title)}',\n        description: '${escapeJsSingleQuote(config.tab1.description)}',\n        tabName: '${escapeJsSingleQuote(config.tab1.name)}',\n        button: { text: '${escapeJsSingleQuote(config.tab1.buttonText)}', href: ['${escapeJsSingleQuote(config.tab1.href)}'], isTargetBlank: ${config.tab1.blank} },\n      },\n      {\n        title: '${escapeJsSingleQuote(config.tab2.title)}',\n        description: '${escapeJsSingleQuote(config.tab2.description)}',\n        tabName: '${escapeJsSingleQuote(config.tab2.name)}',\n        button: { text: '${escapeJsSingleQuote(config.tab2.buttonText)}', href: ['${escapeJsSingleQuote(config.tab2.href)}'], isTargetBlank: ${config.tab2.blank} },\n      },\n    ]\n  });\n"></script>`;
}

function getVariantSnippet() {
  const variant = formUi.variant.value;
  if (variant === 'custom') {
    return getFormSnippetCustom(formConfigCustom());
  }
  return `<div id="universal-form"></div>\n<script src="https://tochka.com/resources/form/digital-form/digital-form.js" onload="\n  ${formVariants[variant]}\n"></script>`;
}

function setActivePreviewTab(tab) {
  const config = formConfigCustom();
  const selected = tab === 1 ? config.tab1 : config.tab2;
  formUi.previewTab1Name.classList.toggle('active', tab === 1);
  formUi.previewTab2Name.classList.toggle('active', tab === 2);
  formUi.previewTitle.innerHTML = selected.title || 'Заголовок формы';
  formUi.previewDescription.innerHTML = selected.description || 'Описание формы';
  formUi.previewButton.textContent = selected.buttonText || 'Кнопка';
  formUi.previewButton.href = selected.href || '#';
  formUi.previewButton.target = selected.blank ? '_blank' : '_self';
}

function refreshForm() {
  const isCustom = formUi.variant.value === 'custom';
  formUi.customControls.style.display = isCustom ? 'grid' : 'none';
  formUi.preview.style.background = formUi.bgColor.value;
  formUi.previewTab1Name.textContent = formUi.tab1Name.value || 'Таб 1';
  formUi.previewTab2Name.textContent = formUi.tab2Name.value || 'Таб 2';
  formUi.previewTab1Name.style.display = isCustom ? 'block' : 'none';
  formUi.previewTab2Name.style.display = isCustom ? 'block' : 'none';
  setActivePreviewTab(formUi.previewTab2Name.classList.contains('active') ? 2 : 1);

  if (!isCustom) {
    formUi.previewTitle.innerHTML = 'Пресет формы UniversalForm';
    formUi.previewDescription.innerHTML = formUi.variant.options[formUi.variant.selectedIndex].text;
    formUi.previewButton.textContent = 'Открыть код пресета';
    formUi.previewButton.href = '#';
  }

  formUi.codeOutput.textContent = getVariantSnippet();
}

async function copyToClipboard(button, contentNode) {
  const initialText = button.textContent;
  try {
    await navigator.clipboard.writeText(contentNode.textContent);
    button.textContent = 'Скопировано!';
  } catch {
    button.textContent = 'Не удалось скопировать';
  }
  setTimeout(() => { button.textContent = initialText; }, 1200);
}

[
  marqueeUi.text, marqueeUi.textColor, marqueeUi.bgColor, marqueeUi.speed, marqueeUi.useInheritFont,
].forEach((node) => node.addEventListener('input', refreshMarquee));

[
  formUi.variant, formUi.bgColor, formUi.analytics, formUi.tab1Name, formUi.tab1Title, formUi.tab1Description,
  formUi.tab1ButtonText, formUi.tab1ButtonHref, formUi.tab1ButtonBlank, formUi.tab2Name, formUi.tab2Title,
  formUi.tab2Description, formUi.tab2ButtonText, formUi.tab2ButtonHref, formUi.tab2ButtonBlank,
].forEach((node) => node.addEventListener('input', refreshForm));

formUi.previewTab1Name.addEventListener('click', () => setActivePreviewTab(1));
formUi.previewTab2Name.addEventListener('click', () => setActivePreviewTab(2));
marqueeUi.copyBtn.addEventListener('click', () => copyToClipboard(marqueeUi.copyBtn, marqueeUi.codeOutput));
formUi.copyBtn.addEventListener('click', () => copyToClipboard(formUi.copyBtn, formUi.codeOutput));

mountBrandPalettes();
refreshMarquee();
refreshForm();
showPage('gallery-page');
