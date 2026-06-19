import test from "node:test";
import assert from "node:assert/strict";
import {
  canAccessInstitution,
  canManageFinding,
  hasPermission,
  hasRoleAtLeast,
  normalizeRole
} from "../assets/js/core/permissions.js";

test("maps legacy roles into SPRAD V2 roles", () => {
  assert.equal(normalizeRole("pentadbir"), "institution_admin");
  assert.equal(normalizeRole("pengguna"), "auditor");
  assert.equal(normalizeRole("reviewer"), "reviewer");
});

test("checks role permissions and rank hierarchy", () => {
  assert.equal(hasPermission("institution_admin", "users.manage"), true);
  assert.equal(hasPermission("auditor", "users.manage"), false);
  assert.equal(hasRoleAtLeast("reviewer", "auditor"), true);
  assert.equal(hasRoleAtLeast("auditor", "reviewer"), false);
});

test("enforces institution scope except for super admin", () => {
  assert.equal(canAccessInstitution({
    role: "super_admin",
    institution_id: "inst_a"
  }, "inst_b"), true);
  assert.equal(canAccessInstitution({
    role: "auditor",
    institution_id: "inst_a"
  }, "inst_b"), false);
});

test("allows auditor to manage only own draft or returned findings", () => {
  const auditor = { id: "user_1", role: "auditor", institution_id: "inst_a" };
  assert.equal(canManageFinding(auditor, {
    institution_id: "inst_a",
    created_by: "user_1",
    workflow_status: "draft"
  }), true);
  assert.equal(canManageFinding(auditor, {
    institution_id: "inst_a",
    created_by: "user_1",
    workflow_status: "approved"
  }), false);
  assert.equal(canManageFinding(auditor, {
    institution_id: "inst_a",
    created_by: "user_2",
    workflow_status: "draft"
  }), false);
});
