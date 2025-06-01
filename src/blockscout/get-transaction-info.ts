import { blockscoutTransactionInfoSchema } from '@/blockscout/types';
import axios from 'axios';
import { Hex } from 'viem';

const blockscoutClient = axios.create({
  baseURL: 'https://base.blockscout.com',
});

interface Args {
  txHash: Hex;
}

export const getTransactionInfo = async ({ txHash }: Args) => {
  const { data } = await blockscoutClient.get(`/api/v2/transactions/${txHash}`);

  const parsedData = blockscoutTransactionInfoSchema.parse(data);

  return parsedData;
};