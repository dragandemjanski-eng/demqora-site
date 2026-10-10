(() => {
  const button = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav-links');
  if (button && nav) {
    button.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      button.setAttribute('aria-expanded', String(open));
    });
  }
  const year = document.querySelector('[data-year]');
  if (year) year.textContent = new Date().getFullYear();
})();

/* DEMQORA_DOCUMENTATION_DROPDOWN_V1
   A single shared navigation upgrade: Desktop hover/focus dropdown,
   mobile submenu visible inside the expanded hamburger navigation.
   Leaves the existing Products dropdown and page markup unchanged.
*/
(() => {
  'use strict';
  const ownScript = document.currentScript;

  function installDocumentationDropdown() {
    const nav = document.querySelector('.site-header .nav-links');
    if (!nav || nav.querySelector('.nav-documentation')) return;

    const documentationAnchor = Array.from(nav.children).find(
      element => element.tagName === 'A' &&
      element.textContent.trim().toLowerCase() === 'documentation'
    );
    if (!documentationAnchor) return;

    const documentationUrl = new URL(documentationAnchor.href, document.baseURI);
    const wrapper = document.createElement('div');
    wrapper.className = 'nav-products nav-documentation';
    const submenu = document.createElement('div');
    submenu.className = 'submenu';
    submenu.setAttribute('aria-label', 'Documentation guides');

    for (const [title, path] of [
      ['User Manual', 'user-manual/'],
      ['Quick Start Guide', 'quick-start/'],
      ['Telegram Alerts Guide', 'telegram-alerts/']
    ]) {
      const link = document.createElement('a');
      link.href = new URL(path, documentationUrl).href;
      link.textContent = title;
      submenu.appendChild(link);
    }

    documentationAnchor.replaceWith(wrapper);
    wrapper.append(documentationAnchor, submenu);
    documentationAnchor.setAttribute('aria-haspopup', 'true');

    if (!document.getElementById('documentation-dropdown-style')) {
      const stylesheet = document.createElement('link');
      stylesheet.id = 'documentation-dropdown-style';
      stylesheet.rel = 'stylesheet';
      stylesheet.href = new URL('../css/documentation-dropdown.css',
        ownScript && ownScript.src ? ownScript.src : new URL('assets/js/main.js', document.baseURI)).href;
      document.head.appendChild(stylesheet);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', installDocumentationDropdown, { once: true });
  } else {
    installDocumentationDropdown();
  }
})();
