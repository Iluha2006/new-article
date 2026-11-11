(() => {
  "use strict";

  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  function initMenu() {
    const burger = $(".burger");
    const nav = $(".site-nav");
    if (!burger || !nav) return;

    const setOpen = (open) => {
      nav.classList.toggle("open", open);
      burger.setAttribute("aria-expanded", String(open));
    };

    burger.addEventListener("click", () => setOpen(!nav.classList.contains("open")));

    nav.addEventListener("click", (e) => {
      if (e.target.closest("a")) setOpen(false);
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && nav.classList.contains("open")) {
        setOpen(false);
        burger.focus();
      }
    });
  }

  function initNewsFilter() {
    const buttons = $$(".filter-btn");
    const cards = $$(".news-card");
    if (!buttons.length || !cards.length) return;

    buttons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const filter = btn.dataset.filter;

        buttons.forEach((b) => {
          const active = b === btn;
          b.classList.toggle("active", active);
          b.setAttribute("aria-pressed", String(active));
        });

        cards.forEach((card) => {
          const match = filter === "all" || card.dataset.category === filter;
          card.classList.toggle("hidden", !match);
        });
      });
    });
  }

  function initPhotoFallback() {
    const hide = (img) => {
      const box = img.closest(".photo") || img.parentElement;
      if (box) box.classList.add("is-missing");
      img.remove();
    };

    $$("img[data-ph]").forEach((img) => {
      img.addEventListener("error", () => hide(img), { once: true });
      if (img.complete && img.naturalWidth === 0) hide(img);
    });
  }

  function initYear() {
    const el = $("#year");
    if (el) el.textContent = String(new Date().getFullYear());
  }

  document.addEventListener("DOMContentLoaded", () => {
    [initMenu, initNewsFilter, initPhotoFallback, initYear].forEach((init) => {
      try { init(); } catch (err) { console.error("[main.js]", init.name, err); }
    });
  });
})();
