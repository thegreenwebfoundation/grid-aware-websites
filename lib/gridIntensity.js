import { getGridIntensity } from "./data/electricityMaps.js";
import { averageIntensity } from "@tgwf/co2";
import { codes } from "../utils/countryCodes.js";

/**
 * Fetch the grid intensity for a given zone.
 * @param {string} zone The zone to fetch the grid intensity for.
 * @param {string} apiKey The Electricity Maps API key to use for the request.
 * @param {object} options Additional options for the request.
 * @returns {Promise<object>} The grid intensity data for the given zone.
 * @example
 * const zone = "DE";
 * const apiKey = "your-api-key";
 * const gridIntensity = await fetchGridIntensity(zone, apiKey);
 */

const fetchGridIntensity = async (zone, apiKey, options) => {
  let mode = "average"; // The mode of the grid intensity. Options: 'average', 'limit'
  let minimumIntensity = 400; // The minimum grid intensity value (grams CO2e/kWh) before gridAware is set to true.

  if (options) {
    if (options.mode) {
      if (options.mode !== "average" && options.mode !== "limit") {
        return {
          status: "error",
          message: "Invalid mode. Mode must be 'average' or 'limit'.",
        };
      }
      mode = options.mode;
    }

    if (options.minimumIntensity) {
      if (isNaN(options.minimumIntensity)) {
        return {
          status: "error",
          message:
            "Invalid minimumIntensity. minimumIntensity must be a number.",
        };
      }
      minimumIntensity = options.minimumIntensity;
    }
  }

  const response = await getGridIntensity(zone, apiKey);

  if (response.status === "error") {
    return response;
  }

  const { data } = response;
  let zoneCode = zone;
  let gridAware = false;

  if (mode === "average") {
    // If it's a 2 character zone, we need to get the equivalent 3 character zone ID to check against the data in CO2.js
    if (zone.length === 2) {
      zoneCode = codes.find((code) => code.alpha2Code === zoneCode)?.alpha3Code;
    }

    const zoneAverageIntensity = averageIntensity.data[zoneCode];

    if (data.carbonIntensity > zoneAverageIntensity) {
      gridAware = true;
    }

    return {
      status: "success",
      region: zone,
      gridAware,
      data: {
        carbonIntensity: data.carbonIntensity,
        averageIntensity: zoneAverageIntensity,
      },
    };
  } else if (mode === "limit") {
    if (data.carbonIntensity > minimumIntensity) {
      gridAware = true;
    }

    return {
      status: "success",
      region: zone,
      gridAware,
      data: {
        carbonIntensity: data.carbonIntensity,
        minimumIntensity,
      },
    };
  }
};

export { fetchGridIntensity };
