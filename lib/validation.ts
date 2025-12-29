import { z } from 'zod'
export const ContactForm = z.object({
    Full_Name: z.string().min(2, "Please Enter Your name"),
    Email: z.email("Please Enter Valid Email"),
    Subject: z.string().min(2, "Please Enter Subject"),
    Message: z.string().min(2, "Please Enter Message")
})

export const LoginAdmin = z.object({
    UserName: z.string().min(2, "Please Enter a valid UserName"),
    Password: z.string().min(6, "Please Enter a valid Password")
})