// =========== APP CONFIG ===========
const APP_NAME = "Sistem Penilaian Risiko Audit Dalam (SPRAD)";
const LOGO_URL = "https://www.akm.gov.my/templates/yootheme/cache/91/JATA%20NEGARA%20AI-01-91eac591.webp";
const FAVICON_URL = LOGO_URL;

const SHEET_CONTACTS = "contacts";
const SHEET_USERS = "users";
const SHEET_SESSIONS = "sessions";
const SHEET_SETTINGS = "settings";
const SHEET_INSTITUTIONS = "institutions";
const SHEET_ORG_UNITS = "org_units";
const SHEET_AUDIT_CYCLES = "audit_cycles";
const SHEET_AUDITS = "audits";
const SHEET_RISK_CATEGORIES = "risk_categories";
const SHEET_LIKELIHOOD_SCALE = "likelihood_scale";
const SHEET_IMPACT_SCALE = "impact_scale";
const SHEET_RISK_LEVELS = "risk_levels";
const SHEET_FINDINGS = "findings";
const SHEET_FINDING_UNITS = "finding_units";
const SHEET_CORRECTIVE_ACTIONS = "corrective_actions";
const SHEET_ATTACHMENTS = "attachments";
const SHEET_AUDIT_LOGS = "audit_logs";
const SHEET_MUTATION_RECEIPTS = "mutation_receipts";

const ROLE_ADMIN = "pentadbir";
const ROLE_USER = "pengguna";
const ROLE_SUPER_ADMIN = "super_admin";
const ROLE_INSTITUTION_ADMIN = "institution_admin";
const ROLE_AUDITOR = "auditor";
const ROLE_REVIEWER = "reviewer";
const ROLE_VIEWER = "viewer";
const SESSION_DAYS = 7;
const DEFAULT_INSTITUTION_ID = "inst_default";
const SETUP_CACHE_KEY = "sprad_schema_ready_v2_1";
const SETUP_CACHE_SECONDS = 300;
const LOGIN_ATTEMPT_LIMIT = 8;
const LOGIN_ATTEMPT_WINDOW_SECONDS = 600;

// SPRAD V2: public registration must never create administrator accounts.
const ALLOW_PUBLIC_ADMIN_REGISTER = false;

const HEADERS = {
  contacts: ["id", "name", "email", "message", "created_at"],
  users: ["id", "username", "password", "role", "created_at"],
  sessions: ["token", "user_id", "expires", "created_at"],
  settings: ["key", "value"],
  institutions: ["id", "code", "name", "short_name", "ministry", "address", "logo_url", "report_title", "status", "created_at", "created_by", "updated_at", "updated_by", "deleted_at", "deleted_by"],
  org_units: ["id", "institution_id", "code", "name", "unit_type", "parent_unit_id", "status", "created_at", "created_by", "updated_at", "updated_by", "deleted_at", "deleted_by"],
  audit_cycles: ["id", "institution_id", "title", "audit_year", "start_date", "end_date", "status", "report_reference", "finalized_at", "finalized_by", "created_at", "created_by", "updated_at", "updated_by", "deleted_at", "deleted_by"],
  audits: ["id", "institution_id", "cycle_id", "audit_code", "title", "scope", "objective", "lead_auditor_user_id", "start_date", "end_date", "status", "created_at", "created_by", "updated_at", "updated_by", "deleted_at", "deleted_by"],
  risk_categories: ["id", "institution_id", "code", "name", "description", "sort_order", "status", "created_at", "created_by", "updated_at", "updated_by", "deleted_at", "deleted_by"],
  likelihood_scale: ["institution_id", "value", "label", "guidance", "sort_order", "status"],
  impact_scale: ["institution_id", "value", "label", "guidance", "sort_order", "status"],
  risk_levels: ["id", "institution_id", "code", "label", "rank", "min_score", "max_score", "color_hex", "description", "default_due_days", "status"],
  findings: ["id", "institution_id", "cycle_id", "audit_id", "category_id", "finding_no", "title", "issue_description", "detailed_justification", "root_cause", "impact_description", "audit_evidence", "recommendation", "likelihood", "impact", "calculated_score", "calculated_level_id", "final_level_id", "override_reason", "workflow_status", "review_note", "created_at", "created_by", "updated_at", "updated_by", "submitted_at", "submitted_by", "reviewed_at", "reviewed_by", "approved_at", "approved_by", "deleted_at", "deleted_by", "row_version"],
  finding_units: ["id", "institution_id", "finding_id", "unit_id", "created_at", "created_by"],
  corrective_actions: ["id", "institution_id", "finding_id", "action_text", "owner_user_id", "owner_name", "owner_unit_id", "target_date", "status", "progress_percent", "progress_note", "completion_evidence", "submitted_for_verification_at", "verified_at", "verified_by", "verification_note", "created_at", "created_by", "updated_at", "updated_by", "deleted_at", "deleted_by", "row_version"],
  attachments: ["id", "institution_id", "entity_type", "entity_id", "drive_file_id", "file_name", "mime_type", "file_url", "uploaded_at", "uploaded_by", "deleted_at", "deleted_by"],
  audit_logs: ["id", "institution_id", "user_id", "action", "entity_type", "entity_id", "request_id", "before_json", "after_json", "created_at"],
  mutation_receipts: ["request_id", "user_id", "institution_id", "action", "entity_type", "entity_id", "status", "error_code", "error_message", "created_at", "completed_at"]
};

const V2_RISK_LEVELS = [
  ["rl_low", DEFAULT_INSTITUTION_ID, "low", "Rendah", 1, 1, 4, "#047857", "Risiko rendah dan boleh dipantau melalui kawalan rutin.", 180, "active"],
  ["rl_medium", DEFAULT_INSTITUTION_ID, "medium", "Sederhana", 2, 5, 8, "#b7791f", "Risiko sederhana yang memerlukan tindakan penambahbaikan terancang.", 90, "active"],
  ["rl_high", DEFAULT_INSTITUTION_ID, "high", "Tinggi", 3, 9, 12, "#b91c1c", "Risiko tinggi yang memerlukan tindakan segera oleh pemilik proses.", 30, "active"],
  ["rl_critical", DEFAULT_INSTITUTION_ID, "critical", "Kritikal", 4, 13, 16, "#7f1d1d", "Risiko kritikal yang memerlukan perhatian pengurusan dengan segera.", 7, "active"]
];

const V2_RISK_CATEGORIES = [
  ["rc_mandate", DEFAULT_INSTITUTION_ID, "K01", "Tiada Mandat", "Isu berkaitan ketiadaan mandat, kelulusan atau punca kuasa.", 1, "active"],
  ["rc_technical", DEFAULT_INSTITUTION_ID, "K02", "Kesilapan Isu Teknikal", "Isu teknikal, konfigurasi, dokumentasi atau proses yang tidak tepat.", 2, "active"],
  ["rc_negligence", DEFAULT_INSTITUTION_ID, "K03", "Kecuaian", "Isu berpunca daripada kecuaian, pemantauan lemah atau ketidakpatuhan.", 3, "active"],
  ["rc_waste", DEFAULT_INSTITUTION_ID, "K04", "Pembaziran", "Isu melibatkan pembaziran sumber, masa, kos atau aset.", 4, "active"],
  ["rc_leakage", DEFAULT_INSTITUTION_ID, "K05", "Penyelewengan / Ketirisan", "Isu berisiko penyelewengan, ketirisan atau kehilangan hasil.", 5, "active"]
];

const DUMMY_USERS = [
  { username: "admin", password: "admin123", role: ROLE_ADMIN },
  { username: "pengguna", password: "pengguna123", role: ROLE_USER },
  { username: "test.pentadbir@example.com", password: "test1234", role: ROLE_ADMIN },
  { username: "test.pengguna@example.com", password: "test1234", role: ROLE_USER },
  { username: "aina.admin@example.com", password: "test1234", role: ROLE_ADMIN },
  { username: "farid.user@example.com", password: "test1234", role: ROLE_USER },
  { username: "nurul.user@example.com", password: "test1234", role: ROLE_USER },
  { username: "daniel.admin@example.com", password: "test1234", role: ROLE_ADMIN },
  { username: "siti.user@example.com", password: "test1234", role: ROLE_USER },
  { username: "hakim.user@example.com", password: "test1234", role: ROLE_USER }
];

const DEFAULT_USERS = [
  DUMMY_USERS[0],
  DUMMY_USERS[1]
];

const DUMMY_CONTACTS = [
  ["Aina Rahman", "aina.rahman@example.com", "Saya ingin bertanya tentang status permohonan."],
  ["Farid Azman", "farid.azman@example.com", "Mohon pihak tuan hubungi saya semula."],
  ["Nurul Huda", "nurul.huda@example.com", "Sistem ini mudah digunakan dan paparan jelas."],
  ["Daniel Lee", "daniel.lee@example.com", "Saya mahu kemaskini maklumat perhubungan."],
  ["Siti Aminah", "siti.aminah@example.com", "Terima kasih atas maklum balas yang cepat."],
  ["Zulhilmi Omar", "zulhilmi.omar@example.com", "Boleh saya tahu waktu operasi kaunter?"],
  ["Priya Nair", "priya.nair@example.com", "Saya perlukan bantuan untuk semakan rekod."],
  ["Hakim Roslan", "hakim.roslan@example.com", "Mohon panduan untuk hantar dokumen sokongan."],
  ["Mei Ling", "mei.ling@example.com", "Adakah borang ini boleh digunakan untuk semua pertanyaan?"],
  ["Irfan Hakimi", "irfan.hakimi@example.com", "Saya sudah hantar mesej dan menunggu balasan."]
];

const DUMMY_SESSIONS = [
  { username: "admin", token: "dummy-expired-admin-token", expiredDaysAgo: 14 },
  { username: "pengguna", token: "dummy-expired-user-token", expiredDaysAgo: 13 },
  { username: "test.pentadbir@example.com", token: "dummy-expired-admin-2-token", expiredDaysAgo: 12 },
  { username: "test.pengguna@example.com", token: "dummy-expired-user-2-token", expiredDaysAgo: 11 },
  { username: "aina.admin@example.com", token: "dummy-expired-admin-3-token", expiredDaysAgo: 10 },
  { username: "farid.user@example.com", token: "dummy-expired-user-3-token", expiredDaysAgo: 9 },
  { username: "nurul.user@example.com", token: "dummy-expired-user-4-token", expiredDaysAgo: 8 },
  { username: "daniel.admin@example.com", token: "dummy-expired-admin-4-token", expiredDaysAgo: 7 },
  { username: "siti.user@example.com", token: "dummy-expired-user-5-token", expiredDaysAgo: 6 },
  { username: "hakim.user@example.com", token: "dummy-expired-user-6-token", expiredDaysAgo: 5 }
];

const DUMMY_SETTINGS = [
  ["jabatan_demo", "Unit Perkhidmatan Pelanggan"],
  ["alamat_demo", "Aras 1, Blok Pentadbiran, Putrajaya"],
  ["telefon_demo", "03-8000 8000"],
  ["emel_demo", "bantuan@example.com"],
  ["waktu_operasi_demo", "Isnin hingga Jumaat, 8:30 pagi - 5:30 petang"],
  ["tema_demo", "Light Bento"],
  ["bahasa_demo", "Bahasa Melayu"],
  ["mod_latihan_demo", "true"],
  ["nota_demo", "Data ini dijana automatik untuk tujuan testing."],
  ["versi_demo", "1.0.0"]
];

// =========== POST (fire-and-forget; response is opaque) ===========
// form.html must keep using POST + mode:"no-cors" without headers.
function doPost(e) {
  try {
    ensureSheets_();
    const body = parseBody_(e);
    if (isV2MutationAction_(body.action)) return handleV2Mutation_(body);
    if (body.action === "findings.create.legacy") {
      return saveFindingMutation_(body);
    }
    if (body.action === "contacts.update") return updateContact(body);
    if (body.action === "contacts.delete") return deleteContact(body);
    return saveContact(body);
  } catch (err) {
    console.error(err);
    return json({ ok: false, error: "server error" });
  }
}

// =========== GET (returns data the browser can read) ===========
function doGet(e) {
  try {
    ensureSheets_();
    const p = e.parameter || {};

    // PUBLIC: no token required
    if (p.action === "config") return getConfig();
    if (p.action === "config.get") return getConfig();
    if (p.action === "riskMatrix.get") return getRiskMatrix();
    if (p.action === "login") return login(p);
    if (p.action === "register") return register(p);

    // PROTECTED: token required
    const user = validateToken(p.token);
    if (!user) return json({ ok: false, error: "invalid token" });

    if (p.action === "getContacts") return getContacts(user);
    if (p.action === "mutations.status") return getMutationStatus(p.requestId || p.request_id, user);
    const v2Response = routeV2Get_(p, user);
    if (v2Response) return v2Response;

    return json({ ok: false, error: "unknown action" });
  } catch (err) {
    console.error(err);
    return json({ ok: false, error: "server error" });
  }
}

// Run this manually once from Apps Script if you want to force setup immediately.
// Normal web requests also call ensureSheets_() automatically.
function setup() {
  clearSetupCache_();
  ensureSheets_();
  return `${APP_NAME} setup complete. Legacy sheets and SPRAD V2 foundation sheets are ready.`;
}

