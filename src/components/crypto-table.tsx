"use client"

import Image from "next/image"
import { Skeleton } from "@/components/ui/skeleton"

interface CryptoDataRow {
  id: string
  name: string
  symbol: string
  icon: string
  price: number
  change24h: number
  marketCap: number
}

interface CryptoTableProps {
  data: CryptoDataRow[]
  loading: boolean
}

const formatPrice = (price: number): string => {
  if (price >= 1) {
    return `$${price.toFixed(2)}`
  }
  return `$${price.toFixed(6)}`
}

const formatMarketCap = (cap: number): string => {
  if (cap >= 1e9) {
    return `$${(cap / 1e9).toFixed(1)}B`
  }
  if (cap >= 1e6) {
    return `$${(cap / 1e6).toFixed(1)}M`
  }
  return `$${cap.toFixed(0)}`
}

export default function CryptoTable({ data, loading }: CryptoTableProps) {
  if (loading && data.length === 0) {
    return (
      <div className="bg-card rounded-lg border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-border bg-background">
              <tr>
                <th className="text-left px-6 py-4 font-semibold text-foreground">Coin</th>
                <th className="text-right px-6 py-4 font-semibold text-foreground">Price</th>
                <th className="text-right px-6 py-4 font-semibold text-foreground">24h Change</th>
                <th className="text-right px-6 py-4 font-semibold text-foreground">Market Cap</th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 8 }).map((_, i) => (
                <tr key={i} className="border-b border-border last:border-b-0 hover:bg-background/50 transition-colors">
                  <td className="px-6 py-4">
                    <Skeleton className="h-4 w-32" />
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Skeleton className="h-4 w-24 ml-auto" />
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Skeleton className="h-4 w-20 ml-auto" />
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Skeleton className="h-4 w-28 ml-auto" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )
  }

  if (data.length === 0) {
    return (
      <div className="bg-card rounded-lg border border-border p-12 text-center">
        <p className="text-muted-foreground text-lg">No data available</p>
      </div>
    )
  }

  return (
    <div className="bg-card rounded-lg border border-border overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="border-b border-border bg-background">
            <tr>
              <th className="text-left px-6 py-4 font-semibold text-foreground">Coin</th>
              <th className="text-right px-6 py-4 font-semibold text-foreground">Price</th>
              <th className="text-right px-6 py-4 font-semibold text-foreground">24h Change</th>
              <th className="text-right px-6 py-4 font-semibold text-foreground">Market Cap</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr
                key={row.id}
                className="border-b border-border last:border-b-0 hover:bg-background/50 transition-colors"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <Image 
                      src={row.icon} 
                      alt={row.name} 
                      width={32}
                      height={32}
                      className="w-8 h-8 rounded-full"
                    />
                    <div>
                      <p className="font-semibold text-foreground">{row.name}</p>
                      <p className="text-sm text-muted-foreground">{row.symbol}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-right font-semibold text-foreground">{formatPrice(row.price)}</td>
                <td className="px-6 py-4 text-right">
                  <div
                    className={`inline-flex items-center gap-1 px-3 py-1 rounded-md font-semibold text-sm ${
                      row.change24h >= 0 ? "bg-chart-1/20 text-chart-1" : "bg-destructive/20 text-destructive"
                    }`}
                  >
                    {row.change24h >= 0 ? "↑" : "↓"}
                    {Math.abs(row.change24h).toFixed(2)}%
                  </div>
                </td>
                <td className="px-6 py-4 text-right text-muted-foreground">{formatMarketCap(row.marketCap)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
