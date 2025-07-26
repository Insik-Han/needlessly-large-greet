import { createConnectTransport as createConnectClientTransport } from "@connectrpc/connect-web";
import { createConnectTransport as createConnectServerTransport } from "@connectrpc/connect-node";

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();

  let transport;

  if (import.meta.server) {
    transport = createConnectServerTransport({
      baseUrl: config.public.apiUrl || "http://localhost:8080",
      httpVersion: "2"
    });
  } else {
    transport = createConnectClientTransport({
      baseUrl: config.public.apiUrl || "http://localhost:8080",
    });
  }

  return {
    provide: {
      connectTransport: transport
    }
  };
});