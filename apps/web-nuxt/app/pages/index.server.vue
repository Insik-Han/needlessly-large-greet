<script setup lang="ts">
import { createClient } from '@connectrpc/connect';
import { GreetService } from '#shared/gen/greet/v1/greet_pb';
import { createConnectTransport } from '@connectrpc/connect-node';

const transport = createConnectTransport({
  baseUrl: "http://localhost:8080",
  httpVersion: "2"
});
const { greeting } = await createClient(GreetService, transport).greet({ name: 'Nuxt' })
</script>

<template>
  <h1>{{ greeting }}</h1>
</template>