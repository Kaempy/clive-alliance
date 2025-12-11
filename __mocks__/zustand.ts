// __mocks__/zustand.ts
import { act } from '@testing-library/react-native';
import type {
  Mutate,
  StateCreator,
  StoreApi,
  StoreMutatorIdentifier,
  UseBoundStore,
} from 'zustand';

const actualZustand = jest.requireActual<typeof import('zustand')>('zustand');
const { create: actualCreate, createStore: actualCreateStore } = actualZustand;

// a variable to hold reset functions for all stores declared in the app
export const storeResetFns = new Set<() => void>();

const createUncurried = <
  T,
  Mos extends [Mutate<StoreApi<T>, StoreMutatorIdentifier>, ...Mutate<StoreApi<T>, any>[]] = [],
>(
  stateCreator: StateCreator<T, [], Mos>,
): UseBoundStore<StoreApi<T>, Mos> => {
  const store = actualCreate(stateCreator);
  const initialState = store.getInitialState();
  storeResetFns.add(() => {
    store.setState(initialState, true);
  });
  return store;
};

// when creating a store, we get its initial state, create a reset function and add it in the set
export const create = (<
  T,
  Mos extends [Mutate<StoreApi<T>, StoreMutatorIdentifier>, ...Mutate<StoreApi<T>, any>[]] = [],
>(
  stateCreator: StateCreator<T, [], Mos>,
) => {
  // to support curried version of create
  return typeof stateCreator === 'function' ? createUncurried(stateCreator) : createUncurried;
}) as typeof actualCreate;

const createStoreUncurried = <
  T,
  Mos extends [Mutate<StoreApi<T>, StoreMutatorIdentifier>, ...Mutate<StoreApi<T>, any>[]] = [],
>(
  stateCreator: StateCreator<T, [], Mos>,
) => {
  const store = actualCreateStore(stateCreator);
  const initialState = store.getInitialState();
  storeResetFns.add(() => {
    store.setState(initialState, true);
  });
  return store;
};

// when creating a store, we get its initial state, create a reset function and add it in the set
export const createStore = (<
  T,
  Mos extends [Mutate<StoreApi<T>, StoreMutatorIdentifier>, ...Mutate<StoreApi<T>, any>[]] = [],
>(
  stateCreator: StateCreator<T, [], Mos>,
) => {
  // to support curried version of createStore
  return typeof stateCreator === 'function'
    ? createStoreUncurried(stateCreator)
    : createStoreUncurried;
}) as typeof actualCreateStore;

// Re-export commonly used helpers from the actual zustand implementation
export const { useStore, useStoreApi, createJSONStorage, shallow } = actualZustand;
export default create;

// reset all stores after each test run
afterEach(() => {
  act(() => {
    storeResetFns.forEach((resetFn) => {
      resetFn();
    });
  });
});
