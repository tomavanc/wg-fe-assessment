import { StarIcon } from '@chakra-ui/icons';
import { Flex, Text, Stack } from '@chakra-ui/react';
import { useQuery } from 'react-query';
import { fetchPokemons } from '../api/fetchers';
import { useStore } from '../lib/store';

export default function ItemList() {
  const { data } = useQuery(['pokemons'], fetchPokemons);

  const { active, favorite, setActive } = useStore();

  return (
    <Stack h='700px' overflow='scroll'>
      {data?.results.map(({ name }) => (
        <Flex
          key={name}
          w='100%'
          p={5}
          shadow='md'
          borderWidth={name === favorite ? '3px' : '1px'}
          flex='1'
          borderRadius='md'
          color={name === favorite ? '#2a75bb' : '#000'}
          borderColor={name === favorite ? '#2a75bb' : '#E8E8E8'}
          bg={name === active ? '#ffcb05' : '#FFF'}
          onClick={() => setActive(name)}
          justify='space-between'
          align='center'
        >
          <Text>{name}</Text>
          {name === favorite && <StarIcon color='#2a75bb' />}
        </Flex>
      ))}
    </Stack>
  );
}
