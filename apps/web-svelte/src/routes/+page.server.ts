import type { PageServerLoad } from './$types';
import { createClient } from '@connectrpc/connect';
import { GreetService } from '../gen/greet/v1/greet_pb';
import { transport } from '$lib';

export const load: PageServerLoad = async () => {
  const client = createClient(GreetService, transport);
  const { greeting } = await client.greet({ name: "Svelte" });

  return {
    greeting
  };
};