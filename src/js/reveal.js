export function initReveal() {
    const reveals = document.querySelectorAll('.reveal');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.getAttribute('data-delay') || 0;
                entry.target.style.transitionDelay = `${delay}ms`;
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.12
    });
    
    reveals.forEach(el => observer.observe(el));
}