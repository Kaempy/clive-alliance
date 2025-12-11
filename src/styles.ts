import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  handleIndicator: { backgroundColor: '#A3AAA6', width: 35, height: 3 },
  customBackdrop: {
    backgroundColor: '#011209',
  },
  bottomSheetBackground: { borderRadius: 40 },
  shadow: {
    shadowColor: '#222222',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  tabIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  gradientEffect: {
    position: 'absolute',
    top: -10,
  },
});
