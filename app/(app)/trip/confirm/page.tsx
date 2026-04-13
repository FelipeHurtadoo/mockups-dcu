"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { MapView } from '@/components/map-view'
import { useApp } from '@/lib/app-context'
import { Driver } from '@/lib/mock-data'
import { 
  MapPin, 
  Clock, 
  Star,
  Car,
  ChevronLeft,
  Heart,
  Check
} from 'lucide-react'

export default function ConfirmTripPage() {
  const router = useRouter()
  const { tripDetails, nearbyDrivers, confirmTrip, cancelTrip } = useApp()
  const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null)

  if (!tripDetails) {
    router.push('/home')
    return null
  }

  const handleConfirm = () => {
    if (selectedDriver) {
      confirmTrip(selectedDriver)
      router.push('/trip/active')
    }
  }

  const handleCancel = () => {
    cancelTrip()
    router.push('/home')
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="bg-card border-b border-border px-4 py-4">
        <div className="flex items-center gap-3">
          <button 
            onClick={handleCancel}
            className="p-2 -ml-2 hover:bg-secondary rounded-lg transition-colors"
          >
            <ChevronLeft className="w-6 h-6 text-foreground" />
          </button>
          <div>
            <h1 className="text-lg font-bold text-foreground">Confirmar viaje</h1>
            <p className="text-sm text-muted-foreground">Selecciona tu conductor</p>
          </div>
        </div>
      </div>

      {/* Mapa con ruta */}
      <div className="h-[200px]">
        <MapView 
          showRoute 
          showDrivers={false}
          origin={{ lat: 0, lng: 0 }}
          destination={{ lat: 0, lng: 0 }}
          className="h-full rounded-none" 
        />
      </div>

      {/* Detalles del viaje */}
      <div className="px-4 py-4 bg-card border-b border-border">
        <div className="flex items-start gap-3 mb-4">
          <div className="flex flex-col items-center">
            <div className="w-3 h-3 rounded-full bg-accent" />
            <div className="w-0.5 h-8 bg-border" />
            <div className="w-3 h-3 rounded-full bg-destructive" />
          </div>
          <div className="flex-1">
            <div className="mb-4">
              <p className="text-xs text-muted-foreground">Origen</p>
              <p className="font-medium text-foreground">{tripDetails.origin}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Destino</p>
              <p className="font-medium text-foreground">{tripDetails.destination}</p>
            </div>
          </div>
        </div>

        {/* Resumen */}
        <div className="flex items-center justify-between p-3 bg-secondary rounded-xl">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm text-foreground">{tripDetails.duration} min</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm text-foreground">{tripDetails.distance} km</span>
          </div>
          <div className="text-right">
            <p className="text-xl font-bold text-foreground">${tripDetails.price}</p>
            <p className="text-xs text-muted-foreground">Precio fijo</p>
          </div>
        </div>
      </div>

      {/* Lista de conductores */}
      <div className="flex-1 px-4 py-4 overflow-y-auto">
        <h2 className="font-semibold text-foreground mb-3">Conductores disponibles</h2>
        <div className="space-y-3">
          {nearbyDrivers.map((driver) => (
            <Card 
              key={driver.id}
              className={`cursor-pointer transition-all ${
                selectedDriver?.id === driver.id 
                  ? 'ring-2 ring-primary' 
                  : 'hover:bg-secondary/50'
              }`}
              onClick={() => setSelectedDriver(driver)}
            >
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  {/* Avatar */}
                  <div className="relative">
                    <div className="w-14 h-14 bg-secondary rounded-full flex items-center justify-center text-xl font-bold text-foreground">
                      {driver.name.charAt(0)}
                    </div>
                    {driver.isFavorite && (
                      <div className="absolute -top-1 -right-1 w-5 h-5 bg-destructive rounded-full flex items-center justify-center">
                        <Heart className="w-3 h-3 text-destructive-foreground fill-current" />
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-foreground">{driver.name}</p>
                      {selectedDriver?.id === driver.id && (
                        <Check className="w-4 h-4 text-accent" />
                      )}
                    </div>
                    <div className="flex items-center gap-3 mt-1">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-warning fill-warning" />
                        <span className="text-sm font-medium text-foreground">{driver.rating}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">{driver.trips} viajes</span>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <Car className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        {driver.vehicleModel} · {driver.vehiclePlate}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Footer con botón */}
      <div className="bg-card border-t border-border p-4">
        <Button 
          className="w-full h-14 text-base font-semibold"
          disabled={!selectedDriver}
          onClick={handleConfirm}
        >
          {selectedDriver 
            ? `Confirmar viaje con ${selectedDriver.name.split(' ')[0]}`
            : 'Selecciona un conductor'
          }
        </Button>
      </div>
    </div>
  )
}
