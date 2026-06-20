# SPRAD Manual Test Checklist

Gunakan checklist ini selepas frontend push dan Apps Script redeploy.

## 1. Public Routes

- [ ] `https://akmal4244.github.io/sprad/` buka halaman log masuk.
- [ ] `/login` buka log masuk tanpa `.html`.
- [ ] `/register` buka daftar pengguna tanpa pilihan pentadbir awam.
- [ ] `/view` tanpa token redirect ke login.
- [ ] `/form` tanpa token redirect ke login.

## 2. Login dan Session

- [ ] Login `akmal4244 / a1234` berjaya.
- [ ] Role pentadbir masuk ke `/view`.
- [ ] Role pengguna masuk ke `/form`.
- [ ] Password salah papar error.
- [ ] `Ingat saya` hanya simpan username, bukan password.
- [ ] Logout membuang token, role, user id dan institution id.

## 3. Apps Script V2 Foundation

- [ ] `config.get` pulangkan schema `2.2-phase2-data-master`.
- [ ] `riskMatrix.get` pulangkan scale dan risk level dari sheet.
- [ ] `auth.me` pulangkan user tanpa password/token.
- [ ] `institutions.list` berfungsi mengikut role.
- [ ] `orgUnits.list`, `auditCycles.list`, `audits.list`, `riskCategories.list` berfungsi.
- [ ] `dashboard.summary` pulangkan total, counts, high/critical percent, category summary dan overdue actions.
- [ ] `reports.dataset` pulangkan institution, findings, risk matrix, overall, categories dan actions.

## 3A. Data Induk Fasa 2

- [ ] `/institutions` buka tanpa `.html` dan memaparkan jadual institusi.
- [ ] Super admin boleh create, update, archive dan restore institusi.
- [ ] `/org-units` buka tanpa `.html` dan memaparkan PTJ / unit.
- [ ] Institution admin boleh create, update, archive dan restore PTJ institusi sendiri.
- [ ] `/users` buka tanpa `.html` dan memaparkan user tanpa password.
- [ ] Admin boleh create, update, deactivate dan restore user.
- [ ] `/settings` buka tanpa `.html` dan memaparkan kategori serta matriks risiko.
- [ ] Admin boleh create, update, archive dan restore kategori risiko.
- [ ] Admin boleh update label, julat skor, warna dan SLA tahap risiko.
- [ ] Jadual data induk paginate 5 rekod dan tidak scroll kiri kanan.

## 4. Mutation Receipt

- [ ] POST `findings.create` dengan `request_id` unik menulis receipt success.
- [ ] Poll `mutations.status` untuk request itu pulangkan receipt success.
- [ ] POST request yang sama kali kedua tidak cipta rekod duplicate.
- [ ] Request invalid token menulis receipt error.
- [ ] UI tidak papar berjaya sebelum receipt success.

## 5. Risk Engine

- [ ] K1 x I1 = 1, Rendah.
- [ ] K2 x I3 = 6, Sederhana.
- [ ] K3 x I3 = 9, Tinggi.
- [ ] K4 x I4 = 16, Kritikal.
- [ ] Likelihood 5 ditolak backend.
- [ ] Impact 0 ditolak backend.

## 6. Workflow

- [ ] Auditor boleh create draft finding.
- [ ] Auditor boleh submit draft.
- [ ] Reviewer/admin boleh return dengan review note.
- [ ] Reviewer/admin boleh approve.
- [ ] Override level tanpa sebab ditolak.
- [ ] Override level dengan sebab menulis audit log.
- [ ] Finding dalam finalized cycle tidak boleh diedit.

## 7. Soft Delete dan Audit Log

- [ ] `findings.delete` set `deleted_at` dan `deleted_by`, bukan hard delete.
- [ ] `findings.restore` kosongkan `deleted_at` dan `deleted_by`.
- [ ] `institutions.delete` archive institusi.
- [ ] `audit_logs` tidak mengandungi password, token, token hash atau salt.

## 8. Dashboard UI

- [ ] Dashboard memaparkan 5 row setiap page.
- [ ] Button sebelum/seterusnya berfungsi.
- [ ] Data cache muncul cepat selepas reload pertama.
- [ ] Cache tidak bercampur antara user/institution.
- [ ] Loading animation muncul semasa request Google Sheets lambat.
- [ ] Tiada horizontal overflow desktop/mobile.

## 9. Form UI

- [ ] Semua required fields aktif.
- [ ] Risk preview berubah ikut likelihood/impact.
- [ ] Submit menunjukkan loading.
- [ ] Selepas receipt success, toast berjaya keluar dan form reset.
- [ ] Jika backend belum deploy receipt, UI papar mesej belum disahkan, bukan false success.

## 10. Browser QA

- [ ] Tiada console error kritikal.
- [ ] Chrome mobile viewport 390px tidak overflow.
- [ ] Desktop 1366px tidak overlap.
- [ ] Favicon Jata Negara muncul.
- [ ] Title tab sesuai: `SPRAD | ...`.
