'use client'

import { ReviewAndConfirm } from '@/steps/2-review-and-confirm/review-and-confirm';
import { AppContainer } from '@/components/app-container';
import { Stepper } from '@/components/stepper';
import { AskPanda } from '@/steps/1-ask-panda-step/ask-panda';
import { TradeParamsFormData } from '@/steps/1-ask-panda-step/types';
import { useState } from 'react';
import { Hex } from 'viem';
import { TradeCompleted } from '@/steps/3-trade-completed/trade-completed';

function App() {
  return (
    <AppContainer>
      <CurrentStep />
    </AppContainer>
  )
}

const CurrentStep = () => {
  const [tradeParams, setTradeParams] = useState<TradeParamsFormData>();
  const [tradeTxHash, setTradeTxHash] = useState<Hex>();

  if (tradeTxHash) {
    return (
      <div className="space-y-4">
        <Stepper currentStep="3-trade-completed" />
        <TradeCompleted />
      </div>
    )
  }

  if (tradeParams) {
    return (
      <div className="space-y-4">
        <Stepper currentStep="2-review-and-confirm" />
        <ReviewAndConfirm
          tradeParams={tradeParams}
          onComplete={setTradeTxHash}
        />
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <Stepper currentStep="1-ask-panda" />
      <AskPanda onComplete={setTradeParams} />
    </div>
  )
}

export default App
