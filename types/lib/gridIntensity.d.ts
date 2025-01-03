/**
 * Fetch the grid intensity for a given zone.
 * @param {string|object} zone The string ID for the zone (e.g. "DE" for Germany) or an object containing lat and lon properties (e.g. { lat: 51.1, lon: 0.1 }) for which we want to get data for.
 * @param {string} apiKey The Electricity Maps API key to use for the request.
 * @param {object} options Additional options for the request.
 * @returns {Promise<object>} The grid intensity data for the given zone.
 * @example
 * const zone = "DE";
 * const apiKey = "your-api-key";
 * const gridIntensity = await fetchGridIntensity(zone, apiKey);
 */
export function fetchGridIntensity(zone: string | object, apiKey: string, options: object): Promise<object>;
//# sourceMappingURL=gridIntensity.d.ts.map