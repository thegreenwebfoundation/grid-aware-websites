/* This plugin will:

- Get the user country data from the request & return that to be used by the grid-aware-websites plugin

Secondary features:

- Allow developers to opt-in to using Workers KV to save Electricity Maps responses for a specific duration.
- Allow developers to opt-in to using Workers KV to save the HTML response for a specified duration. Here be dragons though.
- Allow lat lon to be returned instead of the country code.
*/

/**
 * Get the location of the user from the request object.
 * @param {Request} request The incoming request object.
 * @returns {object} The country of the user.
 * @example
 * const location = getLocation(request);
 * location = { country: "DE" }
 */

const getLocation = (request) => {

  const country = request.cf?.country;

  if (!country) {
    return {
      status: "error",
    };
  }


  return {
    country,
  };
  
};

export default getLocation;
