import { createConnectTransport } from "@connectrpc/connect-node";

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();

  const transport = createConnectTransport({
    baseUrl: config.public.apiUrl || "http://localhost:8080",
    httpVersion: "2"
  });


  return {
    provide: {
      connectTransport: transport
    }
  };
});