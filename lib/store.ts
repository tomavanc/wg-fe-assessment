import create from 'zustand';
import createContext from 'zustand/context';

export interface State {
  active: string | null;
  favorite: string | null;
  setActive: (pokemon: string) => void;
  setFavorite: (pokemon: string) => void;
  reset: () => void;
}

type InitialState = Pick<State, 'active' | 'favorite'>;

const initialState: InitialState = {
  active: null,
  favorite: null,
};

export const initializeStore = (data = {}) => {
  const createStore = () =>
    create<State>((set) => ({
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
    }));

  return createStore;
};

export const { Provider, useStore } = createContext();
