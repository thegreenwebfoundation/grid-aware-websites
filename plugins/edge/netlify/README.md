# Grid-aware Websites - Netlify Edge Plugin

This plugin provides some useful functions that can be used when setting up the [`grid-aware websites`](/README.md) library using [Netlify Edge Functions](https://docs.netlify.com/platform/primitives/#edge-functions).

After you have installed the `grid-aware-websites` package ([see steps](/README.md#installing-this-library)), you can use this plugin to:


- Fetch the location of a user based on `geo` data that is exposed by the Netlify Edge platform.
## Fetching location (`getLocation()`)

The code below is a simplified demonstation of how to use this plugin to fetch the request location, and then use it with the `gridAwarePower` function.

The worker code below will return the grid data back to the browser in JSON format.

```js
import { gridAwarePower } from "@greenweb/grid-aware-websites";
import { netlify } from "@greenweb/grid-aware-websites/plugins/edge";

export default {
  async fetch(request, env, ctx) {
    const location = netlify.getLocation(request);
    const { country } = location;

    const gridData = await gridAwarePower(country, "API_KEY");

    return new Response(gridData);
  },
};
```

By default, the `getLocation()` function returns the `geo.country.code` value. However, it can also be used to return the `geo.latitude` and `geo.longitude` values if desired.

```js
import { gridAwarePower } from "@greenweb/grid-aware-websites";
import { netlify } from "@greenweb/grid-aware-websites/plugins/edge";

export default {
  async fetch(request, env, ctx) {
    const location = netlify.getLocation(request, {
      mode: "latlon",
    });

    const { lat, lon } = location;

    // Functionality yet to be built into grid-aware-websites library.
  },
};
```

> [!NOTE]
> Using latitude and longitude values is not yet supported in the grid-aware-websites package.
