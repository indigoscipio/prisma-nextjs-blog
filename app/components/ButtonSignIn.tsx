"use client";
import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";

type Props = {};

const ButtonSignIn = (props: Props) => {
  const { data: session, status } = useSession();

  if (session && session.user) {
    return (
      <>
        <p>Signed in as {session.user.email}</p>
        <button onClick={() => signOut()}>Sign Out</button>
      </>
    );
  }

  return (
    <button
      onClick={() => signIn("Credentials", { callbackUrl: "/dashboard" })}
      className="font-semibold text-blue-500"
    >
      Sign In
    </button>
  );
};

export default ButtonSignIn;
