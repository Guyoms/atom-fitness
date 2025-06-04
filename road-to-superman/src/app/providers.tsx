"use client"

import { HeroUIProvider, ToastProvider } from "@heroui/react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ThemeProvider } from "next-themes"
import { Toaster } from "./components/ui/shadcn/toaster"
import { UserProfile } from "@/types/profile.type"
import { User } from "@/types/auth.type"
import { ProfileContextProvider } from "@/contexts/profile.context"

interface ProvidersProps {
  children: React.ReactNode
  initialUser: User | null
  initialProfile: UserProfile | null
}

export function Providers({ children, initialUser, initialProfile }: ProvidersProps) {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
        <HeroUIProvider>
          <ProfileContextProvider profile={initialProfile} user={initialUser}>
            {children}
          </ProfileContextProvider>
          <ToastProvider />
        </HeroUIProvider>
        <Toaster />
      </ThemeProvider>
    </QueryClientProvider>
  )
}
