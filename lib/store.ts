import { type } from 'os';
import create from 'zustand';
import createContext from 'zustand/context';

export interface State {
  active: string | null;
  favorite: string | null;
  page: number;
  setActive: (pokemon: string) => void;
  setFavorite: (pokemon: string) => void;
  reset: () => void;
}

type InitialState = Pick<State, 'active' | 'favorite' | 'page'>;

const initialState: InitialState = {
  active: null,
  favorite: null,
  page: 10,
};

export const initializeStore = (data = {}) => {
  const createStore = () =>
    create<State>((set, get) => ({
      ...initialState,
      ...data,
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
      nextPage: () => {
        set({
          page: get().page + 10,
        });
      },
      previousPage: () => {
        set({
          page: get().page - 10,
        });
      },
    }));

  return createStore;
};

export const { Provider, useStore } = createContext();
