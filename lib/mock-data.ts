// Mock data para la aplicación de Movilidad Urbana

export interface Driver {
  id: string
  name: string
  photo: string
  rating: number
  trips: number
  vehicleModel: string
  vehiclePlate: string
  vehicleColor: string
  isFavorite: boolean
}

export interface Trip {
  id: string
  origin: string
  destination: string
  date: string
  time: string
  price: number
  duration: number
  distance: number
  driver: Driver
  status: 'completed' | 'cancelled' | 'in-progress'
}

export interface FrequentRoute {
  id: string
  name: string
  origin: string
  destination: string
  estimatedPrice: number
  estimatedTime: number
}

export interface PaymentMethod {
  id: string
  type: 'card' | 'cash' | 'wallet'
  label: string
  lastFour?: string
  isDefault: boolean
}

export interface Notification {
  id: string
  type: 'traffic' | 'delay' | 'accident' | 'promo'
  title: string
  message: string
  time: string
  read: boolean
}

export const mockDrivers: Driver[] = [
  {
    id: '1',
    name: 'Carlos Mendoza',
    photo: '/drivers/driver1.jpg',
    rating: 4.9,
    trips: 1247,
    vehicleModel: 'Toyota Corolla 2022',
    vehiclePlate: 'ABC-123',
    vehicleColor: 'Blanco',
    isFavorite: true,
  },
  {
    id: '2',
    name: 'María García',
    photo: '/drivers/driver2.jpg',
    rating: 4.8,
    trips: 892,
    vehicleModel: 'Honda Civic 2021',
    vehiclePlate: 'XYZ-789',
    vehicleColor: 'Gris',
    isFavorite: false,
  },
  {
    id: '3',
    name: 'Juan Rodríguez',
    photo: '/drivers/driver3.jpg',
    rating: 4.7,
    trips: 634,
    vehicleModel: 'Nissan Versa 2023',
    vehiclePlate: 'DEF-456',
    vehicleColor: 'Negro',
    isFavorite: false,
  },
]

export const mockTrips: Trip[] = [
  {
    id: '1',
    origin: 'Av. Reforma 222',
    destination: 'Universidad Nacional',
    date: '2024-01-15',
    time: '08:30',
    price: 85,
    duration: 25,
    distance: 8.5,
    driver: mockDrivers[0],
    status: 'completed',
  },
  {
    id: '2',
    origin: 'Centro Comercial Plaza',
    destination: 'Casa',
    date: '2024-01-14',
    time: '19:45',
    price: 62,
    duration: 18,
    distance: 5.2,
    driver: mockDrivers[1],
    status: 'completed',
  },
  {
    id: '3',
    origin: 'Oficina Central',
    destination: 'Aeropuerto',
    date: '2024-01-10',
    time: '06:00',
    price: 180,
    duration: 45,
    distance: 22,
    driver: mockDrivers[2],
    status: 'completed',
  },
]

export const mockFrequentRoutes: FrequentRoute[] = [
  {
    id: '1',
    name: 'Casa',
    origin: 'Ubicación actual',
    destination: 'Calle Principal 123',
    estimatedPrice: 55,
    estimatedTime: 15,
  },
  {
    id: '2',
    name: 'Universidad',
    origin: 'Ubicación actual',
    destination: 'Universidad Nacional',
    estimatedPrice: 75,
    estimatedTime: 22,
  },
  {
    id: '3',
    name: 'Trabajo',
    origin: 'Ubicación actual',
    destination: 'Torre Empresarial',
    estimatedPrice: 65,
    estimatedTime: 18,
  },
]

export const mockPaymentMethods: PaymentMethod[] = [
  {
    id: '1',
    type: 'card',
    label: 'Visa',
    lastFour: '4242',
    isDefault: true,
  },
  {
    id: '2',
    type: 'card',
    label: 'Mastercard',
    lastFour: '8888',
    isDefault: false,
  },
  {
    id: '3',
    type: 'wallet',
    label: 'Saldo Movilidad',
    isDefault: false,
  },
  {
    id: '4',
    type: 'cash',
    label: 'Efectivo',
    isDefault: false,
  },
]

export const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'traffic',
    title: 'Tráfico intenso',
    message: 'Av. Insurgentes presenta congestión. Considera rutas alternas.',
    time: 'Hace 5 min',
    read: false,
  },
  {
    id: '2',
    type: 'delay',
    title: 'Retraso en tu zona',
    message: 'Los tiempos de espera pueden ser mayores de lo habitual.',
    time: 'Hace 15 min',
    read: false,
  },
  {
    id: '3',
    type: 'promo',
    title: '20% de descuento',
    message: 'Usa el código VIAJA20 en tu próximo viaje.',
    time: 'Hace 1 hora',
    read: true,
  },
]

export const mockUser = {
  id: '1',
  name: 'Ana López',
  email: 'ana.lopez@email.com',
  phone: '+52 55 1234 5678',
  photo: '/user-avatar.jpg',
  balance: 250.00,
  favoriteDrivers: ['1'],
}

export const mockWeather = {
  temperature: 22,
  condition: 'Parcialmente nublado',
  icon: 'cloud-sun',
}
