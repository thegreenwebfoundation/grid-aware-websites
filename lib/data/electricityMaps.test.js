import { expect, test } from "vitest";
import { getGridIntensity, getPowerBreakdown } from "./electricityMaps.js";

// Write a test to ensure a zone is provided to getGridIntensity
test("getGridIntensity requires a zone and API key", async () => {
  await expect(getGridIntensity()).resolves.toEqual({
    status: "error",
    message: "Zone and API key are both required",
  });

  await expect(getGridIntensity("DE")).resolves.toEqual({
    status: "error",
    message: "Zone and API key are both required",
  });

  await expect(
    getGridIntensity("DE", import.meta.env.VITE_EMAPS_API_KEY),
  ).resolves.toBeDefined();
});

// Write a test to check for a valid zone
test("getGridIntensity checks for a valid zone", async () => {
  await expect(
    getGridIntensity("ZZ", import.meta.env.VITE_EMAPS_API_KEY),
  ).resolves.toEqual({
    status: "error",
    message: "Invalid Electricity Maps zone.",
  });

  await expect(
    getGridIntensity("DE", import.meta.env.VITE_EMAPS_API_KEY),
  ).resolves.toBeDefined();
});

// Test successful API response
test("getGridIntensity returns correct data structure on success", async () => {
  const result = await getGridIntensity("DE", "test-api-key");
  expect(result).toHaveProperty("status", "success");
  expect(result).toHaveProperty("data");
  expect(result).toHaveProperty("data.carbonIntensity");
  expect(result).toHaveProperty("data.createdAt");
});

// Test getPowerBreakdown parameter validation
test("getPowerBreakdown requires a zone and API key", async () => {
  await expect(getPowerBreakdown()).resolves.toEqual({
    status: "error",
    message: "Zone and API key are both required",
  });

  await expect(getPowerBreakdown("DE")).resolves.toEqual({
    status: "error",
    message: "Zone and API key are both required",
  });

  await expect(
    getPowerBreakdown("DE", import.meta.env.VITE_EMAPS_API_KEY),
  ).resolves.toBeDefined();
});

// Test getPowerBreakdown zone validation
test("getPowerBreakdown checks for a valid zone", async () => {
  await expect(
    getPowerBreakdown("ZZ", import.meta.env.VITE_EMAPS_API_KEY),
  ).resolves.toEqual({
    status: "error",
    message: "Invalid Electricity Maps zone.",
  });

  await expect(
    getPowerBreakdown("DE", import.meta.env.VITE_EMAPS_API_KEY),
  ).resolves.toBeDefined();
});

// Test getPowerBreakdown successful API response
test("getPowerBreakdown returns correct data structure on success", async () => {
  const result = await getPowerBreakdown("DE", import.meta.env.VITE_EMAPS_API_KEY);
  expect(result).toHaveProperty("status", "success");
  expect(result).toHaveProperty("data");
  expect(result).toHaveProperty("data.powerConsumptionBreakdown");
  expect(result).toHaveProperty("data.createdAt");
});
