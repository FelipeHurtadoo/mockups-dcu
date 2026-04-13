"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import {
  Star,
  Heart,
  Check,
  ThumbsUp,
  MessageCircle
} from 'lucide-react'

export default function CompletedTripPage() {
  const router = useRouter()
  const [rating, setRating] = useState(0)
  const [isFavorite, setIsFavorite] = useState(false)
  const [feedback, setFeedback] = useState<string[]>([])
  const [submitted, setSubmitted] = useState(false)
  const [showComment, setShowComment] = useState(false)
  const [comment, setComment] = useState('')

  const feedbackOptions = [
    'Excelente conversación',
    'Vehículo limpio',
    'Conducción segura',
    'Puntual',
    'Buen servicio',
  ]

  const handleSubmit = () => {
    setSubmitted(true)
    setTimeout(() => {
      router.push('/home')
    }, 2000)
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-sm">
          <CardContent className="p-8 text-center">
            <div className="w-20 h-20 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-10 h-10 text-accent" />
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-2">¡Gracias!</h1>
            <p className="text-muted-foreground">
              Tu calificación ha sido enviada. Te llevamos de vuelta al inicio.
            </p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="bg-accent text-accent-foreground px-4 py-8 text-center">
        <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <ThumbsUp className="w-8 h-8" />
        </div>
        <h1 className="text-2xl font-bold mb-2">¡Viaje completado!</h1>
        <p className="opacity-90">Has llegado a tu destino</p>
      </div>

      {/* Resumen */}
      <div className="px-4 py-6">
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm text-muted-foreground">Total del viaje</p>
                <p className="text-3xl font-bold text-foreground">$75.00</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Pagado con</p>
                <p className="font-medium text-foreground">Visa ****4242</p>
              </div>
            </div>
            <div className="flex items-center justify-between text-sm text-muted-foreground pt-4 border-t border-border">
              <span>Duración: 18 min</span>
              <span>Distancia: 6.2 km</span>
            </div>
          </CardContent>
        </Card>

        {/* Calificar conductor */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 bg-secondary rounded-full flex items-center justify-center text-xl font-bold text-foreground">
                C
              </div>
              <div className="flex-1">
                <p className="font-semibold text-foreground">Carlos Mendoza</p>
                <p className="text-sm text-muted-foreground">Toyota Corolla · ABC-123</p>
              </div>
              <Button
                variant={isFavorite ? "default" : "outline"}
                size="icon"
                onClick={() => setIsFavorite(!isFavorite)}
                className="rounded-full"
              >
                <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
              </Button>
            </div>

            <div className="text-center mb-4">
              <p className="text-sm text-muted-foreground mb-2">¿Cómo fue tu viaje?</p>
              <div className="flex items-center justify-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setRating(star)}
                    className="p-1 transition-transform hover:scale-110"
                  >
                    <Star
                      className={`w-10 h-10 ${star <= rating
                        ? 'text-warning fill-warning'
                        : 'text-border'
                        }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            {rating > 0 && (
              <div className="space-y-3">
                <p className="text-sm text-muted-foreground text-center">
                  ¿Qué te gustó del viaje?
                </p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {feedbackOptions.map((option) => (
                    <button
                      key={option}
                      onClick={() => {
                        setFeedback(prev =>
                          prev.includes(option)
                            ? prev.filter(f => f !== option)
                            : [...prev, option]
                        )
                      }}
                      className={`px-3 py-1.5 text-sm rounded-full border transition-colors ${feedback.includes(option)
                        ? 'bg-primary text-primary-foreground border-primary'
                        : 'bg-card text-foreground border-border hover:bg-secondary'
                        }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Comentario adicional */}
        {!showComment ? (
          <Button
            variant="outline"
            className="w-full mb-4 h-12"
            onClick={() => setShowComment(true)}
          >
            <MessageCircle className="w-5 h-5 mr-2" />
            Dejar un comentario
          </Button>
        ) : (
          <Card className="mb-4">
            <CardContent className="p-4">
              <p className="text-sm font-medium text-foreground mb-2">Tu comentario</p>
              <Textarea
                placeholder="Escribe un comentario sobre tu experiencia..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={3}
                className="resize-none"
              />
              <div className="flex gap-2 mt-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setShowComment(false)
                    setComment('')
                  }}
                >
                  Cancelar
                </Button>
                <Button
                  size="sm"
                  onClick={() => setShowComment(false)}
                  disabled={!comment.trim()}
                >
                  Guardar
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Footer */}
      <div className="mt-auto bg-card border-t border-border p-4">
        <Button
          className="w-full h-14 text-base font-semibold"
          onClick={handleSubmit}
          disabled={rating === 0}
        >
          {rating > 0 ? 'Enviar calificación' : 'Selecciona una calificación'}
        </Button>
        <Button
          variant="ghost"
          className="w-full mt-2"
          onClick={() => router.push('/home')}
        >
          Omitir
        </Button>
      </div>
    </div>
  )
}
