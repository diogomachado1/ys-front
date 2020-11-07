import { useRouter } from "next/router";
import { useAuth } from "./auth";

export const ProtectRoute = ({ children }) => {
  const router = useRouter();

  const { isAuthenticated, loading } = useAuth();
  console.log(!loading && !isAuthenticated);
  if (!loading && !isAuthenticated) {
    console.log("aa");
    router.push("/login");
  }
  if (loading || !isAuthenticated) {
    return <h1>Calma</h1>;
  }
  return children;
};
