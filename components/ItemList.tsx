import { Box, Text, Stack } from '@chakra-ui/react';
import { useQuery } from 'react-query';
import { fetchPokemons } from '../api/fetchers';

export default function ItemList() {
  const { data } = useQuery(['pokemons'], fetchPokemons);

  return (
    <Stack>
      {data?.results.map(({ name }) => (
        <Box
          key={name}
          w='100%'
          p={5}
          shadow='md'
          borderWidth='1px'
          flex='1'
          borderRadius='md'
        >
          <Text>{name}</Text>
        </Box>
      ))}
    </Stack>
  );
}
