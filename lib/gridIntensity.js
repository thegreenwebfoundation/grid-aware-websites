import { getGridIntensity as electricityMapsGridIntensity } from "./providers/electricity-maps/index.js";
import { averageIntensity } from "@tgwf/co2";
import { codes } from "../utils/countryCodes.js";
import { acceptedProvider } from "./helpers.js";

/**
 * @typedef {Object} GridIntensityOptions Configuration options for GridIntensity
 * @property {("average"|"limit")} [mode="average"] - The mode to use for grid intensity checks
 * @property {number} [minimumIntensity=400] - The minimum intensity threshold in gCO2/kWh
 * @property {string} [dataProvider="electricityMaps"] - The data provider to use
 */

/**
 * Fetch the grid intensity data from the specified provider.
 * @param {string} zone The zone for which to fetch the data.
 * @param {string} apiKey The API key for the provider.
 * @param {string} provider The data provider to use.
 * @returns {Promise<object>} The grid intensity data.
 */
async function fetchByProvider(zone, apiKey, provider) {
  switch (provider) {
    case "electricityMaps":
      return electricityMapsGridIntensity(zone, apiKey);
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
 * @param {GridIntensityOptions} Configuration options
 * @throws {Error} An error is thrown if the mode is invalid.
 * @throws {Error} An error is thrown if the minimum intensity is not a number.
 * @throws {Error} An error is thrown if the data provider is invalid.
 */
class GridIntensity {
  constructor(options = {}) {
    this.mode = options.mode || 'average';
    this.minimumIntensity = options.minimumIntensity || 400;
    this.dataProvider = options.dataProvider || 'electricityMaps';

    if (options) {
      this.setOptions(options);
    }
  }

  /**
   * Set the mode for grid intensity checks.
   * @param {("average"|"limit")} mode The mode to use for grid intensity checks.
   * @throws {Error} An error is thrown if the mode is not 'average' or 'limit'.
   */
  setMode(mode) {
    if (mode !== 'average' && mode !== 'limit') {
      throw new Error("Invalid mode. Mode must be 'average' or 'limit'.");
    }
    this.mode = mode;
  }

  /**
   * Set the minimum intensity threshold for grid intensity checks.
   * @param {number} minimumIntensity The minimum intensity threshold in gCO2/kWh.
   * @throws {Error} An error is thrown if the minimum intensity is not a number.
   */
  setMinimumIntensity(minimumIntensity) {
    if (isNaN(minimumIntensity)) {
      throw new Error("Invalid minimumIntensity. minimumIntensity must be a number.");
    }
    this.minimumIntensity = minimumIntensity;
  }

  /**
   * Set the data provider for fetching grid intensity data.
   * @param {string} dataProvider The data provider to use.
   * @throws {Error} An error is thrown if the data provider is invalid.
   */
  setDataProvider(dataProvider) {
    if (!acceptedProvider.includes(dataProvider)) {
      throw new Error(`Invalid dataProvider. Data provider must be one of ${acceptedProvider.join(', ')}.`);
    }
    this.dataProvider = dataProvider;
  }

  /**
   * Set the configuration options for the GridIntensity class.
   * @param {GridIntensityOptions} options Configuration options for GridIntensity
   * @throws {Error} An error is thrown if the mode is invalid.
   * @throws {Error} An error is thrown if the minimum intensity is not a number.
   * @throws {Error} An error is thrown if the data provider is invalid.
   * @returns {void}
   */
  setOptions(options) {
    if (options.mode) {
      this.setMode(options.mode);
    }

    if (options.minimumIntensity) {
      this.setMinimumIntensity(options.minimumIntensity);
    }

    if (options.dataProvider) {
      this.setDataProvider(options.dataProvider);
    }
  }


  /**
   * Check the grid intensity of the specified zone.
   * @param {string} zone The zone for which to check the grid intensity.
   * @param {string} apiKey The API key for the data provider.
   * @returns {Promise<object>} The results of grid-awareness check based on grid intensity and specified mode.
   */

  async check(zone, apiKey) {
    const response = await fetchByProvider(zone, apiKey, this.dataProvider);

    if (response.status === "error") {
      return response;
    }

    const { data } = response;
    let zoneCode = zone;
    let gridAware = false;

    if (this.mode === "average") {
      if (zone.length === 2) {
        zoneCode = codes.find((code) => code.alpha2Code === zoneCode)?.alpha3Code;
      }

      const zoneAverageIntensity = averageIntensity.data[zoneCode];

      if (data.carbonIntensity > zoneAverageIntensity) {
        gridAware = true;
      }

      return {
        status: "success",
        region: data.region,
        gridAware,
        data: {
          mode: this.mode,
          carbonIntensity: data.carbonIntensity,
          averageIntensity: zoneAverageIntensity,
        },
      };
    } else {
      if (data.carbonIntensity > this.minimumIntensity) {
        gridAware = true;
      }

      return {
        status: "success",
        region: data.region,
        gridAware,
        data: {
          mode: this.mode,
          carbonIntensity: data.carbonIntensity,
          minimumIntensity: this.minimumIntensity,
        },
      };
    }
  }
}

export { GridIntensity };
