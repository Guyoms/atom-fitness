import { getUserProfile } from "@/actions/profile.actions"

export type UserProfile = Awaited<ReturnType<typeof getUserProfile>>