// =========== ACTIONS ===========
function getConfig() {
  return json({
    ok: true,
    data: {
      app_name: APP_NAME,
      schema_version: "2.1-blueprint-foundation",
      logo_url: LOGO_URL,
      favicon_url: FAVICON_URL,
      legacy_roles: [ROLE_ADMIN, ROLE_USER],
      v2_roles: [ROLE_SUPER_ADMIN, ROLE_INSTITUTION_ADMIN, ROLE_AUDITOR, ROLE_REVIEWER, ROLE_VIEWER],
      allow_public_admin_register: ALLOW_PUBLIC_ADMIN_REGISTER
    },
    app_name: APP_NAME,
    logo_url: LOGO_URL,
    favicon_url: FAVICON_URL,
    roles: [ROLE_ADMIN, ROLE_USER]
  });
}

function saveContact({ name, email, message }) {
  const contact = {
    name: clean_(name),
    email: clean_(email),
    message: clean_(message)
  };

  if (!contact.name || !contact.email || !contact.message) {
    return json({ ok: false, error: "missing fields" });
  }

  appendLegacyContact_(contact);

  return json({ ok: true });
}

function saveFindingMutation_(body) {
  const requestId = clean_(body.request_id || body.requestId || Utilities.getUuid());
  const existingReceipt = findMutationReceipt_(requestId);
  if (existingReceipt) return json({ ok: existingReceipt.status === "success", receipt: existingReceipt });

  const token = clean_(body.token);
  const user = validateToken(token);
  if (!user) {
    writeMutationReceipt_({
      requestId,
      userId: "",
      institutionId: DEFAULT_INSTITUTION_ID,
      action: clean_(body.action),
      entityType: "finding",
      entityId: "",
      status: "error",
      errorCode: "INVALID_TOKEN",
      errorMessage: "invalid token"
    });
    return json({ ok: false, error: "invalid token" });
  }

  const lock = LockService.getScriptLock();
  lock.waitLock(5000);

  try {
    const repeatedReceipt = findMutationReceipt_(requestId);
    if (repeatedReceipt) return json({ ok: repeatedReceipt.status === "success", receipt: repeatedReceipt });

    const risk = calculateRisk_(body.likelihood, body.impact);
    const now = new Date();
    const findingId = Utilities.getUuid();
    const categoryId = findRiskCategoryIdByName_(body.risk_category) || clean_(body.risk_category);
    const findingNo = `SPRAD-${Utilities.formatDate(now, Session.getScriptTimeZone(), "yyyyMMdd-HHmmss")}`;

    const finding = [
      findingId,
      DEFAULT_INSTITUTION_ID,
      clean_(body.audit_cycle),
      "",
      categoryId,
      findingNo,
      clean_(body.finding_title),
      clean_(body.message),
      clean_(body.message),
      clean_(body.root_cause),
      clean_(body.impact_description),
      clean_(body.audit_evidence),
      clean_(body.recommendation),
      risk.likelihood,
      risk.impact,
      risk.score,
      risk.levelId,
      risk.levelId,
      "",
      "draft",
      "",
      now,
      user.id,
      now,
      user.id,
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      1
    ];

    SpreadsheetApp.getActiveSpreadsheet()
      .getSheetByName(SHEET_FINDINGS)
      .appendRow(finding);

    if (clean_(body.org_unit)) {
      SpreadsheetApp.getActiveSpreadsheet()
        .getSheetByName(SHEET_FINDING_UNITS)
        .appendRow([Utilities.getUuid(), DEFAULT_INSTITUTION_ID, findingId, clean_(body.org_unit), now, user.id]);
    }

    appendLegacyContact_({
      name: clean_(body.name),
      email: clean_(body.email),
      message: clean_(body.message)
    });

    appendAuditLog_({
      institutionId: DEFAULT_INSTITUTION_ID,
      userId: user.id,
      action: "findings.create",
      entityType: "finding",
      entityId: findingId,
      requestId,
      beforeJson: "",
      afterJson: JSON.stringify({ finding_id: findingId, calculated_score: risk.score, calculated_level: risk.levelLabel })
    });

    writeMutationReceipt_({
      requestId,
      userId: user.id,
      institutionId: DEFAULT_INSTITUTION_ID,
      action: "findings.create",
      entityType: "finding",
      entityId: findingId,
      status: "success",
      errorCode: "",
      errorMessage: ""
    });

    return json({ ok: true, request_id: requestId, finding_id: findingId });
  } catch (err) {
    writeMutationReceipt_({
      requestId,
      userId: user ? user.id : "",
      institutionId: DEFAULT_INSTITUTION_ID,
      action: clean_(body.action),
      entityType: "finding",
      entityId: "",
      status: "error",
      errorCode: "SERVER_ERROR",
      errorMessage: err.message
    });
    throw err;
  } finally {
    lock.releaseLock();
  }
}

function register({ username, password, role }) {
  const user = {
    username: clean_(username),
    password: String(password || ""),
    role: normalizeRole_(role, ROLE_USER)
  };

  if (!ALLOW_PUBLIC_ADMIN_REGISTER && user.role === ROLE_ADMIN) {
    user.role = ROLE_USER;
  }

  if (!user.username || !user.password) {
    return json({ ok: false, error: "missing fields" });
  }

  if (user.password.length < 8) {
    return json({ ok: false, error: "Kata laluan mesti sekurang-kurangnya 8 aksara." });
  }

  const lock = LockService.getScriptLock();
  lock.waitLock(5000);

  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_USERS);
    const rows = sheet.getDataRange().getValues();
    const duplicate = rows
      .slice(1)
      .some(row => clean_(row[1]).toLowerCase() === user.username.toLowerCase());

    if (duplicate) {
      return json({ ok: false, error: "username exists" });
    }

    const id = Utilities.getUuid();
    sheet.appendRow([id, user.username, hashPassword_(user.password), user.role, new Date()]);
    const rowNumber = sheet.getLastRow();
    setExtraField_(sheet, rowNumber, "institution_id", DEFAULT_INSTITUTION_ID);
    setExtraField_(sheet, rowNumber, "display_name", user.username);
    setExtraField_(sheet, rowNumber, "status", "active");
    setExtraField_(sheet, rowNumber, "updated_at", nowIso_());
    setExtraField_(sheet, rowNumber, "updated_by", "public_register");

    return json({
      ok: true,
      user: { id, username: user.username, role: user.role }
    });
  } finally {
    lock.releaseLock();
  }
}

function login({ username, password }) {
  username = clean_(username);
  password = String(password || "");

  if (!username || !password) {
    return json({ ok: false, error: "missing credentials" });
  }

  if (isLoginRateLimited_(username)) {
    return json({ ok: false, error: "Terlalu banyak cubaan log masuk. Sila cuba semula dalam 10 minit." });
  }

  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const usersSheet = ss.getSheetByName(SHEET_USERS);
  const rows = usersSheet.getDataRange().getValues();

  for (let i = 1; i < rows.length; i++) {
    const row = rows[i];
    const rowNumber = i + 1;
    const userId = row[0];
    const storedUsername = clean_(row[1]);
    const storedPassword = String(row[2] || "");

    if (storedUsername.toLowerCase() !== username.toLowerCase()) continue;
    if (!passwordMatches_(password, storedPassword)) continue;

    const role = normalizeRole_(row[3], ROLE_ADMIN);

    // Upgrade old plain-text passwords and missing roles without breaking login.
    if (storedPassword === password) {
      usersSheet.getRange(rowNumber, 3).setValue(hashPassword_(password));
    }
    if (!row[3]) {
      usersSheet.getRange(rowNumber, 4).setValue(role);
    }

    clearLoginAttempts_(username);

    const token = Utilities.getUuid();
    const expires = new Date(Date.now() + SESSION_DAYS * 24 * 60 * 60 * 1000);
    const sessionSheet = ss.getSheetByName(SHEET_SESSIONS);
    const sessionHeaders = getSheetHeaders_(sessionSheet);
    const sessionRecord = {
      token,
      user_id: userId,
      expires,
      created_at: new Date(),
      token_hash: hashPassword_(token),
      institution_id: getUserInstitutionId_(userId),
      role,
      last_seen_at: nowIso_(),
      revoked_at: ""
    };
    sessionSheet.appendRow(sessionHeaders.map(header => sessionRecord[header] !== undefined ? sessionRecord[header] : ""));
    cleanupExpiredSessions_();

    return json({
      ok: true,
      token,
      role,
      v2_role: normalizeV2Role_(role),
      user_id: userId,
      institution_id: sessionRecord.institution_id,
      username: storedUsername,
      app_name: APP_NAME,
      logo_url: LOGO_URL
    });
  }

  recordFailedLogin_(username);
  return json({ ok: false, error: "Nama pengguna atau kata laluan salah." });
}

function validateToken(token) {
  token = clean_(token);
  if (!token) return null;

  const rows = SpreadsheetApp.getActiveSpreadsheet()
    .getSheetByName(SHEET_SESSIONS)
    .getDataRange()
    .getValues();

  const now = new Date();
  const tokenHash = hashPassword_(token);
  for (let i = 1; i < rows.length; i++) {
    const headers = rows[0].map(header => clean_(header));
    const storedToken = String(rows[i][headers.indexOf("token")] || "");
    const storedTokenHash = String(rows[i][headers.indexOf("token_hash")] || "");
    const userId = rows[i][headers.indexOf("user_id")];
    const expires = rows[i][headers.indexOf("expires")];
    const revokedAt = headers.indexOf("revoked_at") === -1 ? "" : rows[i][headers.indexOf("revoked_at")];
    if (!revokedAt && (storedToken === token || storedTokenHash === tokenHash) && new Date(expires) > now) {
      return findUserById_(userId);
    }
  }
  return null;
}

function getContacts(user) {
  if (user.role !== ROLE_ADMIN) {
    return json({ ok: false, error: "forbidden" });
  }

  fixMisalignedContactRows_();

  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_CONTACTS);
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) {
    return json({ ok: true, contacts: [] });
  }

  const rows = sheet
    .getRange(2, 1, lastRow - 1, HEADERS.contacts.length)
    .getValues();

  const contacts = rows
    .filter(row => row.some(value => value !== ""))
    .map(row => Object.fromEntries(
      HEADERS.contacts.map((header, index) => [header, formatValue_(row[index])])
    ));

  return json({ ok: true, contacts });
}

function updateContact(body) {
  const mutation = contactMutationContext_(body, "contacts.update");
  const existingReceipt = findMutationReceipt_(mutation.requestId);
  if (existingReceipt) return json({ ok: existingReceipt.status === "success", receipt: existingReceipt });

  const user = validateToken(body.token);
  if (!user) return contactMutationError_(mutation, "", "", "INVALID_TOKEN", "invalid token");
  if (user.role !== ROLE_ADMIN) return contactMutationError_(mutation, user.id, "", "FORBIDDEN", "forbidden");
  const payload = mutation.payload;

  const contact = {
    id: clean_(payload.id),
    name: clean_(payload.name),
    email: clean_(payload.email),
    message: clean_(payload.message)
  };

  if (!contact.id) return contactMutationError_(mutation, user.id, "", "MISSING_ID", "missing id");
  if (!contact.name || !contact.email || !contact.message) {
    return contactMutationError_(mutation, user.id, contact.id, "MISSING_FIELDS", "missing fields");
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email)) {
    return contactMutationError_(mutation, user.id, contact.id, "INVALID_EMAIL", "invalid email");
  }

  const lock = LockService.getScriptLock();
  lock.waitLock(5000);

  try {
    const repeatedReceipt = findMutationReceipt_(mutation.requestId);
    if (repeatedReceipt) return json({ ok: repeatedReceipt.status === "success", receipt: repeatedReceipt });

    fixMisalignedContactRows_();
    const found = findContactRowById_(contact.id);
    if (!found) return contactMutationError_(mutation, user.id, contact.id, "CONTACT_NOT_FOUND", "contact not found");

    const beforeJson = JSON.stringify(contactRowToObject_(found.values));
    found.sheet
      .getRange(found.rowNumber, 2, 1, 3)
      .setValues([[contact.name, contact.email, contact.message]]);

    appendAuditLog_({
      institutionId: DEFAULT_INSTITUTION_ID,
      userId: user.id,
      action: "contacts.update",
      entityType: "contact",
      entityId: contact.id,
      requestId: mutation.requestId,
      beforeJson,
      afterJson: JSON.stringify(contact)
    });

    writeMutationReceipt_({
      requestId: mutation.requestId,
      userId: user.id,
      institutionId: DEFAULT_INSTITUTION_ID,
      action: mutation.action,
      entityType: "contact",
      entityId: contact.id,
      status: "success",
      errorCode: "",
      errorMessage: ""
    });

    return json({
      ok: true,
      receipt: findMutationReceipt_(mutation.requestId),
      contact: {
        ...contact,
        created_at: formatValue_(found.values[4])
      }
    });
  } catch (err) {
    contactMutationError_(mutation, user.id, contact.id, "SERVER_ERROR", err.message);
    throw err;
  } finally {
    lock.releaseLock();
  }
}

