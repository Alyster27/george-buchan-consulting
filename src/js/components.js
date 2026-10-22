export async function loadComponent(componentName, targetId) {
    try {
        const path = window.location.pathname;
        const prefix = path.includes('/george-buchan-consulting/') ? '/george-buchan-consulting' : '';
        
        const response = await fetch(`${prefix}/src/components/${componentName}.html`);
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