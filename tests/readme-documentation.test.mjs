/*
 * File Path: tests/readme-documentation.test.mjs
 * File Version: SPRAD v2.8-production | readme-docs.1
 * Update Info: 2026-06-20 - Tambah kontrak README GitHub penuh untuk struktur, fungsi dan roadmap SPRAD.
 */
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const readme = readFileSync("README.md", "utf8");

test("README documents SPRAD full system context", () => {
  [
    "# SPRAD - Sistem Penilaian Risiko Audit Dalam",
    "## Versi Semasa",
    "## Changelog",
    "## Gambaran Keseluruhan",
    "## Stack Teknologi",
    "## Senibina Sistem",
    "## Ciri-ciri Utama",
    "## Struktur Fail",
    "## Struktur Google Sheets",
    "## API Apps Script",
    "## Peranan dan Akses",
    "## Aliran Kerja Utama",
    "## Setup dan Deployment",
    "## Keselamatan",
    "## Testing dan QA",
    "## Roadmap Fasa Akan Datang"
  ].forEach(section => assert.match(readme, new RegExp(escapeRegex(section)), `${section} missing`));

  assert.match(readme, /SPRAD v2\.8-production/, "current system version must be documented");
  assert.match(readme, /Fasa 7 daripada 12/, "current phase must be documented");
  assert.match(readme, /GitHub Pages \+ HTML\/CSS\/JavaScript vanilla \+ Google Apps Script \+ Google Sheets/, "stack must be explicit");
  assert.match(readme, /UjianMe/, "README should note UjianMe as style reference");
});

function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
