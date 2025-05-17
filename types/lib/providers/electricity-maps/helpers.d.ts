/**
 * This function fetches data from a given URL with the provided headers.
 * @param {string} url The URL to fetch data from.
 * @param {object} headers The headers to include in the fetch request.
 * @returns {Promise<object>} The fetched data.
 */
export function fetchData(url: string, headers: object): Promise<object>;
/**
 * This function sets up the parameters for fetching data based on the zone provided.
 * @param {string | {lat: string, lon: string}} zone The two-letter code for the zone (e.g. "DE" for Germany) or an object containing lat and lon properties.
 * @param {string} apiKey The API key for accessing the Electricity Map API. Obtain from https://api-portal.electricitymaps.com/
 * @returns {Promise<object>} The setup parameters for fetching data.
 */
export function setupFunction(zone: string | {
    lat: string;
    lon: string;
}, apiKey: string): Promise<object>;
//# sourceMappingURL=helpers.d.ts.map