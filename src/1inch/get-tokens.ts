import axios from "axios";

const url = "https://api.1inch.dev/token/v1.2/8453";

const apiKey = process.env._1INCH_API_KEY;

export const getTokens = async () => {
  const config = {
    headers: {
      "Authorization": `Bearer ${apiKey}`
    },
    params: {},
    paramsSerializer: {
      indexes: null
    }
  };

  try {
    const response = await axios.get(url, config);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}







