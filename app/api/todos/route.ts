import prisma from "@/app/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const data = await prisma.todo.findMany();
  console.log(data);
  return NextResponse.json({ message: "Get all todos" }, { status: 200 });
}

export async function POST(req: Request) {
  try {
    const { content, session } = await req.json();

    const newTodo = await prisma.todo.create({
      data: {
        content,
        isCompleted: false,
        authorId: session.user.id,
      },
    });

    console.log(newTodo);
    return NextResponse.json({ message: "Created Todo" }, { status: 200 });
  } catch (error) {
    console.error("Error creating todo:", error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
