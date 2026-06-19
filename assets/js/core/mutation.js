export {
  buildMutationRequest,
  createRequestId,
  pollMutationReceipt
} from "./mutation-utils.js";

export async function postOpaqueMutation(url, request) {
  await fetch(url, {
    method: "POST",
    mode: "no-cors",
    body: JSON.stringify(request)
  });
}