function deleteContact(body) {
  const mutation = contactMutationContext_(body, "contacts.delete");
  const existingReceipt = findMutationReceipt_(mutation.requestId);
  if (existingReceipt) return json({ ok: existingReceipt.status === "success", receipt: existingReceipt });

  const user = validateToken(body.token);
  if (!user) return contactMutationError_(mutation, "", "", "INVALID_TOKEN", "invalid token");
  if (user.role !== ROLE_ADMIN) return contactMutationError_(mutation, user.id, "", "FORBIDDEN", "forbidden");

  const payload = mutation.payload;
  const id = clean_(payload.id);
  if (!id) return contactMutationError_(mutation, user.id, "", "MISSING_ID", "missing id");

  const lock = LockService.getScriptLock();
  lock.waitLock(5000);

  try {
    const repeatedReceipt = findMutationReceipt_(mutation.requestId);
    if (repeatedReceipt) return json({ ok: repeatedReceipt.status === "success", receipt: repeatedReceipt });

    fixMisalignedContactRows_();
    const found = findContactRowById_(id);
    if (!found) return contactMutationError_(mutation, user.id, id, "CONTACT_NOT_FOUND", "contact not found");

    const beforeJson = JSON.stringify(contactRowToObject_(found.values));
    found.sheet.deleteRow(found.rowNumber);

    appendAuditLog_({
      institutionId: DEFAULT_INSTITUTION_ID,
      userId: user.id,
      action: "contacts.delete",
      entityType: "contact",
      entityId: id,
      requestId: mutation.requestId,
      beforeJson,
      afterJson: ""
    });

    writeMutationReceipt_({
      requestId: mutation.requestId,
      userId: user.id,
      institutionId: DEFAULT_INSTITUTION_ID,
      action: mutation.action,
      entityType: "contact",
      entityId: id,
      status: "success",
      errorCode: "",
      errorMessage: ""
    });

    return json({ ok: true, receipt: findMutationReceipt_(mutation.requestId), id });
  } catch (err) {
    contactMutationError_(mutation, user.id, id, "SERVER_ERROR", err.message);
    throw err;
  } finally {
    lock.releaseLock();
  }
}

function getRiskMatrix() {
  return json({
    ok: true,
    data: getRiskMatrixData_()
  });
}

function getMutationStatus(requestId, user) {
  requestId = clean_(requestId);
  if (!requestId) return json({ ok: false, error: "missing requestId" });

  const receipt = findMutationReceipt_(requestId);
  if (!receipt || receipt.user_id !== user.id) {
    return json({ ok: false, error: "receipt not found" });
  }

  return json({ ok: true, receipt });
}

function routeV2Get_(p, user) {
  const action = clean_(p.action);
  if (action === "auth.me") return apiOk_({ user: publicUser_(user) });
  if (action === "auth.logout") return logoutSession_(p.token, user);
  if (action === "institutions.list") return listInstitutions_(user);
  if (action === "institutions.get") return getInstitution_(user, p.id || p.institution_id);
  if (action === "orgUnits.list") return listTenantRecords_(SHEET_ORG_UNITS, user, p);
  if (action === "users.list") return listUsers_(user, p);
  if (action === "auditCycles.list") return listTenantRecords_(SHEET_AUDIT_CYCLES, user, p);
  if (action === "audits.list") return listTenantRecords_(SHEET_AUDITS, user, p);
  if (action === "riskCategories.list") return listTenantRecords_(SHEET_RISK_CATEGORIES, user, p);
  if (action === "findings.list") return listFindings_(user, p);
  if (action === "findings.get") return getFinding_(user, p.id);
  if (action === "correctiveActions.list") return listCorrectiveActions_(user, p);
  if (action === "dashboard.summary") return getDashboardSummary_(user, p);
  if (action === "reports.dataset") return getReportDataset_(user, p);
  return null;
}

function isV2MutationAction_(action) {
  return [
    "institutions.create",
    "institutions.update",
    "institutions.delete",
    "institutions.restore",
    "orgUnits.create",
    "orgUnits.update",
    "orgUnits.delete",
    "auditCycles.create",
    "auditCycles.update",
    "auditCycles.finalize",
    "audits.create",
    "audits.update",
    "findings.create",
    "findings.update",
    "findings.delete",
    "findings.restore",
    "findings.submit",
    "findings.return",
    "findings.approve",
    "findings.overrideLevel",
    "correctiveActions.create",
    "correctiveActions.update",
    "correctiveActions.submitForVerification",
    "correctiveActions.verify",
    "users.create",
    "users.update",
    "users.deactivate",
    "settings.update"
  ].indexOf(clean_(action)) !== -1;
}

function handleV2Mutation_(body) {
  const action = clean_(body.action);
  const payload = body.payload && typeof body.payload === "object" ? body.payload : body;
  const requestId = clean_(body.request_id || body.requestId || payload.request_id || payload.requestId || Utilities.getUuid());
  const existingReceipt = findMutationReceipt_(requestId);
  if (existingReceipt) return json({ ok: existingReceipt.status === "success", receipt: existingReceipt });

  const user = validateToken(body.token);
  if (!user) {
    writeMutationReceipt_({
      requestId,
      userId: "",
      institutionId: DEFAULT_INSTITUTION_ID,
      action,
      entityType: mutationEntityType_(action),
      entityId: clean_(payload.id),
      status: "error",
      errorCode: "INVALID_TOKEN",
      errorMessage: "invalid token"
    });
    return json({ ok: false, error: "invalid token", request_id: requestId });
  }

  const lock = LockService.getScriptLock();
  lock.waitLock(10000);

  try {
    const repeatedReceipt = findMutationReceipt_(requestId);
    if (repeatedReceipt) return json({ ok: repeatedReceipt.status === "success", receipt: repeatedReceipt });

    const result = performV2Mutation_(action, payload, user, requestId);
    writeMutationReceipt_({
      requestId,
      userId: user.id,
      institutionId: result.institution_id || user.institution_id || DEFAULT_INSTITUTION_ID,
      action,
      entityType: result.entity_type || mutationEntityType_(action),
      entityId: result.entity_id || clean_(payload.id),
      status: "success",
      errorCode: "",
      errorMessage: ""
    });
    return json({ ok: true, request_id: requestId, receipt: findMutationReceipt_(requestId), data: result.data || {} });
  } catch (err) {
    writeMutationReceipt_({
      requestId,
      userId: user.id,
      institutionId: user.institution_id || DEFAULT_INSTITUTION_ID,
      action,
      entityType: mutationEntityType_(action),
      entityId: clean_(payload.id),
      status: "error",
      errorCode: err.code || "MUTATION_ERROR",
      errorMessage: err.message
    });
    return json({ ok: false, error: err.message, request_id: requestId });
  } finally {
    lock.releaseLock();
  }
}

function performV2Mutation_(action, payload, user, requestId) {
  if (action.indexOf("institutions.") === 0) return mutateInstitution_(action, payload, user, requestId);
  if (action.indexOf("orgUnits.") === 0) return mutateOrgUnit_(action, payload, user, requestId);
  if (action.indexOf("auditCycles.") === 0) return mutateAuditCycle_(action, payload, user, requestId);
  if (action.indexOf("audits.") === 0) return mutateAudit_(action, payload, user, requestId);
  if (action.indexOf("findings.") === 0) return mutateFinding_(action, payload, user, requestId);
  if (action.indexOf("correctiveActions.") === 0) return mutateCorrectiveAction_(action, payload, user, requestId);
  if (action.indexOf("users.") === 0) return mutateUser_(action, payload, user, requestId);
  if (action === "settings.update") return mutateSetting_(payload, user, requestId);
  throw appError_("UNKNOWN_ACTION", "unknown action");
}

function mutationEntityType_(action) {
  if (action.indexOf("institutions.") === 0) return "institution";
  if (action.indexOf("orgUnits.") === 0) return "org_unit";
  if (action.indexOf("auditCycles.") === 0) return "audit_cycle";
  if (action.indexOf("audits.") === 0) return "audit";
  if (action.indexOf("findings.") === 0) return "finding";
  if (action.indexOf("correctiveActions.") === 0) return "corrective_action";
  if (action.indexOf("users.") === 0) return "user";
  if (action.indexOf("settings.") === 0) return "setting";
  return "record";
}

function listInstitutions_(user) {
  const records = getSheetObjects_(SHEET_INSTITUTIONS)
    .filter(record => !record.deleted_at)
    .filter(record => isSuperAdmin_(user) || record.id === user.institution_id);
  return apiOk_({ institutions: records });
}

function getInstitution_(user, institutionId) {
  const record = getRecordById_(SHEET_INSTITUTIONS, institutionId || user.institution_id);
  if (!record || record.deleted_at) return apiError_("NOT_FOUND", "Institusi tidak ditemui.");
  if (!canAccessInstitution_(user, record.id)) return apiError_("FORBIDDEN", "forbidden");
  return apiOk_({ institution: record });
}

function listTenantRecords_(sheetName, user, p) {
  const records = getSheetObjects_(sheetName)
    .filter(record => !record.deleted_at)
    .filter(record => tenantFilter_(record, user))
    .filter(record => !p.status || String(record.status || "") === String(p.status));
  return apiOk_({ records });
}

function listUsers_(user, p) {
  if (!roleCan_(user, [ROLE_SUPER_ADMIN, ROLE_INSTITUTION_ADMIN])) {
    return apiError_("FORBIDDEN", "forbidden");
  }
  const records = getSheetObjects_(SHEET_USERS)
    .map(userRecordFromRowObject_)
    .filter(record => !record.deactivated_at)
    .filter(record => tenantFilter_(record, user))
    .filter(record => !p.role || normalizeV2Role_(record.role) === normalizeV2Role_(p.role))
    .map(sanitizeUserRecord_);
  return apiOk_({ users: records });
}

function listFindings_(user, p) {
  const records = getFindingsForUser_(user, p);
  return apiOk_({ findings: records });
}

function getFinding_(user, id) {
  const finding = getRecordById_(SHEET_FINDINGS, id);
  if (!finding || finding.deleted_at) return apiError_("NOT_FOUND", "Penemuan tidak ditemui.");
  if (!tenantFilter_(finding, user)) return apiError_("FORBIDDEN", "forbidden");
  const units = getSheetObjects_(SHEET_FINDING_UNITS)
    .filter(record => record.finding_id === finding.id && tenantFilter_(record, user));
  const actions = getSheetObjects_(SHEET_CORRECTIVE_ACTIONS)
    .filter(record => record.finding_id === finding.id && !record.deleted_at && tenantFilter_(record, user));
  return apiOk_({ finding, units, actions });
}

function listCorrectiveActions_(user, p) {
  const records = getSheetObjects_(SHEET_CORRECTIVE_ACTIONS)
    .filter(record => !record.deleted_at)
    .filter(record => tenantFilter_(record, user))
    .filter(record => !p.finding_id || record.finding_id === p.finding_id)
    .map(record => ({
      ...record,
      overdue: isCorrectiveActionOverdue_(record)
    }));
  return apiOk_({ corrective_actions: records });
}

function getDashboardSummary_(user, p) {
  const findings = getFindingsForUser_(user, p);
  const actions = getSheetObjects_(SHEET_CORRECTIVE_ACTIONS)
    .filter(record => !record.deleted_at)
    .filter(record => tenantFilter_(record, user));
  const levels = getRiskLevelMap_();
  const levelLabels = ["Kritikal", "Tinggi", "Sederhana", "Rendah"];
  const counts = { Kritikal: 0, Tinggi: 0, Sederhana: 0, Rendah: 0 };
  let scoreTotal = 0;

  findings.forEach(finding => {
    const level = levels.get(finding.final_level_id || finding.calculated_level_id);
    if (level && counts[level.label] !== undefined) counts[level.label] += 1;
    scoreTotal += Number(finding.calculated_score || 0);
  });

  const total = findings.length;
  const highCritical = counts.Kritikal + counts.Tinggi;
  const overall = chooseOverallRiskLevel_(counts);
  const categorySummary = summarizeCategories_(findings, levels);

  return apiOk_({
    summary: {
      total_findings: total,
      counts,
      high_critical_count: highCritical,
      high_critical_percent: total ? Math.round((highCritical / total) * 100) : 0,
      average_score: total ? Number((scoreTotal / total).toFixed(2)) : 0,
      overall_level: overall,
      unreviewed: findings.filter(finding => ["draft", "submitted", "returned"].indexOf(finding.workflow_status) !== -1).length,
      overdue_actions: actions.filter(isCorrectiveActionOverdue_).length,
      awaiting_verification: actions.filter(action => action.status === "awaiting_verification").length,
      level_order: levelLabels,
      categories: categorySummary
    }
  });
}

function getReportDataset_(user, p) {
  const findings = getFindingsForUser_(user, { ...p, workflow_status: p.include_draft === "true" ? "" : "approved" });
  const levels = getRiskLevelMap_();
  const institution = getRecordById_(SHEET_INSTITUTIONS, user.institution_id) || {};
  const actions = getSheetObjects_(SHEET_CORRECTIVE_ACTIONS)
    .filter(record => !record.deleted_at)
    .filter(record => tenantFilter_(record, user));
  return apiOk_({
    report: {
      institution,
      generated_at: nowIso_(),
      findings,
      risk_matrix: getRiskMatrixData_(),
      overall: getDashboardSummaryObject_(findings, actions, levels),
      categories: summarizeCategories_(findings, levels),
      actions
    }
  });
}

