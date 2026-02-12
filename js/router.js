/**
 * Hash router for Admin Platform.
 * - Empty, #, or #/ → selection page.
 * - #/subplatformId or #/subplatformId/pagePath → workspace.
 */

(function (global) {
  var onChangeCallback = null;

  /**
   * Returns whether current route is the selection page (no sub-platform chosen).
   */
  function isSelectionPage() {
    var hash = (global.location.hash || "").trim();
    return hash === "" || hash === "#" || hash === "#/";
  }

  /**
   * Parse hash into { subplatformId, pageId }.
   * pageId may contain slashes for nested pages (e.g. loyalty-points/rank-data).
   * If subplatformId is invalid or missing, uses DEFAULT_SUBPLATFORM_ID.
   * If pageId is missing, returns first page of that subplatform.
   */
  function parseHash() {
    var hash = (global.location.hash || "").trim();
    if (hash.charAt(0) === "#") hash = hash.slice(1);
    if (hash.charAt(0) === "/") hash = hash.slice(1);
    var parts = hash ? hash.split("/") : [];
    var subplatformId = parts[0] || "";
    var pageId = parts.slice(1).join("/");

    var hasConfig = typeof SUBPLATFORMS !== "undefined" && Array.isArray(SUBPLATFORMS);
    var valid = hasConfig && SUBPLATFORMS.some(function (p) { return p.id === subplatformId; });
    if (!valid) {
      subplatformId = hasConfig && typeof DEFAULT_SUBPLATFORM_ID !== "undefined"
        ? DEFAULT_SUBPLATFORM_ID
        : (subplatformId || "dapp-manager");
      if (!subplatformId) subplatformId = "dapp-manager";
      pageId = parts.slice(1).join("/") || "";
    }
    if (!pageId && subplatformId && typeof getMenus === "function" && typeof getPageIds === "function") {
      try {
        var menuTree = getMenus(subplatformId);
        var pageIds = getPageIds(menuTree);
        pageId = pageIds.length ? pageIds[0] : "";
      } catch (e) {
        pageId = "";
      }
    }
    return { subplatformId: subplatformId, pageId: pageId };
  }

  /**
   * Get current route state. For selection page: { selectionPage: true }.
   * For workspace: { selectionPage: false, subplatformId, pageId }.
   * If hash has subplatform but no page, redirects to first page and returns that state.
   */
  function getState() {
    if (isSelectionPage()) {
      return { selectionPage: true };
    }
    var parsed = parseHash();
    var hash = (global.location.hash || "").trim();
    var expectedHash = "#/" + parsed.subplatformId + (parsed.pageId ? "/" + parsed.pageId : "");
    if (parsed.pageId && hash !== expectedHash && hash === "#/" + parsed.subplatformId) {
      global.location.replace(global.location.pathname + global.location.search + expectedHash);
    }
    return {
      selectionPage: false,
      subplatformId: parsed.subplatformId,
      pageId: parsed.pageId,
    };
  }

  /**
   * Set hash to open workspace for a sub-platform (and optional page).
   * If pageId omitted, redirects to first page of that subplatform.
   */
  function navigateToSubplatform(subplatformId, pageId) {
    if (!subplatformId) return;
    if (typeof getMenus !== "function" || typeof getPageIds !== "function") {
      global.location.hash = "#/" + subplatformId;
      return;
    }
    var menuTree = getMenus(subplatformId);
    var pageIds = getPageIds(menuTree);
    var first = pageIds.length ? pageIds[0] : "";
    var path = pageId || first;
    global.location.hash = "#/" + subplatformId + (path ? "/" + path : "");
  }

  /**
   * Set hash to a specific page within current or given subplatform.
   */
  function navigateToPage(subplatformId, pageId) {
    if (!subplatformId || !pageId) return;
    global.location.hash = "#/" + subplatformId + "/" + pageId;
  }

  function notifyChange() {
    if (typeof onChangeCallback === "function") {
      onChangeCallback(getState());
    }
  }

  function onHashChange(callback) {
    onChangeCallback = callback;
    global.addEventListener("hashchange", notifyChange);
  }

  global.Router = {
    isSelectionPage: isSelectionPage,
    getState: getState,
    navigateToSubplatform: navigateToSubplatform,
    navigateToPage: navigateToPage,
    onHashChange: onHashChange,
  };
})(typeof window !== "undefined" ? window : this);
