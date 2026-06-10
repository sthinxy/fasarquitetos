/* FAS Arquitetura — interações corrigidas */
(() => {
  'use strict';

  const WHATSAPP_MAIN = 'https://wa.me/5521964984398';
  const WHATSAPP_ALT = 'https://wa.me/5521964760440';
  const CHAT_ENDPOINT = 'https://memoken.com/webhook/artificial-inteligence/completion';

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));
  const byId = (id) => document.getElementById(id);

  const storage = {
    get(key) {
      try { return window.localStorage.getItem(key); } catch (_) { return null; }
    },
    set(key, value) {
      try { window.localStorage.setItem(key, value); } catch (_) {}
    }
  };

  function encodeWhatsApp(text) {
    return `${WHATSAPP_MAIN}?text=${encodeURIComponent(text)}`;
  }

  function closeMobileMenu() {
    const nav = byId('nav');
    const menuBtn = byId('menuBtn');
    if (!nav || !menuBtn) return;
    nav.classList.remove('is-open');
    menuBtn.classList.remove('is-open');
    menuBtn.setAttribute('aria-expanded', 'false');
  }

  function scrollToSection(hashOrId) {
    const hash = String(hashOrId || '').startsWith('#') ? String(hashOrId) : `#${hashOrId}`;
    const id = decodeURIComponent(hash.slice(1));
    const target = byId(id);
    if (!target) return false;

    const header = byId('header');
    const headerHeight = header ? header.getBoundingClientRect().height : 0;
    const top = target.getBoundingClientRect().top + window.scrollY - headerHeight + 4;

    try {
      window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
    } catch (_) {
      window.scrollTo(0, Math.max(0, top));
    }

    try { history.pushState(null, '', `#${id}`); } catch (_) {}
    closeMobileMenu();
    return true;
  }

  function initTheme() {
    const initial = storage.get('fas-theme') || document.body?.dataset.theme || 'light';
    setTheme(initial === 'dark' ? 'dark' : 'light');

    byId('themeToggle')?.addEventListener('click', () => {
      const current = document.body?.getAttribute('data-theme') || 'light';
      setTheme(current === 'dark' ? 'light' : 'dark');
    });
  }

  function setTheme(theme) {
    const normalized = theme === 'dark' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', normalized);
    document.body?.setAttribute('data-theme', normalized);
    storage.set('fas-theme', normalized);

    const metaTheme = $('meta[name="theme-color"]');
    if (metaTheme) metaTheme.setAttribute('content', normalized === 'dark' ? '#111111' : '#F5F2EC');
  }

  function initMobileMenu() {
    const nav = byId('nav');
    const menuBtn = byId('menuBtn');
    if (!nav || !menuBtn) return;

    menuBtn.addEventListener('click', () => {
      const open = nav.classList.toggle('is-open');
      menuBtn.classList.toggle('is-open', open);
      menuBtn.setAttribute('aria-expanded', String(open));
    });

    $$('#nav a').forEach((link) => link.addEventListener('click', () => closeMobileMenu()));
    window.addEventListener('resize', () => {
      if (window.innerWidth > 980) closeMobileMenu();
    }, { passive: true });
  }

  function initYear() {
    const year = byId('year');
    if (year) year.textContent = new Date().getFullYear();
  }

  function initSmoothAnchors() {
    $$('a[href^="#"]').forEach((link) => {
      link.addEventListener('click', (event) => {
        const href = link.getAttribute('href');
        if (!href || href === '#') return;
        if (scrollToSection(href)) event.preventDefault();
      });
    });
  }

  /* ---------- GALERIA ---------- */
  const projects = [
    { img: 'assets/images/projeto-01.jpg', title: 'Sala integrada com painel ripado', cat: ['interiores', 'residencial', 'projetos'], catLabel: 'Interiores', desc: 'Iluminação embutida, painel em madeira e marcenaria planejada para integrar o estar.' },
    { img: 'assets/images/projeto-02.jpg', title: 'Banheiro com identidade artesanal', cat: ['reformas', 'interiores', 'residencial'], catLabel: 'Reforma', desc: 'Revestimento em azulejos azuis, marcenaria leve e detalhes em bambu.' },
    { img: 'assets/images/projeto-03.jpg', title: 'Mesa de tronco em destaque', cat: ['interiores', 'residencial'], catLabel: 'Interiores', desc: 'Peça central em madeira maciça, com presença escultural e conforto visual.' },
    { img: 'assets/images/projeto-04.jpg', title: 'Estar com luz natural e arte', cat: ['interiores', 'residencial', 'projetos'], catLabel: 'Projeto', desc: 'Composição com quadros, paleta sóbria e abertura ampla para a cidade.' },
    { img: 'assets/images/projeto-05.jpg', title: 'Suíte com jardim privativo', cat: ['projetos', 'residencial'], catLabel: 'Projeto', desc: 'Integração entre dormitório e área externa com paisagismo, esquadrias e piso técnico.' },
    { img: 'assets/images/projeto-06.jpg', title: 'Pergolado e área gourmet', cat: ['obras', 'comercial', 'projetos'], catLabel: 'Obra', desc: 'Estrutura em madeira, vidro e ritmo solar para área de convivência ao ar livre.' },
    { img: 'assets/images/projeto-07.jpg', title: 'Pátio interno com paisagismo', cat: ['projetos', 'residencial'], catLabel: 'Projeto', desc: 'Esquadrias amplas, jardim interno e relação fluida entre dentro e fora.' },
  ];

  function createGalleryItem(project, index) {
    const item = document.createElement('article');
    item.className = 'gallery__item';
    item.dataset.cat = project.cat.join(' ');
    item.dataset.idx = String(index);
    item.tabIndex = 0;
    item.setAttribute('role', 'button');
    item.setAttribute('aria-label', `Ver detalhes do projeto: ${project.title}`);

    const img = document.createElement('img');
    img.src = project.img;
    img.alt = project.title;
    img.loading = 'lazy';
    img.decoding = 'async';

    const overlay = document.createElement('div');
    overlay.className = 'gallery__overlay';
    overlay.innerHTML = `
      <div>
        <span></span>
        <h4></h4>
      </div>
      <span class="round-btn" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M7 17 17 7M9 7h8v8"/></svg>
      </span>
    `;
    overlay.querySelector('span').textContent = project.catLabel;
    overlay.querySelector('h4').textContent = project.title;

    const open = () => openModal(project);
    item.addEventListener('click', open);
    item.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        open();
      }
    });

    item.append(img, overlay);
    return item;
  }

  function renderGallery() {
    const gallery = byId('gallery');
    if (!gallery) return;
    gallery.replaceChildren(...projects.map(createGalleryItem));
  }

  function setGalleryFilter(filter = 'all', scroll = false) {
    const selectedFilter = filter || 'all';
    $$('#filters .pill').forEach((button) => {
      button.classList.toggle('is-active', button.dataset.filter === selectedFilter);
    });

    $$('.gallery__item').forEach((item) => {
      const visible = selectedFilter === 'all' || (item.dataset.cat || '').split(' ').includes(selectedFilter);
      item.classList.toggle('hide', !visible);
    });

    if (scroll) scrollToSection('projetos');
  }

  function initGallery() {
    const filters = byId('filters');
    renderGallery();
    setGalleryFilter('all');

    filters?.addEventListener('click', (event) => {
      const button = event.target.closest('[data-filter]');
      if (!button) return;
      setGalleryFilter(button.dataset.filter || 'all');
    });
  }

  /* ---------- MODAL ---------- */
  function openModal(project) {
    const modal = byId('modal');
    const modalImg = byId('modalImg');
    const modalTitle = byId('modalTitle');
    const modalCat = byId('modalCat');
    const modalDesc = byId('modalDesc');
    const modalCta = byId('modalCta');
    if (!modal || !modalImg || !modalTitle || !modalCat || !modalDesc || !modalCta) return;

    modalImg.src = project.img;
    modalImg.alt = project.title;
    modalTitle.textContent = project.title;
    modalCat.textContent = project.catLabel;
    modalDesc.textContent = project.desc;
    modalCta.href = encodeWhatsApp(`Olá, FAS Arquitetura. Vim pelo site e quero algo no estilo do projeto: ${project.title}.`);
    modal.hidden = false;
    document.body.classList.add('modal-open');
  }

  function closeModal() {
    const modal = byId('modal');
    if (!modal) return;
    modal.hidden = true;
    document.body.classList.remove('modal-open');
  }

  function initModal() {
    const modal = byId('modal');
    if (!modal) return;
    modal.addEventListener('click', (event) => {
      if (event.target.closest('[data-close]')) closeModal();
    });
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        closeModal();
        closeMobileMenu();
        hideChat();
      }
    });
  }

  /* ---------- BOTÕES DO HERO ---------- */
  function initHeroButtons() {
    $$('.hero__rail [data-rail]').forEach((button) => {
      button.addEventListener('click', () => {
        const action = button.dataset.rail;
        if (action === 'chat') return openChat(true);
        if (action === 'galeria' || action === 'projetos') return setGalleryFilter('all', true);
        if (action === 'contato') return scrollToSection('contato');
        return scrollToSection('top');
      });
    });

    $$('[data-hero-filter]').forEach((button) => {
      button.addEventListener('click', () => {
        const filter = button.dataset.heroFilter;
        if (filter === 'processo') return scrollToSection('processo');
        setGalleryFilter(filter || 'all', true);
      });
    });
  }

  /* ---------- ERROS ---------- */
  const erros = [
    ['Comprar móveis que não cabem', 'Medidas, circulação e proporção precisam estar no projeto antes da compra.'],
    ['Escolher iluminação errada', 'Cada ambiente pede temperatura, foco e camadas de luz diferentes.'],
    ['Gastar mais na obra por falta de planejamento', 'Decisões tomadas no canteiro custam mais que decisões tomadas em projeto.'],
    ['Ter um ambiente bonito, mas pouco funcional', 'Estética sem rotina não sustenta o dia a dia.'],
    ['Reforma sem compatibilizar medidas e materiais', 'Detalhes técnicos evitam retrabalho e desperdício.'],
    ['Materiais que não conversam entre si', 'Paleta e textura precisam de coerência para o espaço respirar.'],
    ['Perder espaço por falta de layout', 'Um bom projeto começa pela leitura do que cabe e do que falta.'],
    ['Começar uma obra sem clareza do resultado', 'Imagens e plantas alinham expectativa e execução.'],
    ['Problemas por falta de legalização', 'Documentação correta protege o investimento e a obra.'],
  ];

  function initErros() {
    const grid = byId('errosGrid');
    if (!grid) return;
    const icons = ['📐', '💡', '🧱', '🛋️', '📏', '🎨', '🗺️', '🖼️', '📑'];
    grid.replaceChildren(...erros.map(([title, desc], index) => {
      const item = document.createElement('div');
      item.className = 'erro reveal';
      item.innerHTML = `
        <div class="erro__icon" aria-hidden="true"></div>
        <div><h4></h4><p></p></div>
      `;
      item.querySelector('.erro__icon').textContent = icons[index] || '•';
      item.querySelector('h4').textContent = title;
      item.querySelector('p').textContent = desc;
      return item;
    }));
  }

  /* ---------- QUIZ ---------- */
  const quizData = [
    { q: 'O que você quer transformar?', opts: ['Casa', 'Apartamento', 'Sala comercial', 'Loja', 'Escritório', 'Ambiente específico', 'Ainda não sei'] },
    { q: 'Qual é o objetivo principal?', opts: ['Construir', 'Reformar', 'Legalizar', 'Melhorar funcionalidade', 'Valorizar o imóvel', 'Criar um ambiente mais bonito', 'Organizar uma obra'] },
    { q: 'Qual estilo mais combina com você?', opts: ['Moderno', 'Aconchegante', 'Minimalista', 'Sofisticado', 'Natural', 'Funcional', 'Contemporâneo'] },
    { q: 'Quais materiais/elementos você prefere?', opts: ['Madeira', 'Tons claros', 'Iluminação quente', 'Cimento', 'Mármore', 'Cores neutras', 'Plantas', 'Vidro e linhas retas'] },
    { q: 'Qual seu maior problema hoje?', opts: ['Falta de espaço', 'Ambiente sem personalidade', 'Pouca funcionalidade', 'Reforma parada', 'Dúvida de orçamento', 'Falta de planejamento', 'Legalização pendente', 'Não sei por onde começar'] },
  ];

  const results = [
    { t: 'Sofisticação Natural com Toque Aconchegante', d: 'Seu projeto combina com materiais naturais, tons equilibrados, iluminação acolhedora e soluções que valorizam o conforto.' },
    { t: 'Minimalismo Funcional', d: 'Seu espaço pede clareza, organização visual e soluções inteligentes para aproveitar melhor cada metro.' },
    { t: 'Elegância Contemporânea', d: 'Seu estilo combina com linhas modernas, materiais sofisticados e uma atmosfera marcante sem excesso.' },
    { t: 'Funcionalidade Inteligente', d: 'Seu principal desafio parece ser transformar o espaço em algo mais prático, bem planejado e adaptado à rotina.' },
    { t: 'Projeto Técnico com Clareza', d: 'Seu momento pede orientação, planejamento e decisões técnicas para avançar com mais segurança.' },
  ];

  let quizStep = 0;
  const quizAnswers = [];

  function renderQuiz() {
    const quizBody = byId('quizBody');
    const quizBar = byId('quizBar');
    if (!quizBody || !quizBar) return;

    if (quizStep >= quizData.length) return renderResult(quizBody, quizBar);

    const current = quizData[quizStep];
    quizBar.style.width = `${(quizStep / quizData.length) * 100}%`;
    quizBody.replaceChildren();

    const small = document.createElement('small');
    small.className = 'muted';
    small.textContent = `Pergunta ${quizStep + 1} de ${quizData.length}`;

    const title = document.createElement('h3');
    title.textContent = current.q;

    const options = document.createElement('div');
    options.className = 'quiz__options';

    current.opts.forEach((option, index) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'quiz__opt';
      button.dataset.i = String(index);
      button.textContent = option;
      button.addEventListener('click', () => {
        quizAnswers[quizStep] = index;
        quizStep += 1;
        renderQuiz();
      });
      options.appendChild(button);
    });

    const nav = document.createElement('div');
    nav.className = 'quiz__nav';

    const back = document.createElement('button');
    back.type = 'button';
    back.className = 'btn btn--ghost';
    back.textContent = 'Voltar';
    back.disabled = quizStep === 0;
    if (quizStep === 0) {
      back.style.opacity = '.4';
      back.style.pointerEvents = 'none';
    }
    back.addEventListener('click', () => {
      if (quizStep > 0) {
        quizStep -= 1;
        renderQuiz();
      }
    });

    const hint = document.createElement('span');
    hint.className = 'muted small';
    hint.textContent = 'Selecione uma opção';

    nav.append(back, hint);
    quizBody.append(small, title, options, nav);
  }

  function renderResult(quizBody, quizBar) {
    quizBar.style.width = '100%';
    const styleAnswer = quizAnswers[2] ?? 0;
    let result = results[styleAnswer % results.length] || results[0];
    if ((quizAnswers[4] ?? -1) === 6) result = results[4];
    if ((quizAnswers[1] ?? -1) === 3) result = results[3];

    const message = `Olá, FAS Arquitetura. Fiz o quiz no site e meu resultado foi: ${result.t}. Quero conversar sobre um projeto nesse estilo.`;

    quizBody.innerHTML = `
      <div class="quiz__result">
        <span class="badge">Seu estilo</span>
        <h3></h3>
        <p class="muted"></p>
        <div class="quiz__nav" style="justify-content:center;margin-top:18px;gap:10px;flex-wrap:wrap">
          <a class="btn btn--primary" target="_blank" rel="noopener">Quero conversar sobre meu projeto nesse estilo</a>
          <button type="button" class="btn btn--ghost" id="qReset">Refazer quiz</button>
        </div>
      </div>
    `;
    quizBody.querySelector('h3').textContent = result.t;
    quizBody.querySelector('p').textContent = result.d;
    quizBody.querySelector('a').href = encodeWhatsApp(message);
    byId('qReset')?.addEventListener('click', () => {
      quizStep = 0;
      quizAnswers.length = 0;
      renderQuiz();
    });
  }

  /* ---------- REVEAL ---------- */
  function initReveal() {
    const elements = $$('.reveal');
    if (!elements.length) return;

    if (!('IntersectionObserver' in window)) {
      elements.forEach((element) => element.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    elements.forEach((element) => observer.observe(element));
  }

  /* ---------- CHAT IA ---------- */
  function getLocalChatReply(message) {
    const text = message.toLowerCase();
    if (/preço|valor|orçamento|quanto|custa/.test(text)) {
      return 'Para valores, o ideal é entender o tipo de projeto, tamanho do espaço e objetivo. Você pode chamar a FAS no WhatsApp para enviar essas informações e receber uma orientação mais precisa.';
    }
    if (/legaliza|regulariza|documento|prefeitura/.test(text)) {
      return 'A FAS também pode orientar sobre legalização e regularização. Conte qual é o imóvel e o que precisa ser ajustado para avaliarmos o caminho correto.';
    }
    if (/reforma|obra|constru/.test(text)) {
      return 'Para reforma ou obra, o primeiro passo é alinhar necessidades, referências, medidas e prioridades. Assim o projeto evita retrabalho e ajuda a executar com mais segurança.';
    }
    if (/contato|whatsapp|zap|telefone/.test(text)) {
      return 'Você pode falar diretamente com a FAS pelo WhatsApp: +55 21 96498-4398.';
    }
    return 'Entendi. Para te orientar melhor, me diga se você busca projeto, reforma, obra ou legalização, e qual tipo de espaço deseja transformar.';
  }

  function getChatId() {
    let id = storage.get('fas-chat-id');
    if (!id) {
      id = `fas_${Math.random().toString(36).slice(2)}_${Date.now().toString(36)}`;
      storage.set('fas-chat-id', id);
    }
    return id;
  }

  function addMsg(role, text) {
    const chatLog = byId('chatLog');
    if (!chatLog) return null;
    const element = document.createElement('div');
    element.className = `chat__msg ${role}`;
    element.textContent = text;
    chatLog.appendChild(element);
    chatLog.scrollTop = chatLog.scrollHeight;
    return element;
  }

  function openChat(forceOpen = false) {
    const chat = byId('chat');
    const chatLog = byId('chatLog');
    const chatInput = byId('chatInput');
    if (!chat || !chatLog) return;

    chat.hidden = forceOpen ? false : !chat.hidden;
    if (!chat.hidden && !chatLog.children.length) {
      addMsg('bot', 'Oi, seja bem-vindo(a). Você está pensando em reformar, construir, legalizar ou entender possibilidades para o seu espaço?');
    }
    if (!chat.hidden) setTimeout(() => chatInput?.focus(), 80);
  }

  function hideChat() {
    const chat = byId('chat');
    if (chat) chat.hidden = true;
  }

  function extractChatReply(payload, originalMessage) {
    if (!payload) return getLocalChatReply(originalMessage);
    if (typeof payload === 'string') return payload || getLocalChatReply(originalMessage);
    if (Array.isArray(payload)) return extractChatReply(payload.find(Boolean), originalMessage);
    return payload.response || payload.message || payload.output || payload.text || payload.reply || getLocalChatReply(originalMessage);
  }

  function initChat() {
    const chatBubble = byId('chatBubble');
    const chatClose = byId('chatClose');
    const chatForm = byId('chatForm');
    const chatInput = byId('chatInput');

    chatBubble?.addEventListener('click', () => openChat());
    chatClose?.addEventListener('click', () => hideChat());

    chatForm?.addEventListener('submit', async (event) => {
      event.preventDefault();
      if (!chatInput || chatForm.dataset.loading === 'true') return;

      const text = chatInput.value.trim();
      if (!text) return;

      const submit = $('button[type="submit"]', chatForm);
      chatForm.dataset.loading = 'true';
      if (submit) submit.disabled = true;

      addMsg('user', text);
      chatInput.value = '';
      const typing = addMsg('bot', '');
      typing?.classList.add('typing');

      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 9000);

      try {
        const response = await fetch(CHAT_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ chat_id: getChatId(), human_message: text }),
          signal: controller.signal
        });

        const raw = await response.text();
        let payload = raw;
        try { payload = raw ? JSON.parse(raw) : null; } catch (_) {}

        if (typing) {
          typing.classList.remove('typing');
          typing.textContent = extractChatReply(payload, text);
        }
      } catch (_) {
        if (typing) {
          typing.classList.remove('typing');
          typing.textContent = getLocalChatReply(text);
        }
      } finally {
        clearTimeout(timeout);
        chatForm.dataset.loading = 'false';
        if (submit) submit.disabled = false;
        chatInput.focus();
      }
    });
  }

  function initWhatsAppLinks() {
    $$('a[href^="https://wa.me/5521964984398"], a[href^="https://wa.me/5521964760440"]').forEach((link) => {
      const href = link.getAttribute('href') || '';
      if (href.includes('?text=')) return;
      const base = href.startsWith(WHATSAPP_ALT) ? WHATSAPP_ALT : WHATSAPP_MAIN;
      link.href = `${base}?text=${encodeURIComponent('Olá, FAS Arquitetura. Vim pelo site e quero conversar sobre um projeto.')}`;
    });
  }

  function boot() {
    initTheme();
    initMobileMenu();
    initYear();
    initSmoothAnchors();
    initGallery();
    initModal();
    initHeroButtons();
    initErros();
    renderQuiz();
    initReveal();
    initChat();
    initWhatsAppLinks();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot, { once: true });
  } else {
    boot();
  }
})();
