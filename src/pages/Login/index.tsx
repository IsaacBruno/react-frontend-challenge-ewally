import React, { FC } from 'react';
import {
  Flex,
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  FormErrorMessage
} from '@chakra-ui/react';
import {
  Formik,
  Form,
  Field,
  FieldInputProps,
  FormikState
} from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../../contexts/auth';

const LoginSchema = Yup.object().shape({
  username: Yup.string()
    .required('Campo obrigatório'),
  password: Yup.string()
    .min(6, 'Deve ter pelo menos 6 caracteres')
    .required('Campo obrigatório')
});

interface FormValues {
  username: string;
  password: string;
}

const Login: FC = () => {
  const { signIn } = useAuth();
  const initialValues: FormValues = { username: '', password: '' };

  return (
    <Flex width="full" align="center" justifyContent="center">
      <Box p={8} maxWidth="500px" borderWidth={1} borderRadius={8} boxShadow="lg">
        <Box textAlign="center">
          <Heading>Login</Heading>
        </Box>
        <Box my={4} textAlign="center">
          <Formik
            initialValues={initialValues}
            validationSchema={LoginSchema}
            onSubmit={async (values, actions) => {
              console.log({ values, actions });
              signIn();
              actions.setSubmitting(false);
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <Field name="username">
                  {({ field, form }: {
                    field: FieldInputProps<any>;
                    form: FormikState<any>;
                  }) => (
                    <FormControl isInvalid={!!form.touched.username && !!form.errors.username}>
                      <FormLabel htmlFor="username">Nome de Usuário</FormLabel>
                      <Input {...field} id="username" placeholder="johndoe" />
                      <FormErrorMessage>{form.errors.username}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>

                <Field name="password" type="password">
                  {({ field, form }: {
                    field: FieldInputProps<any>;
                    form: FormikState<any>;
                  }) => (
                    <FormControl mt={6} isInvalid={!!form.touched.password && !!form.errors.password}>
                      <FormLabel htmlFor="password">Senha</FormLabel>
                      <Input type="password" {...field} id="password" placeholder="********" />
                      <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Button
                  width="full"
                  mt={4}
                  type="submit"
                  variant="outline"
                  colorScheme="teal"
                  isLoading={isSubmitting}
                >
                  Entrar
                </Button>
              </Form>
            )}
          </Formik>
        </Box>
      </Box>
    </Flex>
  )
};

export default Login;
