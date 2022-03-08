import { Box, Text, Stack } from '@chakra-ui/react';
import { useQuery } from 'react-query';
import { fetchPokemons } from '../api/fetchers';
import { useStore } from '../lib/store';

export default function ItemList() {
  const { data } = useQuery(['pokemons'], fetchPokemons);

  const { active, setActive } = useStore();

  return (
    <Stack h='700px' overflow='scroll'>
      {data?.results.map(({ name }) => (
        <Box
          key={name}
          w='100%'
          p={5}
          shadow='md'
          borderWidth='1px'
          flex='1'
          borderRadius='md'
          bg={name === active ? '#ffcb05' : '#FFF'}
          onClick={() => setActive(name)}
        >
          <Text>{name}</Text>
        </Box>
      ))}
    </Stack>
  );
}
