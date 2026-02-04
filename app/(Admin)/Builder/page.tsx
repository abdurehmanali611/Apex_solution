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
import { Login } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";

export default function Builder() {
  const form = useForm<z.infer<typeof Login>>({
    resolver: zodResolver(Login),
    defaultValues: {
      username: "",
      password: "",
    },
  });
  return (
    <div className="flex flex-col gap-10 items-center h-screen justify-center">
      <Card>
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>Authenticate YourSelf</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form className="flex flex-col gap-5 items-center">
                <CustomFormField 
                name="username"
                control={form.control}
                fieldType={formFieldTypes.INPUT}
                label="Username: "
                placeholder="Enter Apex Username"
                inputClassName="h-fit p-2 w-56"
                />
                <CustomFormField 
                name="password"
                control={form.control}
                fieldType={formFieldTypes.INPUT}
                label="Password: "
                placeholder="Enter Apex password"
                inputClassName="h-fit p-2 w-56"
                />
                <Button type="submit" className="cursor-pointer w-fit px-5 bg-green-500">Submit</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
