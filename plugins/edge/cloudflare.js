/* This plugin will:

- Get the user country, lat, and lon data from the request & return that to be used by the grid-aware-websites plugin

Secondary features:

- Allow developers to opt-in to using Workers KV to save Electricity Maps responses for a specific duration.
- Allow developers to opt-in to using Workers KV to save the HTML response for a specified duration. Here be dragons though.
*/

const hello = () => {
  console.log("Hello from Cloudflare!");
};

export default hello;
