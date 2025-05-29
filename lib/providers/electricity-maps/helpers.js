/**
 * This function checks if the provided zone and API key are present.
 * @param {string|{lat: string, lon: string}} zone The two-letter code for the zone (e.g. "DE" for Germany).
 * @param {string} apiKey The API key for accessing the Electricity Map API. Obtain from https://api-portal.electricitymaps.com/
 * @returns {boolean} True if both zone and API key are present, false otherwise.
 */
const checkParams = (zone, apiKey) => {
  if (!zone || !apiKey) {
    return false;
  }

  return true;
};

/**
 * This function fetches data from a given URL with the provided headers.
 * @param {string} url The URL to fetch data from.
 * @param {object} headers The headers to include in the fetch request.
 * @returns {Promise<object>} The fetched data.
 */
const fetchData = async (url, headers) => {
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: headers,
    });

    if (!response.ok) {
      return {
        status: "error",
        message: "Network response was not ok",
        details: response.statusText,
      };
    }

    const data = await response.json();
    return {
      status: "success",
      data: {
        ...data,
        region: data.zone,
      },
    };
  } catch (error) {
    return {
      status: "error",
      message: "There has been a problem with your fetch operation",
      details: error,
    };
  }
};

/**
 * This function sets up the parameters for fetching data based on the zone provided.
 * @param {string | {lat: string, lon: string}} zone The two-letter code for the zone (e.g. "DE" for Germany) or an object containing lat and lon properties.
 * @param {string} apiKey The API key for accessing the Electricity Map API. Obtain from https://api-portal.electricitymaps.com/
 * @returns {Promise<object>} The setup parameters for fetching data.
 */
const setupFunction = async (zone, apiKey) => {
  if (!checkParams(zone, apiKey)) {
    return {
      status: "error",
      message: "Zone and API key are both required",
    };
  }

  let lat,
    lon = null;

  if (typeof zone !== "string") {
    // Ensure that the zone has a lat and lon keys
    if ((typeof zone === "object" && !zone.lat) || !zone.lon) {
      return {
        status: "error",
        message:
          "Invalid zone. Zone object must contain lat and lon properties.",
      };
    } else if (typeof zone !== "object") {
      return {
        status: "error",
        message:
          "Invalid zone. Zone must be a string or an object containing lat and lon properties.",
      };
    }

    lat = zone.lat;
    lon = zone.lon;
  }

  return {
    lat,
    lon,
  };
};

export { fetchData, setupFunction };
