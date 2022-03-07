import axios from 'axios';

interface PokemonList {
  count: number;
  next: string;
  previous: null;
  results: PokemonListItem[];
}

interface PokemonListItem {
  name: string;
  url: string;
}

export async function fetchPokemons() {
  const { data } = await axios.get<PokemonList>(
    'https://pokeapi.co/api/v2/pokemon'
  );

  return data;
}

interface Pokemon {
  id: number;
  name: string;
  height: number;
  weight: number;
  sprites: { front_default: string };
  moves: {
    move: PokemonListItem;
    version_group_details: {
      level_learned_at: number;
      move_learn_method: PokemonListItem;
      version_group: PokemonListItem;
    }[];
  }[];
}

export async function fetchPokemon(id: string) {
  const { data } = await axios.get<Pokemon>(
    `https://pokeapi.co/api/v2/pokemon/${id}`
  );

  return data;
}
