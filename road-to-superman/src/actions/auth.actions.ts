"use server"

import { cache } from "react"

import { revalidatePath } from "next/cache"
import { cookies, headers } from "next/headers"
import { redirect } from "next/navigation"

import {
  AUTH_EMAIL_CONFIRMATION_COOKIE_VALUE,
  AUTH_STATE_COOKIE_NAME,
  INVITATION_COOKIE_NAME,
} from "@/configs/cookies"
import { AUTH_CALLBACK_GOOGLE_ROUTE, AUTH_CALLBACK_ROUTE, AUTH_ROUTE } from "@/configs/routes"

import { createSupabaseClient } from "@/libs/supabase/server"

import {
  EmailFormType,
  ResetPasswordFormType,
  type SignInFormType,
  type SignUpFormType,
} from "@/types/auth.type"

export const getUser = cache(async () => {
  const supabase = createSupabaseClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  return user
})

export async function login(formData: SignInFormType) {
  const supabase = createSupabaseClient()

  const { error } = await supabase.auth.signInWithPassword({
    email: formData.email.toLowerCase(),
    password: formData.password,
  })

  if (error) {
    // Renvoyer des codes d'erreur standardisés pour faciliter la traduction
    let errorCode = "default"

    // Mapper les erreurs Supabase vers nos propres codes d'erreur
    switch (error.message) {
      case "Invalid login credentials":
        errorCode = "invalid_credentials"
        break
      case "Email not confirmed":
        errorCode = "email_not_confirmed"
        break
      case "Too many requests":
        errorCode = "too_many_attempts"
        break
      case "User not found":
        errorCode = "user_not_found"
        break
      // Ajouter d'autres mappings au besoin
    }

    // Créer une nouvelle erreur avec notre code standardisé
    const translatedError = new Error(errorCode)
    throw translatedError
  }

  const cookiesStore = cookies()

  const hasInvite = cookiesStore.has(INVITATION_COOKIE_NAME)

  return hasInvite
}

export async function signup(formData: SignUpFormType) {
  const supabase = createSupabaseClient()

  const origin = headers().get("origin")

  const { error } = await supabase.auth.signUp({
    email: formData.email.toLowerCase(),
    password: formData.password,
    options: {
      emailRedirectTo: origin + AUTH_CALLBACK_ROUTE,
      data: {
        username: formData.username.toLowerCase(),
      },
    },
  })

  if (error) throw error

  const cookieStore = cookies()
  cookieStore.set(AUTH_STATE_COOKIE_NAME, AUTH_EMAIL_CONFIRMATION_COOKIE_VALUE, {
    maxAge: 3600, // Resend email option is available for 1 hour
  })

  revalidatePath(AUTH_ROUTE, "layout")
  redirect(AUTH_ROUTE)
}

export async function checkUsernameAvailability(username: string) {
  const supabase = createSupabaseClient()

  const { data } = await supabase
    .from("profiles")
    .select("username")
    .eq("username", username.toLowerCase())
    .maybeSingle()

  if (data) {
    // username is not available
    return false
  }

  // username is available
  return true
}

export async function checkEmailAvailability(email: string) {
  const supabase = createSupabaseClient()

  const { data } = await supabase
    .from("profiles")
    .select("email")
    .eq("email", email.toLowerCase())
    .maybeSingle()

  if (data) {
    // email is not available
    return false
  }

  // email is available
  return true
}

export async function resendEmailConfirmation(data: EmailFormType) {
  const supabase = createSupabaseClient()

  const origin = headers().get("origin")

  const { error } = await supabase.auth.resend({
    type: "signup",
    email: data.email.toLowerCase(),
    options: {
      emailRedirectTo: origin + AUTH_CALLBACK_ROUTE,
    },
  })

  if (error) throw error
}

export async function sendResetPasswordEmail(data: EmailFormType) {
  const supabase = createSupabaseClient()

  const origin = headers().get("origin")

  const { error } = await supabase.auth.resetPasswordForEmail(data.email.toLowerCase(), {
    redirectTo: origin + AUTH_CALLBACK_ROUTE,
  })

  if (error) throw error
}

export async function resetPassword(data: ResetPasswordFormType) {
  if (data.password !== data.confirmPassword) return "Passwords do not match"

  const supabase = createSupabaseClient()

  const { error } = await supabase.auth.updateUser({
    password: data.password,
  })

  if (error) throw error
}

export async function updateEmailAddress(data: EmailFormType) {
  const supabase = createSupabaseClient()

  const origin = headers().get("origin")

  const { error } = await supabase.auth.updateUser(
    {
      email: data.email,
    },
    {
      emailRedirectTo: origin + AUTH_CALLBACK_ROUTE,
    }
  )

  if (error) throw error
}

export async function signout() {
  const supabase = createSupabaseClient()
  const { error } = await supabase.auth.signOut()

  if (error) throw error
}

export async function signInWithGoogle() {
  const supabase = createSupabaseClient()
  const origin = headers().get("origin")

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: origin + AUTH_CALLBACK_GOOGLE_ROUTE,
    },
  })

  if (error) throw error

  // The user will be redirected to the provider's page,
  // and then back to the redirectTo URL.
  // We need to redirect the user from the server action

  if (data.url) {
    redirect(data.url)
  }

  // If there's no URL, it might mean the user is already logged in
  // or some other scenario occurred. Redirect to a default page or handle as needed.
  // For now, let's redirect to the auth callback route implicitly handled by Supabase.
}

export async function removeAuthStateCookie() {
  cookies().delete(AUTH_STATE_COOKIE_NAME)
}
