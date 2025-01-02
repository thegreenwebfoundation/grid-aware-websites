import { getPowerBreakdown } from "./data/electricityMaps.js";
import { zoneTypeCheck } from "./utils/index.js";

/**
 * Fetch the power breakdown for a given zone.
 * @param {string|object} zone The string ID for the zone (e.g. "DE" for Germany) or an object containing lat and lon properties (e.g. { lat: 51.1, lon: 0.1 }) for which we want to get data for.
 * @param {string} apiKey The Electricity Maps API key to use for the request.
 * @param {object} options Additional options for the request.
 * @returns {Promise<object>} The power breakdown data for the given zone.
 */

const fetchPowerBreakdown = async (zone, apiKey, options) => {
  let mode = "renewable"; // The mode of the power breakdown. Options: 'low-carbon', 'renewable'
  let minimumPercentage = 50; // The minimum percentage of low-carbon or renewable power before gridAware is set to true.

  const zoneCheck = zoneTypeCheck(zone);
  if (zoneCheck?.status === "error") {
    return zoneCheck;
  }

  if (options) {
    if (options.mode) {
      if (options.mode !== "renewable" && options.mode !== "low-carbon") {
        return {
          status: "error",
          message: "Invalid mode. Mode must be 'renewable' or 'low-carbon'.",
        };
      }
      mode = options.mode;
    }

    if (options.minimumPercentage) {
      if (
        isNaN(options.minimumPercentage) ||
        options.minimumPercentage < 0 ||
        options.minimumPercentage > 100
      ) {
        return {
          status: "error",
          message:
            "Invalid minimumPercentage. minimumPercentage must be a number between 0 and 100.",
        };
      }
      minimumPercentage = options.minimumPercentage;
    }
  }

  const response = await getPowerBreakdown(zone, apiKey);

  if (response.status === "error") {
    return response;
  }

  const { data } = response;

  let gridAware = false;

  if (mode === "renewable") {
    const renewablePercentage = data.renewablePercentage;
    if (renewablePercentage <= minimumPercentage) {
      gridAware = true;
    }

    return {
      status: "success",
      region: data.region,
      gridAware,
      data: {
        mode,
        minimumPercentage,
        renewablePercentage: data.renewablePercentage,
      },
    };
  } else if (mode === "low-carbon") {
    const fossilFreePercentage = data.fossilFreePercentage;
    if (fossilFreePercentage <= minimumPercentage) {
      gridAware = true;
    }

    return {
      status: "success",
      region: data.region,
      gridAware,
      data: {
        mode,
        minimumPercentage,
        lowCarbonPercentage: data.fossilFreePercentage,
      },
    };
  }
};

export { fetchPowerBreakdown };
