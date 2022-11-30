import { useState, useEffect, useRef } from 'react'
import { ChakraProvider, Heading, Text, Box, SimpleGrid } from '@chakra-ui/react'
import InputField from './components/InputField'
import { useDebounce } from './Hooks/useDebounce'
import { getCharacter } from './Utils/service'
import './App.css'

function App() {
  const [query, setQuery] = useState('');
  const [listing, setListing] = useState('');
  const [loading, setLoading] = useState(false);
  const controllerRef = useRef();

  const searchQuery = useDebounce(query,2000);
  const controller = new AbortController();
  controllerRef.current = controller;

 const searchCharacter = async() => {
    setListing('');
    setLoading(true);
    const data = await getCharacter(searchQuery, controllerRef.current?.signal);
    controllerRef.current = null;
    setListing(data.results);
    setLoading(false);
  }
  useEffect(() => {
    if(searchQuery || query.trim().length < 0) searchCharacter();
    return cancelSearch()
  },[searchQuery]);

  const cancelSearch = () => {
    controllerRef.current.abort();
  }

  return (
    <div className='App'>
      <ChakraProvider>
        <Heading mb={4}>Search Rick and Morty Character</Heading>
        <Text fontSize="md" textAlign="left" mb={10}>
          With a debounce hook implemented
        </Text>

        <SimpleGrid columns={1} spacing={10}>
          <Box>
            <InputField mb={10} onChange={(event) => setQuery(event.target.value)} value={query} />
          </Box>
        </SimpleGrid>
        {loading && <Text mb={10} textAlign="left">Loading...</Text>}
        {listing && <Box mt={10} display={'block'}>{listing.map(character => (
          <Box key={character.id} mb={10} textAlign="center">
            <img src={character.image} alt={character.name} />
            {character.name}
          </Box>
        ))}
        </Box>}
        {!listing && !loading && <Box mt={10} display={'block'} color={'#c8c8c8'}>You have started your search</Box>}
      </ChakraProvider>
    </div>
  )
}

export default App
