import { createConnectTransport } from '@connectrpc/connect-web';
import type { PageLoad } from './$types';
import { createClient } from '@connectrpc/connect';
import { GreetService } from '../gen/greet/v1/greet_pb';

export const load: PageLoad = async () => {
  const transport = createConnectTransport({
    baseUrl: "http://localhost:8080",
    fetch,
  });

  const client = createClient(GreetService, transport);

  const { greeting } = await client.greet({ name: "Svelte" })

  return {
    greeting
  };
};