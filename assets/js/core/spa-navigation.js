/*
 * File Path: assets/js/core/spa-navigation.js
 * File Version: SPRAD v2.8-production | performance-nav.1
 * Update Info: 2026-06-20 - Tambah soft navigation dan prefetch supaya menu internal tidak reload penuh.
 */
const ROUTES = new Set([
  "dashboard",
  "form",
  "ai-intake",
  "findings",
  "corrective-actions",
  "reports",
  "users",
  "settings",
  "audit-cycles",
  "audits",
  "audit-logs",
  "institutions",
  "org-units",
  "system-health",
  "view"
]);

const ROUTE_MODULES = {
  dashboard: "./assets/js/pages/dashboard-page.js",
  form: "./assets/js/pages/form-page.js",
  "ai-intake": "./assets/js/pages/ai-intake-page.js",
  findings: "./assets/js/pages/audit-workspace-page.js",
  "corrective-actions": "./assets/js/pages/audit-workspace-page.js",
  reports: "./assets/js/pages/reports-page.js",
  users: "./assets/js/pages/data-master-page.js",
  settings: "./assets/js/pages/data-master-page.js",
  "audit-cycles": "./assets/js/pages/audit-workspace-page.js",
  audits: "./assets/js/pages/audit-workspace-page.js",
  "audit-logs": "./assets/js/pages/audit-workspace-page.js",
  institutions: "./assets/js/pages/data-master-page.js",
  "org-units": "./assets/js/pages/data-master-page.js",
  "system-health": "./assets/js/pages/system-health-page.js"
};

let started = false;
let navigationId = 0;

export function initSpaNavigation() {
  if (started) return;
  started = true;
  document.documentElement.dataset.spradBootId ||= createBootId();
  document.documentElement.dataset.spradNavigation = "soft";
  registerServiceWorker();
  document.addEventListener("click", handleDocumentClick);
  window.addEventListener("popstate", () => {
    const route = getCurrentRoute();
    if (ROUTES.has(route)) navigateToRoute(route, { replace: true });
  });
  warmImportantRoutes();
}

