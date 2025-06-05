import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";

export const TokenSaver = () => {
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();

  useEffect(() => {
    const storeToken = async () => {
      if (isAuthenticated) {
        try {
          const token = await getAccessTokenSilently();
          if (token) {
            localStorage.setItem("auth_token", token);
          }
        } catch (error) {
          console.error("Eroare la obținerea token-ului:", error);
        }
      }
    };

    storeToken();
  }, [isAuthenticated, getAccessTokenSilently]);

  return null;
};
