import prisma from "@/app/lib/db";
import bcrypt from "bcrypt";
import { NextResponse } from "@/node_modules/next/server";
import { redirect } from "next/navigation";

export async function POST(req: Request) {
  const body = await req.json();

  const user = await prisma.user.findFirst({
    where: {
      email: body.email,
    },
  });

  if (!user) {
    return NextResponse.json(
      { message: `Invalid email or password` },
      { status: 401 }
    );
  }

  if (user && (await bcrypt.compare(body.password, user.password))) {
    const { password, ...userWithoutPass } = user;

    return new Response(JSON.stringify(userWithoutPass));
  } else {
    return NextResponse.json(
      { message: `Password do not match` },
      { status: 401 }
    );
  }
}
