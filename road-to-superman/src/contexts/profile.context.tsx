"use client"

import { PropsWithChildren, createContext, useContext } from "react"

import { Observable } from "@legendapp/state"
import { useObservable } from "@legendapp/state/react"

import { User } from "@/types/auth.type"
import { UserProfile } from "@/types/profile.type"

type ProfileContextType = {
  profile: Observable<UserProfile | null>
  user: Observable<User | null>
}

// @ts-expect-error - Type definition will be added later
const ProfileContext = createContext<ProfileContextType>(null)

interface ProfileContextProviderProps {
  profile: UserProfile | null
  user: User | null
}
function ProfileContextProvider({
  profile,
  user,
  children,
}: PropsWithChildren<ProfileContextProviderProps>) {
  const profile$ = useObservable(profile)
  const user$ = useObservable(user)

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