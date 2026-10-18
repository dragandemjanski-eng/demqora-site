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

/* DEMQORA_DOCUMENTATION_DROPDOWN_V2
   Documentation -> Product -> Guides.
   To add a future product, add one object to the products array below.
   Products navigation and page content are never modified.
*/
(() => {
  'use strict';
  const ownScript = document.currentScript;

  function installDocumentationProductMenu() {
    const nav = document.querySelector('.site-header .nav-links');
    if (!nav || nav.querySelector('.nav-documentation')) return;

    const documentationAnchor = Array.from(nav.children).find(
      element => element.tagName === 'A' &&
        element.textContent.trim().toLowerCase() === 'documentation'
    );
    if (!documentationAnchor) return;

    const documentationUrl = new URL(documentationAnchor.href, document.baseURI);
    const products = [
      {
        name: 'MS 1.1 — Market Structure Multi-Timeframe Chart',
        overview: '', // opens the Documentation overview page
        id: 'ms-1-1',
        guides: [
          ['User Manual', 'user-manual/'],
          ['Quick Start Guide', 'quick-start/'],
          ['Telegram Alerts Guide', 'telegram-alerts/'],
          ['Release Notes', 'release-notes/']
        ]
      }
    ];

    const wrapper = document.createElement('div');
    wrapper.className = 'nav-products nav-documentation';
    const submenu = document.createElement('div');
    submenu.className = 'submenu doc-product-list';
    submenu.setAttribute('aria-label', 'Products with documentation');

    products.forEach(product => {
      const row = document.createElement('div');
      row.className = 'doc-product';

      const productLink = document.createElement('a');
      productLink.className = 'doc-product-link';
      productLink.textContent = product.name;
      productLink.href = new URL(product.overview, documentationUrl).href;
      productLink.setAttribute('aria-haspopup', 'true');

      const arrow = document.createElement('span');
      arrow.className = 'doc-product-chevron';
      arrow.setAttribute('aria-hidden', 'true');
      arrow.textContent = '›';
      productLink.appendChild(arrow);

      const menuId = 'doc-guides-' + product.id;
      const toggle = document.createElement('button');
      toggle.type = 'button';
      toggle.className = 'doc-product-toggle';
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-controls', menuId);
      toggle.setAttribute('aria-label', 'Show guides for ' + product.name);
      toggle.textContent = '⌄';

      const guides = document.createElement('div');
      guides.className = 'doc-guide-menu';
      guides.id = menuId;
      guides.setAttribute('aria-label', product.name + ' guides');
      for (const [label, path] of product.guides) {
        const link = document.createElement('a');
        link.href = new URL(path, documentationUrl).href;
        link.textContent = label;
        guides.appendChild(link);
      }

      toggle.addEventListener('click', () => {
        const open = row.classList.toggle('doc-product-open');
        toggle.setAttribute('aria-expanded', String(open));
      });

      row.append(productLink, toggle, guides);
      submenu.appendChild(row);
    });

    documentationAnchor.replaceWith(wrapper);
    wrapper.append(documentationAnchor, submenu);
    documentationAnchor.setAttribute('aria-haspopup', 'true');

    if (!document.getElementById('documentation-dropdown-style')) {
      const stylesheet = document.createElement('link');
      stylesheet.id = 'documentation-dropdown-style';
      stylesheet.rel = 'stylesheet';
      stylesheet.href = new URL('../css/documentation-dropdown.css',
        ownScript && ownScript.src ? ownScript.src :
          new URL('assets/js/main.js', document.baseURI)).href;
      document.head.appendChild(stylesheet);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', installDocumentationProductMenu, { once: true });
  } else {
    installDocumentationProductMenu();
  }
})();

/* DEMQORA_MOBILE_COLLAPSED_NAV_V4
   Products and Documentation are collapsed when the mobile menu opens.
   Existing desktop hover behaviour and nested MS 1.1 guide links are preserved.
*/
(() => {
  'use strict';
  function initMobileNav() {
    const nav = document.querySelector('.site-header .nav-links');
    if (!nav) return;

    const sections = Array.from(nav.children).filter(element =>
      element.classList && element.classList.contains('nav-products'));

    function closeSection(section) {
      section.classList.remove('mobile-submenu-open');
      const toggle = section.querySelector(':scope > .nav-section-toggle');
      if (toggle) toggle.setAttribute('aria-expanded', 'false');
      section.querySelectorAll('.doc-product-open').forEach(row => {
        row.classList.remove('doc-product-open');
        const guideToggle = row.querySelector('.doc-product-toggle');
        if (guideToggle) guideToggle.setAttribute('aria-expanded', 'false');
      });
    }

    sections.forEach((section, index) => {
      const link = section.querySelector(':scope > a');
      const submenu = section.querySelector(':scope > .submenu');
      if (!link || !submenu || section.querySelector(':scope > .nav-section-toggle')) return;
      const toggle = document.createElement('button');
      toggle.type = 'button';
      toggle.className = 'nav-section-toggle';
      toggle.textContent = '⌄';
      const name = link.textContent.trim();
      if (!submenu.id) submenu.id = 'dq-mobile-submenu-' + index;
      toggle.setAttribute('aria-label', 'Toggle ' + name + ' submenu');
      toggle.setAttribute('aria-controls', submenu.id);
      toggle.setAttribute('aria-expanded', 'false');
      link.insertAdjacentElement('afterend', toggle);
      toggle.addEventListener('click', () => {
        const willOpen = !section.classList.contains('mobile-submenu-open');
        sections.forEach(closeSection);
        if (willOpen) {
          section.classList.add('mobile-submenu-open');
          toggle.setAttribute('aria-expanded', 'true');
        }
      });
    });

    sections.forEach(closeSection);
    const menuButton = document.querySelector('.site-header .menu-toggle');
    if (menuButton) {
      menuButton.addEventListener('click', () => sections.forEach(closeSection));
    }
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMobileNav, { once: true });
  } else {
    initMobileNav();
  }
})();

/* DEMQORA_TAWK_CHAT_BEGIN */
(function () {
  if (window.__demqoraTawkChatLoaded) return;
  window.__demqoraTawkChatLoaded = true;
  window.Tawk_API = window.Tawk_API || {};
  window.Tawk_LoadStart = new Date();

  var script = document.createElement('script');
  script.async = true;
  script.src = 'https://embed.tawk.to/6ad4d1b8b2e7a834cef0783d/1k57l6e5v';
  script.charset = 'UTF-8';
  script.setAttribute('crossorigin', '*');
  (document.head || document.documentElement).appendChild(script);
})();
/* DEMQORA_TAWK_CHAT_END */
