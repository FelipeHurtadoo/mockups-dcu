"use client"

import { createContext, useContext, useState, ReactNode } from 'react'
import { Driver, mockDrivers } from './mock-data'

export type TripStatus = 'idle' | 'searching' | 'confirmed' | 'in-progress' | 'completed'

interface TripDetails {
  origin: string
  destination: string
  price: number
  duration: number
  distance: number
  driver: Driver | null
  verificationCode: string
}

interface AppContextType {
  tripStatus: TripStatus
  tripDetails: TripDetails | null
  nearbyDrivers: Driver[]
  setTripStatus: (status: TripStatus) => void
  startTrip: (origin: string, destination: string) => void
  confirmTrip: (driver: Driver) => void
  cancelTrip: () => void
  completeTrip: () => void
}

const AppContext = createContext<AppContextType | undefined>(undefined)

function generateVerificationCode(): string {
  return Math.random().toString(36).substring(2, 6).toUpperCase()
}

function calculateTripDetails(origin: string, destination: string): Omit<TripDetails, 'driver' | 'verificationCode'> {
  // Simulación de cálculo basado en strings
  const basePrice = 40 + Math.random() * 60
  const baseDuration = 10 + Math.random() * 30
  const baseDistance = 2 + Math.random() * 15
  
  return {
    origin,
    destination,
    price: Math.round(basePrice),
    duration: Math.round(baseDuration),
    distance: Math.round(baseDistance * 10) / 10,
  }
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [tripStatus, setTripStatus] = useState<TripStatus>('idle')
  const [tripDetails, setTripDetails] = useState<TripDetails | null>(null)
  const [nearbyDrivers] = useState<Driver[]>(mockDrivers)

  const startTrip = (origin: string, destination: string) => {
    const details = calculateTripDetails(origin, destination)
    setTripDetails({
      ...details,
      driver: null,
      verificationCode: '',
    })
    setTripStatus('searching')
  }

  const confirmTrip = (driver: Driver) => {
    if (tripDetails) {
      setTripDetails({
        ...tripDetails,
        driver,
        verificationCode: generateVerificationCode(),
      })
      setTripStatus('confirmed')
      
      // Simular que el conductor llega y comienza el viaje
      setTimeout(() => {
        setTripStatus('in-progress')
      }, 3000)
    }
  }

  const cancelTrip = () => {
    setTripDetails(null)
    setTripStatus('idle')
  }

  const completeTrip = () => {
    setTripStatus('completed')
    setTimeout(() => {
      setTripDetails(null)
      setTripStatus('idle')
    }, 2000)
  }

  return (
    <AppContext.Provider value={{
      tripStatus,
      tripDetails,
      nearbyDrivers,
      setTripStatus,
      startTrip,
      confirmTrip,
      cancelTrip,
      completeTrip,
    }}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider')
  }
  return context
}
