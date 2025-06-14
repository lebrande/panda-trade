import { blockscoutTokensResponseSchema } from '@/blockscout/types';
import axios from 'axios';

const blockscoutClient = axios.create({
  baseURL: 'https://base.blockscout.com',
});

export const getTokens = async () => {
  const { data } = await blockscoutClient.get('/api/v2/tokens?type=ERC-20');

  const parsedData = blockscoutTokensResponseSchema.parse(data);

  return parsedData;
};