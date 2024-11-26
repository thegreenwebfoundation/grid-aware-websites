
/**
 * This function checks if the provided zone is valid.
 * @param {string} zone The two-letter code for the zone (e.g. "DE" for Germany).
 * @returns {boolean} True if the zone is valid, false otherwise.
 *
 * @example
 * const zone = "DE"; // Germany
 * checkZone(zone);
 */
const checkZone = async (zone) => {
  const zones = await fetch('https://api.electricitymap.org/v3/zones').then((res) => res.json());
  if (Object.keys(zones).indexOf(zone) === -1) {
    return false;
  }
  return true;
};

/**
 * This function checks if the provided zone and API key are present.
 * @param {string} zone The two-letter code for the zone (e.g. "DE" for Germany).
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
 * This function fetches the carbon intensity of the grid for a given zone from the Electricity Map API.
 * Refer to the API documentation for more information: https://docs.electricitymaps.com/
 * @param {string} zone The two-letter code for the zone (e.g. "DE" for Germany).
 * @param {string} apiKey The API key for accessing the Electricity Map API. Obtain from https://api-portal.electricitymaps.com/
 * @returns {Promise<object>} The carbon intensity of the grid for the given zone.
 *
 * @example
 * const zone = "DE"; // Germany
 * const apiKey = "your-api
 * const gridIntensity = await getGridIntensity(zone, apiKey);
 */
const getGridIntensity = async (zone, apiKey) => {
  if (!checkParams(zone, apiKey)) {
    return {
      status: "error",
      message: "Zone and API key are both required",
    };
  }

  if (!checkZone(zone)) {
    return {
      status: "error",
      message: "Invalid Electricity Maps zone.",
    };
  }

  const url = `https://api.electricitymap.org/v3/carbon-intensity/latest?zone=${zone}`;
  const headers = {
    "auth-token": apiKey,
  };

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
      data: data,
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
 * This function fetches the power breakdown of the grid for a given zone from the Electricity Map API.
 * Refer to the API documentation for more information: https://docs.electricitymaps.com/
 * @param {string} zone The two-letter code for the zone (e.g. "DE" for Germany).
 * @param {string} apiKey The API key for accessing the Electricity Map API. Obtain from https://api-portal.electricitymaps.com/
 * @returns {Promise<object>} The power breakdown of the grid for the given zone.
 */
const getPowerBreakdown = async (zone, apiKey) => {
  if (!checkParams(zone, apiKey)) {
    return {
      status: "error",
      message: "Zone and API key are both required",
    };
  }

  if (!checkZone(zone)) {
    return {
      status: "error",
      message: "Invalid Electricity Maps zone.",
    };
  }

  const url = `https://api.electricitymap.org/v3/power-breakdown/latest?zone=${zone}`;
  const headers = {
    "auth-token": apiKey,
  };

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
      data: data,
    };
  } catch (error) {
    return {
      status: "error",
      message: "There has been a problem with your fetch operation",
      details: error,
    };
  }
};

export { getGridIntensity, getPowerBreakdown };
