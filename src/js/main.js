// src/js/main.js
import { loadAllComponents } from './components.js';
import { setLanguage, t, getCurrentLang } from './i18n.js';
import { initRouter } from './router.js';
import { initReveal } from './reveal.js';
import { initModal, openModal, closeModal } from './modal.js';

// Fonction pour le menu mobile
function toggleMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    const menuIcon = document.getElementById('menu-icon');
    const closeIcon = document.getElementById('close-icon');
    
    if (menu) menu.classList.toggle('hidden');
    if (menuIcon) menuIcon.classList.toggle('hidden');
    if (closeIcon) closeIcon.classList.toggle('hidden');
};

// Fonction pour les accordéons FAQ
function toggleAccordion(index) {
    const answer = document.getElementById(`faq-answer-${index}`);
    const chevron = document.getElementById(`faq-chevron-${index}`);
    if (answer) {
        if (answer.style.maxHeight === '0px' || answer.style.maxHeight === '') {
            answer.style.maxHeight = '2000px';
            if (chevron) chevron.classList.add('rotate-180');
        } else {
            answer.style.maxHeight = '0px';
            if (chevron) chevron.classList.remove('rotate-180');
        }
    }
};

// Fonction pour afficher/masquer les articles
function toggleArticle(index) {
    const body = document.getElementById(`article-body-${index}`);
    const btnText = document.getElementById(`article-btn-text-${index}`);
    
    if (body) {
        if (body.classList.contains('hidden')) {
            const articleBody = [t(`article-${index + 1}-body1`), t(`article-${index + 1}-body2`), t(`article-${index + 1}-body3`)];
            body.innerHTML = articleBody.map(p => `<p>${p}</p>`).join('');
            body.classList.remove('hidden');
            body.classList.add('animate-fade-in');
            if (btnText) btnText.textContent = '—';
        } else {
            body.classList.add('hidden');
            if (btnText) btnText.textContent = t('cta-readMore');
        }
    }
};

// Fonction pour générer la FAQ
function renderFAQ() {
    const container = document.getElementById('faq-container');
    if (!container) return;

    const faqs = [];
    
    for (let i = 1; i <= 5; i++) {
        faqs.push({
            q: t(`faq-q${i}`),
            a: t(`faq-a${i}`)
        });
    }

    container.innerHTML = faqs.map((f, i) => `
        <div class="bg-card rounded-2xl border border-border/60 overflow-hidden transition hover:border-primary/40">
            <button onclick="window.app.toggleAccordion(${i})" class="w-full flex items-center justify-between gap-4 p-6 text-left">
                <span class="font-display text-base lg:text-lg font-semibold">${f.q}</span>
                <svg id="faq-chevron-${i}" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-primary shrink-0 transition-transform"><polyline points="6 9 12 15 18 9"/></svg>
            </button>
            <div id="faq-answer-${i}" class="overflow-hidden transition-all duration-500" style="max-height: 0">
                <p class="px-6 pb-6 text-sm text-muted-foreground leading-relaxed whitespace-pre-line">${f.a.replace(/\n/g, '<br>')}</p>
            </div>
        </div>
    `).join('');
};

// Fonction pour générer les articles
function renderArticles() {
    const container = document.getElementById('articles-container');
    if (!container) return;

    const lang = getCurrentLang();
    const readMore = t('cta-readMore');
    
    const articles = [1, 2, 3].map(i => ({
        title: t(`article-${i}-title`),
        excerpt: t(`article-${i}-excerpt`),
        body: [t(`article-${i}-body1`), t(`article-${i}-body2`), t(`article-${i}-body3`)]
    }));

    container.innerHTML = articles.map((p, i) => `
        <div class="reveal" data-delay="${i * 80}">
            <article class="group bg-card rounded-2xl overflow-hidden border border-border/60 hover:shadow-glow hover:-translate-y-1 transition-all duration-500 h-full flex flex-col">
                <div class="aspect-[16/10] bg-secondary flex items-center justify-center">
                    <span class="text-muted-foreground text-sm">Illustration</span>
                </div>
                <div class="p-6 flex-1 flex flex-col">
                    <p class="text-xs text-muted-foreground">${new Date(['2025-04-12', '2025-03-02', '2025-01-20'][i]).toLocaleDateString(lang === 'fr' ? 'fr-FR' : 'en-GB')}</p>
                    <h3 class="mt-2 font-display text-lg font-semibold leading-snug group-hover:text-primary transition">${p.title}</h3>
                    <p class="mt-3 text-sm text-muted-foreground leading-relaxed flex-1">${p.excerpt}</p>
                    <div id="article-body-${i}" class="mt-4 space-y-3 text-sm text-foreground/85 leading-relaxed hidden"></div>
                    <button onclick="window.app.toggleArticle(${i})" class="mt-5 inline-flex items-center gap-1 self-start text-sm font-semibold text-primary hover:gap-2 transition-all">
                        <span id="article-btn-text-${i}">${readMore}</span>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                    </button>
                </div>
            </article>
        </div>
    `).join('');
};

