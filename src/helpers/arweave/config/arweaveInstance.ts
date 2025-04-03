import Arweave from "arweave";

export const arweaveMainNode = Arweave.init({
    host: "arweave.net",
    port: 443,
    protocol: "https",
});

export const arweaveSearchNode = Arweave.init({
    host: "arweave-search.goldsky.com",
    port: 443,
    protocol: "https",
  });
  