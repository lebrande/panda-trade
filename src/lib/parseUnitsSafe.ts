import { parseUnits } from "viem";

export const parseUnitsSafe = (amount: string, decimals: number) => {
  try {
    return parseUnits(amount, decimals);
  } catch (error) {
    return undefined;
  }
};