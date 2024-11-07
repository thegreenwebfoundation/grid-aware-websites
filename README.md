# Grid Aware Websites

_This repository is currently under active development. It is **not advised** that this code be used in any critical production systems._

## Installing this library

This library is currently _not_ published to NPM. We will do this eventually, but for now you can use it via the `npm link` command.

1. Clone this repository.
2. In your terminal, navigate to the root folder for this project.
3. Run the command `npm link`.
4. In your terminal, navigate to the root folder of the project you want to use this code in.
5. Run the command `npm link grid-aware-websites`.

You can now import this library into a JavaScript project like this:

```js
import { fetchGridIntensity } from 'grid-aware-websites';
```

## Working with this library

This library currently uses the [Electricity Maps API](https://api-portal.electricitymaps.com/) to fetch current grid carbon intensity data for regions around the World. 

_We hope to add other data sources at a later time._

You will need to have an Electricity Maps API key in order to use this library. You will probably want to set this as a private environment variable in your project. You can obtain an API key here: https://api-portal.electricitymaps.com/

```js
import { fetchGridIntensity } from 'grid-aware-websites';

const zone = "DE" // The zone ID of the region you'd like to get grid intensity data for
const apiKey = "you_api_key"
const gridData = await fetchGridIntensity(zone, apiKey);
```

The `fetchGridIntensity()` function will return either:

### Success

```js
{
    "status": "success",
    "gridAware": boolean, // A flag indicating if grid aware changes should be applied
    "data" {
        "carbonIntensity": number, // The current grid intensity fetched from Electricity Maps
        "averageIntensity": number // The annual average grid intensity for the zone being checked taken from CO2.js
    }
}
```

### Error

```js
{
    "status": "error",
    "message": "some error message",
    "details": {
        // ... an object with additional information about the error, if available.
    }
}
```

## Using this projects

This library can be used anywhere that runs server-side JavaScript and can make outbound fetch requests. 

To do:

- [ ] Add some text explaining the project (or linking to an explainer).
- [ ] Add proper steps to install this project using NPM and/or Yarn.