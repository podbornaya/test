const BRAND_COLORS = ['#7F42E1', '#191919', '#F6F6F6', '#E7DBFD', '#39007B'];

const pages = document.querySelectorAll('.page');
document.querySelectorAll('[data-open-page]').forEach((btn) => btn.addEventListener('click', () => showPage(btn.dataset.openPage)));
function showPage(pageId) { pages.forEach((p) => p.classList.toggle('active', p.id === pageId)); }

const marqueeUi = {
  text: document.getElementById('marquee-text'), textColor: document.getElementById('marquee-text-color'), bgColor: document.getElementById('marquee-bg-color'),
  speed: document.getElementById('marquee-speed'), speedOutput: document.getElementById('marquee-speed-output'), useInheritFont: document.getElementById('marquee-inherit-font'),
  previewMarquee: document.getElementById('preview-marquee'), previewTrack: document.querySelector('#preview-marquee .marquee-track'), previewTexts: document.querySelectorAll('#preview-marquee .marquee-text'),
  codeOutput: document.getElementById('marquee-code-output'), copyBtn: document.getElementById('copy-marquee-btn'),
};

const formUi = {
  variant: document.getElementById('form-variant'), bgColor: document.getElementById('form-bg-color'), analytics: document.getElementById('form-analytics'), referer1: document.getElementById('form-referer1'),
  settingsRoot: document.getElementById('preset-settings'),
  preview: document.getElementById('form-preview'), previewTabs: document.getElementById('preview-tabs'),
  previewTab1Name: document.getElementById('preview-tab1-name'), previewTab2Name: document.getElementById('preview-tab2-name'),
  previewTitle: document.getElementById('preview-title'), previewDescription: document.getElementById('preview-description'), previewButton: document.getElementById('preview-button'),
  codeOutput: document.getElementById('form-code-output'), copyBtn: document.getElementById('copy-form-btn'),
};

