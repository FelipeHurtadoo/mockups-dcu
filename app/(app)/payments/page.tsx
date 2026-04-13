"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { mockPaymentMethods, mockUser } from '@/lib/mock-data'
import { 
  CreditCard, 
  Wallet, 
  Banknote,
  Plus,
  Check,
  ChevronRight,
  Sparkles,
  X
} from 'lucide-react'

const paymentIcons: Record<string, React.ElementType> = {
  card: CreditCard,
  wallet: Wallet,
  cash: Banknote,
}

const rechargeAmounts = [50, 100, 200, 500]

interface PaymentMethod {
  id: string
  type: 'card' | 'cash' | 'wallet'
  label: string
  lastFour?: string
  isDefault: boolean
}

export default function PaymentsPage() {
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null)
  const [showRecharge, setShowRecharge] = useState(false)
  const [showAddCard, setShowAddCard] = useState(false)
  const [showPromoCode, setShowPromoCode] = useState(false)
  const [rechargeAmount, setRechargeAmount] = useState<number | null>(null)
  const [customAmount, setCustomAmount] = useState('')
  const [isRecharging, setIsRecharging] = useState(false)
  const [balance, setBalance] = useState(mockUser.balance)
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>(mockPaymentMethods)
  
  // Estados para agregar tarjeta
  const [cardNumber, setCardNumber] = useState('')
  const [cardExpiry, setCardExpiry] = useState('')
  const [cardCvv, setCardCvv] = useState('')
  const [cardName, setCardName] = useState('')
  const [isAddingCard, setIsAddingCard] = useState(false)

  // Estados para código promocional
  const [promoCode, setPromoCode] = useState('')
  const [promoApplied, setPromoApplied] = useState(false)
  const [promoError, setPromoError] = useState('')

  const handleRecharge = async () => {
    const amount = rechargeAmount || parseInt(customAmount) || 0
    if (amount <= 0) return

    setIsRecharging(true)
    await new Promise(resolve => setTimeout(resolve, 1500))
    setBalance(prev => prev + amount)
    setIsRecharging(false)
    setShowRecharge(false)
    setRechargeAmount(null)
    setCustomAmount('')
  }

  const handleAddCard = async () => {
    if (!cardNumber || !cardExpiry || !cardCvv || !cardName) return

    setIsAddingCard(true)
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    const lastFour = cardNumber.replace(/\s/g, '').slice(-4)
    const newCard: PaymentMethod = {
      id: Date.now().toString(),
      type: 'card',
      label: cardNumber.startsWith('4') ? 'Visa' : 'Mastercard',
      lastFour,
      isDefault: false,
    }
    
    setPaymentMethods(prev => [...prev, newCard])
    setIsAddingCard(false)
    setShowAddCard(false)
    setCardNumber('')
    setCardExpiry('')
    setCardCvv('')
    setCardName('')
  }

  const handleApplyPromo = async () => {
    if (!promoCode.trim()) return
    
    setPromoError('')
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    if (promoCode.toUpperCase() === 'VIAJA20') {
      setPromoApplied(true)
      setShowPromoCode(false)
    } else {
      setPromoError('Código promocional inválido')
    }
  }

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    const matches = v.match(/\d{4,16}/g)
    const match = matches && matches[0] || ''
    const parts = []
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }
    return parts.length ? parts.join(' ') : value
  }

  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4)
    }
    return v
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border px-4 py-4">
        <h1 className="text-xl font-bold text-foreground">Pagos</h1>
        <p className="text-sm text-muted-foreground">Gestiona tus métodos de pago</p>
      </div>

      {/* Saldo */}
      <div className="px-4 py-6">
        <Card className="bg-primary text-primary-foreground overflow-hidden">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm opacity-80">Saldo disponible</p>
                <p className="text-4xl font-bold mt-1">${balance.toFixed(2)}</p>
              </div>
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <Wallet className="w-6 h-6" />
              </div>
            </div>
            <Button 
              variant="secondary"
              className="w-full mt-4"
              onClick={() => setShowRecharge(true)}
            >
              <Plus className="w-4 h-4 mr-2" />
              Recargar saldo
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Modal de recarga */}
      {showRecharge && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center">
          <Card className="w-full sm:max-w-md sm:mx-4 rounded-t-3xl sm:rounded-2xl">
            <CardContent className="p-6">
              <div className="w-12 h-1 bg-border rounded-full mx-auto mb-4 sm:hidden" />
              
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-xl font-bold text-foreground">Recargar saldo</h2>
                <button onClick={() => setShowRecharge(false)}>
                  <X className="w-6 h-6 text-muted-foreground" />
                </button>
              </div>
              <p className="text-muted-foreground mb-6">Selecciona el monto a recargar</p>

              {/* Montos predefinidos */}
              <div className="grid grid-cols-4 gap-2 mb-4">
                {rechargeAmounts.map((amount) => (
                  <button
                    key={amount}
                    onClick={() => {
                      setRechargeAmount(amount)
                      setCustomAmount('')
                    }}
                    className={`py-3 rounded-xl font-semibold transition-colors ${
                      rechargeAmount === amount
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-secondary text-foreground hover:bg-secondary/80'
                    }`}
                  >
                    ${amount}
                  </button>
                ))}
              </div>

              {/* Monto personalizado */}
              <div className="mb-6">
                <label className="text-sm text-muted-foreground mb-2 block">
                  O ingresa otro monto
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                  <Input
                    type="number"
                    placeholder="0.00"
                    value={customAmount}
                    onChange={(e) => {
                      setCustomAmount(e.target.value)
                      setRechargeAmount(null)
                    }}
                    className="pl-8 h-12"
                  />
                </div>
              </div>

              {/* Botones */}
              <div className="flex gap-3">
                <Button 
                  variant="outline" 
                  className="flex-1 h-12"
                  onClick={() => {
                    setShowRecharge(false)
                    setRechargeAmount(null)
                    setCustomAmount('')
                  }}
                >
                  Cancelar
                </Button>
                <Button 
                  className="flex-1 h-12"
                  disabled={!rechargeAmount && !customAmount || isRecharging}
                  onClick={handleRecharge}
                >
                  {isRecharging ? 'Procesando...' : 'Recargar'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Modal de agregar tarjeta */}
      {showAddCard && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center">
          <Card className="w-full sm:max-w-md sm:mx-4 rounded-t-3xl sm:rounded-2xl">
            <CardContent className="p-6">
              <div className="w-12 h-1 bg-border rounded-full mx-auto mb-4 sm:hidden" />
              
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-xl font-bold text-foreground">Agregar tarjeta</h2>
                <button onClick={() => setShowAddCard(false)}>
                  <X className="w-6 h-6 text-muted-foreground" />
                </button>
              </div>
              <p className="text-muted-foreground mb-6">Ingresa los datos de tu tarjeta</p>

              <div className="space-y-4">
                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">
                    Nombre en la tarjeta
                  </label>
                  <Input
                    placeholder="Como aparece en la tarjeta"
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                    className="h-12"
                  />
                </div>

                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">
                    Número de tarjeta
                  </label>
                  <Input
                    placeholder="1234 5678 9012 3456"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                    maxLength={19}
                    className="h-12"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-muted-foreground mb-2 block">
                      Vencimiento
                    </label>
                    <Input
                      placeholder="MM/AA"
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(formatExpiry(e.target.value))}
                      maxLength={5}
                      className="h-12"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground mb-2 block">
                      CVV
                    </label>
                    <Input
                      placeholder="123"
                      value={cardCvv}
                      onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, '').slice(0, 4))}
                      maxLength={4}
                      className="h-12"
                      type="password"
                    />
                  </div>
                </div>
              </div>

              {/* Botones */}
              <div className="flex gap-3 mt-6">
                <Button 
                  variant="outline" 
                  className="flex-1 h-12"
                  onClick={() => {
                    setShowAddCard(false)
                    setCardNumber('')
                    setCardExpiry('')
                    setCardCvv('')
                    setCardName('')
                  }}
                >
                  Cancelar
                </Button>
                <Button 
                  className="flex-1 h-12"
                  disabled={!cardNumber || !cardExpiry || !cardCvv || !cardName || isAddingCard}
                  onClick={handleAddCard}
                >
                  {isAddingCard ? 'Agregando...' : 'Agregar'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Modal de código promocional */}
      {showPromoCode && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center">
          <Card className="w-full sm:max-w-md sm:mx-4 rounded-t-3xl sm:rounded-2xl">
            <CardContent className="p-6">
              <div className="w-12 h-1 bg-border rounded-full mx-auto mb-4 sm:hidden" />
              
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-xl font-bold text-foreground">Código promocional</h2>
                <button onClick={() => {
                  setShowPromoCode(false)
                  setPromoError('')
                }}>
                  <X className="w-6 h-6 text-muted-foreground" />
                </button>
              </div>
              <p className="text-muted-foreground mb-6">Ingresa tu código de descuento</p>

              <div className="mb-4">
                <Input
                  placeholder="Ej: VIAJA20"
                  value={promoCode}
                  onChange={(e) => {
                    setPromoCode(e.target.value.toUpperCase())
                    setPromoError('')
                  }}
                  className="h-12 text-center text-lg font-semibold tracking-wider"
                />
                {promoError && (
                  <p className="text-destructive text-sm mt-2 text-center">{promoError}</p>
                )}
              </div>

              {/* Botones */}
              <div className="flex gap-3">
                <Button 
                  variant="outline" 
                  className="flex-1 h-12"
                  onClick={() => {
                    setShowPromoCode(false)
                    setPromoCode('')
                    setPromoError('')
                  }}
                >
                  Cancelar
                </Button>
                <Button 
                  className="flex-1 h-12"
                  disabled={!promoCode.trim()}
                  onClick={handleApplyPromo}
                >
                  Aplicar
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Métodos de pago */}
      <div className="px-4 pb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-foreground">Métodos de pago</h2>
          <Button variant="ghost" size="sm" onClick={() => setShowAddCard(true)}>
            <Plus className="w-4 h-4 mr-1" />
            Agregar
          </Button>
        </div>

        <div className="space-y-3">
          {paymentMethods.map((method) => {
            const Icon = paymentIcons[method.type]
            return (
              <Card 
                key={method.id}
                className={`cursor-pointer transition-all ${
                  selectedMethod === method.id 
                    ? 'ring-2 ring-primary' 
                    : 'hover:bg-secondary/50'
                }`}
                onClick={() => setSelectedMethod(
                  selectedMethod === method.id ? null : method.id
                )}
              >
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center">
                      <Icon className="w-6 h-6 text-foreground" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-foreground">{method.label}</p>
                        {method.isDefault && (
                          <span className="text-xs bg-accent/20 text-accent px-2 py-0.5 rounded-full">
                            Predeterminado
                          </span>
                        )}
                      </div>
                      {method.lastFour && (
                        <p className="text-sm text-muted-foreground">
                          **** {method.lastFour}
                        </p>
                      )}
                    </div>
                    {selectedMethod === method.id ? (
                      <Check className="w-5 h-5 text-accent" />
                    ) : (
                      <ChevronRight className="w-5 h-5 text-muted-foreground" />
                    )}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>

      {/* Promociones */}
      <div className="px-4 pb-6">
        <Card className={`border ${promoApplied ? 'bg-accent/10 border-accent/30' : 'bg-accent/10 border-accent/30'}`}>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-accent/20 rounded-full flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-accent" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-foreground">Código promocional</p>
                {promoApplied ? (
                  <p className="text-sm text-accent font-medium">VIAJA20 aplicado - 20% de descuento</p>
                ) : (
                  <p className="text-sm text-muted-foreground">Usa VIAJA20 y obtén 20% de descuento</p>
                )}
              </div>
              {promoApplied ? (
                <Check className="w-5 h-5 text-accent" />
              ) : (
                <Button variant="outline" size="sm" onClick={() => setShowPromoCode(true)}>
                  Aplicar
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
