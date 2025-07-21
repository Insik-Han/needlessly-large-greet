<script setup lang="ts">
import { createClient } from "@connectrpc/connect";
import { GreetService } from "./gen/greet/v1/greet_pb";
import { createConnectTransport } from "@connectrpc/connect-web";

const transport = createConnectTransport({
  baseUrl: "http://localhost:8080",
});

const client = createClient(GreetService, transport);

const { greeting } = await client.greet({ name: "Nuxt" })

</script>

<template>
  <h1>{{ greeting }}</h1>
</template>
