import ContactForm from "@/Components/ContactForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us — Apex Solution",
  description:
    "Get in touch with Apex Solution. Send us a message and we'll respond promptly to discuss your project or service needs.",
};

export default function Contact() {
  return <ContactForm />;
}
