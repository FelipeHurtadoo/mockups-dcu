"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { MapView } from '@/components/map-view'
import { useApp } from '@/lib/app-context'
import { 
  Phone, 
  MessageCircle, 
  Share2, 
  AlertTriangle,
  Clock,
  Star,
  Car,
  Shield,
  X,
  Navigation
} from 'lucide-react'

export default function ActiveTripPage() {
  const router = useRouter()
  const { tripStatus, tripDetails, cancelTrip, completeTrip } = useApp()
  const [timeRemaining, setTimeRemaining] = useState(tripDetails?.duration || 15)
  const [showEmergency, setShowEmergency] = useState(false)
  const [showCancel, setShowCancel] = useState(false)

  useEffect(() => {
    if (!tripDetails) {
      router.push('/home')
      return
    }

    // Simular cuenta regresiva - 15 segundos total
    const interval = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          clearInterval(interval)
          completeTrip()
          router.push('/trip/completed')
          return 0
        }
        return prev - 1
      })
    }, 1000) // 1 segundo real = 1 min simulado

    return () => clearInterval(interval)
  }, [tripDetails, router, completeTrip])

  if (!tripDetails || !tripDetails.driver) {
    return null
  }

  const driver = tripDetails.driver

  const handleCancel = () => {
    cancelTrip()
    router.push('/home')
  }

  const handleShare = () => {
    // Simular compartir ubicación
    alert('Ubicación compartida con tus contactos de emergencia')
  }

  const handleEmergency = () => {
    alert('Llamando a servicios de emergencia...')
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Mapa con ruta en tiempo real */}
      <div className="h-[45vh] relative">
        <MapView 
          showRoute 
          showDrivers={false}
          origin={{ lat: 0, lng: 0 }}
          destination={{ lat: 0, lng: 0 }}
          className="h-full rounded-none" 
        />

        {/* Overlay con estado */}
        <div className="absolute top-4 left-4 right-4">
          <Card className="bg-card/95 backdrop-blur">
            <CardContent className="p-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {tripStatus === 'confirmed' ? (
                    <>
                      <div className="w-2 h-2 bg-warning rounded-full animate-pulse" />
                      <span className="text-sm font-medium text-foreground">
                        El conductor está en camino
                      </span>
                    </>
                  ) : (
                    <>
                      <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                      <span className="text-sm font-medium text-foreground">
                        Viaje en curso
                      </span>
                    </>
                  )}
                </div>
                <div className="flex items-center gap-1 text-foreground">
                  <Clock className="w-4 h-4" />
                  <span className="font-semibold">{timeRemaining} min</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Código de verificación */}
        {tripStatus === 'confirmed' && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
            <Card className="bg-primary text-primary-foreground">
              <CardContent className="px-6 py-3">
                <p className="text-xs opacity-80 text-center">Código de verificación</p>
                <p className="text-2xl font-bold tracking-widest text-center">
                  {tripDetails.verificationCode}
                </p>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      {/* Info del conductor */}
      <div className="flex-1 bg-card rounded-t-3xl -mt-4 relative z-10">
        <div className="p-4">
          {/* Handle */}
          <div className="w-12 h-1 bg-border rounded-full mx-auto mb-4" />

          {/* Driver card */}
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center text-2xl font-bold text-foreground">
              {driver.name.charAt(0)}
            </div>
            <div className="flex-1">
              <p className="font-semibold text-lg text-foreground">{driver.name}</p>
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-warning fill-warning" />
                <span className="text-sm font-medium text-foreground">{driver.rating}</span>
                <span className="text-sm text-muted-foreground">· {driver.trips} viajes</span>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="icon" className="w-10 h-10 rounded-full">
                <Phone className="w-5 h-5" />
              </Button>
              <Button variant="outline" size="icon" className="w-10 h-10 rounded-full">
                <MessageCircle className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Vehicle info */}
          <Card className="bg-secondary/50 mb-4">
            <CardContent className="p-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Car className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium text-foreground">{driver.vehicleModel}</p>
                    <p className="text-sm text-muted-foreground">{driver.vehicleColor}</p>
                  </div>
                </div>
                <div className="bg-card px-3 py-1.5 rounded-lg">
                  <p className="font-bold text-foreground">{driver.vehiclePlate}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Route comparison */}
          <div className="flex items-center gap-3 p-3 bg-secondary/50 rounded-xl mb-4">
            <Navigation className="w-5 h-5 text-muted-foreground" />
            <div className="flex-1">
              <p className="text-sm text-muted-foreground">Ruta actual</p>
              <p className="text-sm font-medium text-foreground">
                Siguiendo la ruta planeada
              </p>
            </div>
            <div className="w-2 h-2 bg-accent rounded-full" />
          </div>

          {/* Action buttons */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <Button 
              variant="outline" 
              className="h-12"
              onClick={handleShare}
            >
              <Share2 className="w-5 h-5 mr-2" />
              Compartir ubicación
            </Button>
            <Button 
              variant="outline" 
              className="h-12"
              onClick={() => setShowCancel(true)}
            >
              <X className="w-5 h-5 mr-2" />
              Cancelar viaje
            </Button>
          </div>

          {/* Emergency button */}
          <Button 
            variant="destructive"
            className="w-full h-14"
            onClick={() => setShowEmergency(true)}
          >
            <Shield className="w-5 h-5 mr-2" />
            Botón de emergencia
          </Button>
        </div>
      </div>

      {/* Modal de emergencia */}
      {showEmergency && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-sm">
            <CardContent className="p-6">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-destructive/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <AlertTriangle className="w-8 h-8 text-destructive" />
                </div>
                <h2 className="text-xl font-bold text-foreground mb-2">¿Necesitas ayuda?</h2>
                <p className="text-muted-foreground">
                  Selecciona una opción si te encuentras en una situación de emergencia
                </p>
              </div>
              <div className="space-y-3">
                <Button 
                  variant="destructive" 
                  className="w-full h-12"
                  onClick={handleEmergency}
                >
                  Llamar al 911
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full h-12"
                  onClick={handleShare}
                >
                  Compartir ubicación con contactos
                </Button>
                <Button 
                  variant="ghost" 
                  className="w-full h-12"
                  onClick={() => setShowEmergency(false)}
                >
                  Cancelar
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Modal de cancelación */}
      {showCancel && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-sm">
            <CardContent className="p-6">
              <div className="text-center mb-6">
                <h2 className="text-xl font-bold text-foreground mb-2">¿Cancelar viaje?</h2>
                <p className="text-muted-foreground">
                  Si cancelas ahora, podrías recibir un cargo por cancelación
                </p>
              </div>
              <div className="space-y-3">
                <Button 
                  variant="destructive" 
                  className="w-full h-12"
                  onClick={handleCancel}
                >
                  Sí, cancelar viaje
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full h-12"
                  onClick={() => setShowCancel(false)}
                >
                  No, continuar viaje
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
