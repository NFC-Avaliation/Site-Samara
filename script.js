const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const revealItems = document.querySelectorAll(".reveal, .wipe-in");

if (reducedMotion || !("IntersectionObserver" in window)) {
  revealItems.forEach((item) => item.classList.add("is-visible"));
} else {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const delay = Number(entry.target.dataset.delay || 0);
      entry.target.style.setProperty("--delay", `${delay}ms`);
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.15, rootMargin: "0px 0px -45px 0px" });

  revealItems.forEach((item) => revealObserver.observe(item));
}

const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector(".site-nav");

menuToggle?.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isOpen));
  siteNav?.classList.toggle("open", !isOpen);
});

siteNav?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    menuToggle?.setAttribute("aria-expanded", "false");
    siteNav.classList.remove("open");
  });
});

document.addEventListener("click", (event) => {
  if (!siteNav?.classList.contains("open")) return;
  if (siteNav.contains(event.target) || menuToggle?.contains(event.target)) return;
  siteNav.classList.remove("open");
  menuToggle?.setAttribute("aria-expanded", "false");
});

const toast = document.querySelector(".toast");
let toastTimer;
document.querySelectorAll(".contact-placeholder").forEach((button) => {
  button.addEventListener("click", () => {
    const channel = button.dataset.channel;
    toast.textContent = `O link oficial do ${channel} será adicionado quando você enviar o endereço.`;
    toast.classList.add("visible");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("visible"), 3400);
  });
});
