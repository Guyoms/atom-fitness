"use server"

import { cache } from "react"

import { revalidatePath } from "next/cache"
import { cookies, headers } from "next/headers"
import { redirect } from "next/navigation"


import { AUTH_CALLBACK_GOOGLE_ROUTE, AUTH_CALLBACK_ROUTE, AUTH_ROUTE } from "@/configs/routes"
import { createClient } from "@supabase/supabase-js"
import { SignInFormType, SignUpFormType } from "@/types/auth.type"
import { createSupabaseClient } from "@/libs/supabase/server"

export const getUser = cache(async () => {
  const supabase = await createSupabaseClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  console.log("user de fou", user);
  return user;
});

export async function login(formData: SignInFormType) {
  const supabase = await createSupabaseClient()

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

  return true
}

export async function signup(formData: SignUpFormType) {
  const supabase = await createSupabaseClient()

  const origin = (await headers()).get("origin")

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

  revalidatePath(AUTH_ROUTE, "layout")
  redirect(AUTH_ROUTE)
}

export async function signout() {
  const supabase = await createSupabaseClient()
  const { error } = await supabase.auth.signOut()

  if (error) throw error
}

export async function signInWithGoogle() {
  const supabase = await createSupabaseClient()
  const origin = (await headers()).get("origin")

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
