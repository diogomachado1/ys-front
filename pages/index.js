import { Button } from "@chakra-ui/core";
import Head from "next/head";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Button type="submit" size="sm" variant="solid" variantColor="green">
        Login
      </Button>
    </div>
  );
}
