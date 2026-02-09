import { z } from 'zod'
export const ContactForm = z.object({
    Full_Name: z.string().min(2, "Please Enter Your name"),
    Email: z.email("Please Enter Valid Email"),
    Subject: z.string().min(2, "Please Enter Subject"),
    Message: z.string().min(2, "Please Enter Message")
})
export const Login = z.object({
    username: z.string().min(2, "What was Our Username"),
    password: z.string().min(2, "What was Our Password")
})
export const heroPage = z.object({
    name: z.string().min(2, "Please Select What you want to Change"),
    amount: z.number().min(2, "please Enter a valid amount")
})
export const servicePage = z.object({
    icon: z.string().min(2, "Please Enter iconify icon name"),
    title: z.string().min(2, "Please Enter the title of the Service"),
    description: z.string().min(2, "Please Enter a Description for the Service")
})
export const portFolioPage = z.object({
    link: z.string().min(2, "Please Enter the Link If any").optional().or(z.literal("")),
    title: z.string().min(2, "Please Enter the PortFolio title"),
    description: z.string().min(2, "Please Enter the PortFolio Description"),
    type: z.string().min(2, "Please Select the PortFolio Type"),
    duration: z.number().min(0, "How Much time it took(in days)"),
    image: z.string().min(2, "Please Enter an Image for It If any").optional().or(z.literal("")),
    version: z.number().min(0, "Please Enter its Version If it's version based").optional().or(z.literal(0)),
    special: z.boolean().optional().or(z.literal(false))
})
export const BlogsPage = z.object({
    image: z.string().min(2, "Please Enter the blogs image Url"),
    title: z.string().min(2, "Please Enter the blogs title"),
    description: z.string().min(2, "Please Enter the blogs Description"),
    source: z.string().min(2, "Please Enter the blogs Source"),
    date: z.date("Please Enter a valid date"),
    link: z.string().min(2, "Please Enter the blog sources link for further Investigation")
})
export const testimonialPage = z.object({
    name: z.string().min(2, "Please Enter the Name of our Client"),
    profession: z.string().min(2, "Please Enter the proffession/Position of our Client"),
    image: z.string().min(2, "Please Enter the image of our Client"),
    content: z.string().min(2, "What did he/she say ?"),
    rating: z.number().min(0, "Please Enter the rating of Our Client").max(5, "5 is top Rating")
})
export const partnerPage = z.object({
    image: z.string().min(2, "Please Enter Our Partners' Image"),
    title: z.string().min(2, "Please Enter Our Partners' Name"),
    description: z.string().min(2, "Please Enter Our Partners' Description")
})
export const teamsPage = z.object({
    image: z.string().min(2, "Please Enter Our Team Members Image"),
    name: z.string().min(2, "Please Enter Our Team Members Name"),
    position: z.string().min(2, "Please Enter Our Team Members Position"),
    title: z.string().min(2, "He/She is known by..."),
    description: z.string().min(2, "Please Enter Something to Describe him/her"),
    facebook: z.string().min(2, "Please Enter his/her facebook link"),
    instagram: z.string().min(2, "Please Enter his/her Instagram link"),
    linkedin: z.string().min(2, "Please Enter his/her linkedin link"),
    telegram: z.string().min(2, "Please Enter his/her Telegram link")
})