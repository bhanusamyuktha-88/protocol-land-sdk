export function isNode() {
  return (
    typeof process !== "undefined" &&
    typeof process.versions === "object" &&
    typeof process.versions.node !== "undefined"
  );
}

export function isBrowser() {
  return typeof window === "object" && typeof document === "object";
}
