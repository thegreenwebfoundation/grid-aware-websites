/**
 * Configuration options for GridIntensity
 */
export type GridIntensityOptions = {
    /**
     * - The mode to use for grid intensity checks
     */
    mode?: ("level" | "average" | "limit");
    /**
     * - The minimum intensity threshold in gCO2/kWh
     */
    minimumIntensity?: number;
    /**
     * - The data provider to use
     */
    dataProvider?: string;
    /**
     * - The API key for the data provider
     */
    apiKey?: string;
};
/**
 * A class for checking the grid intensity of a specified zone.
 * @class
 * @param {GridIntensityOptions} Configuration options
 * @throws {Error} An error is thrown if the mode is invalid.
 * @throws {Error} An error is thrown if the minimum intensity is not a number.
 * @throws {Error} An error is thrown if the data provider is invalid.
 */
export class GridIntensity {
    constructor(options?: {});
    mode: any;
    dataProvider: any;
    apiKey: any;
    minimumIntensity: any;
    /**
     * Set the mode for grid intensity checks.
     * @param {("level"|"average"|"limit")} mode The mode to use for grid intensity checks.
     * @throws {Error} An error is thrown if the mode is not 'average' or 'limit'.
     */
    setMode(mode: ("level" | "average" | "limit")): void;
    /**
     * Set the minimum intensity threshold for grid intensity checks.
     * @param {number} minimumIntensity The minimum intensity threshold in gCO2/kWh.
     * @throws {Error} An error is thrown if the minimum intensity is not a number.
     */
    setMinimumIntensity(minimumIntensity: number): void;
    /**
     * Set the data provider for fetching grid intensity data.
     * @param {string} dataProvider The data provider to use.
     * @throws {Error} An error is thrown if the data provider is invalid.
     */
    setDataProvider(dataProvider: string): void;
    /**
     * Set the configuration options for the GridIntensity class.
     * @param {GridIntensityOptions} options Configuration options for GridIntensity
     * @throws {Error} An error is thrown if the mode is invalid.
     * @throws {Error} An error is thrown if the minimum intensity is not a number.
     * @throws {Error} An error is thrown if the data provider is invalid.
     * @returns {void}
     */
    setOptions(options: GridIntensityOptions): void;
    /**
     * Check the grid intensity of the specified zone.
     * @param {string|{lat: string, lon: string}} zone The zone for which to check the grid intensity.
     * @returns {Promise<object>} The results of grid-awareness check based on grid intensity and specified mode.
     */
    check(zone: string | {
        lat: string;
        lon: string;
    }): Promise<object>;
}
//# sourceMappingURL=gridIntensity.d.ts.map