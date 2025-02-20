/**
 * Configuration options for PowerBreakdown
 */
export type PowerBreakdownOptions = {
    /**
     * - The mode to use for grid intensity checks
     */
    mode?: ("renewable" | "low-carbon");
    /**
     * - The minimum percentage of low-carbon or renewable power
     */
    minimumPercentage?: number;
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
 * @param {PowerBreakdownOptions} Configuration options
 * @throws {Error} An error is thrown if the mode is invalid.
 * @throws {Error} An error is thrown if the minimum percentage is not a number or is not between 0 and 100.
 * @throws {Error} An error is thrown if the data provider is invalid.
 */
export class PowerBreakdown {
    constructor(options?: {});
    mode: any;
    minimumPercentage: any;
    dataProvider: any;
    apiKey: any;
    /**
     * Set the mode for power breakdown checks.
     * @param {("renewable"|"low-carbon")} mode The mode to use
     * @throws {Error} An error is thrown if the mode is not 'renewable' or 'low-carbon'.
     */
    setMode(mode: ("renewable" | "low-carbon")): void;
    /**
     * Set the minimum percentage threshold for power breakdown checks.
     * @param {number} minimumPercentage The minimum percentage threshold
     * @throws {Error} An error is thrown if the minimum percentage is not a number or is not between 0 and 100.
     */
    setMinimumPercentage(minimumPercentage: number): void;
    /**
     * Set the data provider for fetching power breakdown data.
     * @param {string} dataProvider The data provider to use
     * @throws {Error} An error is thrown if the data provider is invalid.
     */
    setDataProvider(dataProvider: string): void;
    /**
     * Set the configuration options for the power breakdown checks.
     * @param {PowerBreakdownOptions} options The configuration options
     * @throws {Error} An error is thrown if the mode is invalid.
     * @throws {Error} An error is thrown if the minimum percentage is not a number or is not between 0 and 100.
     * @throws {Error} An error is thrown if the data provider is invalid.
     * @returns {void}
     */
    setOptions(options: PowerBreakdownOptions): void;
    /**
     * Check the power breakdown of the specified zone.
     * @param {string} zone The zone for which to check the power breakdown.
     * @returns {Promise<object>} The results of grid-awareness check based on power breakdown and specified mode.
     */
    check(zone: string): Promise<object>;
}
//# sourceMappingURL=powerBreakdown.d.ts.map