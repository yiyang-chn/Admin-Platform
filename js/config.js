/**
 * Admin Platform – 产品原型用静态配置（子平台列表与菜单树，无后端）.
 * Sub-platforms: { id, label, group? }. Menu items: { id, label, children? }.
 */

var SUBPLATFORMS = [
  { id: "dapp-manager", label: "Dapp Manager", group: "Dapp Admin" },
  { id: "dapp-data-center", label: "Dapp Data Center", group: "Dapp Admin" },
  { id: "staking-manager", label: "Staking Manager", group: "Dapp Admin" },
  { id: "campaign-manager", label: "Campaign Manager", group: "Dapp Admin" },
  { id: "devsuite-manager", label: "DevSuite Manager", group: "DevSuite Admin" },
  { id: "devsuite-data-center", label: "DevSuite Data Center", group: "DevSuite Admin" },
  { id: "website-manager", label: "Website Manager", group: "Website Admin" },
  { id: "operation-center", label: "Operation Center", group: "Operation Center" },
  { id: "access-control", label: "Access Control", group: "Access Control" },
];

/**
 * Get menu tree for a sub-platform. Returns array of { id, label, children? }.
 * Leaf id is used as page path segment; nested pages use path "parentId/childId".
 */
function getMenus(subplatformId) {
  const menus = MENUS[subplatformId];
  return menus ? menus : [];
}

/**
 * Flatten menu tree to list of leaf pages with full path (pageId).
 * Used for "first page" redirect and sidebar link generation.
 */
function getPageIds(menuTree, prefix = "") {
  const pages = [];
  for (const node of menuTree) {
    const path = prefix ? prefix + "/" + node.id : node.id;
    if (node.children && node.children.length) {
      pages.push(...getPageIds(node.children, path));
    } else {
      pages.push(path);
    }
  }
  return pages;
}

const MENUS = {
  "dapp-manager": [
    { id: "dapp", label: "Dapp" },
    { id: "beravault-direct-whitelist", label: "BeraVaultDirectWhitelist" },
    { id: "eigenlayer-milestones", label: "EigenLayer Milestones" },
    { id: "activity-log", label: "Activity Log" },
  ],
  "dapp-data-center": [
    { id: "dapp-order", label: "Dapp Order" },
    { id: "dapp-user", label: "Dapp User" },
    { id: "referral-code", label: "Referral Code" },
    { id: "account-credit", label: "Account Credit" },
    {
      id: "loyalty-points",
      label: "Loyalty Points",
      children: [
        { id: "rank-data", label: "Rank Data" },
        { id: "user-data", label: "User Data" },
      ],
    },
  ],
  "staking-manager": [
    { id: "ethereum-mev-reward", label: "Ethereum MEV Reward" },
    { id: "staking-metadata", label: "Staking Metadata" },
    { id: "activity-log", label: "Activity Log" },
  ],
  "campaign-manager": [
    { id: "coupon-setting", label: "Coupon Setting" },
    { id: "coupon-distribution", label: "Coupon Distribution" },
  ],
  "devsuite-manager": [
    { id: "devsuite-user", label: "DevSuite User" },
    { id: "fast-api", label: "Fast API" },
    { id: "power-node", label: "Power Node" },
    { id: "protocol-status", label: "Protocol Status" },
    { id: "promotion-code", label: "Promotion Code" },
    { id: "email-center", label: "Email Center" },
    { id: "node-instance", label: "Node Instance" },
    { id: "activity-log", label: "Activity Log" },
  ],
  "devsuite-data-center": [
    {
      id: "user-data",
      label: "User Data",
      children: [
        { id: "weekly-data", label: "Weekly Data" },
        { id: "user-summary", label: "User Summary" },
      ],
    },
    {
      id: "order-data",
      label: "Order Data",
      children: [
        { id: "order-details", label: "Order Details" },
        { id: "order-summary", label: "Order Summary" },
      ],
    },
    {
      id: "payment-data",
      label: "Payment Data",
      children: [
        { id: "credit-history", label: "Credit History" },
        { id: "all-payments", label: "All Payments" },
        { id: "monthly-data", label: "Monthly Data" },
      ],
    },
  ],
  "website-manager": [
    { id: "news-and-blogs", label: "News and Blogs" },
    { id: "events", label: "Events" },
    { id: "staking", label: "Staking" },
  ],
  "operation-center": [
    { id: "vulnerability-report", label: "Vulnerability Report" },
    { id: "online-issue", label: "Online Issue" },
    { id: "product-feature-request", label: "Product Feature Request" },
    { id: "devsuite-support-request", label: "DevSuite Support Request" },
    { id: "website-support-request", label: "Website Support Request" },
    { id: "zendesk-ticket", label: "Zendesk Ticket" },
    { id: "activity-log", label: "Activity Log" },
  ],
  "access-control": [
    { id: "role-management", label: "Role Management" },
    { id: "member-management", label: "Member Management" },
    { id: "activity-log", label: "Activity Log" },
  ],
};

/** Default sub-platform when hash is invalid or missing (workspace view). */
var DEFAULT_SUBPLATFORM_ID = "dapp-manager";
