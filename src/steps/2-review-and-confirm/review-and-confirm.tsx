import { usePanda } from "@/panda/use-panda";
import { ThinkingPanda } from "@/steps/2-review-and-confirm/thinking-panda";
import { PathViz } from "@/components/path-viz";
import { USDC_ADDRESS } from "@/lib/addresses";
import { parseUnitsSafe } from "@/lib/parseUnitsSafe";
import { useOdos } from "@/odos/useOdos";
import { TradeParamsFormData } from "@/steps/1-ask-panda-step/types";
import { base } from "viem/chains";
import { useAccount } from "wagmi";
import { Hex } from "viem";
import { StepTitle } from "@/components/step-title";
import { OutputTokensChart } from "@/steps/2-review-and-confirm/output-tokens-chart";
import { TokenList } from "@/steps/2-review-and-confirm/token-list";

const USDC_DECIMALS = 6;

interface Props {
  tradeParams: TradeParamsFormData;
  onComplete: (txHash: Hex) => void;
}

export const ReviewAndConfirm = ({ tradeParams, onComplete }: Props) => {
  const account = useAccount();

  console.log({ tradeParams });

  const {
    data: pandaAdvice,
    error: pandaError,
  } = usePanda({
    riskLevel: tradeParams.riskLevel,
    tags: ['Stablecoin', 'DeFi'],
  });

  const inputTokenAmountParsed = parseUnitsSafe(tradeParams.inputTokenAmount, USDC_DECIMALS);

  const {
    data: odosData,
    error: odosError
  } = useOdos({
    chainId: base.id,
    tokenInAmount: inputTokenAmountParsed ?? 0n,
    tokenInAddress: USDC_ADDRESS[base.id],
    outputTokens: pandaAdvice?.answer.tokens,
    slippage: 1,
    executorAddress: account.address,
  });

  if (pandaError || odosError) {
    return (
      <div>
        <h1>Error</h1>
        <pre>
          <code>
            {JSON.stringify(pandaError, null, 2)}
          </code>
        </pre>
        <pre>
          <code>
            {JSON.stringify(odosError, null, 2)}
          </code>
        </pre>
      </div>
    )
  }

  if (pandaAdvice === undefined || odosData === undefined) {
    return (
      <ThinkingPanda />
    )
  }

  return (
    <div>
      <StepTitle>
        Review and Confirm
      </StepTitle>
      <OutputTokensChart
        tokens={pandaAdvice.answer.tokens}
        inputTokenAmount={tradeParams.inputTokenAmount}
      />
      <TokenList odosResult={odosData} />
      <div className="col-span-2 min-h-[350px] border border-border rounded-lg flex justify-center items-center flex-col">
        <PathViz
          isFetching={false}
          isError={false}
          pathVizImage={odosData.quoteResponse.pathVizImage}
        />
      </div>
    </div>
  )
}