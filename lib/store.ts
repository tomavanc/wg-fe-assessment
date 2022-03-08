import { useLayoutEffect } from 'react';
import create, { StoreApi, UseBoundStore } from 'zustand';
import createContext from 'zustand/context';

interface State {
  active: string | null;
  favorite: string | null;
  setActive: (pokemon: string) => void;
  setFavorite: (pokemon: string) => void;
  reset: () => void;
}

type InitialState = Pick<State, 'active' | 'favorite'>;

let store: UseBoundStore<State, StoreApi<State>> | undefined;

const initialState: InitialState = {
  active: null,
  favorite: null,
};

const zustandContext = createContext();
export const Provider = zustandContext.Provider;
export const useStore = zustandContext.useStore;

export const initializeStore = (preloadedState = {}) => {
  return create<State>((set, get) => ({
    ...initialState,
    ...preloadedState,
    setActive: (pokemon: string) => {
      set({
        active: pokemon,
      });
    },
    setFavorite: (pokemon: string) => {
      set({
        favorite: pokemon,
      });
    },
    reset: () => {
      set({
        active: null,
        favorite: null,
      });
    },
  }));
};

export function useCreateStore(initialState: InitialState) {
  // For SSR & SSG, always use a new store.
  if (typeof window === 'undefined') {
    return () => initializeStore(initialState);
  }

  // For CSR, always re-use same store.
  store = store ?? initializeStore(initialState);
  // And if initialState changes, then merge states in the next render cycle.
  //
  // eslint complaining "React Hooks must be called in the exact same order in every component render"
  // is ignorable as this code runs in same order in a given environment
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useLayoutEffect(() => {
    if (initialState && !!store) {
      store.setState({
        ...store.getState(),
        ...initialState,
      });
    }
  }, [initialState]);

  return () => store;
}
