"use client";
import { Partner } from "@/constants";
import { partnerPage } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Form } from "./ui/form";
import CustomFormField, { formFieldTypes } from "./customFormField";
import { CreatePartner, handleUploadSuccess } from "@/lib/actions";
import { Button } from "./ui/button";
import Image from "next/image";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "./ui/alert-dialog";
import { Edit, Trash2 } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import AdminPartnerUpdate from "./AdminPartnerUpdate";

export interface partner {
  image: string;
  title: string;
  description: string;
}

const AdminPartners = () => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [currentData, setCurrentData] = useState<partner[]>([]);
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof partnerPage>>({
    resolver: zodResolver(partnerPage),
    defaultValues: {
      image: "",
      title: "",
      description: "",
    },
  });
  useEffect(() => {
    (() => {
      const data = Partner;
      setCurrentData(data);
    })();
  }, []);
  return (
    <div className="flex flex-col gap-10 items-center">
      <Card>
        <CardHeader>
          <CardTitle>Create Partner</CardTitle>
          <CardDescription>Let&apos;s show up our partners</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form className="flex flex-col gap-5 items-center" onSubmit={form.handleSubmit((values) => {
              CreatePartner(values, setLoading)
              form.reset()
            })}>
              <CustomFormField
                name="title"
                control={form.control}
                fieldType={formFieldTypes.INPUT}
                label="Partner Name: "
                placeholder="eg: striveIn"
                inputClassName="h-fit p-2 w-56"
              />
              <div className="flex items-start gap-5">
                <CustomFormField
                  name="description"
                  control={form.control}
                  fieldType={formFieldTypes.TEXTAREA}
                  label="Description: "
                  placeholder="Description about the partner"
                  inputClassName="h-32 p-2 w-64"
                />
                <CustomFormField
                  name="image"
                  control={form.control}
                  fieldType={formFieldTypes.IMAGE_UPLOADER}
                  label="Partner Logo: "
                  previewUrl={previewUrl}
                  handleCloudinary={(result) =>
                    handleUploadSuccess(result, form, setPreviewUrl, "image")
                  }
                />
              </div>
              <Button
                type="submit"
                className="cursor-pointer w-full bg-amber-500"
              >
                {loading ? "Creating..." : "Create Partner"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-6">
        {currentData.map((partner, idx) => (
          <div key={idx}>
            <div className="flex items-center gap-2 absolute z-50 bg-transparent w-120 justify-end">
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="cursor-pointer"
                  >
                    <Edit />
                  </Button>
                </DialogTrigger>
                <DialogContent className="flex flex-col gap-5">
                  <DialogHeader>
                    <DialogTitle>Update {partner.title} partner</DialogTitle>
                    <DialogDescription>
                      Update the Informations about {partner.title} partner
                    </DialogDescription>
                  </DialogHeader>
                  <AdminPartnerUpdate 
                  image={partner.image}
                  title={partner.title}
                  desc={partner.description}
                  />
                </DialogContent>
              </Dialog>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="cursor-pointer"
                  >
                    <Trash2 className="text-red-500" />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Deleting {partner.title}</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to Delete {partner.title}. This Action
                      can&apos;t be UnDone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <div className="flex items-center gap-5 justify-end">
                    <AlertDialogCancel className="cursor-pointer">
                      Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction className="bg-red-500 cursor-pointer">
                      Delete
                    </AlertDialogAction>
                  </div>
                </AlertDialogContent>
              </AlertDialog>
            </div>
            <Card className="dark:bg-slate-950">
              <CardHeader>
                <CardTitle className="text-xl font-serif font-semibold text-center text-slate-700 dark:text-slate-300">
                  {partner.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-5">
                <div className="relative h-44 w-full overflow-hidden">
                  <Image
                    src={partner.image}
                    alt={partner.title}
                    fill
                    loading="eager"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <p className="font-serif text-lg text-center">
                  {partner.description}
                </p>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPartners;
