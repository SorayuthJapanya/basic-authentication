import { checkingDatabaseConnection } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const isConnected = await checkingDatabaseConnection();
  if (isConnected) {
    return NextResponse.json({ message: "Database is connected" });
  } else {
    return NextResponse.json({ message: "Database is not connected" });
  }
}
