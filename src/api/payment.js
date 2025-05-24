import axios from '@/plugins/axios.js'
const WEB_BASE_URL = import.meta.env.VITE_WEB_BASE_URL

export const doPaymentCheckout = async (data) => {
  try {
    data.base_url = WEB_BASE_URL
    const response = await axios.post(`payment-checkout`, data);
    return response.data;
  } catch (error) {
    console.error("Payment checkout failed:", error);
    throw error;
  }
};

