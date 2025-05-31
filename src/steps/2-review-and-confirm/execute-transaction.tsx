import { Button } from "@/components/ui/button";
import { USDC_ADDRESS } from "@/lib/addresses";
import { baseWithBlockscout } from "@/lib/blockscout";
import { OdosResult } from "@/odos/useOdos";
import { useNotification } from "@blockscout/app-sdk";
import { erc20Abi, Hex } from "viem";
import { useAccount, useReadContract, useSendTransaction, useWriteContract } from "wagmi";
import { useChainId } from 'wagmi'

interface Props {
  odosResult: OdosResult;
  onComplete: (txHash: Hex) => void;
}

export const ExecuteTransaction = (props: Props) => {
  const { assembleResponse } = props.odosResult;
  const chainId = useChainId();
  const { address } = useAccount();

  const { data: allowance } = useReadContract({
    address: USDC_ADDRESS[chainId],
    abi: erc20Abi,
    functionName: "allowance",
    args: [address!, assembleResponse.transaction.to],
    query: {
      enabled: address !== undefined,
      refetchInterval: 3000,
    }
  });

  const inputTokenAmount = assembleResponse.inputTokens[0].amount;
  const isApproved = allowance !== undefined && allowance >= BigInt(inputTokenAmount);

  if (isApproved) {
    return (
      <SendTransactionButton {...props} />
    )
  }

  return (
    <ApproveTransactionButton {...props} />
  )
}

const SendTransactionButton = ({ odosResult, onComplete }: Props) => {
  const { sendTransactionAsync } = useSendTransaction();
  const { openTxToast } = useNotification();

  const {
    data,
    gas,
    gasPrice,
    nonce,
    to,
    value,
  } = odosResult.assembleResponse.transaction;

  const handleSendTransaction = async () => {
    try {
      const txHash = await sendTransactionAsync({
        data,
        to,
        value: BigInt(value),
        gas: BigInt(gas),
        gasPrice: BigInt(gasPrice),
        nonce,
      });
      
      openTxToast(baseWithBlockscout.id.toString(), txHash);

      onComplete(txHash);
    } catch (error) {
      console.error("Transaction failed:", error);
    }
  }

  return (
    <div>
      <Button onClick={handleSendTransaction}>
        Execute Transaction
      </Button>
    </div>
  )
}

const ApproveTransactionButton = ({ odosResult }: Props) => {
  const chainId = useChainId();
  const { writeContractAsync } = useWriteContract();
  const { openTxToast } = useNotification();

  const inputTokenAmount = odosResult.assembleResponse.inputTokens[0].amount;

  const handleApproveTransaction = async () => {
    try {
      const txHash = await writeContractAsync({
        address: USDC_ADDRESS[chainId],
        abi: erc20Abi,
        functionName: "approve",
        args: [
          odosResult.assembleResponse.transaction.to, 
          BigInt(inputTokenAmount)
        ],
      })
      
      openTxToast(baseWithBlockscout.id.toString(), txHash);
    } catch (error) {
      console.error("Transaction failed:", error);
    }
  }

  return (
    <div>
      <Button onClick={handleApproveTransaction}>
        Approve Transaction
      </Button>
    </div>
  )
}