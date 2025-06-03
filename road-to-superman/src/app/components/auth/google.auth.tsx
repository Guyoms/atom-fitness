"use client"

import { useMutation } from "@tanstack/react-query"

import { signInWithGoogle } from "@/actions/auth.actions"

import { Button, Spinner, addToast } from "@heroui/react"

import GoogleIcon from "../ui/icons/google"

export default function AuthGoogle() {

  const { mutate, isPending } = useMutation({
    mutationFn: signInWithGoogle,
    onError: (error: any) => {
      console.error("Error logging in with Google", error)
      const errorMessage = error instanceof Error ? error.message : String(error)
      addToast({
        title: "Google Sign-In Failed",
        description: errorMessage,
        color: "danger",
        classNames: {
          base: "rounded-lg"
        }
      })
    },
  })

  return (
      <Button
        variant="bordered"
        className="w-full min-h-[40px] gap-0 bg-[#FFF] font-semibold text-default-500 dark:text-default-300"
        onPress={() => mutate()}
        startContent={!isPending && <GoogleIcon className="h-5 w-5" />}
        isLoading={isPending}
        isDisabled={isPending}
      >
        <span className="mx-auto flex-1">
          {"Continue with Google"}
        </span>
      </Button>
  )
} 