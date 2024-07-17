import prisma from "@/app/lib/db";
import { NextResponse } from "next/server";

export async function DELETE(req: Request) {
  const { id } = await req.json();

  await prisma.todo.delete({
    where: {
      id: id,
    },
  });
  return NextResponse.json({ message: "Deleted Item" }, { status: 200 });
}

export async function PATCH(req: Request) {
  const { id, isCompleted, content } = await req.json();

  await prisma.todo.update({
    where: {
      id: id,
    },
    data: {
      isCompleted: isCompleted,
      content,
    },
  });
  return NextResponse.json({ message: "Todo Updated" }, { status: 200 });
}
