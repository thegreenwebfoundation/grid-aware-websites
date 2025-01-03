/**
 * Fetch the power breakdown for a given zone.
 * @param {string|object} zone The string ID for the zone (e.g. "DE" for Germany) or an object containing lat and lon properties (e.g. { lat: 51.1, lon: 0.1 }) for which we want to get data for.
 * @param {string} apiKey The Electricity Maps API key to use for the request.
 * @param {object} options Additional options for the request.
 * @returns {Promise<object>} The power breakdown data for the given zone.
 */
export function fetchPowerBreakdown(zone: string | object, apiKey: string, options: object): Promise<object>;
//# sourceMappingURL=powerBreakdown.d.ts.map