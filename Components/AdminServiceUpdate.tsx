/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { servicePage } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import { Form } from "./ui/form";
import { Button } from "./ui/button";
import CustomFormField, { formFieldTypes } from "./customFormField";

const AdminServiceUpdate = ({ icon, title, desc }: any) => {
  const form = useForm<z.infer<typeof servicePage>>({
    resolver: zodResolver(servicePage),
    defaultValues: {
      icon: icon,
      title: title,
      description: desc,
    },
  });
  return (
    <Form {...form}>
      <form className="flex flex-col gap-5 items-center">
        <div className="flex items-center gap-5">
          <CustomFormField
            name="icon"
            control={form.control}
            fieldType={formFieldTypes.INPUT}
            label="Icon Name: "
            placeholder="Iconify Icon name"
            inputClassName="h-fit p-2 w-56"
          />
          <CustomFormField
            name="title"
            control={form.control}
            fieldType={formFieldTypes.INPUT}
            label="Service Title: "
            placeholder="Enter Service title"
            inputClassName="h-fit p-2 w-56"
          />
        </div>
        <CustomFormField
          name="description"
          control={form.control}
          fieldType={formFieldTypes.TEXTAREA}
          label="Service Description: "
          placeholder="Enter Service Description"
          inputClassName="h-32 p-2 w-72 mx-0"
        />
        <Button type="submit" className="cursor-pointer bg-amber-500 w-full">
          Update Service
        </Button>
      </form>
    </Form>
  );
};

export default AdminServiceUpdate;
