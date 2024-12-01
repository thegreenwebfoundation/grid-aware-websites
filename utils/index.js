export const zoneTypeCheck = (zone) => {
  if (typeof zone !== "string" && typeof zone !== "object") {
    return {
      status: "error",
      message: "Invalid zone. Zone must be a string or object.",
    };
  }
}