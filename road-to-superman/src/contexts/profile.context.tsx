"use client"

import { PropsWithChildren, createContext, useContext, useEffect } from "react"

import { Observable } from "@legendapp/state"
import { useObservable } from "@legendapp/state/react"

import { User } from "@/types/auth.type"
import { UserProfile } from "@/types/profile.type"

type ProfileContextType = {
  profile: Observable<UserProfile | null>
  user: Observable<User | null>
}

const ProfileContext = createContext<ProfileContextType | null>(null)

interface ProfileContextProviderProps {
  profile: UserProfile | null
  user: User | null
}
function ProfileContextProvider({
  profile,
  user,
  children,
}: PropsWithChildren<ProfileContextProviderProps>) {
  // @ts-ignore - Suppressing deep type instantiation error
  const profile$ = useObservable<UserProfile | null>(profile)
  const user$ = useObservable<User | null>(user)

  // Update observables when props change
  useEffect(() => {
    profile$.set(profile)
    console.log("profile$ updated", profile$.get())
  }, [profile, profile$])

  useEffect(() => {
    user$.set(user)
    console.log("user$ updated", user$.get())
  }, [user, user$])

  const value: ProfileContextType = {
    profile: profile$,
    user: user$,
  }

  return <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
}

function useProfileContext() {
  const profileContext = useContext(ProfileContext)

  if (!profileContext) {
    throw new Error("useProfileContext must be used within a ProfileContextProvider")
  }

  return profileContext
}

export { ProfileContextProvider, useProfileContext } 