"use client"

import { createContext, useContext, useState, ReactNode } from 'react'
import { mockUser } from './mock-data'

interface User {
  id: string
  name: string
  email: string
  phone: string
  photo: string
  balance: number
  favoriteDrivers: string[]
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<boolean>
  register: (name: string, email: string, phone: string, password: string) => Promise<boolean>
  logout: () => void
  updateUser: (updates: Partial<User>) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulación de login
    await new Promise(resolve => setTimeout(resolve, 1000))
    if (email && password.length >= 6) {
      setUser(mockUser)
      return true
    }
    return false
  }

  const register = async (name: string, email: string, phone: string, password: string): Promise<boolean> => {
    // Simulación de registro
    await new Promise(resolve => setTimeout(resolve, 1000))
    if (name && email && password.length >= 6) {
      setUser({ ...mockUser, name, email, phone: phone || mockUser.phone })
      return true
    }
    return false
  }

  const logout = () => {
    setUser(null)
  }

  const updateUser = (updates: Partial<User>) => {
    setUser(prev => prev ? { ...prev, ...updates } : null)
  }

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      login,
      register,
      logout,
      updateUser,
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
