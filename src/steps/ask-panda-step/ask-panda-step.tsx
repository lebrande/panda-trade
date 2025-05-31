import { usePanda } from "@/app/panda/use-panda";
import { ThinkingPanda } from "@/steps/ask-panda-step/thinking-panda";
import { PathViz } from "@/components/path-viz";
import { USDC_ADDRESS } from "@/lib/addresses";
import { parseUnitsSafe } from "@/lib/parseUnitsSafe";
import { useOdos } from "@/odos/useOdos";
import { TradeParamsFormData } from "@/steps/trade-params-step/types";
import { base } from "viem/chains";
import { useAccount } from "wagmi";

const USDC_DECIMALS = 6;

interface Props {
  tradeParams: TradeParamsFormData;
}

export const AskPandaStep = ({ tradeParams }: Props) => {
  const account = useAccount();

  console.log({ tradeParams });

  const {
    data: pandaAdvice,
    error: pandaError,
    isFetching: isPandaFetching
  } = usePanda({
    riskLevel: tradeParams.riskLevel,
    tags: ['Stablecoin', 'DeFi'],
  });

  const inputTokenAmountParsed = parseUnitsSafe(tradeParams.inputTokenAmount, USDC_DECIMALS);

  const {
    data: odosData,
    isFetching: isOdosFetching,
    error: odosError
  } = useOdos({
    chainId: base.id,
    tokenInAmount: inputTokenAmountParsed ?? 0n,
    tokenInAddress: USDC_ADDRESS[base.id],
    outputTokens: pandaAdvice?.answer.tokens,
    slippage: 1,
    executorAddress: account.address,
  });

  console.log({ isPandaFetching, isOdosFetching, pandaError, odosError });

  if (isPandaFetching || isOdosFetching) {
    return (
      <ThinkingPanda />
    )
  }

  if (pandaError || odosError) {
    return (
      <div>
        <h1>Error</h1>
      </div>
    )
  }

  return (
    <div>
      <div>
        <pre>
          <code>
            {JSON.stringify(pandaAdvice, null, 2)}
          </code>
        </pre>
      </div>
      <div className="col-span-2 min-h-[350px] border border-border rounded-lg flex justify-center items-center flex-col">
        <PathViz
          isFetching={isOdosFetching}
          isError={Boolean(odosError)}
          pathVizImage={odosData?.pathVizImage}
        />
      </div>
    </div>
  )
}