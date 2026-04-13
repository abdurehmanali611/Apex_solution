"use client";
import { portFolioTypes } from "@/constants";
import { portFolioPage } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Form } from "./ui/form";
import CustomFormField, { formFieldTypes } from "./customFormField";
import {
  CreatePortFolio,
  DeletePortFolio,
  GetPortFolio,
  handleUploadSuccess,
} from "@/lib/actions";
import { Button } from "./ui/button";
import Image from "next/image";
import { Badge } from "./ui/badge";
import Link from "next/link";
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
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import AdminPortFolioUpdate from "./AdminPortFolioUpdate";
import { portfolio } from "../lib/actions";
import { toast } from "sonner";

const AdminPortFolios = () => {
  const [currentData, setCurrentData] = useState<portfolio[]>([]);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const form = useForm<z.infer<typeof portFolioPage>>({
    resolver: zodResolver(portFolioPage),
    defaultValues: {
      image: "",
      title: "",
      description: "",
      type: "",
      version: 0,
      duration: 0,
      link: "",
      special: false,
    },
  });

  const loadData = async () => {
    try {
      const data = await GetPortFolio()
      if (Array.isArray(data)) {
        setCurrentData(data);
      } else {
        setCurrentData([]);
      }
    } catch {
      toast.error("Failed to load portfolio data");
    }
  };

  useEffect(() => {
    (async () => {
      await loadData();
    })();
  }, [currentData]);

  return (
    <div className="space-y-10 text-slate-100">
      <Card className="border border-slate-800/80 bg-slate-950/95 shadow-[0_32px_90px_-40px_rgba(0,0,0,0.45)] ring-1 ring-slate-700/80">
        <CardHeader className="space-y-3 p-8">
          <CardTitle className="text-3xl text-slate-100">
            Portfolio Manager
          </CardTitle>
          <CardDescription className="text-slate-400">
            Add or update portfolio items with a polished editor and live
            preview cards.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-8">
          <Form {...form}>
            <form
              className="grid gap-6"
              onSubmit={form.handleSubmit(async (values) => {
                await CreatePortFolio(values, setLoading);
                form.reset();
                setPreviewUrl(null)
                await loadData();
              })}
            >
              <div className="grid gap-6 lg:grid-cols-3">
                <CustomFormField
                  name="title"
                  control={form.control}
                  fieldType={formFieldTypes.INPUT}
                  label="Title"
                  placeholder="Portfolio title"
                  inputClassName="w-56 rounded-2xl border border-slate-700/80 bg-slate-950 px-4 py-3 text-slate-100 outline-none focus:border-amber-400"
                />
                <CustomFormField
                  name="type"
                  control={form.control}
                  fieldType={formFieldTypes.SELECT}
                  label="Type"
                  placeholder="Select type"
                  listdisplay={portFolioTypes}
                  inputClassName="w-56 rounded-2xl border border-slate-700/80 bg-slate-950 px-4 py-3 text-slate-100 outline-none focus:border-amber-400"
                />
                <CustomFormField
                  name="duration"
                  control={form.control}
                  fieldType={formFieldTypes.INPUT}
                  label="Duration"
                  type="number"
                  placeholder="Days"
                  inputClassName="w-56 rounded-2xl border border-slate-700/80 bg-slate-950 px-4 py-3 text-slate-100 outline-none focus:border-amber-400"
                />
              </div>
              <div className="grid gap-6 lg:grid-cols-3 items-start">
                <CustomFormField
                  name="version"
                  control={form.control}
                  fieldType={formFieldTypes.INPUT}
                  label="Version"
                  type="number"
                  placeholder="Optional"
                  inputClassName="w-56 rounded-2xl border border-slate-700/80 bg-slate-950 px-4 py-3 text-slate-100 outline-none focus:border-amber-400"
                />
                <CustomFormField
                  name="link"
                  control={form.control}
                  fieldType={formFieldTypes.INPUT}
                  label="Link"
                  placeholder="Optional URL"
                  inputClassName="w-56 rounded-2xl border border-slate-700/80 bg-slate-950 px-4 py-3 text-slate-100 outline-none focus:border-amber-400"
                />
                <div className="flex flex-col gap-2 rounded-2xl border border-slate-700/80 bg-slate-950 px-4 py-3">
                  <label className="text-sm font-medium text-slate-300">
                    Special Project
                  </label>
                  <CustomFormField
                    name="special"
                    control={form.control}
                    fieldType={formFieldTypes.SWITCH}
                    label="Mark special?"
                    inputClassName="h-fit p-2 cursor-pointer"
                  />
                </div>
              </div>
              <div className="grid gap-6 lg:grid-cols-[1.4fr_0.9fr]">
                <CustomFormField
                  name="description"
                  control={form.control}
                  fieldType={formFieldTypes.TEXTAREA}
                  label="Description"
                  placeholder="Portfolio description"
                  inputClassName="w-full rounded-2xl border border-slate-700/80 bg-slate-950 px-4 py-3 text-slate-100 outline-none focus:border-amber-400"
                />
                <CustomFormField
                  name="image"
                  control={form.control}
                  fieldType={formFieldTypes.IMAGE_UPLOADER}
                  label="Image"
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
                {loading ? "Creating..." : "Submit Portfolio"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        {currentData.map((item) => (
          <Card
            key={item.id}
            className="group relative overflow-hidden border border-slate-800/70 bg-slate-950/90 shadow-[0_18px_60px_-30px_rgba(0,0,0,0.45)]"
          >
            <div className="relative h-52 w-full overflow-hidden">
              <Image
                src={item.image || "/assets/computer.jpeg"}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-x-0 top-3 px-5">
                <Badge className="bg-amber-500/90 text-slate-950">
                  {item.type}
                </Badge>
              </div>
            </div>
            <CardHeader className="p-6 pt-5">
              <CardTitle className="text-2xl font-bold text-slate-100">
                {item.title}
              </CardTitle>
              <CardDescription className="mt-2 text-sm text-slate-400">
                {item.special ? "Featured project" : "Standard portfolio entry"}
              </CardDescription>
            </CardHeader>
            <CardContent className="px-6 pb-4 text-slate-300">
              <p className="text-sm leading-7 line-clamp-3">
                {item.description}
              </p>
            </CardContent>
            <CardFooter className="flex flex-col gap-5 items-center">
              <div className="flex flex-wrap items-center w-full justify-between gap-3 border-t border-slate-800/70 px-6 py-4">
                <div className="space-y-1 text-sm text-slate-400">
                  <p>
                    <span className="font-semibold text-slate-100">
                      Duration:
                    </span>{" "}
                    {item.duration >= 30
                      ? `${Math.floor(item.duration / 30)} months`
                      : `${item.duration} days`}
                  </p>
                  {item.version ? <p>Version {item.version}</p> : null}
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  {item.link && (
                    <Link
                      href={item.link}
                      className="text-sm font-semibold text-amber-400 hover:text-amber-300"
                    >
                      Visit Project
                    </Link>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2 w-full justify-between">
                <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-full border-slate-700 bg-slate-900 text-slate-100 hover:bg-slate-800"
                    >
                      <Edit className="mr-2 h-4 w-4" /> Edit
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Edit Portfolio</DialogTitle>
                    </DialogHeader>
                    <AdminPortFolioUpdate
                      id={item.id}
                      image={item.image}
                      title={item.title}
                      description={item.description}
                      type={item.type}
                      duration={item.duration}
                      link={item.link}
                      version={item.version}
                      special={item.special}
                      loadData={loadData}
                      closeDialog={() => setOpenDialog(false)}
                    />
                  </DialogContent>
                </Dialog>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="destructive"
                      size="sm"
                      className="rounded-full px-4 py-2"
                    >
                      <Trash2 className="mr-2 h-4 w-4" /> Delete
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete portfolio item</AlertDialogTitle>
                      <AlertDialogDescription>
                        This will remove the portfolio card from the current
                        admin list.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <div className="flex justify-end gap-3 pt-4">
                      <AlertDialogCancel className="rounded-full bg-slate-800 px-4 py-2 text-slate-100">
                        Cancel
                      </AlertDialogCancel>
                      <AlertDialogAction
                        className="rounded-full bg-rose-500 px-4 py-2 text-white"
                        onClick={async () => {
                          await DeletePortFolio(item.id);
                          await loadData();
                        }}
                      >
                        Delete
                      </AlertDialogAction>
                    </div>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminPortFolios;
