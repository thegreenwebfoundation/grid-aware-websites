/* This plugin will:

- Get the user country data from the request & return that to be used by the grid-aware-websites plugin

Secondary features:

- Allow developers to opt-in to using Workers KV to save Electricity Maps responses for a specific duration.
- Allow developers to opt-in to using Workers KV to save the HTML response for a specified duration. Here be dragons though.
- ✅ Allow lat lon to be returned instead of the country code.

How much should this plugin do? Should it do error handling for requests?
*/

/**
 * Get the location of the user from the request object.
 * @param {Request} request The incoming request object.
 * @returns {object} The country of the user.
 * @example
 * const location = getLocation(request);
 * location = { country: "DE" }
 */

const getLocation = (request, options) => {
  const mode = options?.mode || "country";

  const country = request.cf?.country;

  if (mode === "latlon") {
    const lat = request.cf?.latitude;
    const lon = request.cf?.longitude;

    if (!lat || !lon) {
      if (!country) {
        return {
          status: "error",
        };
      }

      return {
        country,
      };
    }

    return {
      lat,
      lon,
    };
  }

  if (!country) {
    return {
      status: "error",
    };
  }

  return {
    country,
  };
};

export { getLocation };
