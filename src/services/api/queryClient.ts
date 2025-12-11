import { QueryCache, QueryClient } from '@tanstack/react-query';
import { toast } from 'sonner-native';

export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error) => {
      toast.error('Network error', {
        description: error.message,
      });
    },
  }),
  defaultOptions: {
    queries: {
      retry: false,
      staleTime: 30_000,
      networkMode: 'offlineFirst',
    },
    mutations: {
      retry: false,
      networkMode: 'offlineFirst',
    },
  },
});

export default queryClient;
