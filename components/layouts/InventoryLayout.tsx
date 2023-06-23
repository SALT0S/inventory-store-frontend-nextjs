import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";
import { Navbar } from "../navbar/Navbar";
import { Footer } from "../ui/Footer";

interface InventoryLayoutProps {
  children: React.ReactNode;
}

export const InventoryLayout: React.FC<InventoryLayoutProps> = ({
  children,
}) => {
  const { data: session, status } = useSession();
  const loading = status === "loading";
  const router = useRouter();

  if (!loading && !session) {
    router
      .push("/auth/login")
      .then(() => {})
      .catch(console.error);
    return null;
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="container mx-auto max-w-7xl flex-[1_0_auto] px-4 sm:px-6 lg:px-8 my-10">
        {children}
      </main>

      <Footer />
    </div>
  );
};
