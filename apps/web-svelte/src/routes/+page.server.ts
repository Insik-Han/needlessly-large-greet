import type { PageServerLoad } from './$types';
import { createClient } from '@connectrpc/connect';
import { GreetService } from '../gen/greet/v1/greet_pb';
import { createConnectTransport } from '@connectrpc/connect-node';

export const load: PageServerLoad = async () => {
  const transport = createConnectTransport({
    baseUrl: 'http://localhost:8080',
    httpVersion: '2',
  })
  const client = createClient(GreetService, transport);
  const { greeting } = await client.greet({ name: "Svelte" });

  return {
    greeting
  };
};