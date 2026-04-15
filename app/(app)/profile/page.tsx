"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { mockDrivers, Driver } from '@/lib/mock-data'
import { useAuth } from '@/lib/auth-context'
import { 
  User,
  Mail,
  Phone,
  CreditCard,
  Heart,
  Settings,
  HelpCircle,
  LogOut,
  ChevronRight,
  Star,
  Edit,
  X,
  Check,
  Plus,
  Search
} from 'lucide-react'

const menuItems = [
  { label: 'Configuración', icon: Settings, href: '/settings' },
  { label: 'Ayuda y soporte', icon: HelpCircle, href: '/support' },
]

export default function ProfilePage() {
  const router = useRouter()
  const { user, logout, updateUser } = useAuth()

  const [favoriteDrivers, setFavoriteDrivers] = useState<Driver[]>(
    mockDrivers.filter(d => d.isFavorite)
  )

  // Estados para edición
  const [editingField, setEditingField] = useState<string | null>(null)
  const [editValue, setEditValue] = useState('')

  // Estado para agregar conductor favorito
  const [showAddDriver, setShowAddDriver] = useState(false)
  const [driverSearch, setDriverSearch] = useState('')

  // Conductores disponibles (no favoritos)
  const availableDrivers = mockDrivers.filter(
    d => !favoriteDrivers.some(f => f.id === d.id)
  )

  const handleLogout = () => {
    logout()
    router.push('/login')
  }

  const startEditing = (field: string, value: string) => {
    setEditingField(field)
    setEditValue(value)
  }

  const saveEdit = () => {
    if (editingField) {
      updateUser({ [editingField]: editValue })
      setEditingField(null)
      setEditValue('')
    }
  }

  const cancelEdit = () => {
    setEditingField(null)
    setEditValue('')
  }

  const removeFavorite = (driverId: string) => {
    setFavoriteDrivers(prev => prev.filter(d => d.id !== driverId))
  }

  const addFavorite = (driver: Driver) => {
    setFavoriteDrivers(prev => [...prev, { ...driver, isFavorite: true }])
    setShowAddDriver(false)
    setDriverSearch('')
  }

  const filteredAvailableDrivers = availableDrivers.filter(d =>
    d.name.toLowerCase().includes(driverSearch.toLowerCase())
  )

  const getFieldLabel = (field: string) => {
    switch (field) {
      case 'name': return 'Nombre'
      case 'email': return 'Correo electrónico'
      case 'phone': return 'Teléfono'
      default: return ''
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header con foto de perfil */}
      <div className="bg-card border-b border-border px-4 py-6">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center text-2xl font-bold text-foreground">
              {user?.name.charAt(0) || 'U'}
            </div>
            <button className="absolute bottom-0 right-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center shadow">
              <Edit className="w-4 h-4 text-primary-foreground" />
            </button>
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">{user?.name || 'Usuario'}</h1>
            <p className="text-sm text-muted-foreground">{user?.email || ''}</p>
          </div>
        </div>
      </div>

      {/* Modal agregar conductor favorito */}
      {showAddDriver && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4">
          <Card className="w-full max-w-md max-h-[80vh] flex flex-col">
            <CardContent className="p-6 flex flex-col h-full">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-foreground">
                  Agregar conductor favorito
                </h2>
                <button onClick={() => { setShowAddDriver(false); setDriverSearch(''); }}>
                  <X className="w-6 h-6 text-muted-foreground" />
                </button>
              </div>
              
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="Buscar conductor..."
                  value={driverSearch}
                  onChange={(e) => setDriverSearch(e.target.value)}
                  className="h-12 pl-10"
                />
              </div>

              <div className="flex-1 overflow-y-auto space-y-3">
                {filteredAvailableDrivers.length > 0 ? (
                  filteredAvailableDrivers.map((driver) => (
                    <div 
                      key={driver.id}
                      className="flex items-center gap-3 p-3 bg-secondary/50 rounded-xl"
                    >
                      <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center font-bold text-foreground">
                        {driver.name.charAt(0)}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-foreground">{driver.name}</p>
                        <div className="flex items-center gap-2">
                          <Star className="w-3 h-3 text-warning fill-warning" />
                          <span className="text-xs text-muted-foreground">{driver.rating} · {driver.trips} viajes</span>
                        </div>
                      </div>
                      <Button 
                        size="sm" 
                        onClick={() => addFavorite(driver)}
                      >
                        <Plus className="w-4 h-4 mr-1" />
                        Agregar
                      </Button>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">No hay conductores disponibles</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Modal de edición */}
      {editingField && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4">
          <Card className="w-full max-w-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-foreground">
                  Editar {getFieldLabel(editingField).toLowerCase()}
                </h2>
                <button onClick={cancelEdit}>
                  <X className="w-6 h-6 text-muted-foreground" />
                </button>
              </div>
              
              <div className="mb-6">
                <label className="text-sm text-muted-foreground mb-2 block">
                  {getFieldLabel(editingField)}
                </label>
                <Input
                  type={editingField === 'email' ? 'email' : 'text'}
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  className="h-12"
                  autoFocus
                />
              </div>

              <div className="flex gap-3">
                <Button 
                  variant="outline" 
                  className="flex-1 h-12"
                  onClick={cancelEdit}
                >
                  Cancelar
                </Button>
                <Button 
                  className="flex-1 h-12"
                  onClick={saveEdit}
                  disabled={!editValue.trim()}
                >
                  <Check className="w-4 h-4 mr-2" />
                  Guardar
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Info de contacto */}
      <div className="px-4 py-6">
        <h2 className="font-semibold text-foreground mb-3">Información personal</h2>
        <Card>
          <CardContent className="p-0 divide-y divide-border">
            <button 
              className="flex items-center gap-4 p-4 w-full hover:bg-secondary/50 transition-colors"
              onClick={() => startEditing('name', user?.name || '')}
            >
              <User className="w-5 h-5 text-muted-foreground" />
              <div className="flex-1 text-left">
                <p className="text-sm text-muted-foreground">Nombre</p>
                <p className="font-medium text-foreground">{user?.name || 'Sin nombre'}</p>
              </div>
              <Edit className="w-4 h-4 text-muted-foreground" />
            </button>
            <button 
              className="flex items-center gap-4 p-4 w-full hover:bg-secondary/50 transition-colors"
              onClick={() => startEditing('email', user?.email || '')}
            >
              <Mail className="w-5 h-5 text-muted-foreground" />
              <div className="flex-1 text-left">
                <p className="text-sm text-muted-foreground">Correo electrónico</p>
                <p className="font-medium text-foreground">{user?.email || 'Sin correo'}</p>
              </div>
              <Edit className="w-4 h-4 text-muted-foreground" />
            </button>
            <button 
              className="flex items-center gap-4 p-4 w-full hover:bg-secondary/50 transition-colors"
              onClick={() => startEditing('phone', user?.phone || '')}
            >
              <Phone className="w-5 h-5 text-muted-foreground" />
              <div className="flex-1 text-left">
                <p className="text-sm text-muted-foreground">Teléfono</p>
                <p className="font-medium text-foreground">{user?.phone || 'Sin teléfono'}</p>
              </div>
              <Edit className="w-4 h-4 text-muted-foreground" />
            </button>
            <button 
              className="flex items-center gap-4 p-4 w-full hover:bg-secondary/50 transition-colors"
              onClick={() => router.push('/payments')}
            >
              <CreditCard className="w-5 h-5 text-muted-foreground" />
              <div className="flex-1 text-left">
                <p className="text-sm text-muted-foreground">Métodos de pago</p>
                <p className="font-medium text-foreground">2 tarjetas guardadas</p>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </button>
          </CardContent>
        </Card>
      </div>

      {/* Conductores favoritos */}
      <div className="px-4 pb-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-semibold text-foreground">Conductores favoritos</h2>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setShowAddDriver(true)}
          >
            <Plus className="w-4 h-4 mr-1" />
            Agregar
          </Button>
        </div>
        {favoriteDrivers.length > 0 ? (
          <div className="space-y-3">
            {favoriteDrivers.map((driver) => (
              <Card key={driver.id}>
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-secondary rounded-full flex items-center justify-center text-lg font-bold text-foreground">
                      {driver.name.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-foreground">{driver.name}</p>
                      <div className="flex items-center gap-2">
                        <Star className="w-4 h-4 text-warning fill-warning" />
                        <span className="text-sm text-muted-foreground">{driver.rating}</span>
                        <span className="text-sm text-muted-foreground">· {driver.trips} viajes</span>
                      </div>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => removeFavorite(driver.id)}
                    >
                      <Heart className="w-5 h-5 text-destructive fill-destructive" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="p-6 text-center">
              <Heart className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
              <p className="text-muted-foreground">No tienes conductores favoritos</p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Menú */}
      <div className="px-4 pb-6">
        <Card>
          <CardContent className="p-0 divide-y divide-border">
            {menuItems.map((item) => (
              <button
                key={item.label}
                onClick={() => router.push(item.href)}
                className="flex items-center gap-4 p-4 w-full hover:bg-secondary/50 transition-colors"
              >
                <item.icon className="w-5 h-5 text-muted-foreground" />
                <span className="flex-1 text-left font-medium text-foreground">{item.label}</span>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </button>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Cerrar sesión */}
      <div className="px-4 pb-8">
        <Button 
          variant="outline" 
          className="w-full h-12 text-destructive hover:text-destructive hover:bg-destructive/10"
          onClick={handleLogout}
        >
          <LogOut className="w-5 h-5 mr-2" />
          Cerrar sesión
        </Button>
      </div>
    </div>
  )
}
