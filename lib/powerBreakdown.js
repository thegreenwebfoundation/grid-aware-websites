import { getPowerBreakdown } from "./data/electricityMaps.js";

/**
 * Fetch the power breakdown for a given zone.
 * @param {string} zone The zone to fetch the power breakdown for.
 * @param {string} apiKey The Electricity Maps API key to use for the request.
 * @param {object} options Additional options for the request.
 * @returns {Promise<object>} The power breakdown data for the given zone.
 */

const fetchPowerBreakdown = async (zone, apiKey, options) => {
    let mode = 'renewable' // The mode of the power breakdown. Options: 'low-carbon', 'renewable'
    let minimumPercentage = '80' // The minimum percentage of low-carbon or renewable power before grid-aware is set to true.
    
    if (options) {
        if (options.mode) {
            if (options.mode !== 'renewable' && options.mode !== 'low-carbon') {
                return {
                    status: "error",
                    message: "Invalid mode. Mode must be 'renewable' or 'low-carbon'.",
                };
            }
            mode = options.mode;
        }

        if (options.minimumPercentage) {
            if (isNaN(options.minimumPercentage) || options.minimumPercentage < 0 || options.minimumPercentage > 100) {
                return {
                    status: "error",
                    message: "Invalid minimumPercentage. minimumPercentage must be a number between 0 and 100.",
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

    if (mode === 'renewable') {
        const renewablePercentage = data.renewablePercentage
        if (renewablePercentage <= minimumPercentage) {
            gridAware = true;
        }
    } else if (mode === 'low-carbon') {
        const fossilFreePercentage = data.fossilFreePercentage
        if (fossilFreePercentage <= minimumPercentage) {
            gridAware = true;
        }
    }


    return {
        status: "success",
        region: zone,
        gridAware,
        data: {
          mode,
          minimumPercentage,
          "low-carbon percentage": data.fossilFreePercentage,
          "renewable percentage": data.renewablePercentage,
        },
      };
};

export { fetchPowerBreakdown };