"use client"

import CryptoTable from "@/components/crypto-table"
import DashboardHeader from "@/components/dashboard-header"
import { useCrypto } from "@/utils/useCrypto"

export default function Home() {
  const { data, isLoading, error, refetch, dataUpdatedAt } = useCrypto();

  const transformedData = data?.map((coin) => ({
    id: coin.id,
    name: coin.name,
    symbol: coin.symbol.toUpperCase(),
    icon: coin.image,
    price: coin.current_price,
    change24h: coin.price_change_percentage_24h,
    marketCap: coin.market_cap,
  })) ?? [];

  const lastUpdate = new Date(dataUpdatedAt);

  if (error) {
    return (
      <main className="min-h-screen bg-background">
        <DashboardHeader lastUpdate={lastUpdate} onRefresh={refetch} />
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="bg-destructive/10 border border-destructive rounded-lg p-6 text-center">
            <p className="text-destructive font-medium">Failed to load crypto data. Please try again.</p>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background">
      <DashboardHeader lastUpdate={lastUpdate} onRefresh={refetch} />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <CryptoTable data={transformedData} loading={isLoading} />
      </div>
    </main>
  )
}
