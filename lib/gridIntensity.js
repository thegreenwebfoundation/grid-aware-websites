import { getGridIntensity as electricityMaps } from "./data/electricityMaps.js";
import { averageIntensity } from "@tgwf/co2";
import { codes } from "../utils/countryCodes.js";

/**
 * Fetch the grid intensity for a given zone.
 * @param {string} zone The zone to fetch the grid intensity for.
 * @param {string} apiKey The Electricity Maps API key to use for the request.
 * @returns {Promise<object>} The grid intensity data for the given zone.
 * @example
 * const zone = "DE";
 * const apiKey = "your-api-key";
 * const gridIntensity = await fetchGridIntensity(zone, apiKey);
 */


const fetchGridIntensity = async (zone, apiKey) => {
  const response = await electricityMaps(zone, apiKey);

  if (response.status === "error") {
    return response;
  }

  const { data } = response;
  let zoneCode = zone;

  // If it's a 2 character zone, we need to get the equivalent 3 character zone ID to check against the data in CO2.js
  if (zone.length === 2) {
    zoneCode = codes.find((code) => code.alpha2Code === zoneCode)?.alpha3Code;
  }

  const zoneAverageIntensity = averageIntensity.data[zoneCode];

  let gridAware = false;
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
};

export { fetchGridIntensity };
