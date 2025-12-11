import { formatDistanceToNow, subMinutes } from 'date-fns';
import React, { useCallback, useMemo, useState } from 'react';
import { RefreshControl, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Profile, QuickActions, Transactions, Wallet } from './components';

const Home = () => {
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [balance, setBalance] = useState<number>(500000);
  const [lastUpdatedAt, setLastUpdatedAt] = useState<Date>(subMinutes(new Date(), 20));

  const lastUpdatedLabel = useMemo(
    () => formatDistanceToNow(lastUpdatedAt, { addSuffix: true }),
    [lastUpdatedAt],
  );

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      // Mock refresh: keep same balance but update timestamp
      setBalance((current) => current);
      setLastUpdatedAt(new Date());
      setRefreshing(false);
    }, 800);
  }, []);

  return (
    <SafeAreaView edges={['top', 'right', 'left']} className="flex-1 gap-8 px-6 py-4">
      <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
        <Profile />
        <Wallet balance={balance} lastUpdated={lastUpdatedLabel} />
        <QuickActions />
      </ScrollView>
      <Transactions />
    </SafeAreaView>
  );
};

export default Home;
