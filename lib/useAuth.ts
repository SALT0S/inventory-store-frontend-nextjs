import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useSWR from "swr";
import axios from "./axios";

interface LoginProps {
  setErrors: (errors: string[]) => void;
  email: string;
  password: string;
  remember: boolean;
}

interface UseAuthOptions {
  middleware?: "guest" | "auth";
}

export default function useAuth({ middleware }: UseAuthOptions = {}) {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user || error) {
      setIsLoading(false);
    }

    if (middleware === "guest" && user) router.push("/");
    if (middleware === "auth" && !user && error) router.push("/login");
  });

  const {
    data: user,
    error,
    mutate,
  } = useSWR("/user", () =>
    axios.get("/user").then((response) => response.data.data)
  );

  const csrf = () => axios.get("/sanctum/csrf-cookie");

  const login = async ({ setErrors, ...props }: LoginProps) => {
    setErrors([]);

    await csrf();

    axios
      .post("/login", props)
      .then(() => {
        mutate();
        router.push("/");
      })
      .catch((error) => {
        if (error.response.status !== 422) throw error;

        setErrors(Object.values(error.response.data.errors).flat().map(String));
      });
  };

  const logout = async () => {
    await axios.post("/logout");

    mutate(null);

    router.push("/login");
  };

  return {
    user,
    csrf,
    login,
    logout,
    isLoading,
  };
}
