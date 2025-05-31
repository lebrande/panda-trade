'use client'

import { AskPandaStep } from '@/steps/ask-panda-step/ask-panda-step';
import { AppContainer } from '@/components/app-container';
import { Stepper } from '@/components/stepper';
import { TradeParamsForm } from '@/steps/trade-params-step/trade-params-form';
import { TradeParamsFormData } from '@/steps/trade-params-step/types';
import { useState } from 'react';

function App() {
  return (
    <AppContainer>
      <CurrentStep />
    </AppContainer>
  )
}

const CurrentStep = () => {
  const [tradeParams, setTradeParams] = useState<TradeParamsFormData>();

  if (tradeParams === undefined) {
    return (
      <div className="space-y-4">
        <Stepper currentStep="ask-panda" />
        <TradeParamsForm onComplete={setTradeParams} />
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <Stepper currentStep="review-and-confirm" />
      <AskPandaStep tradeParams={tradeParams} />
    </div>
  )
}

export default App
