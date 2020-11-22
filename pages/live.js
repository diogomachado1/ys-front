import { Box, Button, Flex, useToast } from "@chakra-ui/core";
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
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const resolver = useYupValidationResolver(
    yup.object({
      stream: yup.object().shape({
        streamTitle: yup.string(),
      }),
    })
  );
  const { register, reset, handleSubmit, watch, errors } = useForm({
    resolver,
  });
  const getUser = useCallback(async () => {
    if (!auth.loading) {
      const { data } = await api.get("pvt/user");
      reset(data);
      setUser(data);
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
      title: "Stream updated",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  }, []);

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
            name="stream.streamTitle"
            label="Stream Title"
            type="text"
            register={register}
            error={errors}
          />
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
