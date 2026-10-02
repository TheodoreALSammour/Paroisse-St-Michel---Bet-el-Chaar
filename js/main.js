// ---------- Language (English / Arabic) ----------
const root = document.documentElement;

function setLang(lang) {
  root.lang = lang;
  root.dir = lang === "ar" ? "rtl" : "ltr";
  try { localStorage.setItem("lang", lang); } catch (e) {}
}

let saved = null;
try { saved = localStorage.getItem("lang"); } catch (e) {}
setLang(saved === "ar" ? "ar" : "en");

document.getElementById("lang-toggle").addEventListener("click", () => {
  setLang(root.lang === "ar" ? "en" : "ar");
});

// ---------- Mobile menu ----------
const menuBtn = document.getElementById("menu-toggle");
const nav = document.getElementById("main-nav");

menuBtn.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded", open);
});
nav.querySelectorAll("a").forEach((a) =>
  a.addEventListener("click", () => {
    nav.classList.remove("open");
    menuBtn.setAttribute("aria-expanded", "false");
  })
);

// ---------- Header shadow on scroll ----------
const header = document.querySelector(".site-header");
const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 10);
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

// ---------- Active nav link ----------
const links = [...nav.querySelectorAll("a")];
const sections = links.map((a) => document.querySelector(a.getAttribute("href")));

const navObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        links.forEach((l) => l.classList.toggle("active", l.getAttribute("href") === "#" + entry.target.id));
      }
    });
  },
  { rootMargin: "-45% 0px -50% 0px" }
);
sections.forEach((s) => s && navObserver.observe(s));

// ---------- Reveal on scroll ----------
const revealEls = document.querySelectorAll(".section-head, .card, .about-card, .prayer, .about-grid > div:first-child, .saint-grid > div:first-child, .contact-grid > div");
revealEls.forEach((el) => el.classList.add("reveal"));

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);
revealEls.forEach((el) => revealObserver.observe(el));

// ---------- Group logos (show icon until a logo file exists) ----------
document.querySelectorAll(".group-logo").forEach((img) => {
  const show = () => img.closest(".group-card").classList.add("has-logo");
  if (img.complete && img.naturalWidth) show();
  else img.addEventListener("load", show);
});

// ---------- Footer year ----------
document.getElementById("year").textContent = new Date().getFullYear();
