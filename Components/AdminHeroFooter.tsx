"use client";
import { useForm } from "react-hook-form";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "./ui/card";
import z from "zod";
import { heroPage } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "./ui/form";
import CustomFormField, { formFieldTypes } from "./customFormField";
import { HeroFooter, HeroFooterList } from "@/constants";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { HeroFooterUpdate } from "@/lib/actions";

export interface current {
  id: number;
  name: string;
  amount: number;
}

const AdminHeroFooter = () => {
  const [currentState, setCurrentState] = useState<current[]>([]);
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof heroPage>>({
    resolver: zodResolver(heroPage),
    defaultValues: {
      name: "",
      amount: 20,
    },
  });
  useEffect(() => {
    (() => {
      const data = HeroFooter;
      setCurrentState(data);
    })();
  });
  const id = currentState.map((item) => item.id)[0]
  return (
    <div className="flex flex-col gap-10 items-center h-screen justify-center">
      <div className="flex items-center gap-5">
        <Card>
          <CardHeader>
            <CardTitle>Heroic Information</CardTitle>
            <CardDescription>
              Let&apos;s Add The Amount We did
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form className="flex flex-col gap-5 items-center" onSubmit={form.handleSubmit((values) => {
                const payload = {
                  ...values,
                  id: id
                }
                HeroFooterUpdate(payload, setLoading)
                form.reset()
              })}>
                <CustomFormField
                  name="name"
                  control={form.control}
                  fieldType={formFieldTypes.SELECT}
                  label="Hero Name: "
                  placeholder="select a hero name"
                  listdisplay={HeroFooterList}
                  inputClassName="h-fit p-2 w-56"
                />
                <CustomFormField
                  name="amount"
                  control={form.control}
                  fieldType={formFieldTypes.INPUT}
                  label="Amount"
                  placeholder="How much it Increased"
                  type="number"
                  inputClassName="h-fit p-2 w-56"
                />
                <Button
                  type="submit"
                  className="cursor-pointer w-full bg-amber-500"
                >
                  {loading ? "Updating..." : "Update"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
        <div className="flex flex-col gap-4 items-center">
          <h2 className="text-lg font-serif dark:text-slate-300 ">
            Current HeroFooter
          </h2>
          <div className="flex flex-col gap-4">
            {currentState.map((item) => (
              <div key={item.id} className="flex items-center gap-2">
                <h3 className="text-lg font-serif font-semibold text-neutral-500">{item.name}:</h3>
                <p className="text-lg font-serif">{item.amount}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHeroFooter;
