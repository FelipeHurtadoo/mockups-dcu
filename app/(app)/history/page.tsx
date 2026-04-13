"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { mockTrips } from '@/lib/mock-data'
import { useApp } from '@/lib/app-context'
import { 
  Clock, 
  MapPin, 
  Star,
  ChevronRight,
  Calendar,
  RefreshCw
} from 'lucide-react'

export default function HistoryPage() {
  const router = useRouter()
  const { startTrip } = useApp()
  const [selectedTrip, setSelectedTrip] = useState<string | null>(null)

  const handleRepeatTrip = (trip: typeof mockTrips[0]) => {
    startTrip(trip.origin, trip.destination)
    router.push('/trip/confirm')
  }

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('es-ES', { 
      weekday: 'long', 
      day: 'numeric', 
      month: 'long' 
    })
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border px-4 py-4">
        <h1 className="text-xl font-bold text-foreground">Historial de viajes</h1>
        <p className="text-sm text-muted-foreground">{mockTrips.length} viajes realizados</p>
      </div>

      {/* Lista de viajes */}
      <div className="px-4 py-4 space-y-4">
        {mockTrips.map((trip) => (
          <Card 
            key={trip.id}
            className="overflow-hidden"
          >
            <CardContent className="p-0">
              {/* Encabezado con fecha */}
              <div className="bg-secondary/50 px-4 py-2 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground capitalize">
                  {formatDate(trip.date)}
                </span>
              </div>

              {/* Contenido del viaje */}
              <button
                onClick={() => setSelectedTrip(selectedTrip === trip.id ? null : trip.id)}
                className="w-full p-4 text-left"
              >
                <div className="flex items-start gap-4">
                  {/* Indicadores de ruta */}
                  <div className="flex flex-col items-center pt-1">
                    <div className="w-2.5 h-2.5 rounded-full bg-accent" />
                    <div className="w-0.5 h-10 bg-border" />
                    <div className="w-2.5 h-2.5 rounded-full bg-destructive" />
                  </div>

                  {/* Detalles */}
                  <div className="flex-1">
                    <p className="font-medium text-foreground">{trip.origin}</p>
                    <p className="text-sm text-muted-foreground mt-4">{trip.destination}</p>
                  </div>

                  {/* Precio y hora */}
                  <div className="text-right">
                    <p className="font-bold text-foreground">${trip.price}</p>
                    <p className="text-sm text-muted-foreground">{trip.time}</p>
                  </div>
                </div>
              </button>

              {/* Detalles expandidos */}
              {selectedTrip === trip.id && (
                <div className="px-4 pb-4 pt-0 space-y-4 border-t border-border">
                  {/* Info del conductor */}
                  <div className="flex items-center gap-3 pt-4">
                    <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center text-lg font-bold text-foreground">
                      {trip.driver.name.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-foreground">{trip.driver.name}</p>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-warning fill-warning" />
                        <span className="text-sm text-muted-foreground">{trip.driver.rating}</span>
                      </div>
                    </div>
                    <div className="text-right text-sm text-muted-foreground">
                      <p>{trip.driver.vehicleModel}</p>
                      <p>{trip.driver.vehiclePlate}</p>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm text-foreground">{trip.duration} min</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm text-foreground">{trip.distance} km</span>
                    </div>
                  </div>

                  {/* Botón repetir */}
                  <Button 
                    className="w-full"
                    onClick={() => handleRepeatTrip(trip)}
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Repetir viaje
                  </Button>
                </div>
              )}

              {/* Chevron para indicar que es expandible */}
              {selectedTrip !== trip.id && (
                <div className="px-4 pb-3 flex justify-end">
                  <ChevronRight className="w-5 h-5 text-muted-foreground" />
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
