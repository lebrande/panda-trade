import { pandaAnswerResponseSchema, PandaPromptArgs, pandaPromptArgsSchema } from "@/open-ai/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const pandaClient = axios.create({
  baseURL: '/',
});

export const usePanda = (args: Partial<PandaPromptArgs>) => {
  const result = useQuery({
    queryKey: [
      'usePanda',
      args.riskLevel?.toString(),
      args.tags?.join(','),
    ],
    queryFn: async () => {
      const parsedArgs = pandaPromptArgsSchema.parse(args);
      return getAnswerFromPanda(parsedArgs);
    },
    enabled: args.riskLevel !== undefined && args.tags !== undefined,
    staleTime: Infinity,
    retry: false,
  });

  return result;
}

const getAnswerFromPanda = async (args: PandaPromptArgs) => {
  const pandaParams = new URLSearchParams({
    riskLevel: args.riskLevel.toString(),
    tags: args.tags.join(','),
  });

  const { data: quoteResponse } = await pandaClient.get(
    '/api/ask-panda',
    {
      params: pandaParams,
    },
  );

  console.log({ quoteResponse });

  return pandaAnswerResponseSchema.parse(quoteResponse);
};

