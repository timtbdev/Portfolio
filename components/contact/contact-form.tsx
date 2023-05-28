"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2 as SpinnerIcon } from "lucide-react"
import { useForm } from "react-hook-form"
import * as z from "zod"

const contactFormSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Your name must be at least 3 characters." }),
  email: z.string().email({ message: "Please provide a valid email." }),
  message: z
    .string()
    .min(4, {
      message: "Your message must be between 4 and 320 characters long",
    })
    .max(320, {
      message: "Your message must be between 4 and 320 characters long.",
    }),
})

type ContactFormValues = z.infer<typeof contactFormSchema>

const defaultValues: Partial<ContactFormValues> = {
  name: "",
  email: "",
  message: "",
}

const ContactForm = () => {
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues,
  })

  async function onSubmit(data: ContactFormValues) {
    try {
      setIsLoading(true)
      // Send email using Nodemailer
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          message: data.message,
        }),
      })
      setIsLoading(false)
      form.reset()

      if (!response?.ok) {
        return toast({
          title: "Something went wrong.",
          description: "Failed to send email.",
          variant: "destructive",
        })
      }

      // Show success message or redirect to a thank you page
      console.log("Email sent successfully!")
    } catch (error) {
      // Handle error
      console.error("Failed to send email:", error)
    } finally {
      setIsLoading(false)
      toast({
        title: "Email sent.",
        description: "Your message has been sent.",
      })
    }
  }
  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mx-auto space-y-4 text-center"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <div className="mx-auto flex w-full max-w-md space-x-2">
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <div className="mx-auto flex w-full max-w-md space-x-2">
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Message</FormLabel>
                <div className="mx-auto flex w-full max-w-md space-x-2">
                  <FormControl>
                    <Textarea className="resize-none" {...field} />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full max-w-sm">
            {isLoading && <SpinnerIcon className="mr-2 h-4 w-4 animate-spin" />}
            Send
          </Button>
        </form>
      </Form>
    </>
  )
}

export default ContactForm
