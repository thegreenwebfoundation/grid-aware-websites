![""](/banner.jpg)

# Grid-aware Websites

This library is part of the grid-aware websites toolkit developed by [Green Web Foundation](https://www.thegreenwebfoundation.org). The aim of the toolkit is to considerably reduce the barrier to entry for developers and designers seeking to build grid-aware websites. It consists of three parts:

1. This codebase
1. Technical documentation
1. UX/UI design catalogue

[Read about the project on our website](https://www.thegreenwebfoundation.org/tools/grid-aware-websites/).

## Installing this library

You can install this library using NPM.

```
npm install @greenweb/grid-aware-websites
```

You can now import this library into a JavaScript project like this:

```js
import { PowerBreakdown } from "@greenweb/grid-aware-websites";
```

## Working with this library

This library currently uses the [Electricity Maps API](https://api-portal.electricitymaps.com/) to fetch current grid data for regions around the World.

_We hope to add other data sources at a later time._

You will need to have an Electricity Maps API key in order to use this library. You will probably want to set this as a private environment variable in your project. You can obtain an API key here: [https://api-portal.electricitymaps.com/](https://api-portal.electricitymaps.com/)

### Using grid power breakdown

You may choose to use the current power consumption breakdown of a regional grid to determine if grid-aware changes should be applied. With this approach, developers can specify if they wish to use data for _all_ low-carbon energy (renewables + nuclear), or _only_ renewable energy. The default mode is using _only_ renewable energy.

A minimum threshold can also be specified. This is the minimum percentage of renewable/low-carbon energy being used by the grid. By default this value is set to `50` percent - meaning that at least 50% of the energy on the grid must come from renewables/low-carbon sources otherwise the `gridAware: true` flag will be returned.

```js
import { PowerBreakdown } from "@greenweb/grid-aware-websites";

// The zone ID string or lat-lon object of the region you'd like to get grid intensity data for
// e.g const zone = "DE"
// e.g const zone = {lat: "123", lon: "123"}
const zone = "DE";

const options = {
  mode: "renewable", // The energy data we want to use - either renewables or low-carbon. Default: renewables
  minimumPercentage: 95, // The minimum percentage of the choosen energy type before grid-awareness should be triggered. Default: 50
  apiKey: "you_api_key",
};

const powerBreakdown = new PowerBreakdown(options);

const gridData = await powerBreakdown.check(zone);
```

The `powerBreakdown.check` function will return:

```js
{
    "status": "success",
    "gridAware": boolean, // A flag indicating if grid aware changes should be applied
    "region": "DE" // The country code of the region you'd like to get grid intensity data for
    "data": {
          "mode": "renewable", // The energy source being used
          "minimumPercentage": 95, // The minimum percentage for that energy source before grid-awareness is set to true,
          "renewablePercentage": number, // Only returned when mode === "renewables". Data from Electricity Maps for the current renewables percentage
        //   "lowCarbonPercentage": number, // Only returned when mode === "low-carbon". Data from Electricity Maps for the current low-carbon (renewables + nuclear) percentage,
        },
}
```

### Using grid intensity data

You can choose to use grid intensity data to determine if grid-aware changes should be made. In this approach, the current grid intensity (fetched from Electricity Maps) is compared with the annual average grid intensity data (available in CO2.js). If the grid intensity is higher than the annual average, `gridAware: true` will be returned indicating that grid-aware changes should be applied. Otherwise `gridAware: false` will be returned.

```js
import { GridIntensity } from "@greenweb/grid-aware-websites";

// The zone ID string or lat-lon object of the region you'd like to get grid intensity data for
// e.g const zone = "DE"
// e.g const zone = {lat: "123", lon: "123"}
const zone = "DE";

const options = {
  mode: "average", // The type of comparison used to determine grid-awareness - either average or limit. Default: average
  minimumIntensity: 400, // The minimum grid intensity value (grams CO2e/kWh) before grid-awareness is triggered. Default: 400
  apiKey: "you_api_key",
};

const gridIntensity = new GridIntensity(options);

const gridData = await gridIntensity.check(zone);
```

The `gridIntensity.check()` function will return:

```js
{
    "status": "success",
    "gridAware": boolean, // A flag indicating if grid aware changes should be applied
    "region": "DE" // The country code of the region you'd like to get grid intensity data for
    "data" {
        "mode": "average", // The comparison method being used
        "carbonIntensity": number, // The current grid intensity fetched from Electricity Maps
        "averageIntensity": number // Only returned when mode === "average". The annual average grid intensity for the zone being checked taken from CO2.js
        // "minimumIntensity": 400 // Returned only when mode === "limit".
    }
}
```

### Error during check

If either function encounters an error during execution, it will return an error status with additional context.

```js
{
    "status": "error",
    "message": "some error message",
    "details": {
        // ... an object with additional information about the error, if available.
    }
}
```

## Plugins

Plugins for Grid-aware Websites (gaw) provide platform/framework specific functionality that can aid developers in deploying and using this library.

This library can be used anywhere that runs server-side JavaScript and can make outbound fetch requests. Currently, we have limited documentation on how to use this project with:

### Edge Functions

- [Cloudflare Workers](https://github.com/thegreenwebfoundation/gaw-plugin-cloudflare-workers)
- [Netlify Edge Functions](https://github.com/thegreenwebfoundation/gaw-plugin-netlify-edge)
- ... more to come

### Demo sites

- [Cloudflare Workers Demo Site](https://github.com/thegreenwebfoundation/grid-aware-websites-demo-cloudflare)
- [Netlify Edge Functions Demo Site](https://github.com/thegreenwebfoundation/grid-aware-websites-demo-netlify)
