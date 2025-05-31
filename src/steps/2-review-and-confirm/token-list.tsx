import { Card, CardContent } from "@/components/ui/card";
import { OdosAssembleResponse } from "@/odos/types";
import { OdosResult } from "@/odos/useOdos";
import { erc20Abi, formatUnits, parseUnits } from "viem";
import { useReadContract } from "wagmi";

interface Props {
  odosResult: OdosResult;
}

export const TokenList = ({ odosResult }: Props) => {
  const { assembleResponse } = odosResult;

  return (
    <div>
      {assembleResponse.outputTokens.map((token) => {
        return (
          <TokenItem
            key={token.tokenAddress}
            token={token}
          />
        )
      })}
    </div>
  )
}

const TokenItem = ({ token }: { token: OdosAssembleResponse['outputTokens'][number] }) => {
  const { data: symbol } = useReadContract({
    address: token.tokenAddress,
    abi: erc20Abi,
    functionName: "symbol",
  });
  const { data: decimals } = useReadContract({
    address: token.tokenAddress,
    abi: erc20Abi,
    functionName: "decimals",
  });

  if (decimals === undefined) return null;

  const amountDisplay = (+formatUnits(BigInt(token.amount), decimals)).toFixed(4);

  return (
    <Card className="border border-muted">
      <CardContent>
        <div className="flex items-center justify-between gap-2">
          <div>{amountDisplay}</div>
          <div>{symbol}</div>
        </div>
      </CardContent>
    </Card>
  )
}