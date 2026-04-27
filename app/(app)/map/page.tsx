"use client"

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { MapView } from '@/components/map-view'
import {
  MapPin,
  Navigation,
  Bus,
  Car,
  Clock
} from 'lucide-react'

const nearbyStops = [
  { id: 1, name: 'Estación Central', type: 'metro', distance: '200m', time: '2 min' },
  { id: 2, name: 'Parada Av. Principal', type: 'bus', distance: '350m', time: '4 min' },
  { id: 3, name: 'Terminal Norte', type: 'bus', distance: '800m', time: '10 min' },
]

export default function MapPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col pb-6">
      {/* Header */}
      <div className="bg-card border-b border-border px-4 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-foreground">Mapa</h1>
            <p className="text-sm text-muted-foreground">Tráfico y paradas cercanas</p>
          </div>

          {/* Logo centrado */}
          <img
            src="/images/logo.png"
            alt="Movilidad Urbana"
            className="w-22 h-22 rounded-xl object-cover"
          />

          <div className="w-10" /> {/* Espaciador para centrar el logo */}
        </div>
      </div>

      {/* Mapa (Tamaño grande) */}
      <div className="h-[70vh] relative w-full shrink-0">
        <MapView showDrivers={false} className="h-full rounded-none" />

        {/* Controles del mapa */}
        <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
          <Button
            variant="secondary"
            size="icon"
            className="w-10 h-10 shadow-md"
          >
            <Navigation className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Panel de paradas cercanas */}
      <div className="bg-card border-t border-border mt-auto">
        <div className="p-4">
          <h2 className="font-semibold text-foreground mb-3">Paradas cercanas</h2>
          <div className="space-y-2">
            {nearbyStops.map((stop) => (
              <Card key={stop.id} className="bg-secondary/50">
                <CardContent className="p-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-card rounded-lg flex items-center justify-center">
                      {stop.type === 'metro' ? (
                        <Car className="w-5 h-5 text-foreground" />
                      ) : (
                        <Bus className="w-5 h-5 text-foreground" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-sm text-foreground">{stop.name}</p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <MapPin className="w-3 h-3" />
                        <span>{stop.distance}</span>
                        <Clock className="w-3 h-3 ml-2" />
                        <span>{stop.time} caminando</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
