import { Container, Flex } from "@chakra-ui/core";
import { useRef } from "react";
import ReactPlayer from "react-player";
import { ProtectRoute } from "../../contexts/protectedRoute";

export default function Home(props) {
  return (
    <ProtectRoute>
      <Flex h="100%">
        <ReactPlayer
          controls={true}
          playing={true}
          url={`http://localhost:8000/game/${props.id}_720.flv`}
        />
      </Flex>
    </ProtectRoute>
  );
}

export async function getStaticPaths() {
  return { paths: ["/streams/*"], fallback: true };
}

export async function getStaticProps({ params }) {
  // Pass post data to the page via props
  return { props: { id: params.id } };
}