function mutateInstitution_(action, payload, user, requestId) {
  if (!isSuperAdmin_(user)) throw appError_("FORBIDDEN", "Hanya super admin boleh mengurus institusi.");
  if (action === "institutions.create") {
    const now = nowIso_();
    const id = clean_(payload.id) || `inst_${Utilities.getUuid()}`;
    const record = {
      id,
      code: required_(payload.code, "Kod institusi"),
      name: required_(payload.name, "Nama institusi"),
      short_name: clean_(payload.short_name || payload.code),
      ministry: clean_(payload.ministry),
      address: clean_(payload.address),
      logo_url: clean_(payload.logo_url || LOGO_URL),
      report_title: clean_(payload.report_title || "Analisis Penilaian Risiko Audit Dalam"),
      status: clean_(payload.status || "active"),
      created_at: now,
      created_by: user.id,
      updated_at: now,
      updated_by: user.id,
      deleted_at: "",
      deleted_by: ""
    };
    appendRecord_(SHEET_INSTITUTIONS, record);
    auditChange_(user, "institutions.create", "institution", id, requestId, "", record);
    return mutationResult_("institution", id, record);
  }

  const id = required_(payload.id, "ID institusi");
  const before = requireRecordForMutation_(SHEET_INSTITUTIONS, id, user);
  if (action === "institutions.delete") {
    const after = softDeleteRecord_(SHEET_INSTITUTIONS, id, user);
    auditChange_(user, action, "institution", id, requestId, before, after);
    return mutationResult_("institution", id, after);
  }
  if (action === "institutions.restore") {
    const after = restoreRecord_(SHEET_INSTITUTIONS, id, user);
    auditChange_(user, action, "institution", id, requestId, before, after);
    return mutationResult_("institution", id, after);
  }

  const after = updateRecord_(SHEET_INSTITUTIONS, id, {
    code: clean_(payload.code || before.code),
    name: clean_(payload.name || before.name),
    short_name: clean_(payload.short_name || before.short_name),
    ministry: clean_(payload.ministry || before.ministry),
    address: clean_(payload.address || before.address),
    logo_url: clean_(payload.logo_url || before.logo_url),
    report_title: clean_(payload.report_title || before.report_title),
    status: clean_(payload.status || before.status || "active"),
    updated_at: nowIso_(),
    updated_by: user.id
  });
  auditChange_(user, action, "institution", id, requestId, before, after);
  return mutationResult_("institution", id, after);
}

function mutateOrgUnit_(action, payload, user, requestId) {
  requireRole_(user, [ROLE_SUPER_ADMIN, ROLE_INSTITUTION_ADMIN]);
  const sheetName = SHEET_ORG_UNITS;
  if (action === "orgUnits.create") {
    const now = nowIso_();
    const institutionId = scopedInstitutionId_(payload, user);
    const id = clean_(payload.id) || `unit_${Utilities.getUuid()}`;
    const record = {
      id,
      institution_id: institutionId,
      code: required_(payload.code, "Kod PTJ"),
      name: required_(payload.name, "Nama PTJ"),
      unit_type: clean_(payload.unit_type || "Unit"),
      parent_unit_id: clean_(payload.parent_unit_id),
      status: clean_(payload.status || "active"),
      created_at: now,
      created_by: user.id,
      updated_at: now,
      updated_by: user.id,
      deleted_at: "",
      deleted_by: ""
    };
    appendRecord_(sheetName, record);
    auditChange_(user, action, "org_unit", id, requestId, "", record);
    return mutationResult_("org_unit", id, record, institutionId);
  }
  return mutateTenantSoftRecord_(action, payload, user, requestId, sheetName, "org_unit", {
    code: "Kod PTJ",
    name: "Nama PTJ",
    unit_type: "Unit"
  });
}

function mutateAuditCycle_(action, payload, user, requestId) {
  requireRole_(user, [ROLE_SUPER_ADMIN, ROLE_INSTITUTION_ADMIN]);
  const sheetName = SHEET_AUDIT_CYCLES;
  if (action === "auditCycles.create") {
    const now = nowIso_();
    const institutionId = scopedInstitutionId_(payload, user);
    const id = clean_(payload.id) || `cycle_${Utilities.getUuid()}`;
    const record = {
      id,
      institution_id: institutionId,
      title: required_(payload.title, "Tajuk kitaran audit"),
      audit_year: clean_(payload.audit_year || new Date().getFullYear()),
      start_date: clean_(payload.start_date),
      end_date: clean_(payload.end_date),
      status: clean_(payload.status || "open"),
      report_reference: clean_(payload.report_reference),
      finalized_at: "",
      finalized_by: "",
      created_at: now,
      created_by: user.id,
      updated_at: now,
      updated_by: user.id,
      deleted_at: "",
      deleted_by: ""
    };
    appendRecord_(sheetName, record);
    auditChange_(user, action, "audit_cycle", id, requestId, "", record);
    return mutationResult_("audit_cycle", id, record, institutionId);
  }
  const id = required_(payload.id, "ID kitaran audit");
  const before = requireRecordForMutation_(sheetName, id, user);
  if (action === "auditCycles.finalize") {
    const after = updateRecord_(sheetName, id, {
      status: "finalized",
      finalized_at: nowIso_(),
      finalized_by: user.id,
      updated_at: nowIso_(),
      updated_by: user.id
    });
    auditChange_(user, action, "audit_cycle", id, requestId, before, after);
    return mutationResult_("audit_cycle", id, after, before.institution_id);
  }
  return mutateTenantSoftRecord_(action, payload, user, requestId, sheetName, "audit_cycle", {
    title: "Tajuk kitaran audit",
    audit_year: "Tahun audit",
    status: "open"
  });
}

function mutateAudit_(action, payload, user, requestId) {
  requireRole_(user, [ROLE_SUPER_ADMIN, ROLE_INSTITUTION_ADMIN]);
  const sheetName = SHEET_AUDITS;
  if (action === "audits.create") {
    const now = nowIso_();
    const institutionId = scopedInstitutionId_(payload, user);
    const id = clean_(payload.id) || `audit_${Utilities.getUuid()}`;
    const record = {
      id,
      institution_id: institutionId,
      cycle_id: required_(payload.cycle_id, "Kitaran audit"),
      audit_code: required_(payload.audit_code, "Kod audit"),
      title: required_(payload.title, "Tajuk audit"),
      scope: clean_(payload.scope),
      objective: clean_(payload.objective),
      lead_auditor_user_id: clean_(payload.lead_auditor_user_id || user.id),
      start_date: clean_(payload.start_date),
      end_date: clean_(payload.end_date),
      status: clean_(payload.status || "open"),
      created_at: now,
      created_by: user.id,
      updated_at: now,
      updated_by: user.id,
      deleted_at: "",
      deleted_by: ""
    };
    appendRecord_(sheetName, record);
    auditChange_(user, action, "audit", id, requestId, "", record);
    return mutationResult_("audit", id, record, institutionId);
  }
  return mutateTenantSoftRecord_(action, payload, user, requestId, sheetName, "audit", {
    audit_code: "Kod audit",
    title: "Tajuk audit",
    status: "open"
  });
}

function mutateFinding_(action, payload, user, requestId) {
  const sheetName = SHEET_FINDINGS;
  if (action === "findings.create") {
    requireRole_(user, [ROLE_SUPER_ADMIN, ROLE_INSTITUTION_ADMIN, ROLE_AUDITOR, ROLE_REVIEWER]);
    const now = nowIso_();
    const institutionId = scopedInstitutionId_(payload, user);
    const risk = calculateRisk_(payload.likelihood, payload.impact);
    const id = clean_(payload.id) || `finding_${Utilities.getUuid()}`;
    const record = {
      id,
      institution_id: institutionId,
      cycle_id: required_(payload.cycle_id, "Kitaran audit"),
      audit_id: clean_(payload.audit_id),
      category_id: required_(payload.category_id || findRiskCategoryIdByName_(payload.risk_category), "Kategori risiko"),
      finding_no: clean_(payload.finding_no || nextFindingNo_()),
      title: required_(payload.title || payload.finding_title, "Tajuk isu"),
      issue_description: required_(payload.issue_description || payload.message, "Huraian isu"),
      detailed_justification: clean_(payload.detailed_justification || payload.issue_description || payload.message),
      root_cause: clean_(payload.root_cause),
      impact_description: clean_(payload.impact_description),
      audit_evidence: clean_(payload.audit_evidence),
      recommendation: clean_(payload.recommendation),
      likelihood: risk.likelihood,
      impact: risk.impact,
      calculated_score: risk.score,
      calculated_level_id: risk.levelId,
      final_level_id: risk.levelId,
      override_reason: "",
      workflow_status: clean_(payload.workflow_status || "draft"),
      review_note: "",
      created_at: now,
      created_by: user.id,
      updated_at: now,
      updated_by: user.id,
      submitted_at: "",
      submitted_by: "",
      reviewed_at: "",
      reviewed_by: "",
      approved_at: "",
      approved_by: "",
      deleted_at: "",
      deleted_by: "",
      row_version: 1
    };
    appendRecord_(sheetName, record);
    linkFindingUnits_(id, institutionId, payload.unit_ids || payload.unit_id || payload.org_unit, user);
    auditChange_(user, action, "finding", id, requestId, "", record);
    return mutationResult_("finding", id, record, institutionId);
  }

  const id = required_(payload.id, "ID penemuan");
  const before = requireRecordForMutation_(sheetName, id, user);
  ensureCycleIsEditable_(before.cycle_id);

  if (action === "findings.delete") {
    const after = softDeleteRecord_(sheetName, id, user);
    auditChange_(user, action, "finding", id, requestId, before, after);
    return mutationResult_("finding", id, after, before.institution_id);
  }
  if (action === "findings.restore") {
    const after = restoreRecord_(sheetName, id, user);
    auditChange_(user, action, "finding", id, requestId, before, after);
    return mutationResult_("finding", id, after, before.institution_id);
  }
  if (action === "findings.submit") {
    assertCanEditFinding_(user, before);
    const after = updateRecord_(sheetName, id, {
      workflow_status: "submitted",
      submitted_at: nowIso_(),
      submitted_by: user.id,
      updated_at: nowIso_(),
      updated_by: user.id
    });
    auditChange_(user, action, "finding", id, requestId, before, after);
    return mutationResult_("finding", id, after, before.institution_id);
  }
  if (action === "findings.return") {
    requireRole_(user, [ROLE_SUPER_ADMIN, ROLE_INSTITUTION_ADMIN, ROLE_REVIEWER]);
    const after = updateRecord_(sheetName, id, {
      workflow_status: "returned",
      review_note: required_(payload.review_note, "Catatan semakan"),
      reviewed_at: nowIso_(),
      reviewed_by: user.id,
      updated_at: nowIso_(),
      updated_by: user.id
    });
    auditChange_(user, action, "finding", id, requestId, before, after);
    return mutationResult_("finding", id, after, before.institution_id);
  }
  if (action === "findings.approve") {
    requireRole_(user, [ROLE_SUPER_ADMIN, ROLE_INSTITUTION_ADMIN, ROLE_REVIEWER]);
    const after = updateRecord_(sheetName, id, {
      workflow_status: "approved",
      review_note: clean_(payload.review_note || before.review_note),
      reviewed_at: nowIso_(),
      reviewed_by: user.id,
      approved_at: nowIso_(),
      approved_by: user.id,
      updated_at: nowIso_(),
      updated_by: user.id
    });
    auditChange_(user, action, "finding", id, requestId, before, after);
    return mutationResult_("finding", id, after, before.institution_id);
  }
  if (action === "findings.overrideLevel") {
    requireRole_(user, [ROLE_SUPER_ADMIN, ROLE_INSTITUTION_ADMIN, ROLE_REVIEWER]);
    const finalLevelId = required_(payload.final_level_id, "Tahap akhir");
    const reason = required_(payload.override_reason, "Sebab override");
    const after = updateRecord_(sheetName, id, {
      final_level_id: finalLevelId,
      override_reason: reason,
      reviewed_at: nowIso_(),
      reviewed_by: user.id,
      updated_at: nowIso_(),
      updated_by: user.id
    });
    auditChange_(user, action, "finding", id, requestId, before, after);
    return mutationResult_("finding", id, after, before.institution_id);
  }

  assertCanEditFinding_(user, before);
  const risk = calculateRisk_(payload.likelihood || before.likelihood, payload.impact || before.impact);
  const after = updateRecord_(sheetName, id, {
    category_id: clean_(payload.category_id || before.category_id),
    title: clean_(payload.title || before.title),
    issue_description: clean_(payload.issue_description || before.issue_description),
    detailed_justification: clean_(payload.detailed_justification || before.detailed_justification),
    root_cause: clean_(payload.root_cause || before.root_cause),
    impact_description: clean_(payload.impact_description || before.impact_description),
    audit_evidence: clean_(payload.audit_evidence || before.audit_evidence),
    recommendation: clean_(payload.recommendation || before.recommendation),
    likelihood: risk.likelihood,
    impact: risk.impact,
    calculated_score: risk.score,
    calculated_level_id: risk.levelId,
    final_level_id: before.final_level_id || risk.levelId,
    updated_at: nowIso_(),
    updated_by: user.id
  });
  auditChange_(user, action, "finding", id, requestId, before, after);
  return mutationResult_("finding", id, after, before.institution_id);
}