function createBootId() {
  if (globalThis.crypto?.randomUUID) return globalThis.crypto.randomUUID();
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function handleDocumentClick(event) {
  const anchor = event.target.closest?.("a[href]");
  if (!anchor || shouldLetBrowserHandle(event, anchor)) return;

  const route = routeFromUrl(anchor.href);
  if (!ROUTES.has(route)) return;

  event.preventDefault();
  navigateToRoute(route, { href: anchor.href });
}

function shouldLetBrowserHandle(event, anchor) {
  if (event.defaultPrevented || event.button !== 0) return true;
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return true;
  if (anchor.target && anchor.target !== "_self") return true;
  if (anchor.hasAttribute("download")) return true;
  const url = new URL(anchor.href, window.location.href);
  if (url.origin !== window.location.origin) return true;
  if (url.hash && stripHash(url.href) === stripHash(window.location.href)) return true;
  return false;
}

async function navigateToRoute(route, options = {}) {
  const id = ++navigationId;
  const targetPath = cleanPathForRoute(route);
  if (!options.replace && `${window.location.pathname}${window.location.search}${window.location.hash}` !== targetPath) {
    history.pushState({ route }, "", targetPath);
  }

  setRouteLoading(true);
  try {
    const html = await fetchRouteHtml(route);
    if (id !== navigationId) return;
    replaceDocumentBody(html, route);
    await executePageScripts(route, id);
    prefetchRouteNeighbours(route);
  } catch (error) {
    window.location.href = options.href || `${route}.html`;
  } finally {
    if (id === navigationId) setRouteLoading(false);
  }
}

async function fetchRouteHtml(route) {
  const response = await fetch(`${route}.html`, {
    cache: "force-cache",
    credentials: "same-origin",
    headers: { "X-SPRAD-Navigation": "soft" }
  });
  if (!response.ok) throw new Error(`Halaman ${route} tidak dapat dimuatkan.`);
  return response.text();
}

function replaceDocumentBody(html, route) {
  const doc = new DOMParser().parseFromString(html, "text/html");
  document.title = doc.title || document.title;
  document.body.className = doc.body.className;
  document.body.dataset.page = doc.body.dataset.page || route;
  document.body.innerHTML = doc.body.innerHTML;
  window.scrollTo({ top: 0, left: 0, behavior: "auto" });
}

async function executePageScripts(route, id) {
  const scripts = [...document.body.querySelectorAll("script")];
  const pending = scripts.map(script => runScript(script, route, id));
  await Promise.allSettled(pending);
}

function runScript(script, route, id) {
  return new Promise((resolve, reject) => {
    const next = document.createElement("script");
    copyScriptAttributes(script, next);

    if (script.src) {
      next.src = withSpaQuery(script.getAttribute("src"), route);
      next.onload = () => id === navigationId ? resolve() : reject(new Error("Navigasi dibatalkan."));
      next.onerror = reject;
    } else {
      next.textContent = script.textContent;
      resolve();
    }

    script.replaceWith(next);
  });
}

function copyScriptAttributes(from, to) {
  [...from.attributes].forEach(attribute => {
    if (attribute.name !== "src") to.setAttribute(attribute.name, attribute.value);
  });
}

function withSpaQuery(src, route) {
  const url = new URL(src, window.location.href);
  url.searchParams.set("spa_route", route);
  url.searchParams.set("spa_nav", String(navigationId));
  return url.href;
}

function cleanPathForRoute(route) {
  const base = window.location.pathname
    .replace(/\/[^/]*\.html$/, "/")
    .replace(/\/[^/]*$/, "/");
  return `${base}${route}`;
}

function routeFromUrl(href) {
  const url = new URL(href, window.location.href);
  const segment = url.pathname.replace(/\/$/, "").split("/").pop() || "dashboard";
  return segment.replace(/\.html$/, "");
}

function getCurrentRoute() {
  return routeFromUrl(window.location.href);
}

function stripHash(value) {
  return value.split("#")[0];
}

function setRouteLoading(isLoading) {
  document.documentElement.classList.toggle("sprad-route-loading", isLoading);
  document.body?.setAttribute("aria-busy", isLoading ? "true" : "false");
}

function warmImportantRoutes() {
  const run = () => ["dashboard", "form", "findings", "corrective-actions", "reports"].forEach(prefetchRoute);
  if ("requestIdleCallback" in window) requestIdleCallback(run, { timeout: 2500 });
  else window.setTimeout(run, 1200);
}

function prefetchRouteNeighbours(route) {
  const neighbours = {
    dashboard: ["reports", "findings"],
    form: ["ai-intake", "findings"],
    "ai-intake": ["form", "findings"],
    findings: ["corrective-actions", "reports"],
    "corrective-actions": ["findings", "reports"],
    reports: ["dashboard", "findings"],
    users: ["settings"],
    settings: ["users"]
  };
  (neighbours[route] || []).forEach(prefetchRoute);
}

function prefetchRoute(route) {
  if (!ROUTES.has(route)) return;
  fetch(`${route}.html`, { cache: "force-cache", credentials: "same-origin" }).catch(() => {});
  const modulePath = ROUTE_MODULES[route];
  if (modulePath) addModulePreload(modulePath);
}

function addModulePreload(href) {
  if (document.querySelector(`link[rel="modulepreload"][href="${href}"]`)) return;
  const link = document.createElement("link");
  link.rel = "modulepreload";
  link.href = href;
  document.head.appendChild(link);
}

function registerServiceWorker() {
  if (!("serviceWorker" in navigator)) return;
  if (!["http:", "https:"].includes(window.location.protocol)) return;
  navigator.serviceWorker.register("./sw.js").catch(() => {});
}