// Fonction pour générer les downloads
function renderDownloads() {
    const container = document.getElementById('downloads-container');
    if (!container) return;

    const sizes = ['1.2 MB', '0.9 MB', '0.8 MB', '1.1 MB', '0.7 MB', '1.0 MB'];
    const downloadText = t('cta-download');

    container.innerHTML = [1, 2, 3, 4, 5, 6].map((i, index) => `
        <div class="reveal" data-delay="${index * 70}">
            <div class="group h-full p-6 rounded-2xl bg-card border border-border/60 hover:border-primary/40 hover:-translate-y-1 hover:shadow-glow transition-all duration-500 flex flex-col">
                <div class="flex items-start justify-between mb-5">
                    <div class="w-12 h-12 rounded-xl bg-gradient-hero text-primary-foreground flex items-center justify-center">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
                    </div>
                    <span class="text-[10px] uppercase tracking-wider px-2 py-1 rounded-full bg-secondary text-muted-foreground">PDF · ${sizes[index]}</span>
                </div>
                <h3 class="font-display text-lg font-semibold leading-snug">${t(`dl-${i}-title`)}</h3>
                <p class="mt-2 text-sm text-muted-foreground leading-relaxed flex-1">${t(`dl-${i}-desc`)}</p>
                <button class="mt-5 inline-flex items-center gap-2 self-start text-sm font-semibold text-primary hover:gap-3 transition-all">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                    ${downloadText}
                </button>
            </div>
        </div>
    `).join('');
};

// Gestion du formulaire de contact
function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const fields = document.getElementById('form-fields');
        const sent = document.getElementById('form-sent');
        const btn = form.querySelector('button[type="submit"]');
        const btnText = document.getElementById('send-btn-text');
        
        // Simuler l'envoi
        btn.disabled = true;
        btnText.textContent = '…';
        
        setTimeout(() => {
            fields.classList.add('hidden');
            sent.classList.remove('hidden');
            btn.disabled = false;
            btnText.textContent = t('cta-send');
        }, 900);
    });
};

// Exposer les fonctions globalement
window.app = {
    setLanguage,
    openModal,
    closeModal,
    toggleMobileMenu,
    toggleAccordion,
    toggleArticle,
    t
};

async function init() {
    await loadAllComponents();
    
    // Attacher les événements aux boutons de langue
    const btnFr = document.getElementById('btn-fr');
    const btnEn = document.getElementById('btn-en');
    
    if (btnFr) {
        btnFr.addEventListener('click', () => {
            setLanguage('fr');
            renderFAQ();
            renderArticles();
            renderDownloads();
            initContactForm();
            initReveal();
        });
    }
    
    if (btnEn) {
        btnEn.addEventListener('click', () => {
            setLanguage('en');
            renderFAQ();
            renderArticles();
            renderDownloads();
            initContactForm();
            initReveal();
        });
    }
    
    initRouter();
    initModal();
    setLanguage(localStorage.getItem('gbc-lang') || 'fr');
    renderFAQ();
    renderArticles();
    renderDownloads();
    initContactForm();
    initReveal();

    // Header scroll effect
    window.addEventListener('scroll', () => {
        const header = document.getElementById('site-header');
        if (!header) return;
        if (window.scrollY > 24) {
            header.classList.add('bg-white/95', 'backdrop-blur-md', 'shadow-soft', 'border-b', 'border-gray-200');
            header.classList.remove('bg-transparent');
        } else {
            header.classList.add('bg-transparent');
            header.classList.remove('bg-white/95', 'backdrop-blur-md', 'shadow-soft', 'border-b', 'border-gray-200');
        }
    });
    
    // Écouter le changement de langue pour re-rendre
    window.addEventListener('languageChanged', () => {
        renderFAQ();
        renderArticles();
        renderDownloads();
        initContactForm();
        initReveal();
    });
}

document.addEventListener('DOMContentLoaded', init);