import { blockscoutTokensResponseSchema } from '@/blockscout/types';
import axios from 'axios';

const blockscoutClient = axios.create({
  baseURL: 'https://eth.blockscout.com/api/v2/tokens?type=ERC-20',
});

export const getTokens = async () => {
  const { data } = await blockscoutClient.get('/tokens?type=ERC-20');

  const parsedData = blockscoutTokensResponseSchema.parse(data);

  return parsedData;
};