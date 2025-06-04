"use server"

import { cache } from "react"

import { User } from "@supabase/supabase-js"

import { createSupabaseClient } from "@/libs/supabase/server"

export const getUserProfile = cache(async (user: User) => {
  const supabase = await createSupabaseClient()

  const { data, error } = await supabase
    .from("profiles")
    .select(
      `
        id,
        email, 
        username, 
        avatar
      `
    )
    .eq("id", user.id)
    .single()


  if (error) throw error

  return data
})

export async function updateAvatar(id: string, avatar: string | null) {
  const supabase = await createSupabaseClient()

  const { error } = await supabase.from("profiles").update({ avatar }).eq("id", id)

  if (error) throw error
}

export async function updateLangProfile(id: string, langue: string) {
  const supabase = await createSupabaseClient()

  const { error } = await supabase.from("profiles").update({ langue }).eq("id", id)

  if (error) return error
}

export async function updateUsername(id: string, username: string) {
  const supabase = await createSupabaseClient()

  const { error } = await supabase.from("profiles").update({ username }).eq("id", id)

  if (error) throw error
}
