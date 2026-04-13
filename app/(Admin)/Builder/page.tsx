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
import { LoginUser } from "@/lib/actions";
import { Login } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

export default function Builder() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      router.replace("/BuilderDashboard");
    }
  }, [router]);

  const form = useForm<z.infer<typeof Login>>({
    resolver: zodResolver(Login),
    defaultValues: {
      username: "",
      password: "",
    },
  });
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-950 px-4 py-16 text-slate-100">
      <div className="w-89 max-w-lg rounded-[32px] border border-slate-800/90 bg-slate-900/95 p-8 shadow-[0_40px_90px_-40px_rgba(0,0,0,0.7)] ring-1 ring-slate-700/80 h-fit">
        <Card className="bg-transparent border-0 shadow-none">
          <CardHeader className="space-y-3 text-center">
            <CardTitle className="text-3xl text-slate-100">Apex Builder Login</CardTitle>
            <CardDescription className="text-slate-400">
              Sign in to manage backend content, update services, blogs, and site data.
            </CardDescription>
          </CardHeader>
          <CardContent className="px-0 pt-4 self-center">
            <Form {...form}>
              <form
                className="grid gap-5"
                onSubmit={form.handleSubmit((values) => {
                  LoginUser(values, setLoading, router);
                  form.reset();
                })}
              >
                <CustomFormField
                  name="username"
                  control={form.control}
                  fieldType={formFieldTypes.INPUT}
                  label="Username"
                  placeholder="Enter Apex username"
                  inputClassName="w-full rounded-2xl border border-slate-700/80 bg-slate-950 px-4 py-3 text-slate-100 outline-none focus:border-amber-400 w-56"
                />
                <CustomFormField
                  name="password"
                  control={form.control}
                  fieldType={formFieldTypes.INPUT}
                  label="Password"
                  placeholder="Enter Apex password"
                  type="password"
                  inputClassName="w-full rounded-2xl border border-slate-700/80 bg-slate-950 px-4 py-3 text-slate-100 outline-none focus:border-amber-400 w-56"
                />
                <Button
                  type="submit"
                  className="w-56 rounded-full bg-amber-500 px-6 py-3 text-slate-950 transition hover:bg-amber-400"
                >
                  {loading ? "Logging in..." : "Login"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
