import { z } from 'zod'

const withHttps = (value: string) => {
    const trimmed = value.trim();
    if (!trimmed) return "";
    if (/^[a-z][a-z0-9+.-]*:/i.test(trimmed)) return trimmed;
    return `https://${trimmed}`;
};

const isValidUrl = (value: string) => {
    try {
        new URL(value);
        return true;
    } catch {
        return false;
    }
};

const requiredUrl = z
    .string()
    .trim()
    .min(2, "Please provide a valid URL")
    .transform(withHttps)
    .refine(isValidUrl, "Please enter a valid URL (e.g. https://example.com)");

const optionalUrl = z
    .string()
    .trim()
    .transform((value) => (value ? withHttps(value) : ""))
    .refine((value) => value === "" || isValidUrl(value), "Please enter a valid URL (e.g. https://example.com)");

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
    link: optionalUrl,
    title: z.string().min(2, "Please Enter the PortFolio title"),
    description: z.string().min(2, "Please Enter the PortFolio Description"),
    type: z.string().min(2, "Please Select the PortFolio Type"),
    duration: z.number().min(0, "How Much time it took(in days)"),
    image: optionalUrl,
    version: z.number().min(0, "Please Enter its Version If it's version based").optional().or(z.literal(0)),
    special: z.boolean().optional().or(z.literal(false))
})
export const BlogsPage = z.object({
    image: requiredUrl,
    title: z.string().min(2, "Please Enter the blogs title"),
    description: z.string().min(2, "Please Enter the blogs Description"),
    source: z.string().min(2, "Please Enter the blogs Source"),
    date: z.date("Please Enter a valid date").or(z.string().min(2, "Please Enter the blogs Date")),
    link: requiredUrl
})
export const testimonialPage = z.object({
    name: z.string().min(2, "Please Enter the Name of our Client"),
    profession: z.string().min(2, "Please Enter the proffession/Position of our Client"),
    image: requiredUrl,
    content: z.string().min(2, "What did he/she say ?"),
    rating: z.number().min(0, "Please Enter the rating of Our Client").max(5, "5 is top Rating")
})
export const partnerPage = z.object({
    image: requiredUrl,
    title: z.string().min(2, "Please Enter Our Partners' Name"),
    description: z.string().min(2, "Please Enter Our Partners' Description")
})
export const teamsPage = z.object({
    image: requiredUrl,
    name: z.string().min(2, "Please Enter Our Team Members Name"),
    position: z.string().min(2, "Please Enter Our Team Members Position"),
    title: z.string().min(2, "He/She is known by..."),
    description: z.string().min(2, "Please Enter Something to Describe him/her"),
    facebook: optionalUrl,
    instagram: optionalUrl,
    linkedin: optionalUrl,
    telegram: optionalUrl
})
