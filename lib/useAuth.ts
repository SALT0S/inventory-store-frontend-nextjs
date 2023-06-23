import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useSWR from "swr";
import axios from "./axios";

// @ts-ignore
export const useAuth = ({ middleware } = {}) => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const {
    data: user,
    error,
    mutate,
  } = useSWR("/user", () =>
    axios.get("/user").then((response) => response.data.data)
  );

  useEffect(() => {
    if (user || error) {
      setIsLoading(false);
    }

    if (middleware == "guest" && user) router.push("/");
    if (middleware == "auth" && !user && error) router.push("/auth");
  }, [error, middleware, router, user]);

  const csrf = () => axios.get("/v1/sanctum/csrf-cookie");

  // @ts-ignore
  const login = async ({ setErrors, ...props }) => {
    setErrors([]);

    await csrf();

    axios
      .post("/login", props)
      .then((response) => {
        mutate(response.data.data);
        router.push("/");
      })
      .catch((error) => {
        if (error.response.status !== 422) throw error;

        setErrors(Object.values(error.response.data.errors).flat());
      });
  };

  const logout = async () => {
    await axios.post("/logout");
    await mutate(null);
    await router.push("/login");
  };

  return {
    user,
    csrf,
    login,
    logout,
    isLoading,
  };
};
