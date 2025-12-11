import { styles } from '@/styles';
import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import { LinearGradient } from 'expo-linear-gradient';
import { useCallback, useMemo, useRef, useState } from 'react';
import { Image, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Login from './login';
import Button from './ui/Button';

const img = require('../../assets/public/onboarding.png');

const Welcome = () => {
  const [next, setNext] = useState(false);
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => (next ? ['65%'] : ['85%']), [next]);

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        style={[props.style, styles.customBackdrop]}
      />
    ),
    [],
  );
  const onPresent = useCallback(() => {
    bottomSheetRef.current?.present();
  }, []);

  const onDismiss = useCallback(() => {
    bottomSheetRef.current?.dismiss();
  }, []);

  return (
    <SafeAreaView className="flex-1">
      <Image
        source={img}
        className="h-[445px] w-[350px]"
        resizeMode="contain"
        alt="Welcome Image"
      />
      <View className="flex-1 items-start justify-between gap-6 p-6">
        <View className="items-start gap-3">
          <LinearGradient
            colors={['#87D8A9B2', '#66A68100', '#87D8A980']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{
              padding: 12,
              borderRadius: 100,
              borderColor: '#87D8A94D',
              borderWidth: 1,
              borderStyle: 'solid',
            }}>
            <Text className="text-[10px] font-medium">Welcome to Zikora Bank</Text>
          </LinearGradient>
          <View className="w-full max-w-sm gap-3">
            <Text className="text-[28px] font-semibold leading-9">
              Manage your finances effortlessly with our intuitive app.
            </Text>
            <Text className="text-sm text-[#7F7F7F]">
              Open an account from the comfort of your home, and experience smooth, hassle-free
              transactions.
            </Text>
          </View>
        </View>
        <Button onPress={onPresent} role="button">
          Get Started
        </Button>
      </View>
      <BottomSheetModal
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        enableDynamicSizing={false}
        enablePanDownToClose
        backdropComponent={renderBackdrop}
        backgroundStyle={styles.bottomSheetBackground}
        handleIndicatorStyle={styles.handleIndicator}>
        <BottomSheetView className="h-full">
          <Login onDismiss={onDismiss} setNext={setNext} next={next} />
        </BottomSheetView>
      </BottomSheetModal>
    </SafeAreaView>
  );
};

export default Welcome;
