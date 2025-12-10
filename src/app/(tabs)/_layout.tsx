import { Tabs } from 'expo-router';
import { ComponentType, JSX, ReactNode, Ref } from 'react';
import Svg, { Defs, LinearGradient, Path, Rect, Stop, SvgProps } from 'react-native-svg';

import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Account, Budget, Cards, Home, Pay } from '@/icons';
import { styles } from '@/styles';
import { Pressable, Text, View } from 'react-native';

interface TabConfig {
  name: string;
  title: string;
  icon: ComponentType<SvgProps>;
  options?: {
    headerTitleAlign?: 'center' | 'left';
    headerTitle?: ({ children }: { children: ReactNode }) => JSX.Element;
    headerShown?: boolean;
  };
}

interface TabBarIconProps {
  focused: boolean;
  color: string;
  size: number;
  icon: ComponentType<SvgProps>;
}

const TabBarIcon = ({ focused, icon: Icon, ...rest }: TabBarIconProps): JSX.Element => {
  return (
    <View style={styles.tabIconContainer}>
      {focused && (
        <Svg width={44} height={18} viewBox="0 0 44 18" fill="none" style={styles.gradientEffect}>
          <Rect x={5} width={33} height={1} rx={0.5} fill="#608E75" />
          <Path d="M6 1H37.5L43.5 18H0L6 1Z" fill="url(#paint0_linear)" />
          <Defs>
            <LinearGradient
              id="paint0_linear"
              x1={21.5}
              y1={-30}
              x2={21.5}
              y2={20}
              gradientUnits="userSpaceOnUse">
              <Stop stopColor="#8FC2A6" />
              <Stop offset={0.984243} stopColor="#86B099" stopOpacity={0} />
            </LinearGradient>
          </Defs>
        </Svg>
      )}
      <Icon {...rest} />
    </View>
  );
};

const tabs: TabConfig[] = [
  {
    name: 'index',
    title: 'Home',
    icon: Home,
  },
  {
    name: 'pay',
    title: 'Pay',
    icon: Pay,
    options: {
      headerTitleAlign: 'center',
      headerTitle: ({ children }: { children: ReactNode }) => (
        <Text className="text-[1.25rem] font-semibold text-header1">{children}</Text>
      ),
      headerShown: true,
    },
  },
  {
    name: 'budget',
    title: 'Budget',
    icon: Budget,
  },
  {
    name: 'cards',
    title: 'Cards',
    icon: Cards,
  },
  {
    name: 'account',
    title: 'Account',
    icon: Account,
  },
];
const TabLayout = () => {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        headerShadowVisible: false,
        tabBarStyle: {
          borderTopWidth: 0,
        },
        tabBarButton: ({ ref, ...props }) => (
          <Pressable ref={ref as Ref<View>} {...props} android_ripple={{ color: 'transparent' }} />
        ),
      }}>
      {tabs.map((tab) => (
        <Tabs.Screen
          key={tab.name}
          name={tab.name}
          options={{
            title: tab.title,
            tabBarIcon: ({ focused, ...rest }) => (
              <TabBarIcon focused={focused} icon={tab.icon} {...rest} />
            ),
            ...tab.options,
          }}
        />
      ))}
    </Tabs>
  );
};

export default TabLayout;
