import React from "react";
import Header from "@/components/header";
import { useIsAuth } from "@/utils/useIsAuth";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  if (!useIsAuth()) {
    return <>Loading...</>;
  }

  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default MainLayout;
