import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  context: { params: Promise<{ taskId: string }> }
) {
  try {
    const { taskId } = await context.params;
    if (!taskId) {
      return NextResponse.json({ message: "Task not found" }, { status: 400 });
    }

    const todo = await prisma.todo.findUnique({
      where: { id: taskId },
    });
    if (!todo) {
      return NextResponse.json({ message: "Task not found" }, { status: 400 });
    }

    const authUser = await getCurrentUser();

    if (authUser?.id !== todo?.authorId) {
      return NextResponse.json(
        { message: "You are not authorized to view this todo" },
        { status: 401 }
      );
    }

    return NextResponse.json(todo);
  } catch (error) {
    console.error("Error in GET todo route: ", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
