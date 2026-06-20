/*
 * File Path: tests/file-metadata.test.mjs
 * File Version: SPRAD v2.8-production | metadata-header.2
 * Update Info: 2026-06-20 - Benarkan metadata version dan update info berbeza mengikut fail.
 */
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { extname } from "node:path";
import test from "node:test";

const VERSION_PATTERN = /File Version:\s*SPRAD v2\.8-production\s*\|\s*\S+/;
const UPDATE_PATTERN = /Update Info:\s*\S.+/;

function trackedFiles() {
  const files = execFileSync("git", ["ls-files"], { encoding: "utf8" })
    .split(/\r?\n/)
    .filter(Boolean);
  if (existsSync("tests/file-metadata.test.mjs") && !files.includes("tests/file-metadata.test.mjs")) {
    files.push("tests/file-metadata.test.mjs");
  }
  return files;
}

function hasTextMetadataHeader(file, source) {
  const headerWindow = source.slice(0, 500);
  return headerWindow.includes(`File Path: ${file}`)
    && VERSION_PATTERN.test(headerWindow)
    && UPDATE_PATTERN.test(headerWindow);
}

function hasJsonMetadata(file, source) {
  const data = JSON.parse(source);
  const info = data._spradFileInfo || {};
  return data._spradFileInfo?.filePath === file
    && typeof info.fileVersion === "string"
    && info.fileVersion.startsWith("SPRAD v2.8-production | ")
    && info.fileVersion.split("|")[1]?.trim()
    && typeof info.updateInfo === "string"
    && info.updateInfo.trim().length > 0;
}

test("all tracked project files declare path, version and update info at the top", () => {
  const missing = [];

  for (const file of trackedFiles()) {
    const source = readFileSync(file, "utf8");
    const extension = extname(file).toLowerCase();
    const ok = extension === ".json"
      ? hasJsonMetadata(file, source)
      : hasTextMetadataHeader(file, source);

    if (!ok) missing.push(file);
  }

  assert.deepEqual(missing, []);
});