function mutateCorrectiveAction_(action, payload, user, requestId) {
  const sheetName = SHEET_CORRECTIVE_ACTIONS;
  if (action === "correctiveActions.create") {
    requireRole_(user, [ROLE_SUPER_ADMIN, ROLE_INSTITUTION_ADMIN, ROLE_AUDITOR, ROLE_REVIEWER]);
    const now = nowIso_();
    const finding = requireRecordForMutation_(SHEET_FINDINGS, required_(payload.finding_id, "ID penemuan"), user);
    const id = clean_(payload.id) || `action_${Utilities.getUuid()}`;
    const record = {
      id,
      institution_id: finding.institution_id,
      finding_id: finding.id,
      action_text: required_(payload.action_text, "Tindakan"),
      owner_user_id: clean_(payload.owner_user_id),
      owner_name: clean_(payload.owner_name),
      owner_unit_id: clean_(payload.owner_unit_id),
      target_date: clean_(payload.target_date),
      status: clean_(payload.status || "open"),
      progress_percent: Number(payload.progress_percent || 0),
      progress_note: clean_(payload.progress_note),
      completion_evidence: clean_(payload.completion_evidence),
      submitted_for_verification_at: "",
      verified_at: "",
      verified_by: "",
      verification_note: "",
      created_at: now,
      created_by: user.id,
      updated_at: now,
      updated_by: user.id,
      deleted_at: "",
      deleted_by: "",
      row_version: 1
    };
    appendRecord_(sheetName, record);
    auditChange_(user, action, "corrective_action", id, requestId, "", record);
    return mutationResult_("corrective_action", id, record, finding.institution_id);
  }

  const id = required_(payload.id, "ID tindakan");
  const before = requireRecordForMutation_(sheetName, id, user);
  if (action === "correctiveActions.submitForVerification") {
    const after = updateRecord_(sheetName, id, {
      status: "awaiting_verification",
      progress_percent: 100,
      progress_note: clean_(payload.progress_note || before.progress_note),
      completion_evidence: clean_(payload.completion_evidence || before.completion_evidence),
      submitted_for_verification_at: nowIso_(),
      updated_at: nowIso_(),
      updated_by: user.id
    });
    auditChange_(user, action, "corrective_action", id, requestId, before, after);
    return mutationResult_("corrective_action", id, after, before.institution_id);
  }
  if (action === "correctiveActions.verify") {
    requireRole_(user, [ROLE_SUPER_ADMIN, ROLE_INSTITUTION_ADMIN, ROLE_REVIEWER]);
    const after = updateRecord_(sheetName, id, {
      status: clean_(payload.status || "verified"),
      verified_at: nowIso_(),
      verified_by: user.id,
      verification_note: clean_(payload.verification_note),
      updated_at: nowIso_(),
      updated_by: user.id
    });
    auditChange_(user, action, "corrective_action", id, requestId, before, after);
    return mutationResult_("corrective_action", id, after, before.institution_id);
  }
  const after = updateRecord_(sheetName, id, {
    action_text: clean_(payload.action_text || before.action_text),
    owner_user_id: clean_(payload.owner_user_id || before.owner_user_id),
    owner_name: clean_(payload.owner_name || before.owner_name),
    owner_unit_id: clean_(payload.owner_unit_id || before.owner_unit_id),
    target_date: clean_(payload.target_date || before.target_date),
    status: clean_(payload.status || before.status),
    progress_percent: Number(payload.progress_percent || before.progress_percent || 0),
    progress_note: clean_(payload.progress_note || before.progress_note),
    completion_evidence: clean_(payload.completion_evidence || before.completion_evidence),
    updated_at: nowIso_(),
    updated_by: user.id
  });
  auditChange_(user, action, "corrective_action", id, requestId, before, after);
  return mutationResult_("corrective_action", id, after, before.institution_id);
}

function mutateUser_(action, payload, user, requestId) {
  requireRole_(user, [ROLE_SUPER_ADMIN, ROLE_INSTITUTION_ADMIN]);
  if (action === "users.create") {
    const username = required_(payload.username, "Nama pengguna");
    if (findUserIdByUsername_(username)) throw appError_("DUPLICATE_USER", "Nama pengguna sudah wujud.");
    const password = String(payload.password || "");
    if (password.length < 8) throw appError_("VALIDATION_ERROR", "Kata laluan mesti sekurang-kurangnya 8 aksara.");
    const institutionId = scopedInstitutionId_(payload, user);
    const id = clean_(payload.id) || Utilities.getUuid();
    const record = [id, username, hashPassword_(password), normalizeLegacyRoleForClient_(payload.role), nowIso_()];
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_USERS);
    sheet.appendRow(record);
    const rowNumber = sheet.getLastRow();
    setExtraField_(sheet, rowNumber, "institution_id", institutionId);
    setExtraField_(sheet, rowNumber, "display_name", clean_(payload.display_name || username));
    setExtraField_(sheet, rowNumber, "email", clean_(payload.email));
    setExtraField_(sheet, rowNumber, "status", "active");
    setExtraField_(sheet, rowNumber, "updated_at", nowIso_());
    setExtraField_(sheet, rowNumber, "updated_by", user.id);
    const after = userRecordFromRowObject_({ id, username, password: "", role: record[3], created_at: record[4], institution_id: institutionId });
    auditChange_(user, action, "user", id, requestId, "", sanitizeUserRecord_(after));
    return mutationResult_("user", id, sanitizeUserRecord_(after), institutionId);
  }
  const id = required_(payload.id, "ID pengguna");
  const before = findUserMutableRecord_(id);
  if (!before) throw appError_("NOT_FOUND", "Pengguna tidak ditemui.");
  if (!tenantFilter_(before, user)) throw appError_("FORBIDDEN", "forbidden");
  const row = before.row_number;
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_USERS);
  if (action === "users.deactivate") {
    setExtraField_(sheet, row, "deactivated_at", nowIso_());
    setExtraField_(sheet, row, "deactivated_by", user.id);
  } else {
    if (payload.role) sheet.getRange(row, 4).setValue(normalizeLegacyRoleForClient_(payload.role));
    if (payload.password) sheet.getRange(row, 3).setValue(hashPassword_(String(payload.password)));
  }
  const after = findUserMutableRecord_(id);
  auditChange_(user, action, "user", id, requestId, sanitizeUserRecord_(before), sanitizeUserRecord_(after));
  return mutationResult_("user", id, sanitizeUserRecord_(after), after.institution_id);
}

function mutateSetting_(payload, user, requestId) {
  requireRole_(user, [ROLE_SUPER_ADMIN, ROLE_INSTITUTION_ADMIN]);
  const key = required_(payload.key, "Key tetapan");
  const value = clean_(payload.value);
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_SETTINGS);
  const headers = getSheetHeaders_(sheet);
  const rows = sheet.getDataRange().getValues();
  let rowNumber = 0;
  for (let i = 1; i < rows.length; i++) {
    if (String(rows[i][0] || "") === key) rowNumber = i + 1;
  }
  const record = {
    key,
    value,
    scope_type: clean_(payload.scope_type || "institution"),
    scope_id: scopedInstitutionId_(payload, user),
    updated_at: nowIso_(),
    updated_by: user.id
  };
  if (rowNumber) {
    sheet.getRange(rowNumber, 2).setValue(value);
    setOptionalCell_(sheet, headers, rowNumber, "scope_type", record.scope_type);
    setOptionalCell_(sheet, headers, rowNumber, "scope_id", record.scope_id);
    setOptionalCell_(sheet, headers, rowNumber, "updated_at", record.updated_at);
    setOptionalCell_(sheet, headers, rowNumber, "updated_by", record.updated_by);
  } else {
    sheet.appendRow(headers.map(header => record[header] !== undefined ? record[header] : ""));
  }
  const after = record;
  auditChange_(user, "settings.update", "setting", key, requestId, "", after);
  return mutationResult_("setting", key, after, user.institution_id);
}

function apiOk_(data) {
  return json({
    ok: true,
    data,
    error: null,
    meta: {
      requestId: Utilities.getUuid(),
      timestamp: nowIso_()
    }
  });
}

function apiError_(code, message, fields) {
  return json({
    ok: false,
    data: null,
    error: {
      code,
      message,
      fields: fields || {}
    },
    meta: {
      requestId: Utilities.getUuid(),
      timestamp: nowIso_()
    }
  });
}

function appError_(code, message) {
  const err = new Error(message);
  err.code = code;
  return err;
}

function publicUser_(user) {
  return sanitizeUserRecord_({
    id: user.id,
    username: user.username,
    display_name: user.display_name || user.username,
    email: user.email || "",
    institution_id: user.institution_id || DEFAULT_INSTITUTION_ID,
    role: normalizeV2Role_(user.role),
    legacy_role: user.role
  });
}

function logoutSession_(token, user) {
  token = clean_(token);
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_SESSIONS);
  const headers = ensureHeadersPresent_(sheet, ["revoked_at", "last_seen_at"]);
  const rows = sheet.getDataRange().getValues();
  const tokenHash = hashPassword_(token);
  const revokedCol = headers.indexOf("revoked_at") + 1;

  for (let i = 1; i < rows.length; i++) {
    const rawToken = String(rows[i][0] || "");
    const storedHash = String(rows[i][headers.indexOf("token_hash")] || "");
    if ((rawToken === token || storedHash === tokenHash) && String(rows[i][1] || "") === String(user.id)) {
      sheet.getRange(i + 1, revokedCol).setValue(nowIso_());
    }
  }
  return apiOk_({ logged_out: true });
}

function getHeadersForSheet_(sheetName) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
  return getSheetHeaders_(sheet);
}

function getSheetHeaders_(sheet) {
  return sheet
    .getRange(1, 1, 1, sheet.getLastColumn())
    .getValues()[0]
    .map(header => clean_(header));
}

function ensureHeadersPresent_(sheet, headersToAdd) {
  const headers = getSheetHeaders_(sheet);
  headersToAdd.forEach(header => {
    if (headers.indexOf(header) !== -1) return;
    const nextColumn = sheet.getLastColumn() + 1;
    sheet.getRange(1, nextColumn).setValue(header);
    headers.push(header);
  });
  return headers;
}

function getSheetObjects_(sheetName) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return [];
  const headers = getSheetHeaders_(sheet);
  return sheet
    .getRange(2, 1, lastRow - 1, headers.length)
    .getValues()
    .filter(row => row.some(value => value !== ""))
    .map((row, index) => {
      const record = Object.fromEntries(headers.map((header, columnIndex) => [header, formatValue_(row[columnIndex])]));
      record.row_number = index + 2;
      return record;
    });
}

function getRecordById_(sheetName, id) {
  id = clean_(id);
  if (!id) return null;
  return getSheetObjects_(sheetName).find(record => String(record.id || "") === id) || null;
}

function appendRecord_(sheetName, record) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
  const headers = getSheetHeaders_(sheet);
  sheet.appendRow(headers.map(header => record[header] !== undefined ? record[header] : ""));
}

function updateRecord_(sheetName, id, updates) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
  const headers = getSheetHeaders_(sheet);
  const records = getSheetObjects_(sheetName);
  const record = records.find(item => String(item.id || "") === String(id || ""));
  if (!record) throw appError_("NOT_FOUND", "Rekod tidak ditemui.");
  const next = { ...record, ...updates };
  if (headers.indexOf("row_version") !== -1) {
    next.row_version = Number(record.row_version || 0) + 1;
  }
  delete next.row_number;
  sheet
    .getRange(record.row_number, 1, 1, headers.length)
    .setValues([headers.map(header => next[header] !== undefined ? next[header] : "")]);
  return getRecordById_(sheetName, id);
}

function softDeleteRecord_(sheetName, id, user) {
  return updateRecord_(sheetName, id, {
    status: "archived",
    deleted_at: nowIso_(),
    deleted_by: user.id,
    updated_at: nowIso_(),
    updated_by: user.id
  });
}

function restoreRecord_(sheetName, id, user) {
  return updateRecord_(sheetName, id, {
    status: "active",
    deleted_at: "",
    deleted_by: "",
    updated_at: nowIso_(),
    updated_by: user.id
  });
}

function requireRecordForMutation_(sheetName, id, user) {
  const record = getRecordById_(sheetName, id);
  if (!record) throw appError_("NOT_FOUND", "Rekod tidak ditemui.");
  if (!tenantFilter_(record, user)) throw appError_("FORBIDDEN", "forbidden");
  return record;
}

