/**
 * This function fetches the carbon intensity of the grid for a given zone from the Electricity Map API.
 * Refer to the API documentation for more information: https://docs.electricitymaps.com/
 * @param {string|object} zone The two-letter code for the zone (e.g. "DE" for Germany) or an object containing lat and lon properties (e.g. { lat: 51.1, lon: 0.1 }).
 * @param {string} apiKey The API key for accessing the Electricity Map API. Obtain from https://api-portal.electricitymaps.com/
 * @returns {Promise<object>} The carbon intensity of the grid for the given zone.
 *
 * @example
 * const zone = "DE"; // Germany
 * const apiKey = "your-api
 * const gridIntensity = await getGridIntensity(zone, apiKey);
 */
export function getGridIntensity(zone: string | object, apiKey: string): Promise<object>;
/**
 * This function fetches the power breakdown of the grid for a given zone from the Electricity Map API.
 * Refer to the API documentation for more information: https://docs.electricitymaps.com/
 * @param {string} zone The two-letter code for the zone (e.g. "DE" for Germany).
 * @param {string} apiKey The API key for accessing the Electricity Map API. Obtain from https://api-portal.electricitymaps.com/
 * @returns {Promise<object>} The power breakdown of the grid for the given zone.
 */
export function getPowerBreakdown(zone: string, apiKey: string): Promise<object>;
//# sourceMappingURL=index.d.ts.map