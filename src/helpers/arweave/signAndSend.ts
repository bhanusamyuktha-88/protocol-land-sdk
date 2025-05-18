import { createData, ArweaveSigner } from "arbundles";
import { Tag } from "../../types";

export async function signAndSendTx(
  data: string | ArrayBuffer | Uint8Array,
  tags: Tag[],
  jwkOrNull: any
): Promise<string> {

  let signer: ArweaveSigner;
  if (!jwkOrNull || typeof jwkOrNull !== "object") {
    throw new Error(
      "Node mode: expected a valid JWK object, got " + typeof jwkOrNull
    );
  }
  signer = new ArweaveSigner(jwkOrNull);

  const dataItem = createData(data as string | Uint8Array, signer, { tags }); 
  await dataItem.sign(signer); 

  const endpoint = "https://turbo.ardrive.io/tx";
  const res = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/octet-stream" },
    body: dataItem.getRaw(),
  });

  if (!res.ok) {
    throw new Error(`[Turbo] upload failed: ${res.status} ${res.statusText}`);
  }

  return dataItem.id;
}