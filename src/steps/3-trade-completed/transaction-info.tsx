import { getTransactionInfo } from "@/blockscout/get-transaction-info";
import { useQuery } from "@tanstack/react-query";
import { Loader2Icon } from "lucide-react";
import { Hex } from "viem";

interface Props {
  txHash: Hex;
}

export const TransactionInfo = ({ txHash }: Props) => {
  const { data, error } = useQuery({
    queryKey: ["TransactionInfo", txHash],
    queryFn: () => {
      if (!txHash) {
        throw new Error("txHash is undefined");
      }
      return getTransactionInfo({ txHash });
    }
  });

  if (error) {
    return (
      <div>
        <pre>{JSON.stringify(error, null, 2)}</pre>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center h-20">
        <Loader2Icon className="w-4 h-4 animate-spin" />
      </div>
    );
  }

  return (
    <div>
      <h2>Transaction Info</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  )
}