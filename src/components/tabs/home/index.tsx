import { useTransactionsPagination } from '@/hooks/usePagination';
import { formatDistanceToNow, subMinutes } from 'date-fns';
import { Link } from 'expo-router';
import React, { useMemo, useState } from 'react';
import { FlatList, RefreshControl, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Profile, QuickActions, Wallet } from './components';
import {
  renderTransactionItem,
  Transaction,
  TransactionItemSeparator,
} from './components/transactions';

const Home = () => {
  const [balance, setBalance] = useState<number>(500000);
  const [lastUpdatedAt, setLastUpdatedAt] = useState<Date>(subMinutes(new Date(), 20));
  const ITEM_HEIGHT = 84; // approximate item + separator height for layout calc
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const { data, isLoading, isLoadingMore, hasNextPage, loadMore, refresh } =
    useTransactionsPagination({ pageSize: 50 });

  const lastUpdatedLabel = useMemo(
    () => formatDistanceToNow(lastUpdatedAt, { addSuffix: true }),
    [lastUpdatedAt],
  );

  const onRefresh = () => {
    setRefreshing(true);
    setBalance((current) => current);
    setLastUpdatedAt(new Date());
    refresh().finally(() => setRefreshing(false));
  };

  return (
    <SafeAreaView edges={['top', 'right', 'left']} className="flex-1">
      <FlatList
        data={data}
        keyExtractor={(item: Transaction) => item.key.toString()}
        renderItem={renderTransactionItem}
        ItemSeparatorComponent={TransactionItemSeparator}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        contentContainerStyle={{ paddingHorizontal: 24, paddingVertical: 16, gap: 16 }}
        stickyHeaderIndices={[0]}
        removeClippedSubviews
        initialNumToRender={8}
        maxToRenderPerBatch={8}
        windowSize={7}
        onEndReached={() => {
          if (hasNextPage && !isLoadingMore && !isLoading) {
            loadMore();
          }
        }}
        onEndReachedThreshold={0.5}
        getItemLayout={(_, index) => ({
          length: ITEM_HEIGHT,
          offset: ITEM_HEIGHT * index,
          index,
        })}
        ListHeaderComponent={
          <View className="gap-6 bg-white">
            <View className="gap-4">
              <Profile />
              <Wallet balance={balance} lastUpdated={lastUpdatedLabel} refreshing={refreshing} />
              <QuickActions />
            </View>
            <View className="flex-row items-center justify-between">
              <Text className="text-base font-semibold text-[#032211]">Recent Transactions</Text>
              <Link href="/#transactions" className="text-xs font-medium text-grey">
                See all
              </Link>
            </View>
          </View>
        }
        ListFooterComponent={
          isLoadingMore ? (
            <View className="py-4">
              <Text className="text-center text-xs text-grey">Loading more...</Text>
            </View>
          ) : null
        }
      />
    </SafeAreaView>
  );
};

export default Home;
