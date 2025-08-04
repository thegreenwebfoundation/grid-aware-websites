import { fetchData, setupFunction } from "./helpers.js";

/**
 * This function fetches the carbon intensity of the grid for a given zone from the Electricity Map API.
 * Refer to the API documentation for more information: https://docs.electricitymaps.com/
 * @param {string|{lat: string, lon: string}} zone The two-letter code for the zone (e.g. "DE" for Germany) or an object containing lat and lon properties (e.g. { lat: 51.1, lon: 0.1 }).
 * @param {"level"|"average"|"limit"} mode The mode of the carbon intensity data to fetch.
 * @param {string} apiKey The API key for accessing the Electricity Map API. Obtain from https://api-portal.electricitymaps.com/
 * @returns {Promise<object>} The carbon intensity of the grid for the given zone.
 *
 * @example
 * const zone = "DE"; // Germany
 * const apiKey = "your-api
 * const gridIntensity = await getGridIntensity(zone, apiKey);
 */
const getGridIntensity = async (zone, mode, apiKey) => {
  const setup = await setupFunction(zone, apiKey);

  if (setup.status === "error") {
    return setup;
  }

  const { lat, lon } = setup;

  let url = `https://api.electricitymap.org/v3/carbon-intensity-level/latest?${lat && lon ? `lat=${lat}&lon=${lon}` : `zone=${zone}`}`;

  if (mode !== "level") {
    url = `https://api.electricitymap.org/v3/carbon-intensity/latest?${lat && lon ? `lat=${lat}&lon=${lon}` : `zone=${zone}`}`;
  }

  const headers = {
    "auth-token": apiKey,
  };

  return fetchData(url, headers);
};

/**
 * This function fetches the power breakdown of the grid for a given zone from the Electricity Map API.
 * Refer to the API documentation for more information: https://docs.electricitymaps.com/
 * @param {string|{lat: string, lon: string}} zone The two-letter code for the zone (e.g. "DE" for Germany).
 * @param {string} apiKey The API key for accessing the Electricity Map API. Obtain from https://api-portal.electricitymaps.com/
 * @returns {Promise<object>} The power breakdown of the grid for the given zone.
 */
const getPowerBreakdown = async (zone, apiKey) => {
  const setup = await setupFunction(zone, apiKey);

  if (setup.status === "error") {
    return setup;
  }

  const { lat, lon } = setup;

  const url = `https://api.electricitymap.org/v3/power-breakdown/latest?${lat && lon ? `lat=${lat}&lon=${lon}` : `zone=${zone}`}`;
  const headers = {
    "auth-token": apiKey,
  };

  return fetchData(url, headers);
};

export { getGridIntensity, getPowerBreakdown };
