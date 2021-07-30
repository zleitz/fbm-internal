import { React, useState, useEffect, useRef } from 'react';
import {
  Heading,
  GridItem,
  Button,
  Text,
  Select,
  Stack,
  Spinner,
  useToast,
  Fade,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  useClipboard,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowCircleRight,
  faUser,
  faClipboard,
  faClipboardCheck,
} from '@fortawesome/free-solid-svg-icons';

import { useAuth } from '../../hooks/useAuth';
import { useSerp } from '../../hooks/useSerp';
import { useHighrise } from '../../hooks/useHighrise';

const Dashboard = () => {
  const { user, isAuthenticating } = useAuth();
  const { serpData, isSerpLoading, performSerp } = useSerp();
  const { clients, isLoading } = useHighrise('Zack Leitzel');
  const [error, setError] = useState(false);
  const tableRef = useRef();

  const { hasCopied, onCopy } = useClipboard(
    tableRef.current ? tableRef.current.textContent : null
  );
  const toast = useToast();

  const [selected, setSelected] = useState();

  const handleSelectStateChange = event => {
    if (!event.target.value) {
      setSelected(null);
    } else {
      setSelected(event.target.value);
    }
  };

  const handleOnClick = async event => {
    const parsed = JSON.parse(selected);

    if (parsed[0] === undefined) {
      setError(true);
      return null;
    }

    setError(false);

    const main = parsed[0].value.split(', ');

    await performSerp(main[0], main[1], main[2], main[3], main[4]).then(() => {
      toast({
        title: 'Report generated!',
        status: 'success',
        duration: 2000,
        isClosable: true,
        position: 'bottom-right',
      });
    });
    console.log(tableRef);
  };

  useEffect(() => {
    toast({
      title: `${user.email} logged in!`,
      duration: 1500,
      status: 'success',
    });
  }, []);

  return (
    <>
      <GridItem colStart={1} colSpan={2} p={6}>
        <Stack direction="column">
          <Heading as="h1" mb={2}>
            FBM Site Inspector 📋
          </Heading>
          <Text fontSize="md">Please choose a client from the list below.</Text>
          {error && (
            <Alert status="error">
              <AlertIcon />
              <AlertTitle mr={2} fontSize="xs">
                This client hasn't been configured for this tool!
              </AlertTitle>
              <AlertDescription fontSize="sm">
                Contact zack@footbridgemedia for assistance!
              </AlertDescription>
            </Alert>
          )}
          {isAuthenticating || isLoading ? (
            <Spinner size="xl" />
          ) : (
            <Select
              iconColor="teal"
              isDisabled={isSerpLoading}
              value={selected}
              variant="filled"
              icon={<FontAwesomeIcon icon={faUser} />}
              onChange={handleSelectStateChange}
              placeholder="Select client"
            >
              {clients.map(client => (
                <option
                  key={JSON.stringify(client.id)}
                  value={JSON.stringify(
                    client.subject_datas.subject_data.filter(
                      field => field.subject_field_label === 'Main Keyphrase'
                    )
                  )}
                >
                  {client.name}
                </option>
              ))}
            </Select>
          )}
          <Fade in={selected}>
            <Button
              isLoading={isSerpLoading}
              onClick={handleOnClick}
              loadingText="Generating"
              marginTop={2}
              colorScheme="teal"
              size="lg"
            >
              <FontAwesomeIcon pull="left" icon={faArrowCircleRight} />
              Generate Report
            </Button>
          </Fade>
        </Stack>
      </GridItem>
      <GridItem colStart={3} colSpan={2}>
        <Fade in={serpData} unmountOnExit={!serpData}>
          <Table size="md" variant="striped" colorScheme="gray">
            <TableCaption>Site Inspection Report</TableCaption>
            <Thead>
              <Th>Keyphrase</Th>
              <Th>Ranking</Th>
            </Thead>
            <Tbody ref={tableRef}>
              {serpData
                ? serpData.map(data =>
                    data.serp === undefined ? (
                      <Tr>
                        <Td>{data.keyphrase}</Td>
                        <Td>Not found on first page</Td>
                      </Tr>
                    ) : (
                      <Tr>
                        <Td>{data.keyphrase}</Td>
                        <Td>{data.serp.position}</Td>
                      </Tr>
                    )
                  )
                : null}
            </Tbody>
          </Table>
          <Button onClick={onCopy}>
            {hasCopied ? (
              <>
                <FontAwesomeIcon pull="left" icon={faClipboardCheck} /> Copied!
              </>
            ) : (
              <>
                <FontAwesomeIcon pull="left" icon={faClipboard} />
                Copy Report
              </>
            )}
          </Button>
        </Fade>
      </GridItem>
    </>
  );
};

export default Dashboard;
