import { Data, Help, Savings, Transfer } from '@/icons';
import { cn, formatCurrency } from '@/lib';
import { FlashList } from '@shopify/flash-list';
import { Link } from 'expo-router';
import React, { useCallback } from 'react';
import { Text, View } from 'react-native';
import transactionsData from './transactions.json';

type TransactionCategory = 'transfer' | 'data' | 'help' | 'savings';

type Transaction = {
  key: number;
  title: string;
  amount: number;
  date: string;
  type: 'credit' | 'debit';
  category: TransactionCategory;
};

const iconMap: Record<TransactionCategory, (props: { color: string }) => React.ReactElement> = {
  transfer: Transfer,
  data: Data,
  help: Help,
  savings: Savings,
};

const transactions = transactionsData as Transaction[];

const renderItem = ({ item }: { item: Transaction }) => (
  <View className="flex-row items-center justify-between gap-4">
    <View
      className={cn(
        'flex-shrink-0 items-center justify-center rounded-full p-3',
        item.type === 'credit' ? 'bg-primary/25' : 'bg-error/25',
      )}>
      {iconMap[item.category]({ color: item.type === 'credit' ? '#608E75' : '#D73F3F' })}
    </View>
    <View className="flex-1 gap-1">
      <Text className="text-sm font-semibold text-[#404040]">{item.title}</Text>
      <Text className="text-[10px] font-medium text-[#404040]">{item.date}</Text>
    </View>
    <View className="flex-shrink-0">
      <Text
        className={cn(
          'text-sm font-semibold text-[#404040]',
          item.type === 'credit' ? 'text-primary' : 'text-error',
        )}>
        {item.type === 'credit'
          ? `+ ${formatCurrency(item.amount)}`
          : `- ${formatCurrency(item.amount)}`}
      </Text>
    </View>
  </View>
);

const ItemSeparator = () => <View className="h-4" />;

const Transactions = () => {
  // Memoize key extractor for performance
  const keyExtractor = useCallback((item: Transaction) => item.key.toString(), []);

  // Memoize render item to prevent unnecessary re-renders
  const memoizedRenderItem = useCallback(
    ({ item }: { item: Transaction }) => renderItem({ item }),
    [],
  );

  // Memoize separator component
  const memoizedSeparator = useCallback(() => <ItemSeparator />, []);

  return (
    <View className="flex-1 gap-2">
      <View className="flex-row items-center justify-between">
        <Text className="text-base font-semibold text-[#032211]">Recent Transactions</Text>
        <Link href="/#transactions" className="text-xs font-medium text-grey">
          See all
        </Link>
      </View>
      <FlashList
        data={transactions}
        keyExtractor={keyExtractor}
        renderItem={memoizedRenderItem}
        ItemSeparatorComponent={memoizedSeparator}
        removeClippedSubviews={true}
        drawDistance={250}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default Transactions;
