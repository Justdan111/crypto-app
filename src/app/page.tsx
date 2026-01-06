"use client"

import { useState, useEffect } from "react"
import CryptoTable from "@/components/crypto-table"
import DashboardHeader from "@/components/dashboard-header"

interface CryptoData {
  id: string
  name: string
  symbol: string
  icon: string
  price: number
  change24h: number
  marketCap: number
}

export default function Home() {
  const [cryptoData, setCryptoData] = useState<CryptoData[]>([])
  const [loading, setLoading] = useState(true)
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date())

  const fetchCryptoData = async () => {
    setLoading(true)
    try {
      const response = await fetch(
        "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,cardano,solana,polkadot,ripple,litecoin,dogecoin&vs_currencies=usd&include_24hr_change=true&include_market_cap=true",
      )
      const data = await response.json()

      const coins = [
        { id: "bitcoin", name: "Bitcoin", symbol: "BTC", icon: "₿" },
        { id: "ethereum", name: "Ethereum", symbol: "ETH", icon: "Ξ" },
        { id: "cardano", name: "Cardano", symbol: "ADA", icon: "₳" },
        { id: "solana", name: "Solana", symbol: "SOL", icon: "◎" },
        { id: "polkadot", name: "Polkadot", symbol: "DOT", icon: "●" },
        { id: "ripple", name: "Ripple", symbol: "XRP", icon: "✕" },
        { id: "litecoin", name: "Litecoin", symbol: "LTC", icon: "Ł" },
        { id: "dogecoin", name: "Dogecoin", symbol: "DOGE", icon: "🐕" },
      ]

      const formatted = coins.map((coin) => ({
        id: coin.id,
        name: coin.name,
        symbol: coin.symbol,
        icon: coin.icon,
        price: data[coin.id]?.usd || 0,
        change24h: data[coin.id]?.usd_24h_change || 0,
        marketCap: data[coin.id]?.usd_market_cap || 0,
      }))

      setCryptoData(formatted)
      setLastUpdate(new Date())
    } catch (error) {
      console.error("Failed to fetch crypto data:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCryptoData()
  }, [])

  return (
    <main className="min-h-screen bg-background">
      <DashboardHeader lastUpdate={lastUpdate} onRefresh={fetchCryptoData} />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <CryptoTable data={cryptoData} loading={loading} />
      </div>
    </main>
  )
}
