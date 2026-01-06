"use client"

import { Button } from "@/components/ui/button"
import { RefreshCw } from "lucide-react"

interface DashboardHeaderProps {
  lastUpdate: Date
  onRefresh: () => void
}

export default function DashboardHeader({ lastUpdate, onRefresh }: DashboardHeaderProps) {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    })
  }

  return (
    <header className="border-b border-border bg-card">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Crypto Dashboard</h1>
            <p className="text-sm text-muted-foreground mt-1">Last updated: {formatTime(lastUpdate)}</p>
          </div>
          <Button onClick={onRefresh} variant="outline" size="lg" className="gap-2 bg-transparent">
            <RefreshCw className="w-4 h-4" />
            Refresh
          </Button>
        </div>
      </div>
    </header>
  )
}
