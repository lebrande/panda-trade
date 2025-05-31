import { Button } from "@/components/ui/button";
import { USDC_ADDRESS } from "@/lib/addresses";
import { OdosResult } from "@/odos/useOdos";
import { erc20Abi } from "viem";
import { useAccount, useReadContract, useSendTransaction, useWriteContract } from "wagmi";
import { useChainId } from 'wagmi'

interface Props {
  odosResult: OdosResult;
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

const SendTransactionButton = ({ odosResult }: Props) => {
  const { sendTransaction } = useSendTransaction();

  const {
    data,
    gas,
    gasPrice,
    nonce,
    to,
    value,
  } = odosResult.assembleResponse.transaction;

  return (
    <div>
      <Button
        onClick={() => {
          sendTransaction({
            data,
            to,
            value: BigInt(value),
            gas: BigInt(gas),
            gasPrice: BigInt(gasPrice),
            nonce,
          })
        }}
      >
        Execute Transaction
      </Button>
    </div>
  )
}

const ApproveTransactionButton = ({ odosResult }: Props) => {
  const chainId = useChainId();
  const { writeContract } = useWriteContract();

  const inputTokenAmount = odosResult.assembleResponse.inputTokens[0].amount;

  return (
    <div>
      <Button
        onClick={() => {
          writeContract({
            address: USDC_ADDRESS[chainId],
            abi: erc20Abi,
            functionName: "approve",
            args: [
              odosResult.assembleResponse.transaction.to, 
              BigInt(inputTokenAmount)
            ],
          })
        }}
      >
        Approve Transaction
      </Button>
    </div>
  )
}