/* eslint-disable react-hooks/set-state-in-effect */
"use client"
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import z from "zod";
import { heroPage } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "./ui/form";
import CustomFormField, { formFieldTypes } from "./customFormField";
import { defaultHeroFooter, HeroFooterList, type HeroFooterItem } from "@/constants";
import { Button } from "./ui/button";
import { HeroFooterUpdate } from "@/lib/actions";

const AdminHeroFooter = () => {
  const [currentState, setCurrentState] = useState<HeroFooterItem[]>([]);
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof heroPage>>({
    resolver: zodResolver(heroPage),
    defaultValues: {
      name: "Experience",
      amount: 10,
    },
  });

  useEffect(() => {
    setCurrentState(defaultHeroFooter);
  }, []);

  const handleUpdate = async (values: z.infer<typeof heroPage>) => {
    const selected = currentState.find((item) => item.name === values.name) ?? currentState[0];
    if (!selected) return;

    await HeroFooterUpdate({ ...values, id: selected.id }, setLoading);
    form.reset();
  };

  return (
    <div className="space-y-10 text-slate-100">
      <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] items-center">
        <Card className="border border-slate-800/80 bg-slate-950/95 shadow-[0_32px_90px_-40px_rgba(0,0,0,0.45)] ring-1 ring-slate-700/70">
          <CardHeader className="space-y-3 p-8">
            <CardTitle className="text-3xl text-slate-100">Hero Footer Metrics</CardTitle>
            <CardDescription className="text-slate-400">
              Manage the highlight stats shown on the homepage hero section. Each metric now includes an icon badge and counts.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-5 p-8">
            <div className="grid gap-5">
              {currentState.map((item) => (
                <div
                  key={item.id}
                  className="rounded-3xl border border-slate-800/80 bg-slate-900/90 p-5 shadow-lg shadow-slate-950/20"
                >
                  <div className="flex items-center gap-3">
                    <div>
                      <p className="text-sm uppercase tracking-[0.2em] text-slate-500">{item.name}</p>
                      <p className="mt-2 text-3xl font-semibold text-slate-100">{item.amount}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border border-slate-800/80 bg-slate-950/95 shadow-[0_32px_90px_-40px_rgba(0,0,0,0.45)] ring-1 ring-slate-700/70 h-fit">
          <CardHeader className="space-y-3 p-8">
            <CardTitle className="text-3xl text-slate-100">Edit Hero Footer</CardTitle>
            <CardDescription className="text-slate-400">
              Quickly update the metric values and keep your hero banner stats fresh.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-8 self-center">
            <Form {...form}>
              <form className="grid gap-6" onSubmit={form.handleSubmit(handleUpdate)}>
                <CustomFormField
                  name="name"
                  control={form.control}
                  fieldType={formFieldTypes.SELECT}
                  label="Metric"
                  placeholder="Select metric"
                  listdisplay={HeroFooterList}
                  inputClassName="w-56 rounded-2xl border border-slate-700/80 bg-slate-950 px-4 py-3 text-slate-100 focus:border-amber-400"
                />
                <CustomFormField
                  name="amount"
                  control={form.control}
                  fieldType={formFieldTypes.INPUT}
                  label="Amount"
                  placeholder="Enter amount"
                  type="number"
                  inputClassName="w-56 rounded-2xl border border-slate-700/80 bg-slate-950 px-4 py-3 text-slate-100 focus:border-amber-400"
                />
                <Button
                  type="submit"
                  className="w-56 cursor-pointer rounded-full bg-amber-500 px-6 py-3 text-slate-950 transition hover:bg-amber-400"
                >
                  {loading ? "Updating..." : "Update Metric"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminHeroFooter;
