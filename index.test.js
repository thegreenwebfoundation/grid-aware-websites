import { expect, test } from "vitest";
import { fetchGridIntensity } from "./index.js";

// Test to check that some data is returned for a valid zone
test("getGridIntensity returns data for a valid zone", async () => {
    const zone = "DE"; // Germany
    const apiKey = import.meta.env.VITE_EMAPS_API_KEY;
    const result = await fetchGridIntensity(zone, apiKey);
    expect(result).toBeTypeOf("object");
    expect(result).toHaveProperty("status", "success"); 
});

// Test to check that an error is returned for an invalid zone
test("getGridIntensity returns an error for an invalid zone", async () => {
    const zone = "ZZ"; // Invalid zone
    const apiKey = import.meta.env.VITE_EMAPS_API_KEY;
    const result = await fetchGridIntensity(zone, apiKey);
    expect(result).toEqual({
        status: "error",
        message: "Invalid ElectricityMaps zone.",
    });
});