import {
  Box,
  Center,
  Heading,
  Image,
  Text,
  Flex,
  Spacer,
} from '@chakra-ui/react';
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
    <Center w='100%'>
      <Box
        w='500px'
        h='700px'
        p={5}
        borderWidth='15px'
        borderColor='#ffcb05'
        borderRadius='xl'
        bg='#E8E8E8'
      >
        <Flex>
          <Heading as='h2' size='xl'>
            {pokemon.name}
          </Heading>
          <Spacer />
          <Heading as='h2' size='xl'>
            {pokemon.id}
          </Heading>
        </Flex>

        <Center
          borderWidth='1px'
          borderColor='lightGray'
          my='5'
          borderRadius='xl'
          bg='#F8F8F8'
        >
          <Image
            src={pokemon.sprites.front_default}
            alt={pokemon.name}
            boxSize='250px'
            objectFit='cover'
            borderWidth='1px'
          />
        </Center>

        <Flex pb='5'>
          <Center w='50%'>
            <Flex direction='column' align='center'>
              <Text>Weight</Text>
              <Text fontSize='3xl'>{pokemon.weight}</Text>
            </Flex>
          </Center>
          <Center w='50%'>
            <Flex direction='column' align='center'>
              <Text>Height</Text>
              <Text fontSize='3xl'>{pokemon.height}</Text>
            </Flex>
          </Center>
        </Flex>

        <Center py='5' borderTop='1px' borderColor='lightGray'>
          <Text fontSize='xl'>Moves</Text>
        </Center>

        <Flex
          maxH='140px'
          overflow='scroll'
          direction='column'
          borderRadius='xl'
          bg='#F0F0F0'
        >
          {pokemon.moves.map(({ move }) => (
            <Center key={move.name}>{move.name}</Center>
          ))}
        </Flex>
      </Box>
    </Center>
  );
}
