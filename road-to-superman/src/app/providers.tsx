"use client"

import { HeroUIProvider, ToastProvider, user } from "@heroui/react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ThemeProvider } from "next-themes"

import { Toaster } from "./components/ui/shadcn/toaster"
import { getUserProfile } from "@/actions/profile.actions"
import { getUser } from "@/actions/auth.actions"
import { useEffect, useState } from "react"
import { ProfileContextProvider } from "@/contexts/profile.context"
import { UserProfile } from "@/types/profile.type"
import { User } from "@/types/auth.type"


export function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient()
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [user, setUser] = useState<User | null>(null) 


  useEffect(() => {
    const fetchData = async () => {
      const fetchedUser = await getUser();
      console.log("fetchData", fetchedUser)
      setUser(fetchedUser);
      if (fetchedUser) {
        const fetchedProfile = await getUserProfile(fetchedUser);
        setProfile(fetchedProfile);
        console.log("profile", fetchedProfile)
      }
    };

    fetchData();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <HeroUIProvider>
          <ProfileContextProvider profile={profile} user={user}>
            {children}
          </ProfileContextProvider>
          <ToastProvider />
        </HeroUIProvider>
        <Toaster />
      </ThemeProvider>
    </QueryClientProvider>
  )
}
