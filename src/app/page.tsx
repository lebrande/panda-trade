'use client'

import { AskPandaStep } from '@/ask-panda-step/ask-panda-step';
import { AppContainer } from '@/components/app-container';
import { TradeParamsForm } from '@/trade-params-step/trade-params-form';
import { TradeParamsFormData } from '@/trade-params-step/types';
import { useState } from 'react';

function App() {
  const [tradeParams, setTradeParams] = useState<TradeParamsFormData>();

  return (
    <AppContainer>
      {tradeParams === undefined && (
        <TradeParamsForm onComplete={setTradeParams} />
      )}
      {tradeParams !== undefined && (
        <AskPandaStep tradeParams={tradeParams} />
      )}
    </AppContainer>
  )
}

export default App
