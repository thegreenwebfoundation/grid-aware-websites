import { electricityMaps } from "./lib/electricityMaps";

const fetchGridIntensity = async (zone, apiKey) => {
    const response = await electricityMaps(zone, apiKey);

    if (response.status === "error") {
        return response;
    }

    const { data } = response;
    
    return {
        status: "success",
        data: {
            carbonIntensity: data.carbonIntensity,
        },
    };
}

export { fetchGridIntensity };