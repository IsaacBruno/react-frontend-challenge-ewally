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
import { Account, getBalance, Statement, getStatements } from '../../services/accounts';
import { Chart, registerables } from 'chart.js';
import { dateToStr } from '../helpers/date-helper';
Chart.register(...registerables);

const Home: FC = () => {
  const [balance, setBalance] = useState<number>(0);
  const [statements, setStatements] = useState<Statement[]>([]);
  const [initialDate, setInitialDate] = useState(new Date());
  const [finalDate, setFinalDate] = useState(new Date());

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

  const handleClick = () => {
    getStatements(dateToStr(initialDate), dateToStr(finalDate)).then((stats: Statement[]) => setStatements(stats));
  };

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
            <DatePicker
              format="dd-MM-yyyy"
              onChange={(value: Date) => {
                setInitialDate(value);
              }}
              value={initialDate}
            />
          </Box>
          <Box mr="4">
            <DatePicker
              format="dd-MM-yyyy"
              onChange={(value: Date) => {
                setFinalDate(value);
              }}
              value={finalDate}
            />
          </Box>
          <Box>
            <Button colorScheme="blue" variant="outline" onClick={handleClick}>
              Pesquisar
            </Button>
          </Box>
        </Flex>

        {/* <canvas id="myChart"></canvas> */}

        {statements.length === 0
          ? <div>Informe as datas de início e fim, depois clique em pesquisar.</div>
          : (
              <Table variant="simple" mt="5">
                <Tbody>
                  {statements.map((statement: Statement) => (
                    <Tr>
                      <Td>{statement.createdAt}</Td>
                      <Td>{statement.description}</Td>
                      <Td>- R$ {String(statement.balance/100).replace('.', ',')}</Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            )
        }
      </Box>
    </Flex>
  )
};

export default Home;
