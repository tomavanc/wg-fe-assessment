import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { QueryClientProvider, QueryClient } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { Provider, useCreateStore } from '../lib/store';

function MyApp({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();
  const createStore = useCreateStore(pageProps.initialZustandState);

  return (
    <QueryClientProvider client={queryClient}>
      <Provider createStore={createStore}>
        <ChakraProvider>
          <Component {...pageProps} />
        </ChakraProvider>
      </Provider>
      <ReactQueryDevtools position='bottom-right' initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default MyApp;
