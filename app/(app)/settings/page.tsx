"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { Input } from '@/components/ui/input'
import { 
  ChevronLeft,
  Moon,
  Bell,
  Shield,
  MapPin,
  Type,
  Globe,
  ChevronRight,
  X,
  Plus,
  Phone,
  User,
  Trash2
} from 'lucide-react'

interface SettingToggleProps {
  icon: React.ElementType
  label: string
  description: string
  checked: boolean
  onCheckedChange: (checked: boolean) => void
}

function SettingToggle({ icon: Icon, label, description, checked, onCheckedChange }: SettingToggleProps) {
  return (
    <div className="flex items-center gap-4 p-4">
      <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center">
        <Icon className="w-5 h-5 text-foreground" />
      </div>
      <div className="flex-1">
        <p className="font-medium text-foreground">{label}</p>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <Switch checked={checked} onCheckedChange={onCheckedChange} />
    </div>
  )
}

interface EmergencyContact {
  id: string
  name: string
  phone: string
}

export default function SettingsPage() {
  const router = useRouter()
  const [darkMode, setDarkMode] = useState(false)
  const [notifications, setNotifications] = useState(true)
  const [trafficAlerts, setTrafficAlerts] = useState(true)
  const [shareLocation, setShareLocation] = useState(true)
  const [largeText, setLargeText] = useState(false)

  // Modal de contactos de emergencia
  const [showEmergencyContacts, setShowEmergencyContacts] = useState(false)
  const [emergencyContacts, setEmergencyContacts] = useState<EmergencyContact[]>([
    { id: '1', name: 'Mamá', phone: '+52 55 1234 5678' },
  ])
  const [showAddContact, setShowAddContact] = useState(false)
  const [newContactName, setNewContactName] = useState('')
  const [newContactPhone, setNewContactPhone] = useState('')

  // Modal de preferencias de ruta
  const [showRoutePrefs, setShowRoutePrefs] = useState(false)
  const [avoidTolls, setAvoidTolls] = useState(false)
  const [avoidHighways, setAvoidHighways] = useState(false)
  const [preferFastest, setPreferFastest] = useState(true)

  // Modal de idioma
  const [showLanguage, setShowLanguage] = useState(false)
  const [selectedLanguage, setSelectedLanguage] = useState('es')

  const languages = [
    { code: 'es', label: 'Español' },
    { code: 'en', label: 'English' },
    { code: 'pt', label: 'Português' },
  ]

  // Efecto para aplicar modo oscuro
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  // Efecto para texto grande
  useEffect(() => {
    if (largeText) {
      document.documentElement.style.fontSize = '18px'
    } else {
      document.documentElement.style.fontSize = '16px'
    }
  }, [largeText])

  const handleAddContact = () => {
    if (!newContactName.trim() || !newContactPhone.trim()) return
    
    setEmergencyContacts(prev => [...prev, {
      id: Date.now().toString(),
      name: newContactName,
      phone: newContactPhone,
    }])
    setNewContactName('')
    setNewContactPhone('')
    setShowAddContact(false)
  }

  const handleRemoveContact = (id: string) => {
    setEmergencyContacts(prev => prev.filter(c => c.id !== id))
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border px-4 py-4">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => router.push('/profile')}
            className="p-2 -ml-2 hover:bg-secondary rounded-lg transition-colors"
          >
            <ChevronLeft className="w-6 h-6 text-foreground" />
          </button>
          <h1 className="text-lg font-bold text-foreground">Configuración</h1>
        </div>
      </div>

      {/* Modal de contactos de emergencia */}
      {showEmergencyContacts && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4">
          <Card className="w-full max-w-md max-h-[80vh] overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-foreground">Contactos de emergencia</h2>
                <button onClick={() => setShowEmergencyContacts(false)}>
                  <X className="w-6 h-6 text-muted-foreground" />
                </button>
              </div>
              
              <p className="text-sm text-muted-foreground mb-4">
                Estos contactos serán notificados en caso de emergencia durante un viaje.
              </p>

              <div className="space-y-3 mb-4 max-h-48 overflow-y-auto">
                {emergencyContacts.map((contact) => (
                  <div key={contact.id} className="flex items-center gap-3 p-3 bg-secondary rounded-lg">
                    <div className="w-10 h-10 bg-card rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-foreground" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-foreground">{contact.name}</p>
                      <p className="text-sm text-muted-foreground">{contact.phone}</p>
                    </div>
                    <button 
                      onClick={() => handleRemoveContact(contact.id)}
                      className="p-2 hover:bg-destructive/10 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </button>
                  </div>
                ))}
              </div>

              {showAddContact ? (
                <div className="space-y-3 p-3 bg-secondary rounded-lg">
                  <Input
                    placeholder="Nombre del contacto"
                    value={newContactName}
                    onChange={(e) => setNewContactName(e.target.value)}
                    className="h-10"
                  />
                  <Input
                    placeholder="Número de teléfono"
                    value={newContactPhone}
                    onChange={(e) => setNewContactPhone(e.target.value)}
                    className="h-10"
                  />
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => {
                        setShowAddContact(false)
                        setNewContactName('')
                        setNewContactPhone('')
                      }}
                    >
                      Cancelar
                    </Button>
                    <Button 
                      size="sm"
                      onClick={handleAddContact}
                      disabled={!newContactName.trim() || !newContactPhone.trim()}
                    >
                      Agregar
                    </Button>
                  </div>
                </div>
              ) : (
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => setShowAddContact(true)}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Agregar contacto
                </Button>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {/* Modal de preferencias de ruta */}
      {showRoutePrefs && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4">
          <Card className="w-full max-w-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-foreground">Preferencias de ruta</h2>
                <button onClick={() => setShowRoutePrefs(false)}>
                  <X className="w-6 h-6 text-muted-foreground" />
                </button>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-secondary rounded-lg">
                  <div>
                    <p className="font-medium text-foreground">Evitar autopistas de peaje</p>
                    <p className="text-sm text-muted-foreground">Puede aumentar el tiempo de viaje</p>
                  </div>
                  <Switch checked={avoidTolls} onCheckedChange={setAvoidTolls} />
                </div>
                <div className="flex items-center justify-between p-3 bg-secondary rounded-lg">
                  <div>
                    <p className="font-medium text-foreground">Evitar autopistas</p>
                    <p className="text-sm text-muted-foreground">Usar solo vías urbanas</p>
                  </div>
                  <Switch checked={avoidHighways} onCheckedChange={setAvoidHighways} />
                </div>
                <div className="flex items-center justify-between p-3 bg-secondary rounded-lg">
                  <div>
                    <p className="font-medium text-foreground">Preferir ruta más rápida</p>
                    <p className="text-sm text-muted-foreground">Priorizar tiempo sobre distancia</p>
                  </div>
                  <Switch checked={preferFastest} onCheckedChange={setPreferFastest} />
                </div>
              </div>

              <Button 
                className="w-full mt-6"
                onClick={() => setShowRoutePrefs(false)}
              >
                Guardar preferencias
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Modal de idioma */}
      {showLanguage && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4">
          <Card className="w-full max-w-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-foreground">Seleccionar idioma</h2>
                <button onClick={() => setShowLanguage(false)}>
                  <X className="w-6 h-6 text-muted-foreground" />
                </button>
              </div>

              <div className="space-y-2">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setSelectedLanguage(lang.code)
                      setShowLanguage(false)
                    }}
                    className={`w-full flex items-center justify-between p-4 rounded-lg transition-colors ${
                      selectedLanguage === lang.code 
                        ? 'bg-primary text-primary-foreground' 
                        : 'bg-secondary hover:bg-secondary/80 text-foreground'
                    }`}
                  >
                    <span className="font-medium">{lang.label}</span>
                    {selectedLanguage === lang.code && (
                      <div className="w-2 h-2 bg-primary-foreground rounded-full" />
                    )}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Apariencia */}
      <div className="px-4 py-6">
        <h2 className="font-semibold text-foreground mb-3">Apariencia</h2>
        <Card>
          <CardContent className="p-0 divide-y divide-border">
            <SettingToggle
              icon={Moon}
              label="Modo oscuro"
              description="Reduce el brillo para mayor comodidad"
              checked={darkMode}
              onCheckedChange={setDarkMode}
            />
            <SettingToggle
              icon={Type}
              label="Texto grande"
              description="Aumenta el tamaño del texto"
              checked={largeText}
              onCheckedChange={setLargeText}
            />
          </CardContent>
        </Card>
      </div>

      {/* Notificaciones */}
      <div className="px-4 pb-6">
        <h2 className="font-semibold text-foreground mb-3">Notificaciones</h2>
        <Card>
          <CardContent className="p-0 divide-y divide-border">
            <SettingToggle
              icon={Bell}
              label="Notificaciones push"
              description="Recibe alertas en tu dispositivo"
              checked={notifications}
              onCheckedChange={setNotifications}
            />
            <SettingToggle
              icon={MapPin}
              label="Alertas de tráfico"
              description="Información sobre congestión en tu ruta"
              checked={trafficAlerts}
              onCheckedChange={setTrafficAlerts}
            />
          </CardContent>
        </Card>
      </div>

      {/* Privacidad y seguridad */}
      <div className="px-4 pb-6">
        <h2 className="font-semibold text-foreground mb-3">Privacidad y seguridad</h2>
        <Card>
          <CardContent className="p-0 divide-y divide-border">
            <SettingToggle
              icon={MapPin}
              label="Compartir ubicación"
              description="Permite compartir tu ubicación con contactos"
              checked={shareLocation}
              onCheckedChange={setShareLocation}
            />
            <button 
              className="flex items-center gap-4 p-4 w-full hover:bg-secondary/50 transition-colors"
              onClick={() => setShowEmergencyContacts(true)}
            >
              <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-foreground" />
              </div>
              <div className="flex-1 text-left">
                <p className="font-medium text-foreground">Contactos de emergencia</p>
                <p className="text-sm text-muted-foreground">
                  {emergencyContacts.length} contacto{emergencyContacts.length !== 1 ? 's' : ''} configurado{emergencyContacts.length !== 1 ? 's' : ''}
                </p>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </button>
          </CardContent>
        </Card>
      </div>

      {/* Preferencias */}
      <div className="px-4 pb-6">
        <h2 className="font-semibold text-foreground mb-3">Preferencias</h2>
        <Card>
          <CardContent className="p-0 divide-y divide-border">
            <button 
              className="flex items-center gap-4 p-4 w-full hover:bg-secondary/50 transition-colors"
              onClick={() => setShowRoutePrefs(true)}
            >
              <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center">
                <MapPin className="w-5 h-5 text-foreground" />
              </div>
              <div className="flex-1 text-left">
                <p className="font-medium text-foreground">Preferencias de ruta</p>
                <p className="text-sm text-muted-foreground">
                  {avoidTolls || avoidHighways ? 'Personalizado' : 'Predeterminado'}
                </p>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </button>
            <button 
              className="flex items-center gap-4 p-4 w-full hover:bg-secondary/50 transition-colors"
              onClick={() => setShowLanguage(true)}
            >
              <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center">
                <Globe className="w-5 h-5 text-foreground" />
              </div>
              <div className="flex-1 text-left">
                <p className="font-medium text-foreground">Idioma</p>
                <p className="text-sm text-muted-foreground">
                  {languages.find(l => l.code === selectedLanguage)?.label}
                </p>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </button>
          </CardContent>
        </Card>
      </div>

      {/* Info de la app */}
      <div className="px-4 pb-8 text-center">
        <p className="text-sm text-muted-foreground">Movilidad Urbana v1.0.0</p>
        <Button variant="link" className="text-sm">
          Términos y condiciones
        </Button>
      </div>
    </div>
  )
}
