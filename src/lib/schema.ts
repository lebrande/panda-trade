import { isAddress, Address, Hex, isHex } from "viem";
import z from "zod";

export const addressSchema = z.custom<Address>(
  (address) => isAddress(address, { strict: false }),
  {
    message: 'Incorrect address',
  },
);
export const hexSchema = z.custom<Hex>((hex) => isHex(hex), {
  message: 'Incorrect hex value',
});