function mutateTenantSoftRecord_(action, payload, user, requestId, sheetName, entityType, editableFields) {
  const id = required_(payload.id, "ID rekod");
  const before = requireRecordForMutation_(sheetName, id, user);
  if (action.endsWith(".delete")) {
    const afterDelete = softDeleteRecord_(sheetName, id, user);
    auditChange_(user, action, entityType, id, requestId, before, afterDelete);
    return mutationResult_(entityType, id, afterDelete, before.institution_id);
  }
  if (action.endsWith(".restore")) {
    const afterRestore = restoreRecord_(sheetName, id, user);
    auditChange_(user, action, entityType, id, requestId, before, afterRestore);
    return mutationResult_(entityType, id, afterRestore, before.institution_id);
  }

  const updates = {
    updated_at: nowIso_(),
    updated_by: user.id
  };
  Object.keys(editableFields).forEach(field => {
    if (payload[field] !== undefined) updates[field] = clean_(payload[field]);
  });
  const after = updateRecord_(sheetName, id, updates);
  auditChange_(user, action, entityType, id, requestId, before, after);
  return mutationResult_(entityType, id, after, before.institution_id);
}

function mutationResult_(entityType, entityId, data, institutionId) {
  return {
    entity_type: entityType,
    entity_id: entityId,
    institution_id: institutionId || data?.institution_id || DEFAULT_INSTITUTION_ID,
    data
  };
}

function auditChange_(user, action, entityType, entityId, requestId, beforeRecord, afterRecord) {
  appendAuditLog_({
    institutionId: afterRecord?.institution_id || beforeRecord?.institution_id || user.institution_id || DEFAULT_INSTITUTION_ID,
    userId: user.id,
    action,
    entityType,
    entityId,
    requestId,
    beforeJson: beforeRecord ? JSON.stringify(sanitizeAuditRecord_(beforeRecord)) : "",
    afterJson: afterRecord ? JSON.stringify(sanitizeAuditRecord_(afterRecord)) : ""
  });
}

function sanitizeAuditRecord_(record) {
  const sanitized = { ...record };
  delete sanitized.password;
  delete sanitized.password_hash;
  delete sanitized.password_salt;
  delete sanitized.token;
  delete sanitized.token_hash;
  delete sanitized.row_number;
  return sanitized;
}

function userRecordFromRowObject_(record) {
  return {
    id: record.id,
    username: clean_(record.username),
    display_name: clean_(record.display_name || record.username),
    email: clean_(record.email),
    institution_id: clean_(record.institution_id || DEFAULT_INSTITUTION_ID),
    role: normalizeV2Role_(record.role),
    legacy_role: normalizeRole_(record.role, ROLE_USER),
    status: clean_(record.status || "active"),
    created_at: record.created_at,
    deactivated_at: record.deactivated_at || "",
    row_number: record.row_number
  };
}

function findUserMutableRecord_(id) {
  const records = getSheetObjects_(SHEET_USERS);
  const record = records.find(item => String(item.id || "") === String(id || ""));
  return record ? userRecordFromRowObject_(record) : null;
}

function sanitizeUserRecord_(record) {
  const sanitized = { ...record };
  delete sanitized.password;
  delete sanitized.password_hash;
  delete sanitized.password_salt;
  delete sanitized.row_number;
  return sanitized;
}

function setExtraField_(sheet, rowNumber, header, value) {
  const headers = ensureHeadersPresent_(sheet, [header]);
  sheet.getRange(rowNumber, headers.indexOf(header) + 1).setValue(value);
}

function setOptionalCell_(sheet, headers, rowNumber, header, value) {
  const index = headers.indexOf(header);
  if (index !== -1) sheet.getRange(rowNumber, index + 1).setValue(value);
}

function getFindingsForUser_(user, p) {
  return getSheetObjects_(SHEET_FINDINGS)
    .filter(record => !record.deleted_at)
    .filter(record => tenantFilter_(record, user))
    .filter(record => !p.cycle_id || record.cycle_id === p.cycle_id)
    .filter(record => !p.audit_id || record.audit_id === p.audit_id)
    .filter(record => !p.category_id || record.category_id === p.category_id)
    .filter(record => !p.workflow_status || record.workflow_status === p.workflow_status)
    .filter(record => !p.level_id || record.final_level_id === p.level_id || record.calculated_level_id === p.level_id);
}

function getDashboardSummaryObject_(findings, actions, levels) {
  const counts = { Kritikal: 0, Tinggi: 0, Sederhana: 0, Rendah: 0 };
  let scoreTotal = 0;
  findings.forEach(finding => {
    const level = levels.get(finding.final_level_id || finding.calculated_level_id);
    if (level && counts[level.label] !== undefined) counts[level.label] += 1;
    scoreTotal += Number(finding.calculated_score || 0);
  });
  const total = findings.length;
  const highCritical = counts.Kritikal + counts.Tinggi;
  return {
    total_findings: total,
    counts,
    high_critical_count: highCritical,
    high_critical_percent: total ? Math.round((highCritical / total) * 100) : 0,
    average_score: total ? Number((scoreTotal / total).toFixed(2)) : 0,
    overall_level: chooseOverallRiskLevel_(counts),
    overdue_actions: actions.filter(isCorrectiveActionOverdue_).length,
    awaiting_verification: actions.filter(action => action.status === "awaiting_verification").length
  };
}

function summarizeCategories_(findings, levels) {
  const categories = new Map();
  findings.forEach(finding => {
    const category = getRecordById_(SHEET_RISK_CATEGORIES, finding.category_id) || { name: "Tidak dikategorikan" };
    const level = levels.get(finding.final_level_id || finding.calculated_level_id) || { label: "Rendah", rank: 1 };
    const item = categories.get(category.name) || {
      category_id: finding.category_id,
      category: category.name,
      issue_count: 0,
      percent_total: 0,
      levels: { Kritikal: 0, Tinggi: 0, Sederhana: 0, Rendah: 0 },
      category_level: "Rendah",
      category_rank: 1
    };
    item.issue_count += 1;
    if (item.levels[level.label] !== undefined) item.levels[level.label] += 1;
    if (level.rank > item.category_rank) {
      item.category_level = level.label;
      item.category_rank = level.rank;
    }
    categories.set(category.name, item);
  });
  const total = findings.length;
  return [...categories.values()].map(item => ({
    ...item,
    percent_total: total ? Number(((item.issue_count / total) * 100).toFixed(2)) : 0
  }));
}

function chooseOverallRiskLevel_(counts) {
  const levels = getRiskLevelMap_();
  return [...levels.values()].reduce((selected, level) => {
    const currentCount = counts[level.label] || 0;
    const selectedCount = counts[selected.label] || 0;
    if (currentCount > selectedCount) return level;
    if (currentCount === selectedCount && currentCount > 0 && level.rank > selected.rank) return level;
    return selected;
  }, { label: "Rendah", rank: 1 }).label;
}

function getRiskLevelMap_() {
  const map = new Map();
  getSheetObjects_(SHEET_RISK_LEVELS)
    .filter(record => record.status !== "inactive")
    .forEach(record => map.set(record.id, {
      id: record.id,
      code: record.code,
      label: record.label,
      rank: Number(record.rank || 1),
      min_score: Number(record.min_score || 1),
      max_score: Number(record.max_score || 16),
      color_hex: record.color_hex,
      default_due_days: Number(record.default_due_days || 0)
    }));
  return map;
}

function getRiskMatrixData_() {
  return {
    likelihood_scale: getSheetObjects_(SHEET_LIKELIHOOD_SCALE).filter(record => record.status === "active"),
    impact_scale: getSheetObjects_(SHEET_IMPACT_SCALE).filter(record => record.status === "active"),
    risk_levels: getSheetObjects_(SHEET_RISK_LEVELS).filter(record => record.status === "active")
  };
}

function isCorrectiveActionOverdue_(action) {
  if (!action.target_date) return false;
  if (["verified", "closed"].indexOf(String(action.status || "")) !== -1) return false;
  const target = new Date(action.target_date);
  if (Number.isNaN(target.getTime())) return false;
  return target.getTime() < Date.now();
}

function scopedInstitutionId_(payload, user) {
  if (isSuperAdmin_(user) && payload.institution_id) return clean_(payload.institution_id);
  return user.institution_id || DEFAULT_INSTITUTION_ID;
}

function tenantFilter_(record, user) {
  if (isSuperAdmin_(user)) return true;
  const institutionId = clean_(record.institution_id || DEFAULT_INSTITUTION_ID);
  return institutionId === clean_(user.institution_id || DEFAULT_INSTITUTION_ID);
}

function canAccessInstitution_(user, institutionId) {
  return isSuperAdmin_(user) || clean_(user.institution_id || DEFAULT_INSTITUTION_ID) === clean_(institutionId);
}

function roleCan_(user, allowedRoles) {
  const role = normalizeV2Role_(user.role);
  return allowedRoles.indexOf(role) !== -1;
}

function requireRole_(user, allowedRoles) {
  if (!roleCan_(user, allowedRoles)) throw appError_("FORBIDDEN", "forbidden");
}

function isSuperAdmin_(user) {
  return normalizeV2Role_(user.role) === ROLE_SUPER_ADMIN;
}

function normalizeV2Role_(role) {
  role = clean_(role).toLowerCase();
  if (role === ROLE_ADMIN) return ROLE_SUPER_ADMIN;
  if (role === ROLE_USER) return ROLE_AUDITOR;
  if ([ROLE_SUPER_ADMIN, ROLE_INSTITUTION_ADMIN, ROLE_AUDITOR, ROLE_REVIEWER, ROLE_VIEWER].indexOf(role) !== -1) return role;
  return ROLE_VIEWER;
}

function normalizeLegacyRoleForClient_(role) {
  role = normalizeV2Role_(role);
  if ([ROLE_SUPER_ADMIN, ROLE_INSTITUTION_ADMIN, ROLE_REVIEWER].indexOf(role) !== -1) return ROLE_ADMIN;
  return ROLE_USER;
}

function required_(value, label) {
  const text = clean_(value);
  if (!text) throw appError_("VALIDATION_ERROR", `${label} wajib diisi.`);
  return text;
}

function ensureCycleIsEditable_(cycleId) {
  if (!cycleId) return;
  const cycle = getRecordById_(SHEET_AUDIT_CYCLES, cycleId);
  if (cycle && cycle.status === "finalized") {
    throw appError_("CYCLE_FINALIZED", "Kitaran audit telah finalized dan read-only.");
  }
}

function assertCanEditFinding_(user, finding) {
  const role = normalizeV2Role_(user.role);
  if ([ROLE_SUPER_ADMIN, ROLE_INSTITUTION_ADMIN, ROLE_REVIEWER].indexOf(role) !== -1) return;
  if (role !== ROLE_AUDITOR) throw appError_("FORBIDDEN", "forbidden");
  if (String(finding.created_by || "") !== String(user.id || "")) throw appError_("FORBIDDEN", "forbidden");
  if (["draft", "returned"].indexOf(String(finding.workflow_status || "draft")) === -1) {
    throw appError_("WORKFLOW_LOCKED", "Penemuan tidak boleh diedit dalam status semasa.");
  }
}

function linkFindingUnits_(findingId, institutionId, unitIds, user) {
  if (!unitIds) return;
  const values = Array.isArray(unitIds) ? unitIds : String(unitIds).split(",").map(clean_).filter(Boolean);
  if (!values.length) return;
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_FINDING_UNITS);
  const now = nowIso_();
  const rows = values.map(unitId => [Utilities.getUuid(), institutionId, findingId, unitId, now, user.id]);
  sheet.getRange(sheet.getLastRow() + 1, 1, rows.length, HEADERS.finding_units.length).setValues(rows);
}

function nextFindingNo_() {
  return `SPRAD-${Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "yyyyMMdd-HHmmss")}`;
}

function nowIso_() {
  return new Date().toISOString();
}

// =========== AUTOMATIC SHEET SETUP ===========
function ensureSheets_() {
  const cache = getScriptCache_();
  if (cache && cache.get(SETUP_CACHE_KEY) === "true") return;

  ensureSheet_(SHEET_CONTACTS, HEADERS.contacts);
  ensureSheet_(SHEET_USERS, HEADERS.users);
  ensureSheet_(SHEET_SESSIONS, HEADERS.sessions);
  ensureSheet_(SHEET_SETTINGS, HEADERS.settings);
  ensureV2Sheets_();
  ensureCompatibilityColumns_();
  ensureSettings_();
  seedV2Foundation_();
  seedDummyV2Data_();
  seedDummySettings_();
  seedDummyUsers_();
  seedDummySessions_();
  seedDummyContacts_();
  fixMisalignedContactRows_();

  if (cache) cache.put(SETUP_CACHE_KEY, "true", SETUP_CACHE_SECONDS);
}

function ensureV2Sheets_() {
  ensureSheet_(SHEET_INSTITUTIONS, HEADERS.institutions);
  ensureSheet_(SHEET_ORG_UNITS, HEADERS.org_units);
  ensureSheet_(SHEET_AUDIT_CYCLES, HEADERS.audit_cycles);
  ensureSheet_(SHEET_AUDITS, HEADERS.audits);
  ensureSheet_(SHEET_RISK_CATEGORIES, HEADERS.risk_categories);
  ensureSheet_(SHEET_LIKELIHOOD_SCALE, HEADERS.likelihood_scale);
  ensureSheet_(SHEET_IMPACT_SCALE, HEADERS.impact_scale);
  ensureSheet_(SHEET_RISK_LEVELS, HEADERS.risk_levels);
  ensureSheet_(SHEET_FINDINGS, HEADERS.findings);
  ensureSheet_(SHEET_FINDING_UNITS, HEADERS.finding_units);
  ensureSheet_(SHEET_CORRECTIVE_ACTIONS, HEADERS.corrective_actions);
  ensureSheet_(SHEET_ATTACHMENTS, HEADERS.attachments);
  ensureSheet_(SHEET_AUDIT_LOGS, HEADERS.audit_logs);
  ensureSheet_(SHEET_MUTATION_RECEIPTS, HEADERS.mutation_receipts);
}

