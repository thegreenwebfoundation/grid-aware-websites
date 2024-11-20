import { expect, test } from "vitest";
import { fetchPowerBreakdown } from "./powerBreakdown.js";

// Test to check that some data is returned for a valid zone
test("fetchPowerBreakdown returns data for a valid zone", async () => {
  const zone = "DE"; // Germany
  const apiKey = import.meta.env.VITE_EMAPS_API_KEY;
  const result = await fetchPowerBreakdown(zone, apiKey);
  expect(result).toBeTypeOf("object");
  expect(result).toHaveProperty("status", "success");
});

// Test to check that an error is returned for an invalid zone
test("fetchPowerBreakdown returns an error for an invalid zone", async () => {
  const zone = "ZZ"; // Invalid zone
  const apiKey = import.meta.env.VITE_EMAPS_API_KEY;
  const result = await fetchPowerBreakdown(zone, apiKey);
  expect(result).toEqual({
    status: "error",
    message: "Invalid Electricity Maps zone.",
  });
});

// Test to check that the mode is either 'renewable' or 'low-carbon'
test("fetchPowerBreakdown throws an error if the mode is invalid", async () => {
  const zone = "DE"; // Germany
  const apiKey = import.meta.env.VITE_EMAPS_API_KEY;
  const options = { mode: "invalid" };
  await expect(fetchPowerBreakdown(zone, apiKey, options)).resolves.toEqual({
    status: "error",
    message: "Invalid mode. Mode must be 'renewable' or 'low-carbon'.",
  });
});

// Test to check that the minimumPercentage is a number between 0 and 100
test("fetchPowerBreakdown throws an error if the minimumPercentage is invalid", async () => {
  const zone = "DE"; // Germany
  const apiKey = import.meta.env.VITE_EMAPS_API_KEY;
  const options = { minimumPercentage: "invalid" };
  await expect(fetchPowerBreakdown(zone, apiKey, options)).resolves.toEqual({
    status: "error",
    message:
      "Invalid minimumPercentage. minimumPercentage must be a number between 0 and 100.",
  });
});
