/*
  SCParks header behaviors (vanilla JS, no dependencies).

  southcarolinaparks.com renders its header with a React bundle (https://southcarolinaparks.com/scripts/common,
  not copied here). That bundle re-renders the header markup, which would wipe
  out the BootstrapMenu account/admin control merged into it, and its mega-menu "+" expanders call
  /api/menu/ on the current host, which doesn't exist here. This file reproduces just the parts the
  static header needs: hamburger toggle, search, social-icon share toggle, and the sticky header offset.
*/
(function () {
    var searchUrl = 'https://southcarolinaparks.com/search?query=';

    function ready(fn) {
        if (document.readyState !== 'loading') { fn(); } else { document.addEventListener('DOMContentLoaded', fn); }
    }

    function goSearch(term) {
        term = (term || '').trim();
        window.location.href = term ? searchUrl + encodeURIComponent(term) : 'https://southcarolinaparks.com/search';
    }

    ready(function () {
        var header = document.querySelector('.sticky-header header');
        if (!header) return;

        // Hamburger (narrow widths)
        var collapse = document.getElementById('header-collapse');
        var toggle = header.querySelector('.navbar-toggle');
        if (toggle && collapse) {
            toggle.addEventListener('click', function (e) {
                e.preventDefault();
                var open = collapse.style.display === 'block';
                collapse.style.display = open ? 'none' : 'block';
                toggle.setAttribute('aria-expanded', open ? 'false' : 'true');
            });
        }

        // Search field: desktop button slides the field open, Enter (or a second click) searches.
        var searchInput = header.querySelector('input.menu-expanded');
        var searchOpen = false;
        var desktopBtn = header.querySelector('.search-button-desktop');
        if (desktopBtn && searchInput) {
            desktopBtn.addEventListener('click', function (e) {
                e.preventDefault();
                if (searchOpen && searchInput.value.trim() !== '') { goSearch(searchInput.value); return; }
                searchOpen = !searchOpen;
                searchInput.style.animationName = searchOpen ? 'searchAnimationOpen' : 'searchAnimationClosed';
                searchInput.style.animationPlayState = 'running';
                if (searchOpen) searchInput.focus();
            });
        }
        if (searchInput) {
            searchInput.setAttribute('aria-label', 'Search for South Carolina Parks');
            searchInput.addEventListener('keydown', function (e) {
                if (e.key === 'Enter' || e.keyCode === 13) {
                    e.preventDefault(); // Don't let Enter reach any ASP.NET form.
                    goSearch(searchInput.value);
                }
            });
        }
        var mobileBtn = header.querySelector('.search-button-mobile');
        if (mobileBtn) {
            mobileBtn.addEventListener('click', function (e) {
                e.preventDefault();
                goSearch(searchInput ? searchInput.value : '');
            });
        }

        // Share icon: slides the social icons in over the utility menu (992-1049px widths).
        var share = header.querySelector('.shareiconmini');
        if (share) {
            var socialOpen = false;
            share.addEventListener('click', function (e) {
                e.preventDefault();
                var icons = header.querySelector('.icons');
                var menu = header.querySelector('.utility-menu');
                socialOpen = !socialOpen;
                if (icons) icons.style.width = socialOpen ? '175px' : '0';
                if (menu) menu.style.marginLeft = socialOpen ? '-175px' : '0';
            });
        }

        // Parks dropdown: under 992px the list inside the menu item opens (CSS keys off
        // .park-finder-menu-item-active); at 992px+ scparks.css hides that list and the
        // #park-finder-cta-component panel at the end of the header is shown instead.
        var parksItem = header.querySelector('.parks-menu-item');
        var parksToggle = parksItem && parksItem.querySelector('.sc-parks-toggle');
        var parksPanel = document.getElementById('park-finder-cta-component');
        if (parksItem && parksToggle) {
            var parksExpand = parksToggle.querySelector('.menu-expand');
            var setParksOpen = function (open) {
                parksItem.classList.toggle('park-finder-menu-item-active', open);
                if (parksPanel) parksPanel.style.display = open ? 'block' : 'none';
                if (parksExpand) parksExpand.textContent = open ? '-' : '+';
                parksToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
            };
            var parksIsOpen = function () { return parksItem.classList.contains('park-finder-menu-item-active'); };
            parksToggle.addEventListener('click', function (e) {
                if (e.target.closest('.park-link-dropdown')) return; // let park links navigate
                e.preventDefault();
                setParksOpen(!parksIsOpen());
            });
            parksToggle.addEventListener('keydown', function (e) {
                if (e.target === parksToggle && (e.key === 'Enter' || e.key === ' ')) {
                    e.preventDefault();
                    setParksOpen(!parksIsOpen());
                }
            });
            document.addEventListener('click', function (e) {
                if (parksIsOpen() && !parksItem.contains(e.target) && !(parksPanel && parksPanel.contains(e.target))) {
                    setParksOpen(false);
                }
            });
            document.addEventListener('keydown', function (e) {
                if (e.key === 'Escape' && parksIsOpen()) setParksOpen(false);
            });
        }

        // Sticky header: slide the top utility bar up (max 130px) as the page scrolls, as on the source site.
        var sticky = document.querySelector('.sticky-header');
        function positionSticky() {
            if (!sticky) return;
            if (window.innerWidth < 768) { sticky.style.top = '0'; return; }
            sticky.style.top = -Math.min(window.pageYOffset, 130) + 'px';
        }
        window.addEventListener('scroll', positionSticky, { passive: true });
        window.addEventListener('resize', positionSticky);
        positionSticky();
    });
})();
