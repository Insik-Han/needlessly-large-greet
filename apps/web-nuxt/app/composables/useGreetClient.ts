import { createClient } from "@connectrpc/connect";
import { GreetService } from "#shared/gen/greet/v1/greet_pb";
import type { Client } from "@connectrpc/connect";

export const useGreetClient = (): Client<typeof GreetService> => {
  const { $connectTransport } = useNuxtApp();

  return createClient(GreetService, $connectTransport);
};