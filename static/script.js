/* Braisedfish · 全站脚本 */
(function () {
    'use strict';

    var root = document.documentElement;
    var THEME_KEY = 'theme';
    var media = window.matchMedia('(prefers-color-scheme: dark)');
    var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* ---------------- 主题 ---------------- */

    var themeToggle = document.getElementById('themeToggle');
    var metaThemeColor = document.querySelector('meta[name="theme-color"]');
    var snake = document.getElementById('tanChiShe');

    var THEME_COLOR = { dark: '#080a10', light: '#f2f5fb' };

    function applyTheme(theme) {
        root.dataset.theme = theme;

        if (metaThemeColor) {
            metaThemeColor.setAttribute('content', THEME_COLOR[theme]);
        }
        if (snake) {
            snake.src = theme === 'dark' ? '/static/svg/snake-Dark.svg' : '/static/svg/snake-Light.svg';
        }
        if (themeToggle) {
            themeToggle.setAttribute('aria-pressed', theme === 'dark');
            themeToggle.setAttribute('aria-label', theme === 'dark' ? '切换到亮色主题' : '切换到暗色主题');
        }
    }

    function currentTheme() {
        return root.dataset.theme === 'light' ? 'light' : 'dark';
    }

    try {
        applyTheme(currentTheme());
    } catch (e) { }

    if (themeToggle) {
        themeToggle.addEventListener('click', function () {
            var next = currentTheme() === 'dark' ? 'light' : 'dark';
            applyTheme(next);
            try {
                localStorage.setItem(THEME_KEY, next);
            } catch (e) { }
        });
    }

    /* ---------------- 顶栏：滚动态 / 进度 / 菜单 ---------------- */

    var topbar = document.getElementById('topbar');
    var progress = document.getElementById('progress');
    var nav = document.getElementById('nav');
    var navToggle = document.getElementById('navToggle');

    function onScroll() {
        var y = window.pageYOffset || document.documentElement.scrollTop || 0;

        if (topbar) {
            topbar.classList.toggle('is-stuck', y > 8);
        }

        if (progress) {
            var doc = document.documentElement;
            var max = doc.scrollHeight - window.innerHeight;
            progress.style.width = (max > 0 ? Math.min(100, (y / max) * 100) : 0) + '%';
        }
    }

    var scrollQueued = false;
    window.addEventListener('scroll', function () {
        if (scrollQueued) return;
        scrollQueued = true;
        window.requestAnimationFrame(function () {
            scrollQueued = false;
            onScroll();
        });
    }, { passive: true });

    onScroll();

    function closeNav() {
        if (!nav || !navToggle) return;
        nav.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
    }

    if (navToggle && nav) {
        navToggle.addEventListener('click', function () {
            var open = nav.classList.toggle('is-open');
            navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
        });

        nav.addEventListener('click', function (event) {
            if (event.target.closest('a')) closeNav();
        });

        document.addEventListener('keydown', function (event) {
            if (event.key === 'Escape') closeNav();
        });

        window.addEventListener('resize', function () {
            if (window.innerWidth > 880) closeNav();
        });
    }

    /* ---------------- 当前页高亮 ---------------- */

    (function markCurrent() {
        var path = window.location.pathname.replace(/index\.html$/, '');
        if (path.length > 1) path = path.replace(/\/$/, '');

        document.querySelectorAll('.navLink').forEach(function (link) {
            var url = new URL(link.href, window.location.origin);
            var target = url.pathname.replace(/index\.html$/, '');
            if (target.length > 1) target = target.replace(/\/$/, '');
            if (target === path || (path === '' && target === '/')) {
                link.setAttribute('aria-current', 'page');
            }
        });
    })();

    /* ---------------- 二维码弹窗 ---------------- */

    var lightbox = document.getElementById('lightbox');
    var lightboxImg = lightbox ? lightbox.querySelector('.lightbox-img') : null;
    var lightboxClose = document.getElementById('lightboxClose');
    var lastFocused = null;

    function openLightbox(src, alt) {
        if (!lightbox || !lightboxImg) return;

        lastFocused = document.activeElement;
        lightboxImg.src = src;
        lightboxImg.alt = alt || '';
        lightbox.hidden = false;
        document.body.style.overflow = 'hidden';

        requestAnimationFrame(function () {
            lightbox.classList.add('is-open');
        });

        if (lightboxClose) lightboxClose.focus();
    }

    function closeLightbox() {
        if (!lightbox || !lightbox.classList.contains('is-open')) return;

        lightbox.classList.remove('is-open');
        document.body.style.overflow = '';

        if (lastFocused && typeof lastFocused.focus === 'function') {
            lastFocused.focus();
        }

        window.setTimeout(function () {
            if (!lightbox.classList.contains('is-open')) {
                lightbox.hidden = true;
                if (lightboxImg) lightboxImg.src = '';
            }
        }, 260);
    }

    document.querySelectorAll('[data-lightbox]').forEach(function (trigger) {
        trigger.addEventListener('click', function (event) {
            event.preventDefault();
            openLightbox(trigger.getAttribute('data-lightbox'), trigger.getAttribute('data-lightbox-alt'));
        });
    });

    if (lightboxClose) {
        lightboxClose.addEventListener('click', closeLightbox);
    }

    if (lightbox) {
        lightbox.addEventListener('click', function (event) {
            if (event.target === lightbox) closeLightbox();
        });
    }

    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape') closeLightbox();
    });

    /* ---------------- 入场动画 ---------------- */

    var revealTargets = document.querySelectorAll('.projectItem, [data-reveal]');

    if ('IntersectionObserver' in window && !reduceMotion) {
        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

        revealTargets.forEach(function (el) {
            observer.observe(el);
        });
    } else {
        revealTargets.forEach(function (el) {
            el.classList.add('is-visible');
        });
    }

    /* ---------------- 卡片光晕跟随 ---------------- */

    if (window.matchMedia('(hover: hover)').matches && !reduceMotion) {
        document.querySelectorAll('.card').forEach(function (card) {
            card.addEventListener('pointermove', function (event) {
                var rect = card.getBoundingClientRect();
                card.style.setProperty('--mx', (event.clientX - rect.left) + 'px');
                card.style.setProperty('--my', (event.clientY - rect.top) + 'px');
            });
        });
    }

    /* ---------------- 代码块复制 ---------------- */

    document.querySelectorAll('.copyBtn').forEach(function (btn) {
        btn.addEventListener('click', function () {
            var block = btn.closest('.codeBlock');
            var code = block ? block.querySelector('code') : null;
            if (!code) return;

            var text = code.innerText.replace(/\u00a0/g, ' ');
            var done = function () {
                var label = btn.dataset.label || btn.textContent;
                btn.dataset.label = label;
                btn.textContent = '已复制';
                btn.disabled = true;
                window.setTimeout(function () {
                    btn.textContent = label;
                    btn.disabled = false;
                }, 1600);
            };

            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(text).then(done, function () { });
            } else {
                var area = document.createElement('textarea');
                area.value = text;
                area.style.position = 'fixed';
                area.style.opacity = '0';
                document.body.appendChild(area);
                area.select();
                try { document.execCommand('copy'); done(); } catch (e) { }
                document.body.removeChild(area);
            }
        });
    });

    /* ---------------- 页脚年份 ---------------- */

    var year = document.getElementById('year');
    if (year) {
        year.textContent = String(new Date().getFullYear());
    }
})();
