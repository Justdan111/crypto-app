import { NextResponse } from "next/server";

export async function GET() {
  const response = await fetch(
    `${process.env.COINGECKO_BASE_URL}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1`
  );

  if (!response.ok) {
    return NextResponse.json(
      { error: "Failed to fetch crypto data" },
      { status: 500 }
    );
  }

  const data = await response.json();
  return NextResponse.json(data);
}