function ensureCompatibilityColumns_() {
  ensureHeadersPresent_(SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_USERS), [
    "institution_id",
    "display_name",
    "email",
    "password_salt",
    "status",
    "failed_login_count",
    "locked_until",
    "updated_at",
    "updated_by",
    "deactivated_at",
    "deactivated_by"
  ]);
  ensureHeadersPresent_(SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_SESSIONS), [
    "token_hash",
    "institution_id",
    "role",
    "last_seen_at",
    "revoked_at"
  ]);
  ensureHeadersPresent_(SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_SETTINGS), [
    "scope_type",
    "scope_id",
    "updated_at",
    "updated_by"
  ]);
}

function ensureSheet_(name, headers) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(name);
  if (!sheet) sheet = ss.insertSheet(name);

  if (sheet.getMaxColumns() < headers.length) {
    sheet.insertColumnsAfter(sheet.getMaxColumns(), headers.length - sheet.getMaxColumns());
  }

  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  return sheet;
}

function ensureSettings_() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_SETTINGS);
  const settings = {
    schema_version: "2.1-blueprint-foundation",
    app_name: APP_NAME,
    logo_url: LOGO_URL,
    favicon_url: FAVICON_URL,
    default_admin_username: DEFAULT_USERS[0].username,
    default_admin_password: DEFAULT_USERS[0].password,
    default_user_username: DEFAULT_USERS[1].username,
    default_user_password: DEFAULT_USERS[1].password,
    dummy_contacts_target: DUMMY_CONTACTS.length,
    dummy_users_target: DUMMY_USERS.length,
    dummy_sessions_target: DUMMY_SESSIONS.length,
    dummy_settings_target: DUMMY_SETTINGS.length,
    dummy_v2_records_per_table: 10,
    allow_public_registration: "true",
    allow_public_admin_register: String(ALLOW_PUBLIC_ADMIN_REGISTER),
    overall_level_method: "mode_high_tiebreak",
    session_ttl_minutes: SESSION_DAYS * 24 * 60
  };

  const rows = sheet.getDataRange().getValues();
  const headers = getSheetHeaders_(sheet);
  const existing = new Map();
  for (let i = 1; i < rows.length; i++) {
    existing.set(String(rows[i][0] || ""), i + 1);
  }

  const upsert = ([key, value]) => {
    if (existing.has(key)) {
      const rowNumber = existing.get(key);
      sheet.getRange(rowNumber, 2).setValue(value);
      setOptionalCell_(sheet, headers, rowNumber, "scope_type", "system");
      setOptionalCell_(sheet, headers, rowNumber, "scope_id", "global");
      setOptionalCell_(sheet, headers, rowNumber, "updated_at", nowIso_());
      setOptionalCell_(sheet, headers, rowNumber, "updated_by", "system");
    } else {
      const record = { key, value, scope_type: "system", scope_id: "global", updated_at: nowIso_(), updated_by: "system" };
      sheet.appendRow(headers.map(header => record[header] !== undefined ? record[header] : ""));
    }
  };

  Object.entries(settings).forEach(upsert);
}

function seedDummySettings_() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_SETTINGS);
  const rows = sheet.getDataRange().getValues();
  const existing = new Map();
  for (let i = 1; i < rows.length; i++) {
    existing.set(String(rows[i][0] || ""), i + 1);
  }

  DUMMY_SETTINGS.forEach(([key, value]) => {
    if (existing.has(key)) {
      sheet.getRange(existing.get(key), 2).setValue(value);
    } else {
      sheet.appendRow([key, value]);
    }
  });
}

function seedV2Foundation_() {
  seedDefaultInstitution_();
  seedScale_(SHEET_LIKELIHOOD_SCALE);
  seedScale_(SHEET_IMPACT_SCALE);
  seedRiskLevels_();
  seedRiskCategories_();
}

function seedDummyV2Data_() {
  const now = Date.now();
  const nowIso = new Date(now).toISOString();
  const demoInstitutionRows = Array.from({ length: 10 }, (_, index) => {
    const number = String(index + 1).padStart(2, "0");
    const id = `inst_demo_${number}`;
    return [
      id,
      `UNI${number}`,
      `Universiti Demo ${number}`,
      `UD${number}`,
      "Kementerian Pendidikan Tinggi",
      `Alamat Demo ${number}, Malaysia`,
      LOGO_URL,
      "Analisis Penilaian Risiko Audit Dalam",
      "active",
      nowIso,
      "system",
      nowIso,
      "system",
      "",
      ""
    ];
  });
  appendRowsIfMissing_(SHEET_INSTITUTIONS, 0, demoInstitutionRows, HEADERS.institutions);

  const units = ["Fakulti Teknologi", "Pusat Kesihatan", "Bendahari", "Perpustakaan", "Pejabat Pendaftar", "Unit Kenderaan", "Pusat ICT", "Unit Perolehan", "Unit Keselamatan", "Audit Dalam"];
  appendRowsIfMissing_(SHEET_ORG_UNITS, 0, units.map((name, index) => {
    const number = String(index + 1).padStart(2, "0");
    return [`unit_demo_${number}`, DEFAULT_INSTITUTION_ID, `PTJ${number}`, name, index < 4 ? "Pusat" : "Unit", "", "active", nowIso, "system", nowIso, "system", "", ""];
  }), HEADERS.org_units);

  appendRowsIfMissing_(SHEET_AUDIT_CYCLES, 0, Array.from({ length: 10 }, (_, index) => {
    const year = 2017 + index;
    const number = String(index + 1).padStart(2, "0");
    return [`cycle_demo_${number}`, DEFAULT_INSTITUTION_ID, `Audit Dalam ${year}`, year, `${year}-01-01`, `${year}-12-31`, index === 9 ? "open" : "closed", `SPRAD/${year}`, "", "", nowIso, "system", nowIso, "system", "", ""];
  }), HEADERS.audit_cycles);

  appendRowsIfMissing_(SHEET_AUDITS, 0, Array.from({ length: 10 }, (_, index) => {
    const number = String(index + 1).padStart(2, "0");
    return [`audit_demo_${number}`, DEFAULT_INSTITUTION_ID, `cycle_demo_${number}`, `AUD-${number}`, `Audit Pengurusan ${units[index]}`, `Skop semakan proses ${units[index]}.`, "Menilai kawalan dalaman dan pematuhan.", "", "2026-01-01", "2026-12-31", "open", nowIso, "system", nowIso, "system", "", ""];
  }), HEADERS.audits);

  const findingRows = Array.from({ length: 10 }, (_, index) => {
    const number = String(index + 1).padStart(2, "0");
    const likelihood = (index % 4) + 1;
    const impact = ((index + 1) % 4) + 1;
    const risk = calculateRisk_(likelihood, impact);
    return [
      `finding_demo_${number}`,
      DEFAULT_INSTITUTION_ID,
      `cycle_demo_${number}`,
      `audit_demo_${number}`,
      V2_RISK_CATEGORIES[index % V2_RISK_CATEGORIES.length][0],
      `SPRAD-2026-${number}`,
      `Isu audit demo ${number}`,
      `Huraian isu audit demo ${number} untuk tujuan ujian sistem.`,
      `Justifikasi terperinci isu demo ${number}.`,
      "Kawalan proses tidak dipantau secara berkala.",
      "Risiko kelewatan tindakan pembetulan dan rekod tidak lengkap.",
      `https://drive.google.com/demo/evidence-${number}`,
      "Tetapkan pemilik tindakan, tarikh sasaran dan semakan berkala.",
      likelihood,
      impact,
      risk.score,
      risk.levelId,
      risk.levelId,
      "",
      index < 3 ? "approved" : (index < 6 ? "submitted" : "draft"),
      "",
      new Date(now - (index + 1) * 86400000).toISOString(),
      "system",
      nowIso,
      "system",
      "",
      "",
      "",
      "",
      index < 3 ? nowIso : "",
      index < 3 ? "system" : "",
      "",
      "",
      1
    ];
  });
  appendRowsIfMissing_(SHEET_FINDINGS, 0, findingRows, HEADERS.findings);

  appendRowsIfMissing_(SHEET_FINDING_UNITS, 0, Array.from({ length: 10 }, (_, index) => {
    const number = String(index + 1).padStart(2, "0");
    return [`finding_unit_demo_${number}`, DEFAULT_INSTITUTION_ID, `finding_demo_${number}`, `unit_demo_${number}`, nowIso, "system"];
  }), HEADERS.finding_units);

  appendRowsIfMissing_(SHEET_CORRECTIVE_ACTIONS, 0, Array.from({ length: 10 }, (_, index) => {
    const number = String(index + 1).padStart(2, "0");
    const target = new Date(now + (index - 3) * 86400000).toISOString().slice(0, 10);
    const status = index < 2 ? "awaiting_verification" : (index < 5 ? "in_progress" : "open");
    return [`action_demo_${number}`, DEFAULT_INSTITUTION_ID, `finding_demo_${number}`, `Tindakan pembetulan demo ${number}`, "", `Pemilik ${number}`, `unit_demo_${number}`, target, status, index < 5 ? 60 : 10, "Catatan kemajuan demo.", "", index < 2 ? nowIso : "", "", "", "", nowIso, "system", nowIso, "system", "", "", 1];
  }), HEADERS.corrective_actions);

  appendRowsIfMissing_(SHEET_ATTACHMENTS, 0, Array.from({ length: 10 }, (_, index) => {
    const number = String(index + 1).padStart(2, "0");
    return [`attach_demo_${number}`, DEFAULT_INSTITUTION_ID, "finding", `finding_demo_${number}`, `drive_file_demo_${number}`, `bukti-demo-${number}.pdf`, "application/pdf", `https://drive.google.com/demo/bukti-${number}`, nowIso, "system", "", ""];
  }), HEADERS.attachments);

  appendRowsIfMissing_(SHEET_AUDIT_LOGS, 0, Array.from({ length: 10 }, (_, index) => {
    const number = String(index + 1).padStart(2, "0");
    return [`log_demo_${number}`, DEFAULT_INSTITUTION_ID, "system", "seed.demo", "finding", `finding_demo_${number}`, `seed-request-${number}`, "", JSON.stringify({ seeded: true, index: index + 1 }), nowIso];
  }), HEADERS.audit_logs);

  appendRowsIfMissing_(SHEET_MUTATION_RECEIPTS, 0, Array.from({ length: 10 }, (_, index) => {
    const number = String(index + 1).padStart(2, "0");
    return [`receipt_demo_${number}`, "system", DEFAULT_INSTITUTION_ID, "seed.demo", "finding", `finding_demo_${number}`, "success", "", "", nowIso, nowIso];
  }), HEADERS.mutation_receipts);
}

function seedDefaultInstitution_() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_INSTITUTIONS);
  if (rowExists_(sheet, 1, DEFAULT_INSTITUTION_ID)) return;

  const now = new Date();
  sheet.appendRow([
    DEFAULT_INSTITUTION_ID,
    "DEFAULT",
    "Institusi Default SPRAD",
    "SPRAD",
    "",
    "",
    LOGO_URL,
    "Analisis Penilaian Risiko Audit Dalam",
    "active",
    now,
    "system",
    now,
    "system",
    "",
    ""
  ]);
}

function seedScale_(sheetName) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
  const existing = new Set(
    sheet.getDataRange().getValues().slice(1).map(row => `${row[0]}:${row[1]}`)
  );
  const rows = [
    [DEFAULT_INSTITUTION_ID, 1, "Rendah", "Jarang berlaku atau kesan minimum.", 1, "active"],
    [DEFAULT_INSTITUTION_ID, 2, "Sederhana", "Boleh berlaku atau kesan sederhana.", 2, "active"],
    [DEFAULT_INSTITUTION_ID, 3, "Tinggi", "Kerap berlaku atau kesan besar.", 3, "active"],
    [DEFAULT_INSTITUTION_ID, 4, "Sangat Tinggi", "Sangat kerap atau kesan sangat serius.", 4, "active"]
  ].filter(row => !existing.has(`${row[0]}:${row[1]}`));

  if (rows.length) {
    sheet.getRange(sheet.getLastRow() + 1, 1, rows.length, HEADERS.likelihood_scale.length).setValues(rows);
  }
}

function seedRiskLevels_() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_RISK_LEVELS);
  const existing = new Set(sheet.getDataRange().getValues().slice(1).map(row => String(row[0] || "")));
  const rows = V2_RISK_LEVELS.filter(row => !existing.has(row[0]));
  if (rows.length) {
    sheet.getRange(sheet.getLastRow() + 1, 1, rows.length, HEADERS.risk_levels.length).setValues(rows);
  }
}

