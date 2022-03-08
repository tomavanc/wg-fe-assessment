import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { QueryClientProvider, QueryClient } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { initializeStore, Provider, State } from '../lib/store';
import { StoreApi, UseBoundStore } from 'zustand';

function MyApp({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();
  const createStore = initializeStore(pageProps.initialZustandState);

  return (
    <QueryClientProvider client={queryClient}>
      <Provider
        createStore={
          createStore as () => UseBoundStore<object, StoreApi<object>>
        }
      >
        <ChakraProvider>
          <Component {...pageProps} />
        </ChakraProvider>
      </Provider>
      <ReactQueryDevtools position='bottom-right' initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default MyApp;
