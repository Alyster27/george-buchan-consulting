// src/js/components.js
export async function loadComponent(componentName, targetId) {
    try {
        const response = await fetch(`/george-buchan-consulting/src/components/${componentName}.html`);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const html = await response.text();
        const target = document.getElementById(targetId);
        if (target) {
            target.innerHTML = html;
        }
    } catch (error) {
        console.error(`Erreur chargement ${componentName}:`, error);
    }
}

export async function loadAllComponents() {
    await Promise.all([
        loadComponent('header', 'header-container'),
        loadComponent('footer', 'footer-container')
    ]);
}