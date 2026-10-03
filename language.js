(function () {
  'use strict';

  var root = document.documentElement;
  var storageKey = 'personal-website-language';
  var language = 'en';

  try {
    if (window.localStorage.getItem(storageKey) === 'zh') {
      language = 'zh';
    }
  } catch (error) {
    // The page still works when browser storage is unavailable.
  }

  function applyLanguage() {
    var isChinese = language === 'zh';
    var pageTitle = document.querySelector('title');
    var toggle = document.getElementById('language-toggle');
    var localizedAttributes = document.querySelectorAll('[data-title-zh], [data-alt-zh]');
    var index;
    var element;
    var value;

    root.setAttribute('data-language', language);
    root.setAttribute('lang', isChinese ? 'zh-CN' : 'en');
    root.setAttributeNS('http://www.w3.org/XML/1998/namespace', 'xml:lang', isChinese ? 'zh-CN' : 'en');

    if (pageTitle) {
      document.title = pageTitle.getAttribute('data-' + language) || document.title;
    }

    if (toggle) {
      toggle.textContent = isChinese ? 'English' : '中文';
      toggle.setAttribute('aria-label', isChinese ? '切换到英文' : 'Switch to Chinese');
      toggle.setAttribute('title', isChinese ? '切换到英文' : 'Switch to Chinese');
    }

    for (index = 0; index < localizedAttributes.length; index += 1) {
      element = localizedAttributes[index];
      value = element.getAttribute('data-title-' + language);
      if (value !== null) {
        element.setAttribute('title', value);
      }
      value = element.getAttribute('data-alt-' + language);
      if (value !== null) {
        element.setAttribute('alt', value);
      }
    }
  }

  applyLanguage();
  root.classList.add('language-ready');

  document.addEventListener('DOMContentLoaded', function () {
    var toggle = document.getElementById('language-toggle');
    applyLanguage();
    if (toggle) {
      toggle.addEventListener('click', function () {
        language = language === 'zh' ? 'en' : 'zh';
        try {
          window.localStorage.setItem(storageKey, language);
        } catch (error) {
          // Continue switching on this page even if storage is unavailable.
        }
        applyLanguage();
      });
    }
  });
}());
