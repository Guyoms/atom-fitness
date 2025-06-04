import { z } from "zod"

import { getUser } from "@/actions/auth.actions"

export type User = Awaited<ReturnType<typeof getUser>>

const SignInFormSchema = z.object({
  email: z.string().min(1, "Email is required").email("Email is invalid"),
  password: z.string().min(1, "Password is required"),
})

type SignInFormType = z.infer<typeof SignInFormSchema>

export { type SignInFormType, SignInFormSchema }

const SignUpFormSchema = z.object({
  username: z
    .string()
    .min(1, "Username is required")
    .min(3, "Username must be equal or more than 3 characters")
    .max(30, "Username must be equal or less than 30 characters")
    .regex(/^(?!.*[_.]{2})(?!.*[_.]$)[a-zA-Z0-9._]{3,30}$/, "Username is invalid"),
  email: z.string().min(1, "Email is required").email("Email is invalid"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "Password must be more than 6 characters")
    .max(32, "Password must be less than 32 characters")
    .regex(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*._+=\-()[\]{};:,?])[A-Za-z\d!@#$%^&*._+=\-()[\]{};:,?]{6,32}$/,
      "Password is invalid"
    ),
})

type SignUpFormType = z.infer<typeof SignUpFormSchema>

export { type SignUpFormType, SignUpFormSchema }

const EmailFormSchema = z.object({
  email: z.string().min(1, "Email is required").email("Email is invalid"),
})

type EmailFormType = z.infer<typeof EmailFormSchema>

export { type EmailFormType, EmailFormSchema }