const presetFields = {
  'two-tabs-two-buttons': [
    { g: 'Вкладка 1', fields: [{k:'tab1Name',l:'Tab name',t:'text'},{k:'tab1Title',l:'Заголовок',t:'textarea'},{k:'tab1Description',l:'Описание',t:'textarea'},{k:'tab1ButtonText',l:'Текст кнопки',t:'text'},{k:'tab1Href',l:'Ссылка',t:'url'},{k:'tab1Blank',l:'Открывать в новом окне',t:'checkbox'}] },
    { g: 'Вкладка 2', fields: [{k:'tab2Name',l:'Tab name',t:'text'},{k:'tab2Title',l:'Заголовок',t:'textarea'},{k:'tab2Description',l:'Описание',t:'textarea'},{k:'tab2ButtonText',l:'Текст кнопки',t:'text'},{k:'tab2Href',l:'Ссылка',t:'url'},{k:'tab2Blank',l:'Открывать в новом окне',t:'checkbox'}] },
  ],
  'two-tabs-input-button': [
    { g:'Таб с инпутом', fields:[{k:'tab1Name',l:'Tab name',t:'text'},{k:'title',l:'Заголовок',t:'textarea'},{k:'subtitle',l:'Подзаголовок',t:'textarea'},{k:'description',l:'Описание',t:'textarea'},{k:'buttonText',l:'Текст кнопки формы',t:'text'},{k:'crmType',l:'crmType',t:'text'},{k:'product',l:'product',t:'text'},{k:'hideReservationInAgreement',l:'hideReservationInAgreement',t:'checkbox'},{k:'hideCallTime',l:'hideCallTime',t:'checkbox'},{k:'hideAgreeAd',l:'hideAgreeAd',t:'checkbox'}] },
    { g:'Таб с кнопкой', fields:[{k:'tab2Name',l:'Tab name',t:'text'},{k:'tab2Title',l:'Заголовок',t:'textarea'},{k:'tab2Subtitle',l:'Подзаголовок',t:'textarea'},{k:'tab2Description',l:'Описание',t:'textarea'},{k:'tab2ButtonText',l:'Текст кнопки',t:'text'},{k:'tab2Href',l:'Ссылка',t:'url'},{k:'tab2Blank',l:'Открывать в новом окне',t:'checkbox'}] }
  ],
  'terminal-offer': [
    { g:'Таб 1 (форма)', fields:[{k:'tab1Name',l:'Tab name',t:'text'},{k:'tab1Title',l:'Заголовок',t:'textarea'},{k:'tab1Description',l:'Описание',t:'textarea'},{k:'crmType',l:'crmType',t:'text'},{k:'otherPageDescription',l:'otherLeadDataFields.pageDescription',t:'textarea'},{k:'hideReservationInAgreement',l:'hideReservationInAgreement',t:'checkbox'},{k:'hideCallTime',l:'hideCallTime',t:'checkbox'},{k:'hideAgreeAd',l:'hideAgreeAd',t:'checkbox'},{k:'resultTitle',l:'result.title',t:'textarea'},{k:'resultSubtitle',l:'result.subtitle',t:'textarea'},{k:'resultButtonText',l:'result.button.text',t:'text'},{k:'resultHrefPrefix',l:'result.button.href префикс',t:'text'}] },
    { g:'Таб 2 (кнопка)', fields:[{k:'tab2Name',l:'Tab name',t:'text'},{k:'tab2Title',l:'Заголовок',t:'textarea'},{k:'tab2Description',l:'Описание',t:'textarea'},{k:'tab2ButtonText',l:'Текст кнопки',t:'text'},{k:'tab2Href',l:'Ссылка',t:'url'},{k:'tab2Blank',l:'Открывать в новом окне',t:'checkbox'}] }
  ],
  'no-tabs-all-fields': [
    { g:'Основные поля', fields:[{k:'title',l:'Заголовок',t:'textarea'},{k:'subtitle',l:'Подзаголовок',t:'textarea'},{k:'description',l:'Описание',t:'textarea'},{k:'crmType',l:'crmType',t:'text'},{k:'product',l:'product',t:'text'},{k:'hideReservationInAgreement',l:'hideReservationInAgreement',t:'checkbox'},{k:'hideCallTime',l:'hideCallTime',t:'checkbox'},{k:'hideAgreeAd',l:'hideAgreeAd',t:'checkbox'},{k:'inputsJson',l:'inputs (JSON массив)',t:'textarea'},{k:'resultTitle',l:'result.title',t:'textarea'},{k:'resultSubtitle',l:'result.subtitle',t:'textarea'},{k:'resultButtonText',l:'result.button.text',t:'text'},{k:'resultHrefJson',l:'result.button.href (JSON массив)',t:'textarea'}] }
  ],
  'no-tabs-name-phone': [
    { g:'Основные поля', fields:[{k:'title',l:'Заголовок',t:'textarea'},{k:'description',l:'Описание',t:'textarea'},{k:'crmType',l:'crmType',t:'text'},{k:'otherPageDescription',l:'otherLeadDataFields.pageDescription',t:'textarea'},{k:'hideReservationInAgreement',l:'hideReservationInAgreement',t:'checkbox'},{k:'hideCallTime',l:'hideCallTime',t:'checkbox'},{k:'hideAgreeAd',l:'hideAgreeAd',t:'checkbox'},{k:'inputsJson',l:'inputs (JSON массив)',t:'textarea'},{k:'resultTitle',l:'result.title',t:'textarea'},{k:'resultSubtitle',l:'result.subtitle',t:'textarea'},{k:'resultButtonText',l:'result.button.text',t:'text'},{k:'resultHrefJson',l:'result.button.href (JSON массив)',t:'textarea'}] }
  ],
  'redirect-success': [
    { g:'Основные поля', fields:[{k:'title',l:'Заголовок',t:'textarea'},{k:'description',l:'Описание',t:'textarea'},{k:'redirectUrl',l:'URL редиректа после submit',t:'url'},{k:'crmType',l:'crmType',t:'text'},{k:'product',l:'product',t:'text'},{k:'otherPageDescription',l:'otherLeadDataFields.pageDescription',t:'textarea'},{k:'hideReservationInAgreement',l:'hideReservationInAgreement',t:'checkbox'},{k:'hideCallTime',l:'hideCallTime',t:'checkbox'},{k:'hideAgreeAd',l:'hideAgreeAd',t:'checkbox'},{k:'inputsJson',l:'inputs (JSON массив)',t:'textarea'},{k:'resultTitle',l:'result.title',t:'textarea'},{k:'resultSubtitle',l:'result.subtitle',t:'textarea'},{k:'resultButtonText',l:'result.button.text',t:'text'},{k:'resultHrefJson',l:'result.button.href (JSON массив)',t:'textarea'}] }
  ]
};

