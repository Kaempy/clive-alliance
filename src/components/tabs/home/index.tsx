import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Profile, QuickActions, Transactions, Wallet } from './components';

const Home = () => {
  return (
    <SafeAreaView edges={['top', 'right', 'left']} className="flex-1 gap-8 bg-white px-6 py-4">
      <Profile />
      <Wallet />
      <QuickActions />
      <Transactions />
    </SafeAreaView>
  );
};

export default Home;
