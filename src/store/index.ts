import { CustomStateCreator, Store } from '@/types/store';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import mmkvStorage from './_storage';
import createSelectors from './create-selectors';
import { authSlice } from './reducers';

const storage = createJSONStorage(() => mmkvStorage);

const middlewares = (f: CustomStateCreator) =>
  persist(immer(f), {
    name: 'auth',
    storage,
    partialize: (state) => ({
      user: state.user,
    }),
  });

const useStore = create<Store>()(
  middlewares((...a) => ({
    ...authSlice(...a),
    // ...walletSlice(...a),
  })),
);

export const useStoreSelectors = createSelectors(useStore);
export default useStore;
