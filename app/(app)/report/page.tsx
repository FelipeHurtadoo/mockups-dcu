"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { 
  ChevronLeft, 
  AlertTriangle, 
  Car, 
  Construction,
  Check,
  MapPin
} from 'lucide-react'

const incidentTypes = [
  { 
    id: 'traffic', 
    label: 'Tráfico intenso', 
    icon: Car,
    description: 'Congestión vehicular en la zona'
  },
  { 
    id: 'accident', 
    label: 'Accidente', 
    icon: AlertTriangle,
    description: 'Colisión o incidente vial'
  },
  { 
    id: 'construction', 
    label: 'Obra en la vía', 
    icon: Construction,
    description: 'Trabajos de construcción'
  },
  { 
    id: 'block', 
    label: 'Bloqueo', 
    icon: AlertTriangle,
    description: 'Calle cerrada o bloqueada'
  },
]

export default function ReportPage() {
  const router = useRouter()
  const [selectedType, setSelectedType] = useState<string | null>(null)
  const [description, setDescription] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async () => {
    if (!selectedType) return
    
    setIsSubmitting(true)
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsSubmitting(false)
    setIsSubmitted(true)

    setTimeout(() => {
      router.push('/home')
    }, 2000)
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-sm">
          <CardContent className="p-8 text-center">
            <div className="w-20 h-20 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-10 h-10 text-accent" />
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-2">¡Reporte enviado!</h1>
            <p className="text-muted-foreground">
              Gracias por ayudar a mejorar la movilidad de tu ciudad.
            </p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="bg-card border-b border-border px-4 py-4">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => router.push('/home')}
            className="p-2 -ml-2 hover:bg-secondary rounded-lg transition-colors"
          >
            <ChevronLeft className="w-6 h-6 text-foreground" />
          </button>
          <div>
            <h1 className="text-lg font-bold text-foreground">Reportar incidente</h1>
            <p className="text-sm text-muted-foreground">Ayuda a otros usuarios</p>
          </div>
        </div>
      </div>

      {/* Ubicación actual */}
      <div className="px-4 py-4 bg-secondary/50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
            <MapPin className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Reportando cerca de</p>
            <p className="font-medium text-foreground">Tu ubicación actual</p>
          </div>
        </div>
      </div>

      {/* Tipos de incidente */}
      <div className="flex-1 px-4 py-6">
        <h2 className="font-semibold text-foreground mb-4">Tipo de incidente</h2>
        <div className="grid grid-cols-2 gap-3 mb-6">
          {incidentTypes.map((type) => (
            <Card 
              key={type.id}
              className={`cursor-pointer transition-all ${
                selectedType === type.id 
                  ? 'ring-2 ring-primary bg-primary/5' 
                  : 'hover:bg-secondary/50'
              }`}
              onClick={() => setSelectedType(type.id)}
            >
              <CardContent className="p-4 text-center">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 ${
                  selectedType === type.id 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-secondary text-foreground'
                }`}>
                  <type.icon className="w-6 h-6" />
                </div>
                <p className="font-medium text-foreground text-sm">{type.label}</p>
                <p className="text-xs text-muted-foreground mt-1">{type.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Descripción opcional */}
        {selectedType && (
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Descripción adicional (opcional)
            </label>
            <Textarea
              placeholder="Agrega más detalles sobre el incidente..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="resize-none"
            />
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="bg-card border-t border-border p-4">
        <Button 
          className="w-full h-14 text-base font-semibold"
          disabled={!selectedType || isSubmitting}
          onClick={handleSubmit}
        >
          {isSubmitting ? 'Enviando...' : 'Enviar reporte'}
        </Button>
      </div>
    </div>
  )
}
