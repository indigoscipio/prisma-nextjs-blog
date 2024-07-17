import SignInForm from "@/app/components/SignInForm";
import React from "react";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/lib/authOptions";

type Props = {};

const SignInPage = async (props: Props) => {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/dashboard");
  }

  return (
    <div className="container mx-auto p-4">
      <h1>Let's Sign In</h1>
      <SignInForm />
    </div>
  );
};

export default SignInPage;
