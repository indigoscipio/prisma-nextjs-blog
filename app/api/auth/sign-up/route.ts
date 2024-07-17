import prisma from "@/app/lib/db";
import { NextResponse } from "@/node_modules/next/server";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";

export async function POST(req: Request) {
  const body = await req.json();
  console.log(body);

  //check if email already exists
  const existingUser = await prisma.user.findUnique({
    where: {
      email: body.email,
    },
  });

  if (existingUser) {
    return NextResponse.json(
      { message: `Email already used! Please use a different one` },
      { status: 400 }
    );
  }

  const user = await prisma.user.create({
    data: {
      id: uuidv4(),
      name: body.name,
      email: body.email,
      password: await bcrypt.hash(body.password, 10),
    },
  });

  const { password, ...newUserWithoutPassword } = user;
  console.log(user);
  return NextResponse.json({ message: `User Created!` }, { status: 200 });
}
