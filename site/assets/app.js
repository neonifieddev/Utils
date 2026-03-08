function slugify(text) {
  return String(text)
    .toLowerCase()
    .trim()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function buildTOC() {
  const tocRoot = document.querySelector("[data-toc]");
  const content = document.querySelector("[data-content]");
  if (!tocRoot || !content) return;

  const headings = Array.from(content.querySelectorAll("h2, h3"));
  const items = [];

  for (const h of headings) {
    if (!h.id) h.id = slugify(h.textContent || "");
    items.push({
      id: h.id,
      text: h.textContent || "",
      level: h.tagName === "H3" ? 3 : 2,
    });
  }

  const frag = document.createDocumentFragment();
  for (const item of items) {
    const a = document.createElement("a");
    a.href = `#${item.id}`;
    a.textContent = item.text;
    a.className = item.level === 3 ? "level-3" : "level-2";
    frag.appendChild(a);
  }
  tocRoot.innerHTML = "";
  tocRoot.appendChild(frag);

  // Active heading highlighting
  const links = Array.from(tocRoot.querySelectorAll("a"));
  const byId = new Map(links.map((a) => [a.getAttribute("href")?.slice(1), a]));

  const obs = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((e) => e.isIntersecting)
        .sort((a, b) => (a.boundingClientRect.top || 0) - (b.boundingClientRect.top || 0));
      const top = visible[0]?.target?.id;
      if (!top) return;
      for (const a of links) a.classList.remove("active");
      const active = byId.get(top);
      if (active) active.classList.add("active");
    },
    { rootMargin: "-20% 0px -70% 0px", threshold: [0, 1] }
  );

  for (const h of headings) obs.observe(h);
}

function wireCopyButtons() {
  const blocks = document.querySelectorAll("pre");
  for (const pre of blocks) {
    if (pre.querySelector(".copybtn")) continue;
    const btn = document.createElement("button");
    btn.className = "copybtn";
    btn.type = "button";
    btn.textContent = "Copy";
    btn.addEventListener("click", async () => {
      const code = pre.querySelector("code")?.innerText ?? pre.innerText;
      try {
        await navigator.clipboard.writeText(code);
        btn.textContent = "Copied";
        setTimeout(() => (btn.textContent = "Copy"), 900);
      } catch {
        btn.textContent = "Failed";
        setTimeout(() => (btn.textContent = "Copy"), 900);
      }
    });
    pre.appendChild(btn);
  }
}

function setActiveSidebar() {
  const here = (location.pathname || "/").replace(/\/+$/, "") || "/";
  const links = document.querySelectorAll("[data-sidebar] a");
  for (const a of links) {
    const path = (a.pathname || "").replace(/\/+$/, "") || "/";
    if (path === here) a.classList.add("active");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  // Prism doesn't know "luau" by default; treat it as "lua" for highlighting.
  for (const code of document.querySelectorAll("code.language-luau")) {
    code.classList.remove("language-luau");
    code.classList.add("language-lua");
  }

  buildTOC();
  wireCopyButtons();
  setActiveSidebar();
  // Prism (if loaded)
  if (window.Prism && typeof window.Prism.highlightAll === "function") {
    window.Prism.highlightAll();
  }
});

