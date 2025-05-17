import { getPowerBreakdown as electricityMapsPowerBreakdown } from "./providers/electricity-maps/index.js";
import { acceptedProvider } from "./helpers.js";

/**
 * @typedef {Object} PowerBreakdownOptions Configuration options for PowerBreakdown
 * @property {("renewable"|"low-carbon")} [mode="renewable"] - The mode to use for grid intensity checks
 * @property {number} [minimumPercentage=50] - The minimum percentage of low-carbon or renewable power
 * @property {string} [dataProvider="electricityMaps"] - The data provider to use
 * @property {string} [apiKey] - The API key for the data provider
 */

/**
 * Fetch the grid intensity data from the specified provider.
 * @param {string|{lat: string, lon: string}} zone The zone for which to fetch the data.
 * @param {string} apiKey The API key for the provider.
 * @param {string} provider The data provider to use.
 * @returns {Promise<object>} The grid intensity data.
 */
async function fetchByProvider(zone, apiKey, provider) {
  switch (provider) {
    case "electricityMaps":
      return electricityMapsPowerBreakdown(zone, apiKey);
    default:
      return {
        status: "error",
        message: "Invalid data provider",
      };
  }
}

/**
 * A class for checking the grid intensity of a specified zone.
 * @class
 * @param {PowerBreakdownOptions} Configuration options
 * @throws {Error} An error is thrown if the mode is invalid.
 * @throws {Error} An error is thrown if the minimum percentage is not a number or is not between 0 and 100.
 * @throws {Error} An error is thrown if the data provider is invalid.
 */

class PowerBreakdown {
  constructor(options = {}) {
    this.mode = options.mode || "renewable";
    this.minimumPercentage = options.minimumPercentage || 50;
    this.dataProvider = options.dataProvider || "electricityMaps";
    this.apiKey = options.apiKey || null;

    if (options) {
      this.setOptions(options);
    }
  }

  /**
   * Set the mode for power breakdown checks.
   * @param {("renewable"|"low-carbon")} mode The mode to use
   * @throws {Error} An error is thrown if the mode is not 'renewable' or 'low-carbon'.
   */
  setMode(mode) {
    if (mode !== "renewable" && mode !== "low-carbon") {
      throw new Error(
        "Invalid mode. Mode must be 'renewable' or 'low-carbon'.",
      );
    }
    this.mode = mode;
  }

  /**
   * Set the minimum percentage threshold for power breakdown checks.
   * @param {number} minimumPercentage The minimum percentage threshold
   * @throws {Error} An error is thrown if the minimum percentage is not a number or is not between 0 and 100.
   */
  setMinimumPercentage(minimumPercentage) {
    if (
      isNaN(minimumPercentage) ||
      minimumPercentage < 0 ||
      minimumPercentage > 100
    ) {
      throw new Error(
        "Invalid minimumPercentage. minimumPercentage must be a number between 0 and 100.",
      );
    }
    this.minimumPercentage = minimumPercentage;
  }

  /**
   * Set the data provider for fetching power breakdown data.
   * @param {string} dataProvider The data provider to use
   * @throws {Error} An error is thrown if the data provider is invalid.
   */
  setDataProvider(dataProvider) {
    if (!acceptedProvider.includes(dataProvider)) {
      throw new Error(
        `Invalid dataProvider. Data provider must be one of ${acceptedProvider.join(", ")}.`,
      );
    }
    this.dataProvider = dataProvider;
  }

  /**
   * Set the configuration options for the power breakdown checks.
   * @param {PowerBreakdownOptions} options The configuration options
   * @throws {Error} An error is thrown if the mode is invalid.
   * @throws {Error} An error is thrown if the minimum percentage is not a number or is not between 0 and 100.
   * @throws {Error} An error is thrown if the data provider is invalid.
   * @returns {void}
   */
  setOptions(options) {
    if (options.mode) {
      this.setMode(options.mode);
    }

    if (options.minimumPercentage) {
      this.setMinimumPercentage(options.minimumPercentage);
    }

    if (options.dataProvider) {
      this.setDataProvider(options.dataProvider);
    }
  }

  /**
   * Check the power breakdown of the specified zone.
   * @param {string|{lat: string, lon: string}} zone The zone for which to check the power breakdown.
   * @returns {Promise<object>} The results of grid-awareness check based on power breakdown and specified mode.
   */
  async check(zone) {
    const response = await fetchByProvider(
      zone,
      this.apiKey,
      this.dataProvider,
    );

    if (response.status === "error") {
      return response;
    }

    const { data } = response;

    let gridAware = false;

    if (this.mode === "renewable") {
      const renewablePercentage = data.renewablePercentage;
      if (renewablePercentage <= this.minimumPercentage) {
        gridAware = true;
      }

      return {
        status: "success",
        region: data.region,
        gridAware,
        data: {
          mode: this.mode,
          minimumPercentage: this.minimumPercentage,
          renewablePercentage: data.renewablePercentage,
        },
      };
    } else if (this.mode === "low-carbon") {
      const fossilFreePercentage = data.fossilFreePercentage;
      if (fossilFreePercentage <= this.minimumPercentage) {
        gridAware = true;
      }

      return {
        status: "success",
        region: data.region,
        gridAware,
        data: {
          mode: this.mode,
          minimumPercentage: this.minimumPercentage,
          lowCarbonPercentage: data.fossilFreePercentage,
        },
      };
    }
  }
}

export { PowerBreakdown };
