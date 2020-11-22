import { Box, Button, Flex, useClipboard, useToast } from "@chakra-ui/core";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import { ProtectRoute } from "../contexts/protectedRoute";
import api from "../services/api";
import * as yup from "yup";
import { useYupValidationResolver } from "../services/validator";
import { useForm } from "react-hook-form";
import Input from "../components/Input/input";
import { useAuth } from "../contexts/auth";

function Profile() {
  const auth = useAuth();
  const toast = useToast();
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(false);
  const { hasCopied, onCopy } = useClipboard(user && user.streamKey);

  const router = useRouter();
  const resolver = useYupValidationResolver(
    yup.object({
      name: yup.string().required("Required"),
    })
  );
  const { register, reset, handleSubmit, watch, errors } = useForm({
    resolver,
  });
  const getUser = useCallback(async () => {
    if (!auth.loading) {
      const { data } = await api.get("pvt/user");
      const value = {
        ...data,
        streamKey: `${data.username}?key=${data.streamKey}`,
      };
      reset(value);
      setUser(value);
    }
  }, [auth.loading]);
  useEffect(() => {
    getUser();
  }, [getUser]);

  const postProfile = useCallback(async (data) => {
    setLoading(true);
    await api.put("pvt/users", data);
    setLoading(false);
    toast({
      title: "Profile updated",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  }, []);

  const changeStreamKey = useCallback(
    async (data) => {
      setLoading(true);
      const {
        data: { streamKey },
      } = await api.put("pvt/newKey");
      const value = {
        ...user,
        streamKey: `${user.username}?key=${streamKey}`,
      };
      reset(value);
      setUser(value);
      toast({
        title: "Key updated",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      setLoading(false);
    },
    [user]
  );

  const onSubmit = (data) => {
    postProfile(data);
  };

  return (
    <ProtectRoute>
      <NavBar />
      <Flex
        justifyContent="center"
        flexWrap="wrap"
        p="4"
        bg="gray.600"
        minH="calc(100vh - 65px)"
        flexDirection="column"
        as="form"
        onSubmit={handleSubmit(onSubmit)}
      >
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
            isDisabled="true"
            my="1"
            mode="light"
            name="username"
            label="Username"
            type="text"
            register={register}
            error={errors}
          />
          <Flex justifyContent="center">
            <Input
              isDisabled="true"
              my="1"
              mode="light"
              name="streamKey"
              label="Stream Key"
              type="password"
              register={register}
              error={errors}
            />
            <Button colorScheme="red" onClick={onCopy} mt={7} ml={2}>
              {hasCopied ? "Copied" : "Copy"}
            </Button>
            <Button
              colorScheme="blue"
              isLoading={loading}
              onClick={changeStreamKey}
              mt={7}
              ml={2}
            >
              New StreamKey
            </Button>
          </Flex>
        </Box>
        <Flex w="100%" justify="space-between" mt="4">
          <Button
            isLoading={auth.loading || loading}
            ml="auto"
            type="submit"
            size="sm"
            colorScheme="green"
          >
            Salvar
          </Button>
        </Flex>
      </Flex>
    </ProtectRoute>
  );
}

export default Profile;
