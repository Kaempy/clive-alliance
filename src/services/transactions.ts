import transactionsData from '@/components/tabs/home/components/transactions/transactions.json';

export type GetTransactionsParams = {
  page?: number;
  pageSize?: number;
};

export type TransactionDto = {
  key: number;
  title: string;
  amount: number;
  date: string;
  type: 'credit' | 'debit';
  category: 'transfer' | 'data' | 'help' | 'savings';
};

export type GetTransactionsResponse = {
  items: TransactionDto[];
  nextPage?: number;
  total: number;
};

/**
 * Mock transaction fetcher with pagination.
 * Simulates network latency; can throw to simulate network failures.
 */
export const getTransactions = async ({
  page = 1,
  pageSize = 50,
}: GetTransactionsParams = {}): Promise<GetTransactionsResponse> => {
  // Simulate network latency
  await new Promise((resolve) => setTimeout(resolve, 750));

  const total = (transactionsData as TransactionDto[]).length;
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  const items = (transactionsData as TransactionDto[]).slice(start, end);
  const hasNext = end < total;

  return {
    items,
    nextPage: hasNext ? page + 1 : undefined,
    total,
  };
};
