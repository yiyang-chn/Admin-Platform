/**
 * Admin Platform – 产品原型：选择页 / 工作台渲染与 hash 路由（纯前端，无后端）.
 */

(function (global) {
  var dropdownPanel = null;
  var dropdownTrigger = null;

  function getEl(id) {
    return document.getElementById(id);
  }

  function showSelectionPage() {
    getEl("platform-selection-page").classList.remove("hidden");
    getEl("workspace").classList.add("hidden");
  }

  function showWorkspace() {
    getEl("platform-selection-page").classList.add("hidden");
    getEl("workspace").classList.remove("hidden");
  }

  function renderSelectionPage() {
    var container = getEl("selection-groups");
    if (!container) return;
    // 子平台已改为 <a href="#/subplatform/page">，浏览器直接改 hash；此处仅在点击后刷新视图（file:// 下 hashchange 可能不触发）
    if (!container._selectionBound) {
      container._selectionBound = true;
      container.addEventListener("click", function (e) {
        var link = e.target && e.target.closest && e.target.closest("a.selection-item");
        if (!link || !link.hash) return;
        var that = this;
        setTimeout(function () {
          if (typeof Router !== "undefined" && typeof Router.getState === "function") {
            applyState(Router.getState());
          } else {
            var hash = (global.location.hash || "").trim();
            if (hash && hash.indexOf("#/") === 0) {
              showWorkspace();
              getEl("platform-dropdown-label").textContent = hash.replace("#/", "").split("/")[0] || "Platform";
              getEl("sidebar-nav").innerHTML = "<li class=\"nav-item\"><span class=\"nav-section-title\">(Menu)</span></li>";
              getEl("main-placeholder").innerHTML = "<h2>Welcome</h2><p>Page content will be implemented here.</p>";
            }
          }
        }, 50);
      });
    }
  }

  function renderWorkspace(state) {
    var subplatformId = state.subplatformId;
    var pageId = state.pageId;

    renderDropdown(subplatformId);
    renderSidebar(subplatformId, pageId);
    renderMainPlaceholder(subplatformId, pageId);
  }

  function renderDropdown(activeSubplatformId) {
    var labelEl = getEl("platform-dropdown-label");
    var panelEl = getEl("platform-dropdown-panel");
    if (!labelEl || !panelEl) return;

    if (typeof SUBPLATFORMS === "undefined" || !Array.isArray(SUBPLATFORMS)) {
      labelEl.textContent = activeSubplatformId || "Select platform";
      panelEl.innerHTML = "";
      panelEl.classList.add("hidden");
      return;
    }

    var active = SUBPLATFORMS.find(function (p) { return p.id === activeSubplatformId; });
    labelEl.textContent = active ? active.label : "Select platform";

    var groups = {};
    var standalone = [];
    SUBPLATFORMS.forEach(function (p) {
      if (p.group) {
        if (!groups[p.group]) groups[p.group] = [];
        groups[p.group].push(p);
      } else {
        standalone.push(p);
      }
    });

    var html = "";
    Object.keys(groups).sort().forEach(function (groupName) {
      html += '<div class="dropdown-group-title">' + escapeHtml(groupName) + "</div>";
      groups[groupName].forEach(function (p) {
        var activeClass = p.id === activeSubplatformId ? "active" : "";
        html += '<button type="button" class="dropdown-option' + activeClass + '" data-subplatform-id="' + escapeAttr(p.id) + '" role="option">' + escapeHtml(p.label) + "</button>";
      });
    });
    if (standalone.length) {
      html += '<div class="dropdown-group-title">Other</div>';
      standalone.forEach(function (p) {
        var activeClass = p.id === activeSubplatformId ? "active" : "";
        html += '<button type="button" class="dropdown-option' + activeClass + '" data-subplatform-id="' + escapeAttr(p.id) + '" role="option">' + escapeHtml(p.label) + "</button>";
      });
    }
    panelEl.innerHTML = html;
    panelEl.classList.add("hidden");

    panelEl.querySelectorAll(".dropdown-option").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var id = this.getAttribute("data-subplatform-id");
        if (id) {
          Router.navigateToSubplatform(id);
          closeDropdown();
        }
      });
    });
  }

  function renderSidebar(subplatformId, pageId) {
    var navEl = getEl("sidebar-nav");
    if (!navEl) return;

    if (typeof getMenus !== "function") {
      navEl.innerHTML = "<li class=\"nav-item\"><span class=\"nav-section-title\">(No menu data)</span></li>";
      return;
    }
    var menuTree = getMenus(subplatformId);
    var html = "";

    function renderItems(items, pathPrefix) {
      items.forEach(function (node) {
        var path = pathPrefix ? pathPrefix + "/" + node.id : node.id;
        if (node.children && node.children.length) {
          html += '<li class="nav-item"><span class="nav-section-title">' + escapeHtml(node.label) + "</span><ul class="nav-item-children">";
          renderItems(node.children, path);
          html += "</ul></li>";
        } else {
          var activeClass = path === pageId ? "active" : "";
          html += '<li class="nav-item"><a href="#/' + escapeAttr(subplatformId) + "/" + escapeAttr(path) + '" class="' + activeClass + '" data-page-id="' + escapeAttr(path) + '">' + escapeHtml(node.label) + "</a></li>";
        }
      });
    }
    renderItems(menuTree);
    navEl.innerHTML = html;

    navEl.querySelectorAll("a[data-page-id]").forEach(function (a) {
      a.addEventListener("click", function (e) {
        e.preventDefault();
        var pid = this.getAttribute("data-page-id");
        if (pid) Router.navigateToPage(subplatformId, pid);
      });
    });
  }

  function renderMainPlaceholder(subplatformId, pageId) {
    var el = getEl("main-placeholder");
    if (!el) return;
    var label = "";
    if (typeof getMenus === "function") {
      var menuTree = getMenus(subplatformId);
      label = resolvePageLabel(menuTree, pageId);
    }
    el.innerHTML = "<h2>" + escapeHtml(label || pageId || subplatformId || "Welcome") + "</h2><p>Page content will be implemented here.</p>";
  }

  function resolvePageLabel(menuTree, pageId) {
    var segments = pageId ? pageId.split("/") : [];
    var node = null;
    var items = menuTree;
    for (var i = 0; i < segments.length && items; i++) {
      node = items.find(function (n) { return n.id === segments[i]; });
      items = node && node.children ? node.children : null;
    }
    return node ? node.label : null;
  }

  function openDropdown() {
    if (dropdownPanel) {
      dropdownPanel.classList.remove("hidden");
      dropdownTrigger.setAttribute("aria-expanded", "true");
    }
  }

  function closeDropdown() {
    if (dropdownPanel) {
      dropdownPanel.classList.add("hidden");
      if (dropdownTrigger) dropdownTrigger.setAttribute("aria-expanded", "false");
    }
  }

  function toggleDropdown() {
    if (dropdownPanel.classList.contains("hidden")) openDropdown(); else closeDropdown();
  }

  function escapeHtml(s) {
    if (s == null) return "";
    var div = document.createElement("div");
    div.textContent = s;
    return div.innerHTML;
  }

  function escapeAttr(s) {
    if (s == null) return "";
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/"/g, "&quot;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  function applyState(state) {
    if (state.selectionPage) {
      showSelectionPage();
      renderSelectionPage();
    } else {
      showWorkspace();
      renderWorkspace(state);
    }
  }

  function init() {
    dropdownPanel = getEl("platform-dropdown-panel");
    dropdownTrigger = getEl("platform-dropdown-trigger");

    if (dropdownTrigger && dropdownPanel) {
      dropdownTrigger.addEventListener("click", function (e) {
        e.stopPropagation();
        toggleDropdown();
      });
      document.addEventListener("click", function () {
        closeDropdown();
      });
      dropdownPanel.addEventListener("click", function (e) {
        e.stopPropagation();
      });
    }

    Router.onHashChange(function (state) {
      applyState(state);
    });

    applyState(Router.getState());
  }

  if (global.document && document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})(typeof window !== "undefined" ? window : this);
