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
}

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
}

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
}

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
}

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
}

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
            initReveal();
        });
    }
    
    if (btnEn) {
        btnEn.addEventListener('click', () => {
            setLanguage('en');
            renderFAQ();
            renderArticles();
            initReveal();
        });
    }
    
    initRouter();
    initModal();
    setLanguage(localStorage.getItem('gbc-lang') || 'fr');
    renderFAQ();
    renderArticles();
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
        initReveal();
    });
}

document.addEventListener('DOMContentLoaded', init);