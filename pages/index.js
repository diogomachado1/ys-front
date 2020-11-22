import {
  AspectRatio,
  Avatar,
  Badge,
  Flex,
  Image,
  Link,
  Stack,
  Text,
} from "@chakra-ui/core";
import LinkNext from "next/link";
import React, { useCallback, useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import api from "../services/api";

export default function Streams({ streams }) {
  return (
    <>
      <NavBar />
      <Flex
        justifyContent="center"
        flexWrap="wrap"
        p="4"
        bg="gray.600"
        minH="calc(100vh - 65px)"
      >
        {streams &&
          streams.map((stream) => (
            <LinkNext
              key={stream.username}
              href={`/streams/${stream.username}`}
            >
              <Link
                maxH="225px"
                maxW="300px"
                color="#f0f0f0"
                m="2"
                textDecoration="none"
                _hover={{
                  textDecoration: "none",
                }}
              >
                <Stack position="relative" w="300px">
                  <Badge
                    position="absolute"
                    variant="solid"
                    zIndex="200"
                    my="4"
                    mx="2"
                    colorScheme="red"
                  >
                    Live
                  </Badge>
                  <AspectRatio maxW="300px" w="100%" ratio={16 / 9}>
                    <Image src={stream.stream.streamThumbUrl} />
                  </AspectRatio>
                  <Flex alignItems="center" maxW="100%">
                    <Avatar border="2px solid #fff" src={stream.imageUrl} />
                    <Flex
                      ml="2"
                      maxW="240px"
                      flexDir="column"
                      justifyContent="center"
                      lineHeight="1.2"
                    >
                      <Text
                        textOverflow="ellipsis"
                        overflow="hidden"
                        whiteSpace="nowrap"
                      >
                        {stream.stream.streamTitle}
                      </Text>
                      <Text textOverflow="ellipsis" color="#c0c0c0">
                        {stream.username}
                      </Text>
                    </Flex>
                  </Flex>
                </Stack>
              </Link>
            </LinkNext>
          ))}
      </Flex>
    </>
  );
}

export async function getStaticProps() {
  const { data } = await api.get("pub/streams");
  // Pass post data to the page via props
  return { props: { streams: data }, revalidate: 10 };
}
