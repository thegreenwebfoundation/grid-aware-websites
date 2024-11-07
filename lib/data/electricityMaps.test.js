import { expect, test, vi } from "vitest";
import { electricityMaps } from "./electricityMaps.js";

// Write a test to ensure a zone is provided to getGridIntensity
test("getGridIntensity requires a zone and API key", async () => {
  await expect(electricityMaps()).resolves.toEqual({
    status: "error",
    message: "Zone and API key are both required",
  });

  await expect(electricityMaps("DE")).resolves.toEqual({
    status: "error",
    message: "Zone and API key are both required",
  });

  await expect(
    electricityMaps("DE", import.meta.env.VITE_EMAPS_API_KEY),
  ).resolves.toBeDefined();
});

// Write a test to check for a valid zone
test("getGridIntensity checks for a valid zone", async () => {
  await expect(
    electricityMaps("ZZ", import.meta.env.VITE_EMAPS_API_KEY),
  ).resolves.toEqual({
    status: "error",
    message: "Invalid ElectricityMaps zone.",
  });

  await expect(
    electricityMaps("DE", import.meta.env.VITE_EMAPS_API_KEY),
  ).resolves.toBeDefined();
});

// Test successful API response
test("getGridIntensity returns correct data structure on success", async () => {
  const result = await electricityMaps("DE", "test-api-key");
  expect(result).toHaveProperty("status", "success");
  expect(result).toHaveProperty("data");
  expect(result).toHaveProperty("data.carbonIntensity");
  expect(result).toHaveProperty("data.createdAt");
});