function seedRiskCategories_() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_RISK_CATEGORIES);
  const existing = new Set(sheet.getDataRange().getValues().slice(1).map(row => String(row[0] || "")));
  const now = new Date();
  const rows = V2_RISK_CATEGORIES
    .filter(row => !existing.has(row[0]))
    .map(row => [...row, now, "system", now, "system", "", ""]);

  if (rows.length) {
    sheet.getRange(sheet.getLastRow() + 1, 1, rows.length, HEADERS.risk_categories.length).setValues(rows);
  }
}

function seedDummyUsers_() {
  DUMMY_USERS.forEach(user => ensureUser_(user));
}

function ensureUser_(user) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_USERS);
  const rows = sheet.getDataRange().getValues();
  const exists = rows
    .slice(1)
    .some(row => clean_(row[1]).toLowerCase() === user.username.toLowerCase());

  if (!exists) {
    sheet.appendRow([
      Utilities.getUuid(),
      user.username,
      hashPassword_(user.password),
      user.role,
      new Date()
    ]);
    const rowNumber = sheet.getLastRow();
    setExtraField_(sheet, rowNumber, "institution_id", DEFAULT_INSTITUTION_ID);
    setExtraField_(sheet, rowNumber, "display_name", user.username);
    setExtraField_(sheet, rowNumber, "status", "active");
    setExtraField_(sheet, rowNumber, "updated_at", nowIso_());
    setExtraField_(sheet, rowNumber, "updated_by", "system");
  }
}

function seedDummySessions_() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_SESSIONS);
  const rows = sheet.getDataRange().getValues();
  const existingTokens = new Set(rows.slice(1).map(row => String(row[0] || "")));
  const now = Date.now();
  const rowsToAdd = [];

  DUMMY_SESSIONS.forEach((session, index) => {
    if (existingTokens.has(session.token)) return;

    const userId = findUserIdByUsername_(session.username);
    if (!userId) return;

    const expires = new Date(now - session.expiredDaysAgo * 24 * 60 * 60 * 1000);
    const createdAt = new Date(expires.getTime() - (index + 1) * 60 * 60 * 1000);
    rowsToAdd.push([session.token, userId, expires, createdAt]);
  });

  if (rowsToAdd.length) {
    sheet
      .getRange(sheet.getLastRow() + 1, 1, rowsToAdd.length, HEADERS.sessions.length)
      .setValues(rowsToAdd);
  }
}

function seedDummyContacts_() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_CONTACTS);
  const existingCount = Math.max(0, sheet.getLastRow() - 1);
  if (existingCount >= DUMMY_CONTACTS.length) return;

  const now = Date.now();
  const rowsToAdd = DUMMY_CONTACTS
    .slice(existingCount)
    .map((contact, index) => [
      now + index,
      contact[0],
      contact[1],
      contact[2],
      new Date(now - (index + 1) * 60 * 60 * 1000)
    ]);

  if (rowsToAdd.length) {
    sheet
      .getRange(sheet.getLastRow() + 1, 1, rowsToAdd.length, HEADERS.contacts.length)
      .setValues(rowsToAdd);
  }
}

// Fix old rows where message accidentally landed in created_at and date landed in column F.
function fixMisalignedContactRows_() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_CONTACTS);
  const lastRow = sheet.getLastRow();
  if (lastRow < 2 || sheet.getMaxColumns() < 6) return;

  const range = sheet.getRange(2, 1, lastRow - 1, 6);
  const rows = range.getValues();
  let changed = false;

  rows.forEach(row => {
    const message = row[3];
    const createdAt = row[4];
    const extraDate = row[5];

    if (!message && createdAt && extraDate instanceof Date) {
      row[3] = createdAt;
      row[4] = extraDate;
      row[5] = "";
      changed = true;
    }
  });

  if (changed) range.setValues(rows);
}

// =========== HELPERS ===========
function appendLegacyContact_(contact) {
  SpreadsheetApp.getActiveSpreadsheet()
    .getSheetByName(SHEET_CONTACTS)
    .appendRow([Date.now(), clean_(contact.name), clean_(contact.email), clean_(contact.message), new Date()]);
}

function findContactRowById_(id) {
  id = clean_(id);
  if (!id) return null;

  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_CONTACTS);
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return null;

  const rows = sheet
    .getRange(2, 1, lastRow - 1, HEADERS.contacts.length)
    .getValues();

  for (let index = 0; index < rows.length; index++) {
    if (String(rows[index][0] || "") === id) {
      return {
        sheet,
        rowNumber: index + 2,
        values: rows[index]
      };
    }
  }
  return null;
}

function contactRowToObject_(row) {
  return Object.fromEntries(
    HEADERS.contacts.map((header, index) => [header, formatValue_(row[index])])
  );
}

function contactMutationPayload_(body) {
  if (body && typeof body.payload === "object" && body.payload !== null) return body.payload;
  if (body && typeof body.contact === "object" && body.contact !== null) return body.contact;
  return body || {};
}

function contactMutationContext_(body, action) {
  const payload = contactMutationPayload_(body);
  const requestId = clean_(body.request_id || body.requestId || payload.request_id || payload.requestId || Utilities.getUuid());
  return { action, payload, requestId };
}

function contactMutationError_(mutation, userId, entityId, errorCode, errorMessage) {
  writeMutationReceipt_({
    requestId: mutation.requestId,
    userId: userId || "",
    institutionId: DEFAULT_INSTITUTION_ID,
    action: mutation.action,
    entityType: "contact",
    entityId: entityId || "",
    status: "error",
    errorCode,
    errorMessage
  });
  return json({ ok: false, error: errorMessage, request_id: mutation.requestId });
}

function getScriptCache_() {
  try {
    return CacheService.getScriptCache();
  } catch (err) {
    console.warn(`Script cache unavailable: ${err.message}`);
    return null;
  }
}

function clearSetupCache_() {
  const cache = getScriptCache_();
  if (cache) cache.remove(SETUP_CACHE_KEY);
}

function isLoginRateLimited_(username) {
  const cache = getScriptCache_();
  if (!cache) return false;
  const attempts = Number(cache.get(loginAttemptKey_(username)) || 0);
  return attempts >= LOGIN_ATTEMPT_LIMIT;
}

function recordFailedLogin_(username) {
  const cache = getScriptCache_();
  if (!cache) return;
  const key = loginAttemptKey_(username);
  const attempts = Math.min(LOGIN_ATTEMPT_LIMIT, Number(cache.get(key) || 0) + 1);
  cache.put(key, String(attempts), LOGIN_ATTEMPT_WINDOW_SECONDS);
}

function clearLoginAttempts_(username) {
  const cache = getScriptCache_();
  if (cache) cache.remove(loginAttemptKey_(username));
}

function loginAttemptKey_(username) {
  return `sprad_login_${hashPassword_(clean_(username).toLowerCase()).slice(0, 40)}`;
}

function calculateRisk_(likelihood, impact) {
  likelihood = Number(likelihood);
  impact = Number(impact);

  if (!Number.isInteger(likelihood) || likelihood < 1 || likelihood > 4) {
    throw new Error("Kemungkinan mesti antara 1 hingga 4");
  }
  if (!Number.isInteger(impact) || impact < 1 || impact > 4) {
    throw new Error("Kesan mesti antara 1 hingga 4");
  }

  const score = likelihood * impact;
  const level = V2_RISK_LEVELS.find(row => score >= row[5] && score <= row[6]);
  if (!level) throw new Error("Tahap risiko tidak ditemui");

  return {
    likelihood,
    impact,
    score,
    levelId: level[0],
    levelLabel: level[3],
    levelRank: level[4]
  };
}

function findRiskCategoryIdByName_(name) {
  name = clean_(name).toLowerCase();
  if (!name) return "";

  const rows = SpreadsheetApp.getActiveSpreadsheet()
    .getSheetByName(SHEET_RISK_CATEGORIES)
    .getDataRange()
    .getValues();

  for (let i = 1; i < rows.length; i++) {
    if (clean_(rows[i][3]).toLowerCase() === name) return rows[i][0];
  }
  return "";
}

function findMutationReceipt_(requestId) {
  requestId = clean_(requestId);
  if (!requestId) return null;

  const rows = SpreadsheetApp.getActiveSpreadsheet()
    .getSheetByName(SHEET_MUTATION_RECEIPTS)
    .getDataRange()
    .getValues();
  const headers = rows.shift();

  for (const row of rows) {
    if (row[0] === requestId) {
      return Object.fromEntries(headers.map((header, index) => [header, formatValue_(row[index])]));
    }
  }
  return null;
}

function writeMutationReceipt_({ requestId, userId, institutionId, action, entityType, entityId, status, errorCode, errorMessage }) {
  const now = new Date();
  SpreadsheetApp.getActiveSpreadsheet()
    .getSheetByName(SHEET_MUTATION_RECEIPTS)
    .appendRow([
      requestId,
      userId,
      institutionId,
      action,
      entityType,
      entityId,
      status,
      errorCode,
      errorMessage,
      now,
      now
    ]);
}

function appendAuditLog_({ institutionId, userId, action, entityType, entityId, requestId, beforeJson, afterJson }) {
  SpreadsheetApp.getActiveSpreadsheet()
    .getSheetByName(SHEET_AUDIT_LOGS)
    .appendRow([
      Utilities.getUuid(),
      institutionId,
      userId,
      action,
      entityType,
      entityId,
      requestId,
      beforeJson || "",
      afterJson || "",
      new Date()
    ]);
}

function rowExists_(sheet, columnIndex, value) {
  const rows = sheet.getDataRange().getValues();
  return rows.slice(1).some(row => String(row[columnIndex - 1] || "") === String(value));
}

function appendRowsIfMissing_(sheetName, keyIndex, rows, headers) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
  if (!rows.length) return;
  const existing = new Set(
    sheet.getDataRange().getValues().slice(1).map(row => String(row[keyIndex] || ""))
  );
  const rowsToAdd = rows
    .filter(row => !existing.has(String(row[keyIndex] || "")))
    .map(row => headers.map((_, index) => row[index] !== undefined ? row[index] : ""));
  if (rowsToAdd.length) {
    sheet
      .getRange(sheet.getLastRow() + 1, 1, rowsToAdd.length, headers.length)
      .setValues(rowsToAdd);
  }
}

function findUserById_(userId) {
  const record = getSheetObjects_(SHEET_USERS)
    .find(row => String(row.id || "") === String(userId || ""));
  if (!record) return null;
  const user = userRecordFromRowObject_(record);
  return {
    id: user.id,
    username: user.username,
    display_name: user.display_name,
    email: user.email,
    institution_id: user.institution_id,
    role: user.legacy_role,
    v2_role: user.role
  };
}

function getUserInstitutionId_(userId) {
  const user = findUserById_(userId);
  return user?.institution_id || DEFAULT_INSTITUTION_ID;
}

function findUserIdByUsername_(username) {
  username = clean_(username).toLowerCase();
  const rows = SpreadsheetApp.getActiveSpreadsheet()
    .getSheetByName(SHEET_USERS)
    .getDataRange()
    .getValues();

  for (let i = 1; i < rows.length; i++) {
    const row = rows[i];
    if (clean_(row[1]).toLowerCase() === username) {
      return row[0];
    }
  }
  return null;
}

function cleanupExpiredSessions_() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_SESSIONS);
  const rows = sheet.getDataRange().getValues();
  const now = new Date();

  for (let i = rows.length - 1; i >= 1; i--) {
    const token = String(rows[i][0] || "");
    if (token.indexOf("dummy-expired-") === 0) continue;

    const expires = rows[i][2];
    if (expires && new Date(expires) <= now) {
      sheet.deleteRow(i + 1);
    }
  }
}

function parseBody_(e) {
  if (!e || !e.postData || !e.postData.contents) {
    throw new Error("Missing POST body");
  }
  return JSON.parse(e.postData.contents);
}

function clean_(value) {
  return String(value || "").trim();
}

function normalizeRole_(value, fallback) {
  const role = clean_(value).toLowerCase();
  if (role === ROLE_ADMIN) return ROLE_ADMIN;
  if (role === ROLE_USER) return ROLE_USER;
  if ([ROLE_SUPER_ADMIN, ROLE_INSTITUTION_ADMIN, ROLE_REVIEWER].indexOf(role) !== -1) return ROLE_ADMIN;
  if ([ROLE_AUDITOR, ROLE_VIEWER].indexOf(role) !== -1) return ROLE_USER;
  return fallback || ROLE_USER;
}

function hashPassword_(password) {
  const bytes = Utilities.computeDigest(
    Utilities.DigestAlgorithm.SHA_256,
    password,
    Utilities.Charset.UTF_8
  );
  return bytes
    .map(byte => (byte < 0 ? byte + 256 : byte).toString(16).padStart(2, "0"))
    .join("");
}

function passwordMatches_(password, storedPassword) {
  return storedPassword === password || storedPassword === hashPassword_(password);
}

function formatValue_(value) {
  if (value instanceof Date) {
    return Utilities.formatDate(
      value,
      Session.getScriptTimeZone(),
      "yyyy-MM-dd HH:mm:ss"
    );
  }
  return value;
}

function json(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
