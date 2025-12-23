import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    const cookiesStore = await cookies();
    if (cookiesStore.get("token")) {
      cookiesStore.delete("token");
      return NextResponse.json({ message: "Logout successful" });
    } else {
      return NextResponse.json({ message: "Already logged out" });
    }
  } catch (error) {
    console.error("Error in logout route: ", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
