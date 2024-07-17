import React from "react";
import { getServerSession } from "next-auth/next";
import { PrismaClient } from "@prisma/client";
import { authOptions } from "@/app/lib/authOptions";
import { redirect } from "next/navigation";

const prisma = new PrismaClient();

type Props = {};

const Homepage = async (props: Props) => {
  return <div>Homepage</div>;
};

export default Homepage;
