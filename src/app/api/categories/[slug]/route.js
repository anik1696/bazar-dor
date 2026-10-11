import { getCategoryBySlug } from "@/lib/api";
import { NextResponse } from "next/server";
export async function GET(_, { params }) {
  const { slug } = await params;
  const cat = await getCategoryBySlug(slug);
  if (!cat) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(cat);
}