const presetState = {
  'two-tabs-two-buttons': {tab1Name:'Я не клиент',tab1Title:'Создайте собственный сайт с&nbsp;витриной товаров и&nbsp;услуг',tab1Description:'Зарегистрируйтесь и&nbsp;создайте интернет-магазин — для&nbsp;этого не&nbsp;обязательно иметь счёт в&nbsp;Точка Банке',tab1ButtonText:'Зарегистрироваться',tab1Href:'https://store.tochka.com/api/v1/auth/oauth/start?extra=eyAiYWN0aW9uIjogInJlZyIgfQ&application=store',tab1Blank:true,tab2Name:'Я уже клиент',tab2Title:'Создайте собственный сайт с&nbsp;витриной товаров и&nbsp;услуг',tab2Description:'Перейдите по&nbsp;ссылке и&nbsp;создайте собственный интернет-магазин',tab2ButtonText:'Создать магазин',tab2Href:'https://store.tochka.com/',tab2Blank:true},
  'two-tabs-input-button': {tab1Name:'Текст в первом табе',title:'Я заголовок формы',subtitle:'Я редкий гость, я подзаголовок!',description:'А я текст над временем перезвона',buttonText:'Оставить заявку',crmType:'cross',product:'terminal',hideReservationInAgreement:true,hideCallTime:true,hideAgreeAd:true,tab2Name:'Текст во втором табе',tab2Title:'Заголовок формы без инпутов, только с кнопкой',tab2Subtitle:'Я редкий гость, я подзаголовок!',tab2Description:'Я текст над кнопкой!',tab2ButtonText:'Кнопка form-request',tab2Href:'https://example.com',tab2Blank:true},
  'terminal-offer': {tab1Name:'Нужен счёт',tab1Title:'Закажите новый терминал и&nbsp;выделяйтесь на&nbsp;фоне конкурентов',tab1Description:'Чтобы подключить торговый эквайринг по&nbsp;акции, нужно быть клиентом Точка Банка.',crmType:'signup',otherPageDescription:'Нужен счёт | Новый терминал от Точки за 1 ₽',hideReservationInAgreement:true,hideCallTime:true,hideAgreeAd:true,resultTitle:'Заявка в работе!',resultSubtitle:'Скоро мы с вами свяжемся.',resultButtonText:'Загрузить документы',resultHrefPrefix:'https://tochka.com/doc/?phone=',tab2Name:'Я уже клиент',tab2Title:'Закажите новый терминал и&nbsp;выделяйтесь на&nbsp;фоне конкурентов',tab2Description:'Перейдите в интернет-банк, чтобы оставить заявку на&nbsp;подключение',tab2ButtonText:'Войти в интернет-банк',tab2Href:'https://i.tochka.com/a/acquiring',tab2Blank:true},
  'no-tabs-all-fields': {title:'Я заголовок формы',subtitle:'Я редкий гость, я подзаголовок!',description:'А я текст над временем перезвона',crmType:'cross',product:'terminal',hideReservationInAgreement:true,hideCallTime:true,hideAgreeAd:true,inputsJson:'[{"name":"inn","placeholder":"ИНН","mask":"000000000000","type":"text","required":true},{"name":"clientName","placeholder":"Имя","type":"text","required":true}]',resultTitle:'Я заголовок экрана результата',resultSubtitle:'Я подзаголовок экрана результата',resultButtonText:'Текст кнопки на экране результата',resultHrefJson:'["https://my-site.com?",{"type":"phone"}]'},
  'no-tabs-name-phone': {title:'Начните принимать платежи без&nbsp;комиссии в&nbsp;вашем ресторане!',description:'Оставьте заявку, и&nbsp;мы перезвоним вам в&nbsp;течение рабочего дня',crmType:'signup',otherPageDescription:'Тест Общепит',hideReservationInAgreement:true,hideCallTime:true,hideAgreeAd:true,inputsJson:'[{"name":"clientName","placeholder":"Имя","type":"text","required":true}]',resultTitle:'Заявка в работе!',resultSubtitle:'Скоро мы с вами свяжемся.',resultButtonText:'Загрузить документы',resultHrefJson:'["https://tochka.com/doc/?phone=",{"type":"phone"}]'},
  'redirect-success': {title:'Стать партнёром Точка&nbsp;Банк',description:'Оставьте свой номер телефона и&nbsp;укажите город.',redirectUrl:'https://service.tochka.com/spasibo-mpstats',crmType:'cross',product:'partnership',otherPageDescription:'Заявка на партнёрку',hideReservationInAgreement:true,hideCallTime:true,hideAgreeAd:true,inputsJson:'[{"name":"city","placeholder":"Город","type":"text","required":true}]',resultTitle:'Заявка в работе!',resultSubtitle:'Скоро мы с вами свяжемся.',resultButtonText:'Загрузить документы',resultHrefJson:'["https://tochka.com/doc/?phone=",{"type":"phone"}]'},
};

