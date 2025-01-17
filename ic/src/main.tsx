import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app';
import './index.scss';
import { registerSW } from 'virtual:pwa-register';
import WebApp from '@twa-dev/sdk';
import 'pretendard/dist/web/static/pretendard.css';
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';

const updateSW = registerSW({
  onNeedRefresh() {},
  onOfflineReady() {},
});

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>,
);
