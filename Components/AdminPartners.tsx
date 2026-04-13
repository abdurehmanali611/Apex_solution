"use client";
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
import { CreatePartner, DeletePartner, GetPartner, handleUploadSuccess, partner } from "@/lib/actions";
import { Button } from "./ui/button";
import Image from "next/image";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { Edit, Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import AdminPartnerUpdate from "./AdminPartnerUpdate";
import { toast } from "sonner";

const AdminPartners = () => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [currentData, setCurrentData] = useState<partner[]>([]);
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const form = useForm<z.infer<typeof partnerPage>>({
    resolver: zodResolver(partnerPage),
    defaultValues: {
      image: "",
      title: "",
      description: "",
    },
  });

  const loadData = async () => {
    try {
      const data = await GetPartner()
      if (Array.isArray(data)) {
        setCurrentData(data);
      } else {
        setCurrentData([]);
      }
    } catch {
      toast.error("Failed to load partner data.");
    }
  }

  useEffect(() => {
    (async() => {
      await loadData();
    })()
  }, [currentData]);

  return (
    <div className="space-y-10 text-slate-100">
      <Card className="border border-slate-800/80 bg-slate-950/95 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.7)] ring-1 ring-slate-700/70">
        <CardHeader className="space-y-3 p-8">
          <CardTitle className="text-3xl text-slate-100">Partner Showcase</CardTitle>
          <CardDescription className="text-slate-400">
            Add partner logos and descriptions with a clean admin panel.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-8">
          <Form {...form}>
            <form
              className="grid gap-6"
              onSubmit={form.handleSubmit(async (values) => {
                await CreatePartner(values, setLoading);
                form.reset();
                setPreviewUrl(null);
                await loadData();
              })}
            >
              <CustomFormField
                name="title"
                control={form.control}
                fieldType={formFieldTypes.INPUT}
                label="Partner Name"
                placeholder="eg: striveIn"
                inputClassName="w-56 rounded-2xl border border-slate-700/80 bg-slate-950 px-4 py-3 text-slate-100 outline-none focus:border-amber-400"
              />
              <div className="grid gap-10 lg:grid-cols-[1.4fr_0.9fr]">
                <CustomFormField
                  name="description"
                  control={form.control}
                  fieldType={formFieldTypes.TEXTAREA}
                  label="Description"
                  placeholder="Description about the partner"
                  inputClassName="w-full rounded-2xl border border-slate-700/80 bg-slate-950 px-4 py-3 text-slate-100 outline-none focus:border-amber-400"
                />
                <CustomFormField
                  name="image"
                  control={form.control}
                  fieldType={formFieldTypes.IMAGE_UPLOADER}
                  label="Partner Logo"
                  previewUrl={previewUrl}
                  handleCloudinary={(result) =>
                    handleUploadSuccess(result, form, setPreviewUrl, "image")
                  }
                />
              </div>
              <Button
                type="submit"
                className="w-full rounded-full bg-amber-500 px-6 py-3 text-slate-950 transition hover:bg-amber-400 cursor-pointer"
              >
                {loading ? "Creating..." : "Add Partner"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        {currentData.map((partner, idx) => (
          <div key={idx} className="relative">
            <div className="absolute right-4 top-4 z-20 flex items-center gap-2">
              <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                <DialogTrigger asChild>
                  <Button variant="ghost" size="icon" className="cursor-pointer">
                    <Edit />
                  </Button>
                </DialogTrigger>
                <DialogContent className="flex flex-col gap-5">
                  <DialogHeader>
                    <DialogTitle>Update {partner.title}</DialogTitle>
                    <DialogDescription>Fine-tune the partner profile.</DialogDescription>
                  </DialogHeader>
                  <AdminPartnerUpdate
                    id={partner.id}
                    image={partner.image}
                    title={partner.title}
                    desc={partner.description}
                    loadData={loadData}
                    onClose={() => setOpenDialog(false)}
                  />
                </DialogContent>
              </Dialog>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="ghost" size="icon" className="cursor-pointer">
                    <Trash2 className="text-red-500" />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete {partner.title}</AlertDialogTitle>
                    <AlertDialogDescription>
                      Remove this partner from the site. This cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <div className="flex items-center gap-5 justify-end">
                    <AlertDialogCancel className="cursor-pointer">Cancel</AlertDialogCancel>
                    <AlertDialogAction className="bg-red-500 cursor-pointer" onClick={async() => {
                      await DeletePartner(partner.id)
                      await loadData()
                    }}>Delete</AlertDialogAction>
                  </div>
                </AlertDialogContent>
              </AlertDialog>
            </div>
            <Card className="overflow-hidden border border-slate-800/80 bg-slate-900/95 shadow-[0_20px_70px_-35px_rgba(0,0,0,0.55)] transition-transform duration-300 hover:-translate-y-1">
              <CardHeader className="px-6 pt-6">
                <CardTitle className="text-2xl font-semibold text-slate-100 text-center">{partner.title}</CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <div className="relative h-52 w-full overflow-hidden rounded-3xl border border-slate-700/80 bg-slate-800">
                  <Image
                    src={partner.image}
                    alt={partner.title}
                    fill
                    loading="eager"
                    className="object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
                <p className="text-slate-300 leading-7">{partner.description}</p>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPartners;
