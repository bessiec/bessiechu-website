// Three-city clock: the cities I work across.
(function () {
    var bar = document.querySelector('.cities');
    if (!bar) return;

    var cities = bar.querySelectorAll('.city');

    function hourIn(zone) {
        return parseInt(new Intl.DateTimeFormat('en-US', {
            timeZone: zone, hour: 'numeric', hourCycle: 'h23'
        }).format(new Date()), 10);
    }

    function tick() {
        cities.forEach(function (city) {
            var zone = city.dataset.zone;
            city.querySelector('.city-time').textContent = new Intl.DateTimeFormat('en-US', {
                timeZone: zone, hour: '2-digit', minute: '2-digit', hourCycle: 'h23'
            }).format(new Date());
            var h = hourIn(zone);
            city.classList.toggle('is-night', h < 7 || h >= 21);
        });
    }

    tick();
    bar.hidden = false;
    setInterval(tick, 15000);
})();

// Theme toggle: follows the system until the visitor picks one.
(function () {
    var button = document.querySelector('.theme-toggle');
    if (!button) return;

    var root = document.documentElement;
    var sun = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>';
    var moon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>';

    function isDark() {
        var set = root.dataset.theme;
        if (set) return set === 'dark';
        return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }

    function render() {
        var dark = isDark();
        button.innerHTML = dark ? sun : moon;
        button.setAttribute('aria-label', dark ? 'Switch to light theme' : 'Switch to dark theme');
    }

    button.addEventListener('click', function () {
        var next = isDark() ? 'light' : 'dark';
        root.dataset.theme = next;
        try { localStorage.setItem('theme', next); } catch (e) {}
        render();
    });

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', render);
    render();
})();
