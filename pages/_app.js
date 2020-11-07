import "../styles/globals.css";
import { ChakraProvider, ThemeProvider } from "@chakra-ui/core";
import { AuthProvider } from "../contexts/auth";
import { theme } from "@chakra-ui/core";

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </ChakraProvider>
  );
}

export default MyApp;
