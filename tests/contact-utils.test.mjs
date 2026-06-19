import test from "node:test";
import assert from "node:assert/strict";
import { sortContactsByNewest } from "../assets/js/core/contact-utils.js";

test("sorts contact submissions with newest records first", () => {
  const contacts = [
    { id: "1000", name: "Lama", created_at: "2026-06-19 10:00:00" },
    { id: "3000", name: "Terbaru", created_at: "2026-06-19 12:00:00" },
    { id: "2000", name: "Tengah", created_at: "2026-06-19 11:00:00" }
  ];

  assert.deepEqual(
    sortContactsByNewest(contacts).map(contact => contact.name),
    ["Terbaru", "Tengah", "Lama"]
  );
  assert.deepEqual(
    contacts.map(contact => contact.name),
    ["Lama", "Terbaru", "Tengah"]
  );
});

test("uses created_at when id is not timestamp-like", () => {
  const contacts = [
    { id: "abc", name: "Semalam", created_at: "2026-06-18 23:59:00" },
    { id: "def", name: "Hari ini", created_at: "2026-06-19 09:00:00" }
  ];

  assert.equal(sortContactsByNewest(contacts)[0].name, "Hari ini");
});
