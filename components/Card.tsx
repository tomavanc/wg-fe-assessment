import { Box, Center, Heading, Image, Text, Flex } from '@chakra-ui/react';
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
      <Center>
        <Heading as='h2' size='xl'>
          {pokemon.name} ({pokemon.id})
        </Heading>
      </Center>

      <Center>
        <Image
          src={pokemon.sprites.front_default}
          alt={pokemon.name}
          boxSize='250px'
          objectFit='cover'
        />
      </Center>

      <Center>
        <Text fontSize='lg'>Weight {pokemon.weight}</Text>
      </Center>

      <Center>
        <Text fontSize='lg'>Height {pokemon.height}</Text>
      </Center>

      <Center py='5'>
        <Text fontSize='xl'>Moves</Text>
      </Center>

      <Flex maxH='300px' overflow='scroll' direction='column'>
        {pokemon.moves.map(({ move }) => (
          <Center key={move.name}>{move.name}</Center>
        ))}
      </Flex>
    </Box>
  );
}
