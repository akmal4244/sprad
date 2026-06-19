export const LEGACY_ROLE_MAP = Object.freeze({
  pentadbir: "institution_admin",
  pengguna: "auditor"
});

export const ROLE_RANK = Object.freeze({
  viewer: 1,
  auditor: 2,
  reviewer: 3,
  institution_admin: 4,
  super_admin: 5
});

export const ROLE_PERMISSIONS = Object.freeze({
  super_admin: [
    "institutions.manage",
    "institution_scope.all",
    "masters.manage",
    "users.manage",
    "audit.manage",
    "findings.manage",
    "findings.review",
    "actions.verify",
    "reports.view"
  ],
  institution_admin: [
    "masters.manage",
    "users.manage",
    "audit.manage",
    "findings.manage",
    "findings.review",
    "actions.verify",
    "reports.view"
  ],
  reviewer: [
    "findings.review",
    "actions.verify",
    "reports.view"
  ],
  auditor: [
    "findings.create",
    "findings.edit_own",
    "actions.update_own",
    "reports.view"
  ],
  viewer: [
    "reports.view"
  ]
});

export function normalizeRole(role) {
  const normalized = String(role || "").trim().toLowerCase();
  return LEGACY_ROLE_MAP[normalized] || normalized || "viewer";
}

export function hasPermission(role, permission) {
  return (ROLE_PERMISSIONS[normalizeRole(role)] || []).includes(permission);
}

export function hasRoleAtLeast(role, minimumRole) {
  const currentRank = ROLE_RANK[normalizeRole(role)] || 0;
  const minimumRank = ROLE_RANK[normalizeRole(minimumRole)] || 0;
  return currentRank >= minimumRank;
}

export function canAccessInstitution(user, institutionId) {
  const role = normalizeRole(user?.role);
  if (role === "super_admin") return true;
  return String(user?.institution_id || "") === String(institutionId || "");
}

export function canManageFinding(user, finding) {
  const role = normalizeRole(user?.role);
  if (!canAccessInstitution(user, finding?.institution_id)) return false;
  if (["super_admin", "institution_admin", "reviewer"].includes(role)) return true;
  if (role !== "auditor") return false;
  const workflowStatus = String(finding?.workflow_status || "draft").toLowerCase();
  const ownFinding = String(finding?.created_by || "") === String(user?.id || "");
  return ownFinding && ["draft", "returned"].includes(workflowStatus);
}
