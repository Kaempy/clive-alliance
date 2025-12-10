import { StateCreator } from 'zustand';
import { AuthStore } from './auth';

type Store = AuthStore;

type CustomStateCreator = StateCreator<
  Store,
  [],
  [['zustand/persist', unknown], ['zustand/immer', never]]
>;
export type { CustomStateCreator, Store };
