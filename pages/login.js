import {
  Box,
  Button,
  ButtonGroup,
  Center,
  Container,
  Flex,
  Link,
  Stack,
  Text,
  useTheme,
} from "@chakra-ui/core";
import React, { useCallback, useEffect } from "react";
import Input from "../components/Input/input";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useYupValidationResolver } from "../services/validator";
import { useAuth } from "../contexts/auth";
import { useRouter } from "next/router";

// import { Container } from './styles';

function Login() {
  const auth = useAuth();
  const router = useRouter();
  const resolver = useYupValidationResolver(
    yup.object({
      email: yup.string().required("Required"),
      password: yup.string().required("Required"),
    })
  );
  const { register, handleSubmit, watch, errors } = useForm({ resolver });
  const onSubmit = (data) => {
    auth.login(data.email, data.password);
  };
  if (auth.isAuthenticated) {
    router.push("/streams");
  }
  return (
    <Center background="gray.900" h="100vh" w="100vw" p="2">
      <Center
        background="green.500"
        w="300px"
        p="5"
        minH="300px"
        borderRadius="5px"
        flexDirection="column"
        as="form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Text color="white" m="2" fontSize="2xl">
          Login
        </Text>
        <Box w="100%" display="flex" flexDir="column">
          <Input
            my="1"
            mode="light"
            name="email"
            label="Email"
            type="email"
            register={register}
            error={errors}
          />
          <Input
            my="1"
            mode="light"
            name="password"
            label="Password"
            type="password"
            register={register}
            error={errors}
          />
        </Box>
        <Flex w="100%" justify="space-between" mt="4">
          <Stack>
            <Link
              whiteSpace="pre-wrap"
              w="130px"
              variant="link"
              size="sm"
              color="white"
            >
              Forgot your password?
            </Link>
          </Stack>
          <Stack>
            <Button type="submit" size="sm" colorScheme="purple">
              Login
            </Button>
            <Button
              onClick={() => router.push("/register")}
              size="sm"
              colorScheme="blue"
            >
              Register
            </Button>
          </Stack>
        </Flex>
      </Center>
    </Center>
  );
}

export default Login;