function escapeHtml(v){return String(v).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'",'&#39;');}
function esc(v){return String(v ?? '').replaceAll('\\','\\\\').replaceAll("'","\\'");}
function asJson(value, fallback){ try { return JSON.parse(value); } catch { return fallback; } }

function mountBrandPalettes() {
  document.querySelectorAll('.brand-palette').forEach((palette) => {
    const target = document.getElementById(palette.dataset.target);
    BRAND_COLORS.forEach((color) => {
      const sw = document.createElement('button'); sw.type='button'; sw.className='brand-swatch'; sw.style.background=color; sw.title=color;
      sw.addEventListener('click', ()=>{ target.value=color; target.dispatchEvent(new Event('input',{bubbles:true}));});
      palette.appendChild(sw);
    });
  });
}

function renderPresetSettings() {
  const key = formUi.variant.value;
  const groups = presetFields[key];
  formUi.settingsRoot.innerHTML = groups.map((group)=>`<section class="settings-group"><h4>${group.g}</h4>${group.fields.map((f)=> fieldHtml(f, presetState[key][f.k])).join('')}</section>`).join('');
  formUi.settingsRoot.querySelectorAll('[data-field]').forEach((node)=>{
    node.addEventListener('input', ()=>{
      presetState[key][node.dataset.field] = node.type === 'checkbox' ? node.checked : node.value;
      refreshForm();
    });
  });
}

function fieldHtml(f, val) {
  if (f.t === 'checkbox') return `<label class="checkbox-label"><input type="checkbox" data-field="${f.k}" ${val ? 'checked' : ''}/> ${f.l}</label>`;
  if (f.t === 'textarea') return `<label>${f.l}<textarea data-field="${f.k}" rows="3">${escapeHtml(val || '')}</textarea></label>`;
  return `<label>${f.l}<input type="${f.t}" data-field="${f.k}" value="${escapeHtml(val || '')}"/></label>`;
}

function getMarqueeSnippet(c){const ff=c.useInheritFont?'inherit':"'TT Norms Tochka', Inter, sans-serif";return `<!-- Tilda custom block: marquee -->\n<style>\n.tp-marquee{overflow:hidden;width:100%;background:${c.bgColor}}.tp-marquee__track{display:flex;width:max-content;white-space:nowrap;animation:tpMarqueeScroll ${c.speed}s linear infinite}.tp-marquee__text{display:inline-flex;align-items:center;padding:12px 8px;font-size:22px;line-height:1.25;font-weight:600;color:${c.textColor};font-family:${ff}}@keyframes tpMarqueeScroll{from{transform:translateX(0)}to{transform:translateX(-50%)}}\n</style>\n<div class="tp-marquee"><div class="tp-marquee__track"><span class="tp-marquee__text">${escapeHtml(c.text)}&nbsp;&nbsp;&nbsp;</span><span class="tp-marquee__text" aria-hidden="true">${escapeHtml(c.text)}&nbsp;&nbsp;&nbsp;</span></div></div>`;}

function refreshMarquee(){const c={text:marqueeUi.text.value.trim()||'Текст бегущей строки',textColor:marqueeUi.textColor.value,bgColor:marqueeUi.bgColor.value,speed:Number(marqueeUi.speed.value),useInheritFont:marqueeUi.useInheritFont.checked};marqueeUi.speedOutput.value=String(c.speed);marqueeUi.previewMarquee.style.background=c.bgColor;marqueeUi.previewTrack.style.animationDuration=`${c.speed}s`;marqueeUi.previewTexts.forEach((i)=>{i.textContent=`${c.text}   `;i.style.color=c.textColor;});marqueeUi.codeOutput.textContent=getMarqueeSnippet(c)}

function basePrefix(){const ref=formUi.referer1.value.trim();const analytics=formUi.analytics.checked?"\n    onSuccessSubmit: () => {\n      if(window.dataLayer) {\n        window.dataLayer.push({event: 'default_form_request'});\n      }\n    },":'';const refLine=ref?`\n    referer1: '${esc(ref)}',`:'';return `${refLine}\n    bgColor: '${formUi.bgColor.value}',${analytics}`;}

function getFormCode() {
  const k = formUi.variant.value; const s = presetState[k];
  if (k === 'two-tabs-two-buttons') return `<div id="universal-form"></div>\n<script src="https://tochka.com/resources/form/digital-form/digital-form.js" onload="\n  new window.UniversalForm('universal-form', {${basePrefix()}\n    params: [\n      { title: '${esc(s.tab1Title)}', description: '${esc(s.tab1Description)}', tabName: '${esc(s.tab1Name)}', button: { text: '${esc(s.tab1ButtonText)}', href: ['${esc(s.tab1Href)}'], isTargetBlank: ${!!s.tab1Blank} } },\n      { title: '${esc(s.tab2Title)}', description: '${esc(s.tab2Description)}', tabName: '${esc(s.tab2Name)}', button: { text: '${esc(s.tab2ButtonText)}', href: ['${esc(s.tab2Href)}'], isTargetBlank: ${!!s.tab2Blank} } },\n    ]\n  });\n"></script>`;
  if (k === 'two-tabs-input-button') return `<div id="universal-form"></div>\n<script src="https://tochka.com/resources/form/digital-form/digital-form.js" onload="\n  new window.UniversalForm('universal-form', {${basePrefix()}\n    params: [\n      { title: '${esc(s.title)}', subtitle: '${esc(s.subtitle)}', description: '${esc(s.description)}', tabName: '${esc(s.tab1Name)}', form: { buttonText: '${esc(s.buttonText)}', crmType: '${esc(s.crmType)}', product: '${esc(s.product)}', hideReservationInAgreement: ${!!s.hideReservationInAgreement}, hideCallTime: ${!!s.hideCallTime}, hideAgreeAd: ${!!s.hideAgreeAd} } },\n      { title: '${esc(s.tab2Title)}', subtitle: '${esc(s.tab2Subtitle)}', description: '${esc(s.tab2Description)}', tabName: '${esc(s.tab2Name)}', button: { text: '${esc(s.tab2ButtonText)}', href: ['${esc(s.tab2Href)}'], isTargetBlank: ${!!s.tab2Blank} } },\n    ]\n  });\n"></script>`;

  if (k === 'terminal-offer') return `<div id="universal-form"></div>\n<script src="https://tochka.com/resources/form/digital-form/digital-form.js" onload="\n  new window.UniversalForm('universal-form', {${basePrefix()}\n    params: [\n      { title: '${esc(s.tab1Title)}', description: '${esc(s.tab1Description)}', tabName: '${esc(s.tab1Name)}', form: { crmType: '${esc(s.crmType)}', hideCallTime: ${!!s.hideCallTime}, hideReservationInAgreement: ${!!s.hideReservationInAgreement}, hideAgreeAd: ${!!s.hideAgreeAd}, otherLeadDataFields: { pageDescription: '${esc(s.otherPageDescription)}' }, result: { title: '${esc(s.resultTitle)}', subtitle: '${esc(s.resultSubtitle)}', button: { text: '${esc(s.resultButtonText)}', href: ['${esc(s.resultHrefPrefix)}', {type: 'phone'}] } } } },\n      { title: '${esc(s.tab2Title)}', description: '${esc(s.tab2Description)}', tabName: '${esc(s.tab2Name)}', button: { text: '${esc(s.tab2ButtonText)}', href: ['${esc(s.tab2Href)}'], isTargetBlank: ${!!s.tab2Blank} } },\n    ]\n  });\n"></script>`;

  if (k === 'no-tabs-all-fields' || k === 'no-tabs-name-phone' || k === 'redirect-success') {
    const inputs = JSON.stringify(asJson(s.inputsJson, []));
    const resultHref = JSON.stringify(asJson(s.resultHrefJson, ['https://tochka.com/doc/?phone=', { type: 'phone' }]));
    const redirect = k === 'redirect-success' ? `\n      window.location.href = '${esc(s.redirectUrl)}';` : '';
    return `<div id="universal-form"></div>\n<script src="https://tochka.com/resources/form/digital-form/digital-form.js" onload="\n  new window.UniversalForm('universal-form',{${basePrefix()}\n    onSuccessSubmit: () => {\n      if(window.dataLayer) {\n        window.dataLayer.push({event: 'default_form_request'});\n      }${redirect}\n    },\n    params: [{\n      title: '${esc(s.title)}',\n      ${s.subtitle !== undefined ? `subtitle: '${esc(s.subtitle)}',` : ''}\n      description: '${esc(s.description)}',\n      tabName: '',\n      form: { crmType: '${esc(s.crmType)}', ${s.product ? `product: '${esc(s.product)}',` : ''} hideCallTime: ${!!s.hideCallTime}, hideReservationInAgreement: ${!!s.hideReservationInAgreement}, hideAgreeAd: ${!!s.hideAgreeAd}, otherLeadDataFields: { pageDescription: '${esc(s.otherPageDescription || '')}' }, inputs: ${inputs}, result: { title: '${esc(s.resultTitle)}', subtitle: '${esc(s.resultSubtitle)}', button: { text: '${esc(s.resultButtonText)}', href: ${resultHref} } } }\n    }]\n  });\n"></script>`;
  }
  return '';
}

function updatePreviewFromState() {
  const k = formUi.variant.value; const s = presetState[k];
  formUi.preview.style.background = formUi.bgColor.value;
  const hasTabs = ['two-tabs-two-buttons','two-tabs-input-button','terminal-offer'].includes(k);
  formUi.previewTabs.style.display = hasTabs ? 'grid' : 'none';
  if (hasTabs) {
    formUi.previewTab1Name.textContent = s.tab1Name || 'Таб 1';
    formUi.previewTab2Name.textContent = s.tab2Name || 'Таб 2';
    const firstActive = !formUi.previewTab2Name.classList.contains('active');
    const tabTitle = firstActive ? (s.tab1Title || s.title) : (s.tab2Title || s.title);
    const tabDesc = firstActive ? (s.tab1Description || s.description) : (s.tab2Description || s.description);
    const tabBtn = firstActive ? (s.tab1ButtonText || s.buttonText || 'Оставить заявку') : (s.tab2ButtonText || 'Открыть');
    formUi.previewTitle.innerHTML = tabTitle || 'Заголовок формы';
    formUi.previewDescription.innerHTML = tabDesc || 'Описание формы';
    formUi.previewButton.textContent = tabBtn;
  } else {
    formUi.previewTitle.innerHTML = s.title || 'Заголовок формы';
    formUi.previewDescription.innerHTML = s.description || 'Описание формы';
    formUi.previewButton.textContent = s.buttonText || 'Оставить заявку';
  }
}

function refreshForm() { renderPresetSettings(); updatePreviewFromState(); formUi.codeOutput.textContent = getFormCode(); }

function copyToClipboard(button, node) {
  const txt = button.textContent;
  navigator.clipboard.writeText(node.textContent).then(()=> button.textContent='Скопировано!').catch(()=> button.textContent='Не удалось скопировать');
  setTimeout(()=> button.textContent=txt, 1200);
}

formUi.variant.addEventListener('input', refreshForm);
[formUi.bgColor, formUi.analytics, formUi.referer1].forEach((n)=> n.addEventListener('input', refreshForm));
formUi.previewTab1Name.addEventListener('click', () => { formUi.previewTab1Name.classList.add('active'); formUi.previewTab2Name.classList.remove('active'); updatePreviewFromState(); });
formUi.previewTab2Name.addEventListener('click', () => { formUi.previewTab2Name.classList.add('active'); formUi.previewTab1Name.classList.remove('active'); updatePreviewFromState(); });

[marqueeUi.text, marqueeUi.textColor, marqueeUi.bgColor, marqueeUi.speed, marqueeUi.useInheritFont].forEach((n)=> n.addEventListener('input', refreshMarquee));
marqueeUi.copyBtn.addEventListener('click', ()=> copyToClipboard(marqueeUi.copyBtn, marqueeUi.codeOutput));
formUi.copyBtn.addEventListener('click', ()=> copyToClipboard(formUi.copyBtn, formUi.codeOutput));

mountBrandPalettes();
refreshMarquee();
refreshForm();
showPage('gallery-page');
