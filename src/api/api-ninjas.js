import axios from 'axios'
const API_NINJAS_KEY = import.meta.env.VITE_API_NINJAS_KEY
export const getCities =  async (query) => {
  try {
    const response = await axios.get(`https://api.api-ninjas.com/v1/city`, {
      headers: {
        'X-Api-Key': API_NINJAS_KEY
      },
      params: {
        name: query
      }
    })
    return  response.data.map(city => ({
      display: `${city.name}, ${city.country}`,
      raw: city
    }))
  } catch (error) {
    console.error("Cannot find city:", error);
    throw error;
  }
}
