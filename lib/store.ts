import { type } from 'os';
import create from 'zustand';
import createContext from 'zustand/context';

const PAGE_SIZE = 5;

export interface State {
  active: string | null;
  favorite: string | null;
  page: number;
  setActive: (pokemon: string | null) => void;
  setFavorite: (pokemon: string | null) => void;
  nextPage: () => void;
  previousPage: () => void;
}

type InitialState = Pick<State, 'active' | 'favorite' | 'page'>;

const initialState: InitialState = {
  active: null,
  favorite: null,
  page: 0,
};

const useStore = create<State>((set, get) => ({
  ...initialState,
  setActive: (pokemon: string | null) => {
    set({
      active: pokemon,
    });
  },
  setFavorite: (pokemon: string | null) => {
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
      page: get().page + PAGE_SIZE,
    });
  },
  previousPage: () => {
    const oldPage = get().page;

    set({
      page: oldPage !== 0 ? oldPage - PAGE_SIZE : 0,
    });
  },
}));

export default useStore;
