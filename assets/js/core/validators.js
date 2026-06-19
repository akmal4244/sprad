export function requireText(value, fieldName) {
  const text = String(value || "").trim();
  if (!text) throw new Error(`${fieldName} wajib diisi.`);
  return text;
}

export function validateEmail(value) {
  const email = requireText(value, "E-mel");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new Error("E-mel tidak sah.");
  }
  return email;
}

export function validateRiskScale(value, fieldName) {
  const parsed = Number(value);
  if (!Number.isInteger(parsed) || parsed < 1 || parsed > 4) {
    throw new Error(`${fieldName} mesti antara 1 hingga 4.`);
  }
  return parsed;
}

export function validateWorkflowStatus(value, allowedStatuses) {
  const status = requireText(value, "Status");
  if (!allowedStatuses.includes(status)) {
    throw new Error(`Status tidak sah: ${status}`);
  }
  return status;
}

export function validateRequiredFields(data, fields) {
  const errors = {};
  fields.forEach((field) => {
    if (!String(data?.[field] || "").trim()) errors[field] = "REQUIRED";
  });
  return {
    ok: Object.keys(errors).length === 0,
    errors
  };
}
