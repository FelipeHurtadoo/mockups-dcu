"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { MapView } from '@/components/map-view'
import { useApp } from '@/lib/app-context'
import { useAuth } from '@/lib/auth-context'
import { mockFrequentRoutes, mockNotifications, mockWeather } from '@/lib/mock-data'
import { 
  Search, 
  MapPin, 
  Home, 
  Briefcase, 
  GraduationCap,
  Cloud,
  Bell,
  AlertTriangle,
  Clock,
  ChevronRight,
  Car
} from 'lucide-react'

const routeIcons: Record<string, React.ElementType> = {
  'Casa': Home,
  'Universidad': GraduationCap,
  'Trabajo': Briefcase,
}

export default function HomePage() {
  const router = useRouter()
  const { startTrip, nearbyDrivers } = useApp()
  const { user } = useAuth()
  const [destination, setDestination] = useState('')
  const [showNotifications, setShowNotifications] = useState(false)
  
  const unreadNotifications = mockNotifications.filter(n => !n.read).length

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (destination.trim()) {
      startTrip('Ubicación actual', destination)
      router.push('/trip/confirm')
    }
  }

  const handleFrequentRoute = (route: typeof mockFrequentRoutes[0]) => {
    startTrip(route.origin, route.destination)
    router.push('/trip/confirm')
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border px-4 py-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-sm text-muted-foreground">Hola,</p>
            <h1 className="text-xl font-bold text-foreground">{user?.name.split(' ')[0] || 'Usuario'}</h1>
          </div>
          <div className="flex items-center gap-3">
            {/* Clima */}
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Cloud className="w-5 h-5" />
              <span>{mockWeather.temperature}°C</span>
            </div>
            {/* Notificaciones */}
            <button 
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 rounded-full hover:bg-secondary transition-colors"
            >
              <Bell className="w-6 h-6 text-foreground" />
              {unreadNotifications > 0 && (
                <span className="absolute top-0 right-0 w-5 h-5 bg-destructive text-destructive-foreground text-xs rounded-full flex items-center justify-center">
                  {unreadNotifications}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Barra de búsqueda */}
        <form onSubmit={handleSearch}>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="¿A dónde vas?"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="pl-12 pr-4 h-14 text-base bg-secondary border-0 rounded-xl"
            />
          </div>
        </form>
      </div>

      {/* Notificaciones dropdown */}
      {showNotifications && (
        <div className="absolute top-32 right-4 left-4 z-50 bg-card rounded-xl shadow-lg border border-border overflow-hidden">
          <div className="p-3 border-b border-border">
            <h3 className="font-semibold text-foreground">Notificaciones</h3>
          </div>
          <div className="max-h-64 overflow-y-auto">
            {mockNotifications.map((notification) => (
              <div 
                key={notification.id}
                className={`p-3 border-b border-border last:border-0 ${!notification.read ? 'bg-primary/5' : ''}`}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    notification.type === 'traffic' ? 'bg-warning/20 text-warning' :
                    notification.type === 'delay' ? 'bg-destructive/20 text-destructive' :
                    'bg-accent/20 text-accent'
                  }`}>
                    <AlertTriangle className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-sm text-foreground">{notification.title}</p>
                    <p className="text-xs text-muted-foreground mt-1">{notification.message}</p>
                    <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Mapa */}
      <div className="h-[280px] relative">
        <MapView showDrivers className="h-full rounded-none" />
        
        {/* Overlay con info de conductores */}
        <div className="absolute bottom-4 left-4 right-4">
          <Card className="bg-card/95 backdrop-blur">
            <CardContent className="p-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                  <Car className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">
                    {nearbyDrivers.length} conductores cerca
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Tiempo de espera: ~3 min
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Rutas frecuentes */}
      <div className="px-4 py-6">
        <h2 className="text-lg font-semibold text-foreground mb-4">Rutas frecuentes</h2>
        <div className="space-y-3">
          {mockFrequentRoutes.map((route) => {
            const Icon = routeIcons[route.name] || MapPin
            return (
              <button
                key={route.id}
                onClick={() => handleFrequentRoute(route)}
                className="w-full bg-card border border-border rounded-xl p-4 flex items-center gap-4 hover:bg-secondary/50 transition-colors text-left"
              >
                <div className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center">
                  <Icon className="w-6 h-6 text-foreground" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-foreground">{route.name}</p>
                  <p className="text-sm text-muted-foreground">{route.destination}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-foreground">${route.estimatedPrice}</p>
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {route.estimatedTime} min
                  </p>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </button>
            )
          })}
        </div>
      </div>

      {/* Botón de reportar */}
      <div className="px-4 pb-6">
        <Button 
          variant="outline" 
          className="w-full h-12 justify-start gap-3"
          onClick={() => router.push('/report')}
        >
          <AlertTriangle className="w-5 h-5" />
          Reportar congestión o incidente
        </Button>
      </div>
    </div>
  )
}
