import { describe, it, expect } from "vitest";
import { getLocation } from ".";

describe("getLocation", () => {
  it("should return location data when CF data is present", () => {
    const mockRequest = {
      cf: {
        country: "DE",
      },
    };

    const result = getLocation(mockRequest);

    expect(result).toEqual({
      country: "DE",
    });
  });

  it("should return return an error when all data is undefined", () => {
    const mockRequest = {};

    const result = getLocation(mockRequest);

    expect(result).toEqual({
      status: "error",
    });
  });

  // The plugin can also take an options object with a setting for the "mode" of obtaining the user location. Options would be latlon or country. The default is country.

  it("should return the lat lon when the options object is set to latlon", () => {
    const mockRequest = {
      cf: {
        latitude: 1,
        longitude: 2,
      },
    };

    const result = getLocation(mockRequest, { mode: "latlon" });

    expect(result).toEqual({
      lat: 1,
      lon: 2,
    });
  });

  it("should return the country when the options object is not set", () => {
    const mockRequest = {
      cf: {
        country: "DE",
      },
    };

    const result = getLocation(mockRequest);

    expect(result).toEqual({
      country: "DE",
    });
  });

  it("should return the country when the options object is set incorrectly", () => {
    const mockRequest = {
      cf: {
        country: "DE",
      },
    };

    const result = getLocation(mockRequest, { mode: "invalid" });

    expect(result).toEqual({
      country: "DE",
    });
  });
});
