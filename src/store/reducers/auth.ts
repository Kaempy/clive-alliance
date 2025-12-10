import mmkvStorage from '@/store/_storage';
import { CustomStateCreator } from '@/types/store';
import * as SecureStore from 'expo-secure-store';
import { AuthCredentials, User } from '../../types/auth';

const createAuthSlice: CustomStateCreator = (set, get) => ({
  user: null,
  isAuth: false,

  setCredentials: async ({ user, token, refresh_token }: AuthCredentials) => {
    try {
      // Store tokens securely
      await Promise.all([
        SecureStore.setItemAsync('token', token),
        SecureStore.setItemAsync('refresh_token', refresh_token),
      ]);

      set((state) => {
        state.user = user;
        state.isAuth = !!token;
      });
    } catch (error) {
      console.error('Failed to set credentials:', error);
      throw error;
    }
  },

  updateUser: (user: User) => {
    set((state) => {
      state.user = user;
    });
  },

  logout: async () => {
    try {
      // Clear auth tokens securely
      await Promise.all([
        SecureStore.deleteItemAsync('token').catch(() => {}),
        SecureStore.deleteItemAsync('refresh_token').catch(() => {}),
      ]);

      // Update auth state
      set((state) => {
        state.isAuth = false;
        state.user = null;
      });

      // Clear persisted auth store
      mmkvStorage.removeItem('auth');
    } catch (error) {
      console.error('Logout failed:', error);
      throw error;
    }
  },
});

export default createAuthSlice;
