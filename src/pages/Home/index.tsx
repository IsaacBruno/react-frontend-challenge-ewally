import React, { FC, useEffect, useState } from 'react';
import {
  Flex,
  Box,
  Text,
  Button,
  Table,
  Tbody,
  Tr,
  Td
} from '@chakra-ui/react';
import DatePicker from 'react-date-picker';
import { Account, getBalance } from '../../services/accounts';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

const Home: FC = () => {
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    getBalance().then((account: Account) => setBalance(account.balance));

    // @ts-ignore
    // const ctx = window.document.getElementById('myChart').getContext('2d');
    // new Chart(ctx, {
    //   type: 'bar',
    //   data: {
    //     labels: ['', '', '', ''],
    //     datasets: [{
    //       label: 'entrada',
    //       data: [4, 6, 0, 6],
    //       backgroundColor: [
    //         'rgba(201, 201, 201, 0.2)'
    //       ],
    //       borderWidth: 1
    //     }, {
    //       label: 'saída',
    //       data: [-2, 0, -6, -3],
    //       backgroundColor: [
    //         'rgba(80, 78, 78, 0.623)'
    //       ],
    //       borderWidth: 1
    //     }]
    //   },
    //   options: {
    //     scales: {
    //       y: {
    //         beginAtZero: true
    //       }
    //     }
    //   }
    // });
  }, []);

  return (
    <Flex>
      <Box w="150px" p="4" bg="tomato">
        <Text>Saldo:</Text>
        <Text>R$ {String(balance/100).replace('.', ',')}</Text>
      </Box>

      <Box flex="1" p="4">
        <Flex>
          <Box mr="4">Extrato:</Box>
          <Box mr="4">
            <DatePicker />
          </Box>
          <Box mr="4">
            <DatePicker />
          </Box>
          <Box>
            <Button colorScheme="blue" variant="outline">
              Pesquisar
            </Button>
          </Box>
        </Flex>

        {/* <canvas id="myChart"></canvas> */}

        <Table variant="simple" mt="5">
          <Tbody>
            <Tr>
              <Td>{`{Data}`}</Td>
              <Td>Pagamento de boleto</Td>
              <Td>- R$ 100,00</Td>
            </Tr>
            <Tr>
              <Td>{`{Data}`}</Td>
              <Td>Depósito</Td>
              <Td>+ R$ 200,00</Td>
            </Tr>
            <Tr>
              <Td>{`{Data}`}</Td>
              <Td>Compra com cartão</Td>
              <Td>- R$ 300,00</Td>
            </Tr>
          </Tbody>
        </Table>
      </Box>
    </Flex>
  )
};

export default Home;
