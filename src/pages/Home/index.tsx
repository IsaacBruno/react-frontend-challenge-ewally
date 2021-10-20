import React, { FC, useEffect, useState } from 'react';
import {
  Flex,
  Box,
  Text,
  Button,
  Table,
  Tbody,
  Tr,
  Td,
  Spinner
} from '@chakra-ui/react';
import DatePicker from 'react-date-picker';
import { toast } from 'react-toastify';
import { Account, getBalance, Statement, getStatements } from '../../services/accounts';
import { Chart, registerables } from 'chart.js';
import { dateToStr } from '../helpers/date-helper';
import { useAuth } from '../../contexts/auth';
Chart.register(...registerables);

const Home: FC = () => {
  const { signOut } = useAuth();
  const [balance, setBalance] = useState<number>(0);
  const [statements, setStatements] = useState<Statement[]>([]);
  const [initialDate, setInitialDate] = useState(new Date());
  const [finalDate, setFinalDate] = useState(new Date());
  const [loading, setLoading] = useState(false);

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
    setLoading(true);
    getStatements(dateToStr(initialDate), dateToStr(finalDate))
      .then((stats: Statement[]) => {
        if (stats.length === 0) {
          toast.info('Nenhum registro de transação encontrado para a data informada');
        } else {
          setStatements(stats);
        }
      })
      .catch(err => {
        toast.error(
          err.response && err.response.data
            ? err.response.data.msg
            : { message: 'Não foi possível trazer os dados desse usuário' }
        );
      })
      .finally(() => setLoading(false));
  };

  const handleSignout = () => {
    signOut();
  };

  return (
    <Flex>
      <Box w="150px" p="4">
        <Text>Saldo:</Text>
        <Text>R$ {String(balance/100).replace('.', ',')}</Text>
        <Button colorScheme="teal" variant="outline" onClick={handleSignout}>
          Sair
        </Button>
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

        {loading ? (
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        ) : statements.length === 0
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
