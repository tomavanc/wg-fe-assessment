import { Box, Image, Text } from '@chakra-ui/react';
import { useQuery } from 'react-query';
import { fetchPokemon } from '../api/fetchers';

export default function Card({ name }: { name?: string }) {
  const { data: pokemon } = useQuery(
    ['pokemon', name],
    () => fetchPokemon(name!),
    {
      enabled: !!name,
    }
  );

  if (!pokemon) {
    return null;
  }

  return (
    <Box
      w='100%'
      p={5}
      shadow='md'
      borderWidth='1px'
      flex='1'
      borderRadius='md'
    >
      <Text>
        {pokemon.name} ({pokemon.id})
      </Text>

      <Image src={pokemon.sprites.front_default} alt={pokemon.name} />

      <Text>Weight: {pokemon.weight}</Text>

      <Text>Height: {pokemon.height}</Text>

      <Text>Moves</Text>

      <ul>
        {pokemon.moves.map(({ move }) => (
          <li key={move.name}>{move.name}</li>
        ))}
      </ul>
    </Box>
  );
}
