import { NextResponse } from "next/server";
import { getSystemDetails } from "@/lib/system";

export async function GET() {
  const details = await getSystemDetails();
  return NextResponse.json(details);
}
