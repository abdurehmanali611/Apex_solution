"use client";
import CustomFormField, { formFieldTypes } from "@/Components/customFormField";
import { Button } from "@/Components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/Components/ui/card";
import { Form } from "@/Components/ui/form";
import { CreateContact } from "@/lib/actions";
import { ContactForm } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

export default function Contact() {
  const [loading, setLoading] = useState(false)
  const form = useForm<z.infer<typeof ContactForm>>({
    resolver: zodResolver(ContactForm),
    defaultValues: {
      Full_Name: "",
      Email: "",
      Subject: "",
      Message: "",
    },
  });
  return (
    <div className="flex flex-col items-center">
      <Card className="w-3/4">
        <CardHeader className="text-center">
          <CardTitle className="text-xl text-amber-500 font-semibold font-serif">
            Contact Us
          </CardTitle>
          <CardDescription>Get In Touch With Us</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-5">
          <Form {...form}>
            <form className="flex flex-col gap-8 items-center" onSubmit={form.handleSubmit((values) => {
              CreateContact(values, setLoading)
              form.reset()
            })}>
              <div className="flex flex-col sm:flex-row gap-5 items-center">
                <CustomFormField
                  name="Full_Name"
                  control={form.control}
                  fieldType={formFieldTypes.INPUT}
                  label="Full Name:"
                  placeholder="Enter Your Full Name"
                  inputClassName="h-fit p-2 w-72"
                />
                <CustomFormField
                  name="Email"
                  control={form.control}
                  fieldType={formFieldTypes.INPUT}
                  label="Email:"
                  placeholder="Enter Your email"
                  type="email"
                  inputClassName="h-fit p-2 w-72"
                />
              </div>
              <CustomFormField
                name="Subject"
                control={form.control}
                fieldType={formFieldTypes.INPUT}
                label="Subject:"
                placeholder="Enter Subject"
                inputClassName="h-fit p-2 w-72 sm:w-150"
              />
              <CustomFormField
                name="Message"
                control={form.control}
                fieldType={formFieldTypes.TEXTAREA}
                label="Message:"
                placeholder="Enter Message"
                inputClassName="w-72 sm:w-150"
              />
              <Button
                type="submit"
                className="bg-amber-500 text-black hover:bg-amber-500 cursor-pointer w-40"
              >
                {loading ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
