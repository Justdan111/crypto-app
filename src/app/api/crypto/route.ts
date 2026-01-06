import { NextResponse } from "next/server";

export async function GET() {
  try {
    const baseUrl = process.env.COINGECKO_BASE_URL ;
    
    const response = await fetch(
      `${baseUrl}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1`,
      {
        headers: {
          "Accept": "application/json",
        },
        next: { revalidate: 30 },
      }
    );

    if (!response.ok) {
      console.error("CoinGecko API error:", response.status, response.statusText);
      return NextResponse.json(
        { error: "Failed to fetch crypto data" },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("API route error:", error);
    return NextResponse.json(
      { error: "Failed to fetch crypto data" },
      { status: 500 }
    );
  }
}
