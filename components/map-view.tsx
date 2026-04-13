"use client"

import { useState, useEffect } from 'react'
import { MapPin, Navigation, Car } from 'lucide-react'
import { cn } from '@/lib/utils'

interface MapViewProps {
  showRoute?: boolean
  origin?: { lat: number; lng: number }
  destination?: { lat: number; lng: number }
  showDrivers?: boolean
  className?: string
}

// Simulación de un mapa interactivo
export function MapView({ 
  showRoute = false, 
  origin,
  destination,
  showDrivers = true,
  className 
}: MapViewProps) {
  const [driverPositions, setDriverPositions] = useState([
    { id: 1, x: 35, y: 40 },
    { id: 2, x: 55, y: 60 },
    { id: 3, x: 70, y: 35 },
  ])

  // Animación de conductores moviéndose
  useEffect(() => {
    if (!showDrivers) return
    
    const interval = setInterval(() => {
      setDriverPositions(prev => prev.map(driver => ({
        ...driver,
        x: driver.x + (Math.random() - 0.5) * 3,
        y: driver.y + (Math.random() - 0.5) * 3,
      })))
    }, 2000)

    return () => clearInterval(interval)
  }, [showDrivers])

  return (
    <div className={cn(
      "relative w-full h-full bg-secondary overflow-hidden rounded-2xl",
      className
    )}>
      {/* Imagen de fondo del mapa */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: 'url(/images/map-background.jpg)' }}
      />
      <div className="absolute inset-0 bg-background/10" />

      {/* Ruta si está activa */}
      {showRoute && origin && destination && (
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          <path
            d={`M ${50}% ${85}% Q ${45}% ${60}%, ${50}% ${50}% T ${55}% ${20}%`}
            fill="none"
            stroke="hsl(var(--primary))"
            strokeWidth="4"
            strokeDasharray="8 4"
            className="animate-pulse"
          />
        </svg>
      )}

      {/* Ubicación actual del usuario */}
      <div 
        className="absolute z-10 transform -translate-x-1/2 -translate-y-1/2"
        style={{ left: '50%', top: '85%' }}
      >
        <div className="relative">
          <div className="absolute inset-0 w-12 h-12 bg-primary/20 rounded-full animate-ping" />
          <div className="relative w-12 h-12 bg-primary rounded-full flex items-center justify-center shadow-lg">
            <Navigation className="w-6 h-6 text-primary-foreground" />
          </div>
        </div>
      </div>

      {/* Destino si está definido */}
      {showRoute && (
        <div 
          className="absolute z-10 transform -translate-x-1/2 -translate-y-full"
          style={{ left: '55%', top: '20%' }}
        >
          <div className="flex flex-col items-center">
            <MapPin className="w-10 h-10 text-destructive fill-destructive/20" />
            <span className="text-xs font-medium bg-card px-2 py-1 rounded shadow mt-1">Destino</span>
          </div>
        </div>
      )}

      {/* Conductores cercanos */}
      {showDrivers && !showRoute && driverPositions.map((driver) => (
        <div
          key={driver.id}
          className="absolute z-5 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-1000"
          style={{ 
            left: `${Math.max(10, Math.min(90, driver.x))}%`, 
            top: `${Math.max(10, Math.min(90, driver.y))}%` 
          }}
        >
          <div className="w-8 h-8 bg-foreground rounded-full flex items-center justify-center shadow-md">
            <Car className="w-4 h-4 text-background" />
          </div>
        </div>
      ))}

      {/* Indicador de zoom */}
      <div className="absolute bottom-4 right-4 flex flex-col gap-1">
        <button className="w-8 h-8 bg-card rounded-lg shadow flex items-center justify-center text-foreground font-bold hover:bg-secondary transition-colors">
          +
        </button>
        <button className="w-8 h-8 bg-card rounded-lg shadow flex items-center justify-center text-foreground font-bold hover:bg-secondary transition-colors">
          -
        </button>
      </div>
    </div>
  )
}
