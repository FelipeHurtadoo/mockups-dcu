"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { 
  ChevronLeft,
  MessageCircle,
  HelpCircle,
  FileText,
  ChevronRight,
  ChevronDown,
  Send,
  Bot,
  User
} from 'lucide-react'

const faqs = [
  {
    question: '¿Cómo puedo cancelar un viaje?',
    answer: 'Puedes cancelar un viaje desde la pantalla de viaje activo presionando el botón "Cancelar viaje". Ten en cuenta que podrías recibir un cargo por cancelación si el conductor ya está en camino.',
  },
  {
    question: '¿Qué métodos de pago aceptan?',
    answer: 'Aceptamos tarjetas de crédito y débito (Visa, Mastercard, American Express), efectivo y saldo de la app que puedes recargar en cualquier momento.',
  },
  {
    question: '¿Cómo funciona el precio fijo?',
    answer: 'El precio que ves antes de confirmar tu viaje es el precio final. No hay cargos adicionales por tráfico o cambios de ruta, siempre y cuando el destino sea el mismo.',
  },
  {
    question: '¿Cómo reporto un problema con un viaje?',
    answer: 'Ve a tu historial de viajes, selecciona el viaje en cuestión y presiona "Reportar problema". También puedes contactarnos a través del chat de soporte.',
  },
  {
    question: '¿Cómo agrego un conductor a favoritos?',
    answer: 'Al finalizar un viaje, puedes agregar al conductor a favoritos presionando el ícono de corazón. También puedes hacerlo desde el detalle de cualquier viaje en tu historial.',
  },
]

interface ChatMessage {
  id: number
  type: 'user' | 'bot'
  message: string
}

export default function SupportPage() {
  const router = useRouter()
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)
  const [showChat, setShowChat] = useState(false)
  const [chatMessage, setChatMessage] = useState('')
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([
    { id: 1, type: 'bot', message: '¡Hola! Soy el asistente virtual de Movilidad Urbana. ¿En qué puedo ayudarte hoy?' },
  ])

  const handleSendMessage = () => {
    if (!chatMessage.trim()) return

    const newUserMessage: ChatMessage = {
      id: chatHistory.length + 1,
      type: 'user',
      message: chatMessage,
    }

    setChatHistory(prev => [...prev, newUserMessage])
    setChatMessage('')

    // Simular respuesta del bot
    setTimeout(() => {
      const botResponse: ChatMessage = {
        id: chatHistory.length + 2,
        type: 'bot',
        message: 'Gracias por tu mensaje. Un agente de soporte revisará tu consulta y te responderá pronto. El tiempo promedio de respuesta es de 2-4 horas.',
      }
      setChatHistory(prev => [...prev, botResponse])
    }, 1000)
  }

  if (showChat) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        {/* Header del chat */}
        <div className="bg-card border-b border-border px-4 py-4">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setShowChat(false)}
              className="p-2 -ml-2 hover:bg-secondary rounded-lg transition-colors"
            >
              <ChevronLeft className="w-6 h-6 text-foreground" />
            </button>
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
              <Bot className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="font-bold text-foreground">Soporte</h1>
              <p className="text-xs text-muted-foreground">En línea</p>
            </div>
          </div>
        </div>

        {/* Mensajes */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {chatHistory.map((msg) => (
            <div 
              key={msg.id}
              className={`flex items-end gap-2 ${msg.type === 'user' ? 'justify-end' : ''}`}
            >
              {msg.type === 'bot' && (
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                  <Bot className="w-4 h-4 text-primary-foreground" />
                </div>
              )}
              <div className={`max-w-[75%] rounded-2xl px-4 py-3 ${
                msg.type === 'user' 
                  ? 'bg-primary text-primary-foreground rounded-br-none' 
                  : 'bg-secondary text-foreground rounded-bl-none'
              }`}>
                <p className="text-sm">{msg.message}</p>
              </div>
              {msg.type === 'user' && (
                <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center flex-shrink-0">
                  <User className="w-4 h-4 text-foreground" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Input de mensaje */}
        <div className="bg-card border-t border-border p-4">
          <div className="flex items-center gap-2">
            <Input
              placeholder="Escribe tu mensaje..."
              value={chatMessage}
              onChange={(e) => setChatMessage(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              className="flex-1 h-12"
            />
            <Button 
              size="icon" 
              className="w-12 h-12"
              onClick={handleSendMessage}
              disabled={!chatMessage.trim()}
            >
              <Send className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    )
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
          <h1 className="text-lg font-bold text-foreground">Ayuda y soporte</h1>
        </div>
      </div>

      {/* Opciones de contacto */}
      <div className="px-4 py-6">
        <div className="grid grid-cols-2 gap-3">
          <Card 
            className="cursor-pointer hover:bg-secondary/50 transition-colors"
            onClick={() => setShowChat(true)}
          >
            <CardContent className="p-4 text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <MessageCircle className="w-6 h-6 text-primary" />
              </div>
              <p className="font-medium text-foreground">Chat de ayuda</p>
              <p className="text-xs text-muted-foreground mt-1">Respuesta inmediata</p>
            </CardContent>
          </Card>
          <Card 
            className="cursor-pointer hover:bg-secondary/50 transition-colors"
            onClick={() => router.push('/report')}
          >
            <CardContent className="p-4 text-center">
              <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <FileText className="w-6 h-6 text-accent" />
              </div>
              <p className="font-medium text-foreground">Reportar problema</p>
              <p className="text-xs text-muted-foreground mt-1">Con tu último viaje</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* FAQs */}
      <div className="px-4 pb-6">
        <h2 className="font-semibold text-foreground mb-3 flex items-center gap-2">
          <HelpCircle className="w-5 h-5" />
          Preguntas frecuentes
        </h2>
        <Card>
          <CardContent className="p-0 divide-y divide-border">
            {faqs.map((faq, index) => (
              <div key={index}>
                <button
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                  className="flex items-center gap-3 p-4 w-full text-left hover:bg-secondary/50 transition-colors"
                >
                  <span className="flex-1 font-medium text-foreground">{faq.question}</span>
                  <ChevronDown 
                    className={`w-5 h-5 text-muted-foreground transition-transform ${
                      expandedFaq === index ? 'rotate-180' : ''
                    }`} 
                  />
                </button>
                {expandedFaq === index && (
                  <div className="px-4 pb-4">
                    <p className="text-sm text-muted-foreground">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Contacto adicional */}
      <div className="px-4 pb-8">
        <Card className="bg-secondary/50">
          <CardContent className="p-4 text-center">
            <p className="text-sm text-muted-foreground mb-2">
              ¿No encontraste lo que buscabas?
            </p>
            <p className="font-medium text-foreground">
              Escríbenos a soporte@movilidadurbana.com
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
