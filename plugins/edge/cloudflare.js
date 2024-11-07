/* This plugin will:

- Get the user country, lat, and lon data from the request & return that to be used by the grid-aware-websites plugin

Secondary features:

- Allow developers to opt-in to using Workers KV to save Electricity Maps responses for a specific duration.
- Allow developers to opt-in to using Workers KV to save the HTML response for a specified duration. Here be dragons though.
*/

/**
 * Get the location of the user from the request object.
 * @param {Request} request The incoming request object.
 * @returns {object} The latitude, longitude, and country of the user.
 * @example
 * const location = getLocation(request);
 * location = { lat: 52.52, lon: 13.405, country: "DE" }
 */

const getLocation = (request) => {

  // if request is for a html page
  const lat = request.cf?.latitude;
  const lon = request.cf?.longitude;
  const country = request.cf?.country;

  return {
    lat,
    lon,
    country,
  };
  
};

export default getLocation;
