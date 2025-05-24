import axios from '@/plugins/axios.js'

export const doWeatherSearch = async (data) => {
  try {
    const response = await axios.post(`weather-search`, data);
    return response.data;
  } catch (error) {
    console.error("Weather search failed:", error);
    throw error;
  }
};

