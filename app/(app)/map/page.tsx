"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { MapView } from '@/components/map-view'
import { 
  MapPin, 
  Navigation,
  AlertTriangle,
  Bus,
  Car,
  Clock,
  Layers
} from 'lucide-react'

const trafficLevels = [
  { label: 'Fluido', color: 'bg-accent' },
  { label: 'Moderado', color: 'bg-warning' },
  { label: 'Intenso', color: 'bg-destructive' },
]

const nearbyStops = [
  { id: 1, name: 'Estación Central', type: 'metro', distance: '200m', time: '2 min' },
  { id: 2, name: 'Parada Av. Principal', type: 'bus', distance: '350m', time: '4 min' },
  { id: 3, name: 'Terminal Norte', type: 'bus', distance: '800m', time: '10 min' },
]

export default function MapPage() {
  const [showTraffic, setShowTraffic] = useState(true)

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="bg-card border-b border-border px-4 py-4">
        <h1 className="text-xl font-bold text-foreground">Mapa</h1>
        <p className="text-sm text-muted-foreground">Tráfico y paradas cercanas</p>
      </div>

      {/* Mapa */}
      <div className="flex-1 relative">
        <MapView showDrivers={false} className="h-full rounded-none" />
        
        {/* Controles del mapa */}
        <div className="absolute top-4 right-4 flex flex-col gap-2">
          <Button
            variant={showTraffic ? "default" : "secondary"}
            size="icon"
            onClick={() => setShowTraffic(!showTraffic)}
            className="w-10 h-10"
          >
            <Layers className="w-5 h-5" />
          </Button>
          <Button
            variant="secondary"
            size="icon"
            className="w-10 h-10"
          >
            <Navigation className="w-5 h-5" />
          </Button>
        </div>

        {/* Leyenda de tráfico */}
        {showTraffic && (
          <div className="absolute top-4 left-4 bg-card rounded-lg shadow p-3">
            <p className="text-xs font-medium text-foreground mb-2">Tráfico</p>
            <div className="flex flex-col gap-1">
              {trafficLevels.map((level) => (
                <div key={level.label} className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${level.color}`} />
                  <span className="text-xs text-muted-foreground">{level.label}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Marcadores de congestión simulados */}
        {showTraffic && (
          <>
            <div className="absolute" style={{ top: '30%', left: '40%' }}>
              <div className="w-6 h-6 bg-warning rounded-full flex items-center justify-center animate-pulse">
                <AlertTriangle className="w-3 h-3 text-warning-foreground" />
              </div>
            </div>
            <div className="absolute" style={{ top: '50%', left: '60%' }}>
              <div className="w-6 h-6 bg-destructive rounded-full flex items-center justify-center animate-pulse">
                <AlertTriangle className="w-3 h-3 text-destructive-foreground" />
              </div>
            </div>
          </>
        )}
      </div>

      {/* Panel de paradas cercanas */}
      <div className="bg-card border-t border-border">
        {/* Mini mapa de paradas */}
        <div className="relative h-32 overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: 'url(/images/map-background.jpg)' }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-card" />
          {/* Marcadores de paradas */}
          <div className="absolute top-4 left-[20%]">
            <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center shadow-lg">
              <Bus className="w-3 h-3 text-accent-foreground" />
            </div>
          </div>
          <div className="absolute top-8 left-[50%]">
            <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center shadow-lg">
              <Car className="w-3 h-3 text-primary-foreground" />
            </div>
          </div>
          <div className="absolute top-6 left-[75%]">
            <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center shadow-lg">
              <Bus className="w-3 h-3 text-accent-foreground" />
            </div>
          </div>
        </div>
        
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
