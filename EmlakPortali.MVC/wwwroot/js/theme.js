/**
 * TEMA YÖNETIMI - LIGHT/DARK MODE
 * Emlak Portalı
 */

class ThemeManager {
    constructor() {
        this.htmlElement = document.getElementById('htmlElement');
        this.appBody = document.getElementById('appBody');
        this.themeToggle = document.getElementById('themeToggle');
        this.currentTheme = localStorage.getItem('theme') || 'light';

        this.init();
    }

    init() {
        // İlk tema ayarını yükle
        this.setTheme(this.currentTheme);

        // Toggle butonuna event ekle
        if (this.themeToggle) {
            this.themeToggle.addEventListener('click', () => this.toggleTheme());
        }

        // Sistema göre tema ayarını başlangıçta kontrol et
        if (!localStorage.getItem('theme')) {
            this.detectSystemTheme();
        }
    }

    /**
     * Temayı ayarla
     */
    setTheme(theme) {
        this.currentTheme = theme;

        // HTML elemanlarına tema ayarını yap
        if (this.htmlElement) {
            this.htmlElement.setAttribute('data-theme', theme);
        }

        // Body sınıfını güncelle
        if (this.appBody) {
            this.appBody.classList.remove('theme-light', 'theme-dark');
            this.appBody.classList.add(`theme-${theme}`);
        }

        // Toggle butonunu güncelle
        this.updateToggleButton();

        // localStorage'a kaydet
        localStorage.setItem('theme', theme);
    }

    /**
     * Tema değiştir
     */
    toggleTheme() {
        const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.setTheme(newTheme);

        // Animasyon efekti
        this.addToggleAnimation();
    }

    /**
     * Toggle butonunu güncelle
     */
    updateToggleButton() {
        if (!this.themeToggle) return;

        const icon = this.themeToggle.querySelector('i');
        if (icon) {
            if (this.currentTheme === 'light') {
                icon.classList.remove('bi-sun-fill');
                icon.classList.add('bi-moon-fill');
                this.themeToggle.title = 'Koyu Tema';
            } else {
                icon.classList.remove('bi-moon-fill');
                icon.classList.add('bi-sun-fill');
                this.themeToggle.title = 'Açık Tema';
            }
        }
    }

    /**
     * Sistema göre temayı ayarla
     */
    detectSystemTheme() {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            this.setTheme('dark');
        } else {
            this.setTheme('light');
        }

        // Sistem tercihi değişirse dinle
        if (window.matchMedia) {
            window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
                if (!localStorage.getItem('theme-override')) {
                    this.setTheme(e.matches ? 'dark' : 'light');
                }
            });
        }
    }

    /**
     * Toggle animasyonu
     */
    addToggleAnimation() {
        if (!this.themeToggle) return;

        this.themeToggle.style.transform = 'rotate(180deg)';
        setTimeout(() => {
            this.themeToggle.style.transform = 'rotate(0deg)';
        }, 300);
    }

    /**
     * Tema değerini al
     */
    getTheme() {
        return this.currentTheme;
    }

    /**
     * Tema override'ı ayarla (sistem tercihini yoksay)
     */
    setThemeOverride(override) {
        if (override) {
            localStorage.setItem('theme-override', 'true');
        } else {
            localStorage.removeItem('theme-override');
        }
    }
}

// Sayfanın yüklendiğinde başlat
document.addEventListener('DOMContentLoaded', () => {
    window.themeManager = new ThemeManager();
});

// Erken yükleme için (flash önle)
(function() {
    const theme = localStorage.getItem('theme') || 'light';
    if (document.documentElement) {
        document.documentElement.setAttribute('data-theme', theme);
    }
    if (document.body) {
        document.body.classList.add(`theme-${theme}`);
    }
})();
