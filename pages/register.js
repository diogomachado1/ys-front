import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Link,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/core";
import React, { useState } from "react";
import Input from "../components/Input/input";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useYupValidationResolver } from "../services/validator";
import api from "../services/api";
import { useRouter } from "next/router";
import { useAuth } from "../contexts/auth";

// import { Container } from './styles';

function Register() {
  const toast = useToast();
  const auth = useAuth();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const resolver = useYupValidationResolver(
    yup.object({
      name: yup.string().required().min(3),
      email: yup.string().required().email(),
      username: yup
        .string()
        .required()
        .lowercase()
        .matches(
          /^[a-zA-Z0-9_]{5,}[a-zA-Z]+[0-9]*$/,
          "You can use only alphanumeric characters"
        ),
      password: yup.string().required().min(8),
    })
  );
  const { register, handleSubmit, watch, errors } = useForm({ resolver });
  const onSubmit = async (data) => {
    try {
      setLoading(true);
      await api.post("/pub/users", data);
      toast({
        title: "Account created.",
        description: "We've created your account for you.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      setLoading(false);
      router.push("/login");
    } catch (error) {
      toast({
        title: "Error in created account.",
        description: "We've created your account for you.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      setLoading(false);
    }
  };
  if (auth.isAuthenticated) {
    router.push("/streams");
  }
  return (
    <Center background="gray.900" minH="100vh" h="100%" w="100vw" p="2">
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
        <Heading
          lineHeight="3rem"
          color="white"
          my="2"
          as="h1"
          size="2xl"
          isTruncated
        >
          Register
        </Heading>
        <Box w="100%" display="flex" flexDir="column">
          <Input
            my="1"
            mode="light"
            name="name"
            label="Name"
            type="text"
            register={register}
            error={errors}
          />
          <Input
            my="1"
            mode="light"
            name="username"
            label="Username"
            type="text"
            register={register}
            error={errors}
          />
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
            <Button
              type="submit"
              isLoading={loading}
              size="sm"
              colorScheme="blue"
            >
              Register
            </Button>
            <Button
              onClick={() => router.push("/login")}
              size="sm"
              colorScheme="purple"
            >
              Login
            </Button>
          </Stack>
        </Flex>
      </Center>
    </Center>
  );
}

export default Register;
