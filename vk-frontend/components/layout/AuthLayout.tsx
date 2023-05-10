import React from "react";
import { useLoginIsAuth } from "@/utils/useIsAuth";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  if (!useLoginIsAuth()) {
    return (
      <>
        <h1>Redirect...</h1>
      </>
    );
  }

  return <>{children}</>;
};

export default AuthLayout;
