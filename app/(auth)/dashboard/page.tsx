import Dashboard from "@/app/components/Dashboard";
import { getServerSession } from "next-auth/next";
import { PrismaClient } from "@prisma/client";
import { authOptions } from "@/app/lib/authOptions";
import { redirect } from "next/navigation";

const prisma = new PrismaClient();

type Props = {};

const DashboardPage = async (props: Props) => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/");
  }

  const todos = await prisma.todo.findMany({
    where: {
      authorId: session.user.id,
    },
  });

  return (
    <div>
      <Dashboard todos={todos} session={session} />
    </div>
  );
};

export default DashboardPage;
