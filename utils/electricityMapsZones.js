// Source: https://api.electricitymap.org/v3/zones
export const zones = await fetch('https://api.electricitymap.org/v3/zones').then((res) => res.json());
