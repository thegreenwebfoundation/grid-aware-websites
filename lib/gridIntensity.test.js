import { expect, test } from "vitest";
import { fetchGridIntensity } from "./gridIntensity.js";

// Test to check that some data is returned for a valid zone
test("fetchGridIntensity returns data for a valid zone", async () => {
  const zone = "DE"; // Germany
  const apiKey = import.meta.env.VITE_EMAPS_API_KEY;
  const result = await fetchGridIntensity(zone, apiKey);
  expect(result).toBeTypeOf("object");
  expect(result).toHaveProperty("status", "success");
});

// Test to check that an error is returned for an invalid zone
test("fetchGridIntensity returns an error for an invalid zone", async () => {
  const zone = "ZZ"; // Invalid zone
  const apiKey = import.meta.env.VITE_EMAPS_API_KEY;
  const result = await fetchGridIntensity(zone, apiKey);
  expect(result).toEqual({
    status: "error",
    message: "Invalid Electricity Maps zone.",
  });
});

// Test to check that the mode is either 'renewable' or 'low-carbon'
test("fetchGridIntensity throws an error if the mode is invalid", async () => {
  const zone = "DE"; // Germany
  const apiKey = import.meta.env.VITE_EMAPS_API_KEY;
  const options = { mode: "invalid" };
  await expect(fetchGridIntensity(zone, apiKey, options)).resolves.toEqual({
    status: "error",
    message: "Invalid mode. Mode must be 'average' or 'limit'.",
  });
});

// Test to check that the minimumIntensity is a number
test("fetchGridIntensity throws an error if the minimumIntensity is invalid", async () => {
  const zone = "DE"; // Germany
  const apiKey = import.meta.env.VITE_EMAPS_API_KEY;
  const options = { minimumIntensity: "invalid" };
  await expect(fetchGridIntensity(zone, apiKey, options)).resolves.toEqual({
    status: "error",
    message: "Invalid minimumIntensity. minimumIntensity must be a number.",
  });
});

// Test to check response structure when mode is 'average'
test("fetchGridIntensity returns correct keys for average mode", async () => {
  const zone = "DE";
  const apiKey = import.meta.env.VITE_EMAPS_API_KEY;
  const options = { mode: "average" };
  const result = await fetchGridIntensity(zone, apiKey, options);
  expect(result).toHaveProperty("status", "success");
  expect(result).toHaveProperty("region", "DE");
  expect(result).toHaveProperty("gridAware");
  expect(result.data).toHaveProperty("carbonIntensity");
  expect(result.data).toHaveProperty("averageIntensity");
  expect(result.data).not.toHaveProperty("minimumIntensity");
});

// Test to check response structure when mode is 'limit'
test("fetchGridIntensity returns correct keys for limit mode", async () => {
  const zone = "DE";
  const apiKey = import.meta.env.VITE_EMAPS_API_KEY;
  const options = { mode: "limit" };
  const result = await fetchGridIntensity(zone, apiKey, options);
  expect(result).toHaveProperty("status", "success");
  expect(result).toHaveProperty("region", "DE");
  expect(result).toHaveProperty("gridAware");
  expect(result.data).toHaveProperty("carbonIntensity");
  expect(result.data).toHaveProperty("minimumIntensity");
  expect(result.data).not.toHaveProperty("averageIntensity");
});
