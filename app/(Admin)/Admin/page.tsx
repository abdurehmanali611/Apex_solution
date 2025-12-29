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
import { handleLoginAdmin } from "@/lib/actions";
import { LoginAdmin } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

export default function Admin() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const form = useForm<z.infer<typeof LoginAdmin>>({
    resolver: zodResolver(LoginAdmin),
    defaultValues: {
      UserName: "",
      Password: "",
    },
  });
  return (
    <div className="flex flex-col items-center h-screen justify-center">
      <Card>
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>Enter your Credential</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form 
            onSubmit={form.handleSubmit((values) => {
                handleLoginAdmin(values, setIsLoading, router)
            })}
            className="flex flex-col gap-5">
              <CustomFormField
                name="UserName"
                control={form.control}
                fieldType={formFieldTypes.INPUT}
                label="Username: "
                placeholder="Enter username"
                inputClassName="h-fit p-2 w-64"
              />
              <CustomFormField
                name="Password"
                control={form.control}
                fieldType={formFieldTypes.INPUT}
                label="Password: "
                placeholder="Enter password"
                type="password"
                inputClassName="h-fit p-2 w-64"
              />
              <Button type="submit" className="cursor-pointer">{isLoading ? "Loading..." : "Login"}</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
