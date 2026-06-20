import { getJson } from "../core/api.js";
import { normalizeHealthResponse } from "../core/system-health-utils.js";

export async function getSystemHealth(token) {
  const response = await getJson({ action: "system.health", token });
  return normalizeHealthResponse(response);
}
