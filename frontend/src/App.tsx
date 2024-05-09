import { useState, useRef } from "react";
import axios from "axios";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Heading,
  Text,
  Center,
  useDisclosure,
  VStack,
  Select,
  SimpleGrid,
  Box,
  Divider,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton
} from '@chakra-ui/react';

function App() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();
  const [formData, setFormData] = useState({
    teamName: '',
    teamLocation: "",
    coachName: '',
    coachEmail: '',
    coachPhone: '',
    teamDescription: '',
    note: ""
  });
  const [data, setData] = useState<any>({});
  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
     ...formData,
      [name]: value
    });
  };

  const handleSubmit = async () => {
    if (!Object.values(formData).every(value => value.trim())) {
      alert("Please fill all fields");
      return
    }
    try {
      const res = await axios.post('http://localhost:3000/api/register', formData);
      setData(res.data);
      setFormData({
        teamName: '',
        teamLocation: "",
        coachName: '',
        coachEmail: '',
        coachPhone: '',
        teamDescription: '',
        note: ""
      })
    } catch (error) {
      alert("Error " + error);
    }
    onOpen();
  };
  return (
    <>
      <Center bgGradient="linear(to-b, gray.100, gray.400)" h="150vh">
        <VStack m={4} spacing={8}>
          <Heading as="h3" size="xl" color="black">Football Team Registration Form</Heading>
          <Box
            borderWidth="1px"
            borderRadius="lg"
            p={8}
            boxShadow="md"
            bg="white"
            flex={0.6}
            m={4}
          >
            <Heading mb={4}>Team Information</Heading>
            <Divider mb={2} />
            <VStack spacing={4} align="center" width="100%">
              <FormControl id="teamName" isRequired>
                <FormLabel>Team Name</FormLabel>
                <Input
                  type="text"
                  name="teamName"
                  value={formData.teamName}
                  onChange={handleInputChange}
                />
              </FormControl>
              <FormControl id="teamLocation" isRequired>
                <FormLabel>Team Location</FormLabel>
                <Input
                  type="text"
                  name="teamLocation"
                  value={formData.teamLocation}
                  onChange={handleInputChange}
                />
              </FormControl>
              <SimpleGrid columns={2} spacing={6} width="100%">
                <FormControl>
                  <FormLabel>Coach Name</FormLabel>
                  <Input type="text" name="coachName" value={formData.coachName} onChange={handleInputChange} />
                </FormControl>
                <FormControl>
                  <FormLabel>Coach Email</FormLabel>
                  <Input type="email" name="coachEmail" value={formData.coachEmail} onChange={handleInputChange} />
                </FormControl>
              </SimpleGrid>
              <FormControl>
                <FormLabel>Coach Phone</FormLabel>
                <Input type="tel" name="coachPhone" value={formData.coachPhone} onChange={handleInputChange} />
              </FormControl>
              <FormControl>
                <FormLabel>Team Description</FormLabel>
                <Textarea
                  name="teamDescription"
                  value={formData.teamDescription}
                  onChange={handleInputChange}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Note</FormLabel>
                <Textarea
                  name="note"
                  value={formData.note}
                  onChange={handleInputChange}
                />
              </FormControl>
              <Button type="submit" colorScheme="green" width={"100%"} onClick={handleSubmit}>
                Submit
              </Button>
            </VStack>

          </Box>
        </VStack>

      </Center>
      <Drawer
        isOpen={isOpen}
        placement='bottom'
        onClose={onClose}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <Box p={4}>

            <ListCard key="teamName" title="Team Name" value={data?.teamName} />
            <ListCard key="teamLocation" title="Team Location" value={data?.teamLocation} />
            <ListCard key="coachName" title="Coach Name" value={data?.coachName} />
            <ListCard key="coachEmail" title="Coach Email" value={data?.coachEmail} />
            <ListCard key="coachPhone" title="Coach Phone" value={data?.coachPhone} />
            <ListCard key="teamDescription" title="Team Description" value={data?.teamDescription} />
            <ListCard key="note" title="Note" value={data?.note} />
            <hr />
            <ListCard title="Balance" value={data?.balance} />
            <ListCard title="Transaction" value={data?.transaction} />
          </Box>

        </DrawerContent>
      </Drawer>

    </>

  );
}

const ListCard = (props: any) => {
  return (
    <VStack spacing={1} align="flex-start" justifyContent={"flex-start"} my={2}>
      <Text as={"b"}>{props.title}</Text>
      <Text>{props.value}</Text>
    </VStack>
  );
};
export default App;
