# SPRAD Apps Script

Fail `Code.gs` dalam folder ini ialah asas backend SPRAD V2 yang masih kompatibel dengan sistem lama.

## Cara guna

1. Buka projek Google Apps Script SPRAD.
2. Backup kod semasa dahulu.
3. Salin kandungan `apps-script/Code.gs` ke Apps Script.
4. Jalankan fungsi `setup()` sekali daripada Apps Script editor.
5. Deploy semula Web App.
6. Pastikan Web App masih menggunakan akses yang sama seperti deployment sebelum ini.

## Apa yang disokong

- Login/register/getContacts legacy masih dikekalkan.
- Public admin registration ditutup melalui `ALLOW_PUBLIC_ADMIN_REGISTER = false`.
- Sheet lama `contacts`, `users`, `sessions`, dan `settings` masih digunakan.
- Sheet V2 akan dicipta secara idempotent:
  - `institutions`
  - `org_units`
  - `audit_cycles`
  - `audits`
  - `risk_categories`
  - `likelihood_scale`
  - `impact_scale`
  - `risk_levels`
  - `findings`
  - `finding_units`
  - `corrective_actions`
  - `attachments`
  - `audit_logs`
  - `mutation_receipts`
- Risk score dikira semula di backend untuk action `findings.create` dan `findings.create.legacy`.
- Submit borang V2 turut mengisi `contacts` supaya dashboard legacy masih boleh membaca rekod.

## Nota

Frontend live masih menggunakan POST `mode: "no-cors"`. Fasa seterusnya perlu menambah polling `mutations.status` supaya UI hanya papar berjaya selepas receipt disahkan.
