import React from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Budget = () => {
  return (
    <SafeAreaView className="flex-1 px-6">
      <View className="flex-row items-center gap-4">
        <Text>Budget</Text>
      </View>
    </SafeAreaView>
  );
};

export default Budget;
