import SignUpForm from "@/app/components/SignUpForm";
import { authOptions } from "@/app/lib/authOptions";
import React from "react";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";

type Props = {};

const SignUpPage = async (props: Props) => {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/dashboard");
  }

  return (
    <main className="container mx-auto p-4">
      <h1 className="font-semibold text-2xl">Let's Sign Up</h1>
      <SignUpForm />
    </main>
  );
};

export default SignUpPage;
