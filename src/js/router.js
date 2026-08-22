export function initRouter() {
    const currentPath = window.location.pathname;

    document.querySelectorAll('[data-link]').forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPath || (currentPath === '/' && href === '/')) {
            link.classList.add('text-[#034c65]');
        }
    });
}