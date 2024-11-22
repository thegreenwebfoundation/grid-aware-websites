# Grid-aware Websites

> [!CAUTION]
> _This repository is currently under active development. It is **not advised** that this code be used in any critical production systems._

## Installing this library

You can install this library using NPM.

```
npm install @greenweb/grid-aware-websites
```

You can now import this library into a JavaScript project like this:

```js
import { fetchGridIntensity } from "grid-aware-websites";
```

## Working with this library

This library currently uses the [Electricity Maps API](https://api-portal.electricitymaps.com/) to fetch current grid data for regions around the World.

_We hope to add other data sources at a later time._

You will need to have an Electricity Maps API key in order to use this library. You will probably want to set this as a private environment variable in your project. You can obtain an API key here: https://api-portal.electricitymaps.com/

### Using grid intensity data

You can choose to use grid intensity data to determine if grid-aware changes should be made. In this approach, the current grid intensity (fetched from Electricity Maps) is compared with the annual average grid intensity data (available in CO2.js). If the grid intensity is higher than the annual average, `gridAware: true` will be returned indicating that grid-aware changes should be applied. Otherwise `gridAware: false` will be returned.

```js
import { gridAwareCO2e } from "grid-aware-websites";

const zone = "DE"; // The zone ID of the region you'd like to get grid intensity data for
const apiKey = "your_api_key";
const gridData = await gridAwareCO2e(zone, apiKey);
```

The `gridAwareCO2e()` function will return either:

#### Success

```js
{
    "status": "success",
    "gridAware": boolean, // A flag indicating if grid aware changes should be applied
    "region": "DE" // The zone ID of the region you'd like to get grid intensity data for
    "data" {
        "carbonIntensity": number, // The current grid intensity fetched from Electricity Maps
        "averageIntensity": number // The annual average grid intensity for the zone being checked taken from CO2.js
    }
}
```

#### Error

```js
{
    "status": "error",
    "message": "some error message",
    "details": {
        // ... an object with additional information about the error, if available.
    }
}
```

### Using grid power breakdown

Alternately, you may choose to use the current power consumption breakdown of a regional grid to determine if grid-aware changes should be applied. With this approach, developers can specify if they wish to use data for _all_ low-carbon energy (renewables + nuclear), or _only_ renewable energy. The default mode is using _only_ renewable energy.

A minimum threshold can also be specified. This is the minimum percentage of renewable/low-carbon energy being used by the grid. By default this value is set to `50` percent - meaning that at least 50% of the energy on the grid must come from renewables/low-carbon sources otherwise the `gridAware: true` flag will be returned.

```js
import { gridAwarePower } from "grid-aware-websites";

const zone = "DE"; // The zone ID of the region you'd like to get grid intensity data for
const apiKey = "your_api_key";

const options = {
  mode: "renewables", // The energy data we want to use - either renewables or low-carbon.
  minimumPercentage: 95, // The minimum percentage of the choosen energy type before grid-awareness should be triggered.
};

const gridData = await gridAwarePower(zone, apiKey, options);
```

The `gridAwarePower()` function will return either:

#### Success

```js
{
    "status": "success",
    "gridAware": boolean, // A flag indicating if grid aware changes should be applied
    "region": "DE" // The zone ID of the region you'd like to get grid intensity data for
    "data": {
          "mode": "renewables", // The energy source being used
          "minimumPercentage": 95, // The minimum percentage for that energy source before grid-awareness is set to true,
          "low-carbon percentage": number, // Data from Electricity Maps for the current low-carbon (renewables + nuclear) percentage,
          "renewable percentage": number, // Data from Electricity Maps for the current renewables percentage
        },
}
```

#### Error

```js
{
    "status": "error",
    "message": "some error message",
    "details": {
        // ... an object with additional information about the error, if available.
    }
}
```

## Using this project

This library can be used anywhere that runs server-side JavaScript and can make outbound fetch requests. Currently, we have limited documentation on how to use this project with:

- [Cloudflare Workers](/plugins/edge/cloudflare/README.md)
- [Netlify Edge Functions](/plugins/edge/netlify/README.md)
- ... more to come

You can also see the [Grid-aware Websites Demo repository](https://github.com/fershad/grid-aware-demo) which has some more detailed implementation code that can be referenced.

### To do:

- [ ] Add some text explaining the project (or linking to an explainer).
- [ ] Add proper steps to install this project using NPM and/or Yarn.
