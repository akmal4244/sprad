function parseContactTimestamp(contact) {
  const idTimestamp = Number(contact?.id);
  if (Number.isFinite(idTimestamp) && idTimestamp > 0) return idTimestamp;

  const rawDate = String(contact?.created_at || "").trim();
  if (!rawDate) return 0;

  const normalizedDate = rawDate.includes(" ") ? rawDate.replace(" ", "T") : rawDate;
  const parsedDate = Date.parse(normalizedDate);
  return Number.isFinite(parsedDate) ? parsedDate : 0;
}

export function sortContactsByNewest(contacts) {
  return [...contacts].sort((left, right) =>
    parseContactTimestamp(right) - parseContactTimestamp(left)
  );
}
