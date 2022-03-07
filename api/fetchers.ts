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

export async function fetchPokemon(id: string) {
  const { data } = await axios.get<any>(
    `https://pokeapi.co/api/v2/pokemon/${id}`
  );

  return data;
}
