import { getProductById } from "@/lib/api";
import { NextResponse } from "next/server";
export async function GET(_, { params }) {
  const { slug } = await params;
  const product = await getProductById(slug);
  if (!product) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(product);
}
