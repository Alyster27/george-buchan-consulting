// src/js/i18n.js
import { translations } from './translations.js';

let currentLang = localStorage.getItem('gbc-lang') || 'fr';

export function getCurrentLang() {
    return currentLang;
}

export function t(key) {
    return translations[currentLang]?.[key] || translations['en']?.[key] || key;
}

export function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('gbc-lang', lang);
    updateUILanguage();
    window.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang } }));
}

function updateUILanguage() {
    const btnFr = document.getElementById('btn-fr');
    const btnEn = document.getElementById('btn-en');

    if (btnFr && btnEn) {
        if (currentLang === 'fr') {
            btnFr.classList.add('bg-[#034c65]', 'text-white');
            btnFr.classList.remove('hover:bg-gray-100');
            btnEn.classList.remove('bg-[#034c65]', 'text-white');
            btnEn.classList.add('hover:bg-gray-100');
        } else {
            btnEn.classList.add('bg-[#034c65]', 'text-white');
            btnEn.classList.remove('hover:bg-gray-100');
            btnFr.classList.remove('bg-[#034c65]', 'text-white');
            btnFr.classList.add('hover:bg-gray-100');
        }
    }

    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        const text = t(key);
        if (text && text !== key) {
            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                el.placeholder = text;
            } else {
                el.textContent = text;
            }
        }
    });

    document.querySelectorAll('[data-i18n-img]').forEach(img => {
        const frSrc = img.getAttribute('data-img-fr');
        const enSrc = img.getAttribute('data-img-en');
        img.src = currentLang === 'fr' ? frSrc : enSrc;
    });
}

// Exposer directement dans le window
window.setLanguage = setLanguage;
window.t = t;
window.getCurrentLang = getCurrentLang;