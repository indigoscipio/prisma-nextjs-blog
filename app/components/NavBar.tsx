import React from "react";
import ButtonSignIn from "./ButtonSignIn";
import Link from "next/link";
import { authOptions } from "@/app/lib/authOptions";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";

type Props = {};

const NavBar = async (props: Props) => {
  const session = await getServerSession(authOptions);

  return (
    <nav className="bg-gray-100 flex flex-row justify-between p-4">
      <Link href="/dashboard">
        <h2 className="font-semibold">MY TODOZ</h2>
      </Link>
      <div className="flex gap-4">
        {session ? (
          ""
        ) : (
          <Link href="sign-up">
            <button>Sign Up</button>
          </Link>
        )}

        <ButtonSignIn />
      </div>
    </nav>
  );
};

export default NavBar;
