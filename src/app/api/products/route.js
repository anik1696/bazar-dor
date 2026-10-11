import { getAllProducts, getProductsByCategory } from "@/lib/api";
import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");

  if (category) {
    const products = await getProductsByCategory(category);
    return NextResponse.json(products);
  }

  const allProducts = await getAllProducts();
  return NextResponse.json(allProducts);
}
