import { t, getCurrentLang } from './i18n.js';

export function initModal() {
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModal();
    });

    window.addEventListener('languageChanged', updateModalData);
    updateModalData();
}

function updateModalData() {
    const lang = getCurrentLang();
    window._modalData = {
        teacher: {
            title: t('c1-title'),
            img: 'src/assets/images/psych-teacher.jpg',
            body: [t('c1-body1'), t('c1-body2'), t('c1-body3'), t('c1-body4')],
            expat: false
        },
        org: {
            title: t('c2-title'),
            img: 'src/assets/images/organisations.png',
            body: [t('c2-body1'), t('c2-body2'), t('c2-body3'), t('c2-body4')],
            expat: false
        },
        individual: {
            title: t('c3-title'),
            img: lang === 'fr' ? 'src/assets/images/individuals_FR.png' : 'src/assets/images/individuals_EN.png',
            body: [t('c3-body1'), t('c3-body2'), t('c3-body3'), t('c3-body4')],
            expat: true
        }
    };
}

export function openModal(cardKey) {
    const data = window._modalData?.[cardKey];
    if (!data) return;

    document.getElementById('modal-img').src = data.img;
    document.getElementById('modal-title').textContent = data.title;
    document.getElementById('modal-body').innerHTML = data.body.map(p => `<p>${p}</p>`).join('');
    document.getElementById('modal-expat').classList.toggle('hidden', !data.expat);

    const overlay = document.getElementById('modal-overlay');
    const content = document.getElementById('modal-content');
    overlay.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    content.classList.remove('animate-fade-in');
    void content.offsetWidth;
    content.classList.add('animate-fade-in');
}

export function closeModal() {
    document.getElementById('modal-overlay').classList.add('hidden');
    document.body.style.overflow = '';
}