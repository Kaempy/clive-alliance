import {
  getTransactions,
  type GetTransactionsParams,
  type GetTransactionsResponse,
} from '@/services/transactions';
import { useInfiniteQuery } from '@tanstack/react-query';

type UsePaginationResult<T> = {
  data: T[];
  isLoading: boolean;
  isLoadingMore: boolean;
  hasNextPage: boolean;
  loadMore: () => Promise<unknown>;
  refresh: () => Promise<unknown>;
  isError: boolean;
  error: unknown;
};

const useTransactionsPagination = ({
  initialParams = {},
  pageSize = 50,
}: {
  initialParams?: Omit<GetTransactionsParams, 'page' | 'pageSize'>;
  pageSize?: number;
} = {}): UsePaginationResult<GetTransactionsResponse['items'][number]> => {
  const query = useInfiniteQuery({
    queryKey: ['transactions', initialParams, pageSize],
    queryFn: async ({ pageParam = 1 }) =>
      getTransactions({ ...(initialParams ?? {}), page: pageParam, pageSize }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextPage,
    retry: false,
  });

  const items = query.data?.pages.flatMap((page) => page.items) ?? [];

  return {
    data: items,
    isLoading: query.isLoading,
    isLoadingMore: query.isFetchingNextPage,
    hasNextPage: query.hasNextPage ?? false,
    loadMore: query.fetchNextPage,
    refresh: query.refetch,
    isError: query.isError,
    error: query.error,
  };
};

export { useTransactionsPagination };
