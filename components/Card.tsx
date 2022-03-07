import { Box } from '@chakra-ui/react';
import { useQuery } from 'react-query';
import { fetchPokemon } from '../api/fetchers';

export default function Card({ name }: { name?: string }) {
  const { data } = useQuery(['pokemon', name], () => fetchPokemon(name!), {
    enabled: !!name,
  });

  console.log('data', data);

  return (
    <Box
      w='100%'
      p={5}
      shadow='md'
      borderWidth='1px'
      flex='1'
      borderRadius='md'
    >
      box
    </Box>
  );
}
