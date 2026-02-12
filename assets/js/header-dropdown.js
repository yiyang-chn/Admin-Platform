/**
 * 页头子平台下拉：点击显示菜单，选则跳转对应子平台首页，不跳转 index。
 */
(function () {
  var PLATFORMS = [
    { group: "Dapp Admin", id: "dapp-manager", label: "Dapp Manager", path: "dapp-manager/dapp.html" },
    { group: "Dapp Admin", id: "dapp-data-center", label: "Dapp Data Center", path: "dapp-data-center/dapp-order.html" },
    { group: "Dapp Admin", id: "staking-manager", label: "Staking Manager", path: "staking-manager/ethereum-mev-reward.html" },
    { group: "Dapp Admin", id: "campaign-manager", label: "Campaign Manager", path: "campaign-manager/coupon-setting.html" },
    { group: "DevSuite Admin", id: "devsuite-manager", label: "DevSuite Manager", path: "devsuite-manager/devsuite-user.html" },
    { group: "DevSuite Admin", id: "devsuite-data-center", label: "DevSuite Data Center", path: "devsuite-data-center/user-data/weekly-data.html" },
    { group: "Website Admin", id: "website-manager", label: "Website Manager", path: "website-manager/news-and-blogs.html" },
    { group: "Operation Center", id: "operation-center", label: "Operation Center", path: "operation-center/vulnerability-report.html" },
    { group: "Access Control", id: "access-control", label: "Access Control", path: "access-control/role-management.html" },
  ];

  function getBasePath() {
    var pathname = (typeof location !== "undefined" && location.pathname) ? location.pathname : "";
    var match = pathname.match(/\/pages\/([^/]+(?:\/[^/]+)*\/[^/]+\.html)$/);
    if (!match) return "../";
    var afterPages = match[1];
    return afterPages.split("/").length === 2 ? "../" : "../../";
  }

  function renderPanel(currentLabel, base) {
    var groups = {};
    PLATFORMS.forEach(function (p) {
      if (!groups[p.group]) groups[p.group] = [];
      groups[p.group].push(p);
    });
    var order = ["Dapp Admin", "DevSuite Admin", "Website Admin", "Operation Center", "Access Control"];
    var html = "";
    order.forEach(function (groupName) {
      if (!groups[groupName]) return;
      html += '<div class="dropdown-group-title">' + escapeHtml(groupName) + "</div>";
      groups[groupName].forEach(function (p) {
        var active = p.label === currentLabel ? " active" : "";
        html += '<a class="dropdown-option' + active + '" href="' + escapeAttr(base + p.path) + '">' + escapeHtml(p.label) + "</a>";
      });
    });
    return html;
  }

  function getLogoutRedirect(base) {
    // base 为到 pages/ 的路径，index 在项目根，需再向上一级
    return (base || "../") + "../index.html";
  }

  function escapeHtml(s) {
    if (s == null) return "";
    var div = document.createElement("div");
    div.textContent = s;
    return div.innerHTML;
  }
  function escapeAttr(s) {
    if (s == null) return "";
    return String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  function initUserDropdown() {
    var userWrap = document.querySelector(".workspace .app-header .user-info");
    if (!userWrap) return;

    userWrap.classList.add("user-dropdown-wrap");
    userWrap.setAttribute("tabindex", "0");
    userWrap.setAttribute("role", "button");
    userWrap.setAttribute("aria-haspopup", "menu");
    userWrap.setAttribute("aria-expanded", "false");

    var panel = userWrap.querySelector(".user-dropdown-panel");
    if (!panel) {
      panel = document.createElement("div");
      panel.className = "platform-dropdown-panel user-dropdown-panel hidden";
      panel.setAttribute("role", "menu");
      var logoutHref = getLogoutRedirect(getBasePath());
      panel.innerHTML = '<a class="dropdown-option" data-action="logout" role="menuitem" href="' + escapeAttr(logoutHref) + '">Log Out</a>';
      userWrap.appendChild(panel);
    }

    function open() {
      panel.classList.remove("hidden");
      userWrap.setAttribute("aria-expanded", "true");
    }
    function close() {
      panel.classList.add("hidden");
      userWrap.setAttribute("aria-expanded", "false");
    }
    function toggle() {
      if (panel.classList.contains("hidden")) open(); else close();
    }

    // 整个账号+箭头区域可点击（手型由 CSS :hover 控制）
    userWrap.addEventListener("click", function (e) {
      e.stopPropagation();
      toggle();
    });

    userWrap.addEventListener("keydown", function (e) {
      var key = e.key || e.code;
      if (key === "Enter" || key === " " || key === "Spacebar") {
        e.preventDefault();
        e.stopPropagation();
        toggle();
      } else if (key === "Escape" || key === "Esc") {
        close();
      }
    });

    document.addEventListener("click", function () {
      close();
    });
    panel.addEventListener("click", function (e) {
      e.stopPropagation();
      // Log Out 使用 <a href> 跳转，无需额外处理
    });
  }

  function init() {
    var wrap = document.querySelector(".platform-dropdown");
    if (!wrap) return;
    var trigger = wrap.querySelector(".platform-dropdown-trigger");
    var panel = wrap.querySelector(".platform-dropdown-panel");
    if (!trigger || !panel) return;
    var currentLabel = (trigger.querySelector("span") && trigger.querySelector("span").textContent) || trigger.textContent || "";
    var base = getBasePath();
    panel.innerHTML = renderPanel(currentLabel.trim(), base);
    panel.classList.add("hidden");

    trigger.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      panel.classList.toggle("hidden");
      trigger.setAttribute("aria-expanded", panel.classList.contains("hidden") ? "false" : "true");
    });
    document.addEventListener("click", function () {
      panel.classList.add("hidden");
      trigger.setAttribute("aria-expanded", "false");
    });
    panel.addEventListener("click", function (e) {
      e.stopPropagation();
    });

    initUserDropdown();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
