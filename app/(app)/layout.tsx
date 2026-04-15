"use client"

import { AppProvider } from '@/lib/app-context'
import { BottomNavigation } from '@/components/bottom-navigation'

export default function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AppProvider>
      <div className="min-h-screen bg-background pb-20">
        {children}
        <BottomNavigation />
      </div>
    </AppProvider>
  )
}
