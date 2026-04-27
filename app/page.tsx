import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Car, Shield, Clock, MapPin, Star, ArrowRight } from 'lucide-react'

const features = [
  {
    icon: Shield,
    title: 'Viajes seguros',
    description: 'Conductores verificados y botón de emergencia siempre disponible',
  },
  {
    icon: Clock,
    title: 'Precio fijo',
    description: 'Conoce el costo antes de confirmar, sin sorpresas',
  },
  {
    icon: MapPin,
    title: 'Seguimiento en tiempo real',
    description: 'Comparte tu ubicación y monitorea tu ruta',
  },
  {
    icon: Star,
    title: 'Conductores favoritos',
    description: 'Guarda tus conductores preferidos para futuros viajes',
  },
]

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-secondary via-background to-background" />

        <div className="relative max-w-5xl mx-auto px-4 py-16 sm:py-24">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-12">
            <span className="text-4xl font-bold text-foreground">Movilidad Urbana</span>
          </div>

          {/* Hero content */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="max-w-2xl">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground tracking-tight text-balance">
                Tu transporte urbano, simple y seguro
              </h1>
              <p className="mt-6 text-lg sm:text-xl text-muted-foreground text-pretty">
                Planifica rutas, solicita transporte y llega a tu destino con información en tiempo real.
                Diseñado para estudiantes y trabajadores que valoran su tiempo.
              </p>

              {/* CTA Buttons */}
              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <Link href="/login">
                  <Button size="lg" className="w-full sm:w-auto h-14 px-8 text-base font-semibold">
                    Iniciar sesión
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Link href="/register">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto h-14 px-8 text-base font-semibold">
                    Crear cuenta
                  </Button>
                </Link>
              </div>
            </div>

            {/* Hero Image */}
            <div className="hidden md:block shrink-0">
              <img
                src="/images/logo.png"
                alt="Movilidad Urbana Logo"
                className="w-64 h-64 lg:w-[350px] lg:h-[350px] rounded-3xl object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-5xl mx-auto px-4 py-16">
        <h2 className="text-2xl sm:text-3xl font-bold text-foreground text-center mb-12">
          Todo lo que necesitas para moverte
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="bg-card border border-border rounded-2xl p-6 hover:shadow-lg transition-shadow"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-primary text-primary-foreground">
        <div className="max-w-5xl mx-auto px-4 py-16">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-4xl font-bold">50K+</p>
              <p className="text-primary-foreground/80 mt-1">Usuarios activos</p>
            </div>
            <div>
              <p className="text-4xl font-bold">1M+</p>
              <p className="text-primary-foreground/80 mt-1">Viajes completados</p>
            </div>
            <div>
              <p className="text-4xl font-bold">4.9</p>
              <p className="text-primary-foreground/80 mt-1">Calificación promedio</p>
            </div>
            <div>
              <p className="text-4xl font-bold">3 min</p>
              <p className="text-primary-foreground/80 mt-1">Tiempo de espera</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-5xl mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
          ¿Listo para moverte mejor?
        </h2>
        <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
          Únete a miles de usuarios que ya disfrutan de viajes seguros,
          rápidos y con precio fijo.
        </p>
        <Link href="/register">
          <Button size="lg" className="h-14 px-8 text-base font-semibold">
            Crear cuenta gratis
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </Link>
      </div>

      {/* Footer */}
      <footer className="border-t border-border">
        <div className="max-w-5xl mx-auto px-4 py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <img
                src="/images/logo.png"
                alt="Movilidad Urbana"
                className="w-20 h-20 rounded object-cover"
              />
              <span className="text-sm text-muted-foreground">Movilidad Urbana</span>
            </div>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <Link href="#" className="hover:text-foreground transition-colors">Términos</Link>
              <Link href="#" className="hover:text-foreground transition-colors">Privacidad</Link>
              <Link href="#" className="hover:text-foreground transition-colors">Soporte</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
