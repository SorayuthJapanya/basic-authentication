import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

const STATUS = ["PENDING", "IN_PROCESS", "COMPLETED"];

export async function GET() {
  try {
    const authUser = await getCurrentUser();
    if (!authUser) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // get todos
    const todos = await prisma.todo.findMany({
      where: { authorId: authUser.id },
    });

    return NextResponse.json(todos);
  } catch (error) {
    console.error("Error in GET todo route: ", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    // get user
    const authUser = await getCurrentUser();
    if (!authUser) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // validate the data
    const { title } = await req.json();
    if (!title) {
      return NextResponse.json(
        { message: "Please fill all the fields" },
        { status: 400 }
      );
    }

    // create todo
    const newTodo = await prisma.todo.create({
      data: {
        title,
        authorId: authUser.id,
      },
    });

    // return response
    return NextResponse.json(
      {
        newTodo,
        message: "Todo created successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error in POST todo route: ", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  try {
    // get user
    const authUser = await getCurrentUser();
    if (!authUser) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // validate the data
    const { taskId, title, status } = await req.json();

    const formatedStatus = status.toUpperCase();

    if (!STATUS.includes(formatedStatus)) {
      return NextResponse.json({ message: "Invalid status" }, { status: 400 });
    }

    // get todo
    const todo = await prisma.todo.findUnique({
      where: { id: taskId },
    });

    // access control
    if (authUser.id !== todo?.authorId) {
      return NextResponse.json(
        { message: "You are not authorized to update this todo" },
        { status: 401 }
      );
    }

    // update todo
    const updatedTodo = await prisma.todo.update({
      where: { id: taskId },
      data: {
        title,
        status: formatedStatus,
      },
    });

    return NextResponse.json(
      { updatedTodo, message: "Todo updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in PUT todo route: ", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    // get user
    const authUser = await getCurrentUser();
    if (!authUser) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // validate the data
    const { taskId } = await req.json();

    // get todo
    const todo = await prisma.todo.findUnique({
      where: { id: taskId },
    });

    // access control
    if (authUser.id !== todo?.authorId) {
      return NextResponse.json(
        { message: "You are not authorized to update this todo" },
        { status: 401 }
      );
    }

    // update todo
    const deleteTodo = await prisma.todo.delete({
      where: { id: taskId },
    });

    return NextResponse.json(
      { deleteTodo, message: "Todo deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in DELETE todo route: ", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
