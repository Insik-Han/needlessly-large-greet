import { createConnectTransport } from '@connectrpc/connect-node';

export const transport = createConnectTransport({
  baseUrl: 'http://localhost:8080',
  httpVersion: '2',
});