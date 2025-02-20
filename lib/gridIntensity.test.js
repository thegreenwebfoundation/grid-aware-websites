import { expect, test } from "vitest";
import { GridIntensity } from "./gridIntensity.js";

const gridIntensity = new GridIntensity({
  apiKey: import.meta.env.VITE_EMAPS_API_KEY,
});

// Test to check that some data is returned for a valid zone
test("fetchGridIntensity returns data for a valid zone", async () => {
  const zone = "DE"; // Germany
  const result = await gridIntensity.check(zone);
  expect(result).toBeTypeOf("object");
  expect(result).toHaveProperty("status", "success");
});

// Test to check that an error is returned for an invalid zone
test("fetchGridIntensity returns an error for an invalid zone", async () => {
  const zone = "ZZ"; // Invalid zone
  const result = await gridIntensity.check(zone);
  expect(result).toHaveProperty("status", "error");
  expect(result).toHaveProperty("message", "Network response was not ok");
});

// Test to check that the mode is either 'average' or 'limit'
test("fetchGridIntensity throws an error if the mode is invalid", async () => {
  const options = { mode: "invalid" };
  expect(() => gridIntensity.setOptions(options)).toThrow("Invalid mode. Mode must be 'average' or 'limit'.");
});

// Test to check that the minimumIntensity is a number
test("fetchGridIntensity throws an error if the minimumIntensity is invalid", async () => {
  const options = { minimumIntensity: "invalid" };
  expect(() => gridIntensity.setOptions(options)).toThrow("Invalid minimumIntensity. minimumIntensity must be a number.");
});

// Test to check response structure when mode is 'average'
test("fetchGridIntensity returns correct keys for average mode", async () => {
  const zone = "DE";
  const options = { mode: "average" };
  gridIntensity.setOptions(options);
  const result = await gridIntensity.check(zone);
  expect(result).toHaveProperty("status", "success");
  expect(result).toHaveProperty("region", "DE");
  expect(result).toHaveProperty("gridAware");
  expect(result.data).toHaveProperty("mode");
  expect(result.data).toHaveProperty("carbonIntensity");
  expect(result.data).toHaveProperty("averageIntensity");
  expect(result.data).not.toHaveProperty("minimumIntensity");
});

// Test to check response structure when mode is 'limit'
test("fetchGridIntensity returns correct keys for limit mode", async () => {
  const zone = "DE";
  const options = { mode: "limit" };
  gridIntensity.setOptions(options);
  const result = await gridIntensity.check(zone);
  expect(result).toHaveProperty("status", "success");
  expect(result).toHaveProperty("region", "DE");
  expect(result).toHaveProperty("gridAware");
  expect(result.data).toHaveProperty("mode");
  expect(result.data).toHaveProperty("carbonIntensity");
  expect(result.data).toHaveProperty("minimumIntensity");
  expect(result.data).not.toHaveProperty("averageIntensity");
});

// Test that the "zone" parameter is either a string or an object
test("fetchGridIntensity throws an error if the zone parameter is invalid", async () => {
  const zone = 123; // Invalid zone
  await expect(gridIntensity.check(zone)).resolves.toEqual({
    status: "error",
    message: "Invalid zone. Zone object must contain lat and lon properties.",
  });

  const zone2 = "DE"; // Valid string
  await expect(gridIntensity.check(zone2)).resolves.toHaveProperty("status", "success");

  const zone3 = { lat: 51.1, lon: 0.1 }; // Valid object
  await expect(gridIntensity.check(zone3)).resolves.toHaveProperty("status", "success");

  const zone4 = { region: "DE" }; // Valid zone type, but eventually it should fail because it's not a valid zone
  await expect(gridIntensity.check(zone4)).resolves.toHaveProperty("status", "error");
});