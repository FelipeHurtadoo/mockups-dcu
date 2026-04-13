"use client"

import { AuthProvider } from '@/lib/auth-context'
import { AppProvider } from '@/lib/app-context'
import { BottomNavigation } from '@/components/bottom-navigation'

export default function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthProvider>
      <AppProvider>
        <div className="min-h-screen bg-background pb-20">
          {children}
          <BottomNavigation />
        </div>
      </AppProvider>
    </AuthProvider>
  )
}
