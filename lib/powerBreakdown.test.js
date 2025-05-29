import { expect, test } from "vitest";
import { PowerBreakdown } from "./powerBreakdown.js";

const powerBreakdown = new PowerBreakdown({
  apiKey: import.meta.env.VITE_EMAPS_API_KEY,
});

// Test to check that some data is returned for a valid zone
test("fetchPowerBreakdown returns data for a valid zone", async () => {
  const zone = "DE"; // Germany
  const result = await powerBreakdown.check(zone);
  expect(result).toBeTypeOf("object");
  expect(result).toHaveProperty("status", "success");
});

// Test to check that an error is returned for an invalid zone
test("fetchPowerBreakdown returns an error for an invalid zone", async () => {
  const zone = "ZZ"; // Invalid zone
  const result = await powerBreakdown.check(zone);
  expect(result).toHaveProperty("status", "error");
  expect(result).toHaveProperty("message", "Network response was not ok");
});

// Test to check that the mode is either 'renewable' or 'low-carbon'
test("fetchPowerBreakdown throws an error if the mode is invalid", async () => {
  const options = { mode: "invalid" };
  expect(() => powerBreakdown.setOptions(options)).toThrow(
    "Invalid mode. Mode must be 'renewable' or 'low-carbon'.",
  );
});

// Test to check that the minimumPercentage is a number between 0 and 100
test("fetchPowerBreakdown throws an error if the minimumPercentage is invalid", async () => {
  const options = { minimumPercentage: "invalid" };
  expect(() => powerBreakdown.setOptions(options)).toThrow(
    "Invalid minimumPercentage. minimumPercentage must be a number between 0 and 100.",
  );
});

// Test to check response structure when mode is renewable
test("fetchPowerBreakdown returns correct structure for renewable mode", async () => {
  const zone = "DE";
  const options = { mode: "renewable" };
  powerBreakdown.setOptions(options);
  const result = await powerBreakdown.check(zone);

  expect(result).toHaveProperty("status", "success");
  expect(result).toHaveProperty("region", zone);
  expect(result).toHaveProperty("gridAware");
  expect(result).toHaveProperty("data");
  expect(result.data).toHaveProperty("mode", "renewable");
  expect(result.data).toHaveProperty("minimumPercentage");
  expect(result.data).toHaveProperty("renewablePercentage");
  expect(result.data).not.toHaveProperty("lowCarbonPercentage");
});

// Test to check response structure when mode is low-carbon
test("fetchPowerBreakdown returns correct structure for low-carbon mode", async () => {
  const zone = "DE";
  const options = { mode: "low-carbon" };
  powerBreakdown.setOptions(options);
  const result = await powerBreakdown.check(zone);

  expect(result).toHaveProperty("status", "success");
  expect(result).toHaveProperty("region", zone);
  expect(result).toHaveProperty("gridAware");
  expect(result).toHaveProperty("data");
  expect(result.data).toHaveProperty("mode", "low-carbon");
  expect(result.data).toHaveProperty("minimumPercentage");
  expect(result.data).toHaveProperty("lowCarbonPercentage");
  expect(result.data).not.toHaveProperty("renewablePercentage");
});

// Test that the "zone" parameter is either a string or an object
test("fetchPowerBreakdown throws an error if the zone parameter is invalid", async () => {
  const zone = 123; // Invalid zone
  await expect(powerBreakdown.check(zone)).resolves.toEqual({
    status: "error",
    message: "Invalid zone. Zone object must contain lat and lon properties.",
  });

  const zone2 = "DE"; // Valid string
  await expect(powerBreakdown.check(zone2)).resolves.toHaveProperty(
    "status",
    "success",
  );

  const zone3 = { lat: "51.1", lon: "0.1" }; // Valid object
  await expect(powerBreakdown.check(zone3)).resolves.toHaveProperty(
    "status",
    "success",
  );

  const zone4 = { region: "DE" }; // Valid zone type, but eventually it should fail because it's not a valid zone
  await expect(powerBreakdown.check(zone4)).resolves.toHaveProperty(
    "status",
    "error",
  );
});

// Test that the "apiKey" parameter is required
test("fetchGridIntensity throws an error if the apiKey parameter is missing", async () => {
  const gridIntensity2 = new PowerBreakdown();
  const zone = "DE";
  await expect(gridIntensity2.check(zone)).resolves.toEqual({
    status: "error",
    message: "Zone and API key are both required",
  });
});
