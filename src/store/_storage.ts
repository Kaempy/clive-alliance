import { createMMKV } from 'react-native-mmkv';
import { StateStorage } from 'zustand/middleware';

// Initialize with encryption
export const storage = createMMKV();

const mmkvStorage: StateStorage = {
  setItem: (name, value) => {
    return storage.set(name, value);
  },
  getItem: (name) => {
    const value = storage.getString(name);
    return value ?? null;
  },
  removeItem: (name) => {
    return storage.remove(name);
  },
};

export default mmkvStorage;
