import { HappyPanda } from "@/steps/3-trade-completed/happy-panda";
import { TransactionInfo } from "@/steps/3-trade-completed/transaction-info";
import { Hex } from "viem";

interface Props {
  txHash: Hex;
}

export const TradeCompleted = ({ txHash }: Props) => {
  return (
    <div>
      <HappyPanda />
      <TransactionInfo txHash={txHash} />
    </div>
  )
}