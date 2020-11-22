import {
  Avatar,
  Badge,
  Button,
  Container,
  Flex,
  Heading,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/core";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { useState } from "react";
import ReactPlayer from "react-player";
import NavBar from "../../components/NavBar";
import api from "../../services/api";

export default function Home({ stream, isNotFound }) {
  const [resolution, setResolution] = useState("720");
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
        {isNotFound === true && (
          <Heading color="#f0f0f0" size="3xl">
            Stream Not Found
          </Heading>
        )}
        {stream && !isNotFound && (
          <Flex maxW="100%" flexDir="column">
            {stream.inLive ? (
              <Flex position="relative">
                <Menu m="2" ml="auto">
                  <MenuButton
                    position="absolute"
                    zIndex="30"
                    colorScheme="green"
                    m="2"
                    ml="auto"
                    as={Button}
                  >
                    <ChevronDownIcon />
                  </MenuButton>
                  <MenuList position="absolute">
                    <MenuItem onClick={() => setResolution("1080")}>
                      1080p
                    </MenuItem>

                    <MenuItem onClick={() => setResolution("720")}>
                      720p
                    </MenuItem>

                    <MenuItem onClick={() => setResolution("480")}>
                      480p
                    </MenuItem>
                    <MenuItem onClick={() => setResolution("360")}>
                      360p
                    </MenuItem>
                  </MenuList>
                </Menu>
                <ReactPlayer
                  width="auto"
                  height="auto"
                  style={{ maxHeight: "70vh" }}
                  controls={true}
                  playing={true}
                  url={`http://localhost:8000/live/${stream.username}_${resolution}.flv`}
                />
              </Flex>
            ) : (
              <Heading>The stream is offline now</Heading>
            )}
            <Flex alignItems="center" my="4" maxW="100%">
              <Avatar border="2px solid #fff" src={stream.imageUrl} />
              <Flex
                ml="2"
                flexDir="column"
                justifyContent="center"
                maxW="calc(100% - 50px)"
                lineHeight="1.2"
              >
                <Text
                  textOverflow="ellipsis"
                  overflow="hidden"
                  color="#f0f0f0"
                  fontSize="3xl"
                  whiteSpace="nowrap"
                >
                  {stream.stream.streamTitle}
                  <Badge
                    variant="solid"
                    zIndex="200"
                    mb="1"
                    mx="2"
                    colorScheme="red"
                  >
                    Live
                  </Badge>
                </Text>
                <Text textOverflow="ellipsis" color="#c0c0c0">
                  {stream.username}
                </Text>
              </Flex>
            </Flex>
          </Flex>
        )}
      </Flex>
    </>
  );
}

export async function getStaticPaths() {
  return { paths: ["/streams/*"], fallback: true };
}

export async function getStaticProps({ params }) {
  try {
    const { data } = await api.get(`pub/streams/${params.id}`);
    // Pass post data to the page via props
    return { props: { stream: data }, revalidate: 10 };
  } catch (error) {
    return {
      props: { stream: null, isNotFound: true },
      revalidate: 10,
    };
  }
}
