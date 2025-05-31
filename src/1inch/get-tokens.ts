import axios from "axios";

const url = "https://api.1inch.dev/token/v1.2/8453";

export const getTokens = async () => {
  const config = {
    headers: {
      "Authorization": "Bearer rglptHF2D3aEiNGNZfn5sUF2Nxa6wxiB"
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







