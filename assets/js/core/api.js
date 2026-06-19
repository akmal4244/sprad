import { getApiUrl } from "../config.js";

export function buildApiUrl(params, baseUrl = getApiUrl()) {
  return `${baseUrl}?${new URLSearchParams(params).toString()}`;
}

export async function getJson(params, options = {}) {
  const response = await fetch(buildApiUrl(params, options.baseUrl));
  const data = await response.json();
  if (!data.ok) {
    const error = data.error?.message || data.error || "Permintaan API gagal.";
    throw new Error(error);
  }
  return data;
}

export function unwrapData(response, fallback = null) {
  if (response?.data !== undefined) return response.data;
  return response ?? fallback;
}
