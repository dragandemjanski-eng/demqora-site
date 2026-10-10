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
          ['Telegram Alerts Guide', 'telegram-alerts/']
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
