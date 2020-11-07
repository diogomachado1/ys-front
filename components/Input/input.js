import React, { useEffect } from "react";
import {
  FormControl,
  Input as ChakraInput,
  FormHelperText,
  FormLabel,
  DarkMode,
  FormErrorMessage,
} from "@chakra-ui/core";

function Input({
  name,
  type,
  label,
  helpText,
  mode,
  error,
  register,
  ...props
}) {
  const theme = mode || "dark";
  const errorMessage = error && error[name] && error[name].message;
  useEffect(() => console.log(error), [error]);

  return (
    <FormControl isInvalid={!!errorMessage} {...props}>
      <FormLabel
        color={theme === "dark" ? "#1a202c" : "#fff"}
        m="0"
        htmlFor={name}
      >
        {label}
      </FormLabel>
      <ChakraInput
        ref={register}
        color={theme === "dark" ? "#1a202c" : "#fff"}
        type={type}
        id={name}
        name={name}
        aria-describedby={`${name}-helper-text`}
      />
      <FormHelperText id={`${name}-helper-text`}>{helpText}</FormHelperText>
      <FormErrorMessage m="0" color="red.300">
        {errorMessage}
      </FormErrorMessage>
    </FormControl>
  );
}

export default Input;
