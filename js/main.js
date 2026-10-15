/* ==========================================================
   RODRIGUEZ VERSE — interactivity and editable portfolio content
   Keep personal details, dragon data, and project entries here.
   ========================================================== */

(() => {
  'use strict';

  const EMAIL_ADDRESS = 'rodriguezmelchorjohn@gmail.com';
  const GITHUB_URL = 'https://github.com/Ikaros-hub';
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const body = document.body;
  body.classList.add('js-enabled', 'js-ready');

  // The project log is data-driven. Add new entries to this array when ready.
  const projects = [
    {
      title: 'E-ReQuest',
      category: 'ACADEMIC PROJECT',
      label: 'REQUEST MANAGEMENT',
      description: 'An application intended to organize school requirements and document requests across school offices, with request submission and tracking to help make the process easier to follow.',
      role: 'Quality Assurance Assistant',
      details: 'Request submission · Request tracking · School office documents',
      action: 'Ask about this project'
    }
  ];

  // Each companion uses its own local SVG illustration and palette.
  const dragons = [
    {
      id: 'red', name: 'Ruflare', color: '#ff7b7f', element: 'FIRE', trait: 'Courage', file: 'assets/dragons/dragon-red.svg',
      summary: 'A bold little guardian who reminds you to meet new challenges with courage and heart.',
      personality: 'Ruflare charges into each new adventure with a brave grin. This fire-hearted friend believes that small acts of courage can light the way for everyone.'
    },
    {
      id: 'black', name: 'Nyxveil', color: '#b6a6f7', element: 'SHADOW', trait: 'Mystery', file: 'assets/dragons/dragon-black.svg',
      summary: 'A quiet, observant dragon who finds wonder in mysteries and the questions still unanswered.',
      personality: 'Nyxveil loves hidden patterns, quiet corners, and the thrill of discovering what lies beneath the surface. Mystery is an invitation to look closer.'
    },
    {
      id: 'blue', name: 'Glacien', color: '#80d8ff', element: 'ICE · SKY', trait: 'Logic', file: 'assets/dragons/dragon-blue.svg',
      summary: 'A thoughtful planner who sorts through puzzles one clear step at a time.',
      personality: 'Glacien keeps a cool head when puzzles get tricky. With a patient mind and a fondness for neat solutions, this sky-blue companion helps turn confusion into clarity.'
    },
    {
      id: 'green', name: 'Mosswhirl', color: '#8ce6a4', element: 'FOREST', trait: 'Adventure', file: 'assets/dragons/dragon-green.svg',
      summary: 'A curious wanderer who sees every path as a chance to learn something new.',
      personality: 'Mosswhirl collects little discoveries from every trail. This forest friend encourages exploration, openness, and the kind of learning that happens when you try something new.'
    },
    {
      id: 'pink', name: 'Puffpetal', color: '#f3a2dd', element: 'BLOSSOM', trait: 'Creativity', file: 'assets/dragons/dragon-pink.svg',
      summary: 'A dreamy idea-maker who loves playful details and unexpected connections.',
      personality: 'Puffpetal turns daydreams into bright possibilities. This creative companion celebrates imagination, unusual ideas, and adding a little personality to what you make.'
    },
    {
      id: 'yellow', name: 'Zappip', color: '#ffdd75', element: 'LIGHTNING', trait: 'Energy', file: 'assets/dragons/dragon-yellow.svg',
      summary: 'A cheerful spark of momentum who brings enthusiasm to the next challenge.',
      personality: 'Zappip is a tiny burst of golden energy. Always ready to jump into a new task, this sunny dragon reminds the party that enthusiasm can make learning feel like play.'
    },
    {
      id: 'gray', name: 'Elderhush', color: '#c7cedf', element: 'SILVER MIST', trait: 'Wisdom', file: 'assets/dragons/dragon-gray.svg',
      summary: 'A calm silver guardian who values patience, reflection, and lessons gathered over time.',
      personality: 'Elderhush listens before speaking and believes that thoughtful pauses matter. This wise companion helps the party step back, reflect, and choose the next move carefully.'
    }
  ];

  const byId = (id) => document.getElementById(id);

  // ---------- Skippable portal entrance ----------
  const intro = byId('portal-intro');
  let introClosed = false;
  function closeIntro() {
    if (introClosed || !intro) return;
    introClosed = true;
    intro.classList.add('is-leaving');
    body.classList.remove('intro-pending');
    intro.setAttribute('aria-hidden', 'true');
    // Remove the now-closed intro from keyboard navigation as well as sight.
    intro.inert = true;
    window.setTimeout(() => intro.remove(), prefersReducedMotion.matches ? 0 : 760);
  }
  byId('enter-world')?.addEventListener('click', closeIntro);
  byId('skip-intro')?.addEventListener('click', closeIntro);
  window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && intro && !introClosed) closeIntro();
  });

  // ---------- Responsive navigation ----------
  const menuToggle = byId('menu-toggle');
  const navigation = byId('primary-navigation');
  const navLinks = Array.from(document.querySelectorAll('.nav-link'));

  function closeMobileMenu() {
    if (!menuToggle || !navigation) return;
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Open navigation menu');
    navigation.classList.remove('is-open');
  }

  menuToggle?.addEventListener('click', () => {
    const willOpen = menuToggle.getAttribute('aria-expanded') !== 'true';
    menuToggle.setAttribute('aria-expanded', String(willOpen));
    menuToggle.setAttribute('aria-label', willOpen ? 'Close navigation menu' : 'Open navigation menu');
    navigation?.classList.toggle('is-open', willOpen);
  });

  navLinks.forEach((link) => {
    link.addEventListener('click', closeMobileMenu);
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeMobileMenu();
  });

  const header = byId('site-header');
  let headerUpdateFrame = 0;
  function scheduleHeaderUpdate() {
    if (headerUpdateFrame) return;
    headerUpdateFrame = window.requestAnimationFrame(() => {
      header?.classList.toggle('is-scrolled', window.scrollY > 10);
      headerUpdateFrame = 0;
    });
  }
  scheduleHeaderUpdate();
  window.addEventListener('scroll', scheduleHeaderUpdate, { passive: true });

  // Pause decorative animations while this tab is hidden to save CPU/battery.
  document.addEventListener('visibilitychange', () => {
    body.classList.toggle('page-hidden', document.hidden);
  });

  // Active navigation follows the visible section. Scroll behavior stays in CSS.
  if ('IntersectionObserver' in window) {
    const sectionObserver = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;
      navLinks.forEach((link) => {
        const active = link.getAttribute('href') === `#${visible.target.id}`;
        link.classList.toggle('is-active', active);
        if (active) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    }, { rootMargin: '-25% 0px -58% 0px', threshold: [0, 0.1, 0.3, 0.6] });
    document.querySelectorAll('main section[id]').forEach((section) => sectionObserver.observe(section));
  }

  // ---------- Data-driven quest log ----------
  const projectList = byId('project-list');
  if (projectList) {
    projects.forEach((project) => {
      const card = document.createElement('article');
      card.className = 'project-card reveal-ready';
      card.innerHTML = `
        <div class="project-icon-wrap" aria-hidden="true"><div class="project-icon"><span>⌑</span></div></div>
        <div class="project-main">
          <p class="project-kicker">${escapeHtml(project.category)} <span>${escapeHtml(project.label)}</span></p>
          <h3>${escapeHtml(project.title)}</h3>
          <p>${escapeHtml(project.description)}</p>
          <div class="project-facts">
            <span class="project-fact">Role: ${escapeHtml(project.role)}</span>
            <span class="project-fact">${escapeHtml(project.details)}</span>
          </div>
        </div>
        <a class="project-action" href="#contact">${escapeHtml(project.action)} <span aria-hidden="true">↗</span></a>`;
      projectList.appendChild(card);
    });
  }

  // Small helper used whenever text from editable data is inserted into HTML.
  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, (character) => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    })[character]);
  }

  // ---------- Seven keyboard-accessible dragon companions ----------
  const roster = byId('dragon-roster');
  const dragonPanel = byId('dragon-info-panel');
  const dragonArt = byId('dragon-info-art');
  const dragonElement = byId('dragon-element');
  const dragonName = byId('dragon-name');
  const dragonDescription = byId('dragon-description');
  const dragonTrait = byId('dragon-trait');
  let selectedDragonId = dragons[0].id;

  function selectDragon(dragonId, moveFocus = false) {
    const dragon = dragons.find((item) => item.id === dragonId);
    if (!dragon || !roster) return;
    selectedDragonId = dragon.id;
    roster.querySelectorAll('.dragon-choice').forEach((button) => {
      const selected = button.dataset.dragonId === dragon.id;
      button.setAttribute('aria-pressed', String(selected));
      if (selected && moveFocus) button.focus();
    });
    if (dragonPanel) dragonPanel.style.setProperty('--selected-dragon', dragon.color);
    if (dragonArt) {
      dragonArt.style.setProperty('--selected-dragon', dragon.color);
      dragonArt.innerHTML = `<img src="${dragon.file}" alt="${escapeHtml(dragon.name)}, the ${escapeHtml(dragon.trait.toLowerCase())} dragon" width="170" height="170">`;
    }
    if (dragonElement) dragonElement.textContent = `${dragon.element} · ${dragon.trait.toUpperCase()}`;
    if (dragonName) dragonName.textContent = dragon.name;
    if (dragonDescription) dragonDescription.textContent = dragon.summary;
    if (dragonTrait) dragonTrait.textContent = dragon.trait;
  }

  if (roster) {
    dragons.forEach((dragon) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'dragon-choice';
      button.dataset.dragonId = dragon.id;
      button.style.setProperty('--dragon-accent', dragon.color);
      button.setAttribute('aria-pressed', String(dragon.id === selectedDragonId));
      button.setAttribute('aria-label', `Meet ${dragon.name}, dragon of ${dragon.trait}`);
      button.innerHTML = `
        <img src="${dragon.file}" alt="" width="140" height="140" loading="lazy" decoding="async">
        <strong>${escapeHtml(dragon.name)}</strong>
        <small>${escapeHtml(dragon.trait)}</small>`;
      button.addEventListener('click', () => selectDragon(dragon.id));
      roster.appendChild(button);
    });
    selectDragon(selectedDragonId);
  }

  // Left/right arrows provide efficient keyboard travel through the companion row.
  roster?.addEventListener('keydown', (event) => {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    const currentIndex = dragons.findIndex((dragon) => dragon.id === selectedDragonId);
    let nextIndex = currentIndex;
    if (event.key === 'ArrowLeft') nextIndex = (currentIndex - 1 + dragons.length) % dragons.length;
    if (event.key === 'ArrowRight') nextIndex = (currentIndex + 1) % dragons.length;
    if (event.key === 'Home') nextIndex = 0;
    if (event.key === 'End') nextIndex = dragons.length - 1;
    event.preventDefault();
    selectDragon(dragons[nextIndex].id, true);
  });

  // ---------- Small, non-essential parallax ----------
  const heroArt = document.querySelector('.hero-art');
  if (heroArt && !prefersReducedMotion.matches && window.matchMedia('(pointer: fine)').matches) {
    let parallaxFrame = 0;
    let latestPointer = null;

    heroArt.addEventListener('pointermove', (event) => {
      latestPointer = { x: event.clientX, y: event.clientY };
      if (parallaxFrame) return;
      parallaxFrame = window.requestAnimationFrame(() => {
        parallaxFrame = 0;
        if (!latestPointer) return;
        const bounds = heroArt.getBoundingClientRect();
        const x = (latestPointer.x - bounds.left) / bounds.width - 0.5;
        const y = (latestPointer.y - bounds.top) / bounds.height - 0.5;
        heroArt.style.setProperty('--parallax-x', `${(x * -6).toFixed(2)}px`);
        heroArt.style.setProperty('--parallax-y', `${(y * -6).toFixed(2)}px`);
        latestPointer = null;
      });
    }, { passive: true });

    heroArt.addEventListener('pointerleave', () => {
      latestPointer = null;
      if (parallaxFrame) window.cancelAnimationFrame(parallaxFrame);
      parallaxFrame = 0;
      heroArt.style.setProperty('--parallax-x', '0px');
      heroArt.style.setProperty('--parallax-y', '0px');
    }, { passive: true });
  }

  // ---------- Section reveals (fully visible when motion is reduced) ----------
  if ('IntersectionObserver' in window && !prefersReducedMotion.matches) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-revealed');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -35px 0px' });
    document.querySelectorAll('.dashboard-grid > *, .about-art-column, .about-copy, .skill-card, .project-card, .dragon-stage, .hobby-card, .contact-intro, .contact-form-wrap').forEach((element) => {
      element.classList.add('reveal-ready');
      revealObserver.observe(element);
    });
  } else {
    document.querySelectorAll('.reveal-ready').forEach((element) => element.classList.add('is-revealed'));
  }

  // ---------- Contact helpers ----------
  const copyButton = byId('copy-email');
  const copyFeedback = byId('copy-feedback');
  let copyFeedbackTimer;

  async function copyEmail() {
    let copied = false;
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(EMAIL_ADDRESS);
        copied = true;
      } else {
        const temporaryInput = document.createElement('textarea');
        temporaryInput.value = EMAIL_ADDRESS;
        temporaryInput.setAttribute('readonly', '');
        temporaryInput.style.position = 'fixed';
        temporaryInput.style.opacity = '0';
        temporaryInput.style.pointerEvents = 'none';
        document.body.appendChild(temporaryInput);
        temporaryInput.select();
        copied = document.execCommand('copy');
        temporaryInput.remove();
      }
    } catch (error) {
      copied = false;
    }
    const message = copied ? 'Email address copied.' : `Copy this address: ${EMAIL_ADDRESS}`;
    if (copyFeedback) copyFeedback.textContent = message;
    if (!copied) showToast(message);
    if (copyFeedbackTimer) window.clearTimeout(copyFeedbackTimer);
    copyFeedbackTimer = window.setTimeout(() => { if (copyFeedback) copyFeedback.textContent = ''; }, 5000);
  }
  copyButton?.addEventListener('click', copyEmail);

  function showToast(message) {
    const toast = byId('site-toast');
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('is-visible');
    if (showToast.timer) window.clearTimeout(showToast.timer);
    showToast.timer = window.setTimeout(() => toast.classList.remove('is-visible'), 4200);
  }

  const form = byId('contact-form');
  const nameInput = byId('contact-name');
  const emailInput = byId('contact-email');
  const messageInput = byId('contact-message');
  const formStatus = byId('form-status');
  const formFields = [
    { input: nameInput, error: byId('name-error'), validate: (value) => value.trim().length >= 2 ? '' : 'Please enter a name with at least 2 characters.' },
    { input: emailInput, error: byId('email-error'), validate: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()) ? '' : 'Please enter a valid email address.' },
    { input: messageInput, error: byId('message-error'), validate: (value) => value.trim().length >= 10 ? '' : 'Please write a message with at least 10 characters.' }
  ];

  function validateField(field) {
    if (!field?.input) return true;
    const errorMessage = field.validate(field.input.value);
    field.input.setAttribute('aria-invalid', String(Boolean(errorMessage)));
    if (field.error) field.error.textContent = errorMessage;
    return !errorMessage;
  }

  formFields.forEach((field) => {
    field.input?.addEventListener('blur', () => validateField(field));
    field.input?.addEventListener('input', () => {
      // Only refresh feedback after this field has already been checked.
      if (field.input.hasAttribute('aria-invalid')) validateField(field);
      if (formStatus) formStatus.textContent = '';
    });
  });

  form?.addEventListener('submit', (event) => {
    event.preventDefault();
    if (formStatus) formStatus.textContent = '';
    const validity = formFields.map((field) => validateField(field));
    if (validity.some((isValid) => !isValid)) {
      const firstInvalid = formFields.find((field) => field.input?.getAttribute('aria-invalid') === 'true');
      firstInvalid?.input?.focus();
      if (formStatus) formStatus.textContent = 'Please check the highlighted fields before preparing your email.';
      return;
    }

    const senderName = nameInput.value.trim();
    const senderEmail = emailInput.value.trim();
    const senderMessage = messageInput.value.trim();
    const subject = `Rodriguez Verse portfolio message from ${senderName}`;
    const bodyText = `Hello Melchor,\n\n${senderMessage}\n\n— ${senderName}\n${senderEmail}`;
    const mailtoUrl = `mailto:${EMAIL_ADDRESS}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyText)}`;
    if (formStatus) {
      formStatus.textContent = 'Your email app should open with a draft. Review the recipient and message, then send it from your email app. This website does not send or store messages.';
    }
    // Opening a mail client is a handoff, not a claim that a message was delivered.
    window.location.href = mailtoUrl;
  });

  // ---------- Footer ----------
  const year = byId('copyright-year');
  if (year) year.textContent = String(new Date().getFullYear());

  // These are intentionally referenced here to make the edit points obvious.
  // Profile copy lives in index.html; project entries and dragon personalities live above.
  void GITHUB_URL;
})();
