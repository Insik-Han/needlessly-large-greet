<script setup lang="ts">
import { useGreetClient } from '~/composables/useGreetClient';

const { data } = useAsyncData('greeting', async () => {
  const client = useGreetClient();
  return await client.greet({ name: 'Nuxt' });
});

const greeting = computed(() => data.value?.greeting || 'Loading...');

</script>

<template>
  <h1> {{ greeting }}</h1>
</template>