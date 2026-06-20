# SPRAD API Contract

Tarikh kemaskini: 2026-06-19

Stack API kekal Google Apps Script Web App. Semua URL Apps Script disimpan di `assets/js/config.js`.

## Response Envelope V2

Endpoint V2 GET memulangkan bentuk:

```json
{
  "ok": true,
  "data": {},
  "error": null,
  "meta": {
    "requestId": "uuid",
    "timestamp": "2026-06-19T12:00:00.000Z"
  }
}
```

Endpoint legacy seperti `login`, `register`, dan `getContacts` masih mengekalkan field rata untuk compatibility frontend sedia ada.

## Auth

| Method | Action | Token | Nota |
| --- | --- | --- | --- |
| GET | `login` | Tidak | Legacy login; response turut pulangkan `user_id`, `institution_id`, dan `v2_role` selepas Code.gs V2.2 deploy. |
| GET | `register` | Tidak | Public registration hanya role pengguna. Pentadbir awam ditutup. |
| GET | `auth.me` | Ya | Pulangkan profil user tersanitasi. |
| GET | `auth.logout` | Ya | Revoke session jika kolum V2 tersedia. |

## Read Actions

| Action | Data |
| --- | --- |
| `config.get` | Nama sistem, schema version, logo, role, registration policy. |
| `institutions.list` / `institutions.get` | Institusi aktif mengikut scope role. |
| `orgUnits.list` | PTJ / Jabatan / Unit mengikut institusi. |
| `users.list` | Senarai user tersanitasi untuk admin. |
| `auditCycles.list` | Kitaran audit. |
| `audits.list` | Audit engagement. |
| `riskCategories.list` | Kategori risiko. |
| `riskMatrix.get` | Skala likelihood, impact dan risk levels daripada Google Sheets. |
| `findings.list` / `findings.get` | Penemuan audit mengikut tenant dan filter. |
| `correctiveActions.list` | Tindakan pembetulan, termasuk flag overdue. |
| `dashboard.summary` | Ringkasan tahap risiko, kategori dan tindakan. |
| `reports.dataset` | Dataset laporan print/export. |
| `mutations.status` | Receipt untuk POST `mode:"no-cors"`. |

## POST Mutations

Semua mutation V2 mesti dihantar sebagai JSON body dengan `action`, `token`, `request_id` atau `requestId`, dan `payload`.

```js
await fetch(URL, {
  method: "POST",
  mode: "no-cors",
  body: JSON.stringify({
    action: "findings.create",
    token,
    request_id,
    payload
  })
});
```

Client mesti polling:

```text
GET action=mutations.status&requestId=...&token=...
```

UI hanya boleh memaparkan berjaya selepas receipt `status="success"`.

Supported mutation actions:

- `institutions.create`, `institutions.update`, `institutions.delete`, `institutions.restore`
- `orgUnits.create`, `orgUnits.update`, `orgUnits.delete`, `orgUnits.restore`
- `riskCategories.create`, `riskCategories.update`, `riskCategories.delete`, `riskCategories.restore`
- `riskLevels.update`
- `auditCycles.create`, `auditCycles.update`, `auditCycles.finalize`
- `audits.create`, `audits.update`
- `findings.create`, `findings.update`, `findings.delete`, `findings.restore`
- `findings.submit`, `findings.return`, `findings.approve`, `findings.overrideLevel`
- `correctiveActions.create`, `correctiveActions.update`, `correctiveActions.submitForVerification`, `correctiveActions.verify`
- `users.create`, `users.update`, `users.deactivate`, `users.restore`
- `settings.update`

## Compatibility Actions

Masih disokong untuk UI lama:

- `GET login`
- `GET register`
- `GET getContacts`
- `POST findings.create.legacy`
- `POST contacts.update`
- `POST contacts.delete`

`contacts.delete` masih legacy CRUD. Rekod audit sebenar V2 menggunakan `findings.delete`, yang soft delete.
