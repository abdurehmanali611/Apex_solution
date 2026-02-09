"use client";
import { Portfolios, portFolioTypes } from "@/constants";
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
import { CreatePortFolio, handleUploadSuccess } from "@/lib/actions";
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
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import AdminPortFolioUpdate from "./AdminPortFolioUpdate";

export interface portfolio {
  image?: string;
  title: string;
  description: string;
  type: string;
  version?: number;
  duration: number;
  link?: string;
  special?: boolean;
}

const AdminPortFolios = () => {
  const [currentData, setCurrentData] = useState<portfolio[]>([]);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
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
  useEffect(() => {
    (() => {
      const data = Portfolios;
      setCurrentData(data);
    })();
  }, []);
  return (
    <div className="flex flex-col gap-10 items-center">
      <Card>
        <CardHeader>
          <CardTitle>Create a PortFolio</CardTitle>
          <CardDescription>Let&apos;s show up what we did</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form className="flex flex-col gap-5" onSubmit={form.handleSubmit((values) => {
              CreatePortFolio(values, setLoading)
              form.reset()
            })}>
              <div className="flex items-center gap-5">
                <CustomFormField
                  name="title"
                  control={form.control}
                  fieldType={formFieldTypes.INPUT}
                  label="PortFolio Title: "
                  placeholder="eg: hotcol"
                  inputClassName="h-fit p-2 w-56"
                />
                <CustomFormField
                  name="type"
                  control={form.control}
                  fieldType={formFieldTypes.SELECT}
                  label="PortFolio Type: "
                  placeholder="eg: website"
                  inputClassName="h-fit p-2 w-56"
                  listdisplay={portFolioTypes}
                />
                <CustomFormField
                  name="duration"
                  control={form.control}
                  fieldType={formFieldTypes.INPUT}
                  label="PortFolio Duration(in Days): "
                  type="number"
                  inputClassName="h-fit p-2 w-56"
                />
              </div>
              <div className="flex items-center gap-5">
                <CustomFormField
                  name="version"
                  control={form.control}
                  fieldType={formFieldTypes.INPUT}
                  label="PortFolio Version(If any): "
                  type="number"
                  inputClassName="h-fit p-2 w-56"
                />
                <CustomFormField
                  name="link"
                  control={form.control}
                  fieldType={formFieldTypes.INPUT}
                  label="PortFolio Link(If any): "
                  placeholder="Enter the link(if any)"
                  inputClassName="h-fit p-2 w-56"
                />
                <CustomFormField
                  name="special"
                  control={form.control}
                  fieldType={formFieldTypes.SWITCH}
                  label="PortFolio speciality(If So): "
                  inputClassName="h-fit p-2 w-56 cursor-pointer"
                />
              </div>
              <div className="flex items-start gap-5 justify-center">
                <CustomFormField
                  name="description"
                  control={form.control}
                  fieldType={formFieldTypes.TEXTAREA}
                  label="PortFolio description: "
                  placeholder="Enter portfolio desc"
                  inputClassName="h-28 p-2 w-56 mx-0"
                />
                <CustomFormField
                  name="image"
                  control={form.control}
                  fieldType={formFieldTypes.IMAGE_UPLOADER}
                  label="PortFolio Image: "
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
                {loading ? "Creating..." : "Submit"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-6 p-3">
        {currentData.map((item, idx) => (
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
                    <DialogTitle>Update {item.title} Service</DialogTitle>
                    <DialogDescription>
                      Update the Informations about {item.title} service
                    </DialogDescription>
                  </DialogHeader>
                  <div className="max-h-[60vh] overflow-y-auto pr-2 [&::-webkit-scrollbar]:hidden">
                    <AdminPortFolioUpdate
                      image={item.image}
                      title={item.title}
                      desc={item.description}
                      type={item.type}
                      duration={item.duration}
                      link={item.link}
                      version={item.version}
                      special={item.special}
                    />
                  </div>
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
                    <AlertDialogTitle>Deleting {item.title}</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to Delete {item.title}. This Action
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
            <Card className="overflow-hidden border-none shadow-lg bg-white dark:bg-slate-900 group">
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src={item.image || "/assets/computer.jpeg"}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-3 left-3 flex items-center justify-between w-full px-5">
                  <Badge className="bg-amber-500 hover:bg-amber-600">
                    {item.type}
                  </Badge>
                  {item.version && (
                    <Badge
                      variant="outline"
                      className="bg-amber-500 backdrop-blur-md text-black"
                    >
                      v{item.version}
                    </Badge>
                  )}
                </div>
              </div>

              <CardHeader>
                <CardTitle className="text-xl font-bold text-amber-600 dark:text-amber-500">
                  {item.title}
                </CardTitle>
              </CardHeader>

              <CardContent>
                <p className="font-serif text-slate-600 dark:text-slate-400 text-sm line-clamp-3">
                  {item.description}
                </p>
              </CardContent>

              <CardFooter className="border-t border-amber-50 dark:border-amber-900/20 pt-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] uppercase tracking-widest font-bold text-slate-400">
                    Project Duration:
                  </span>
                  <span className="text-sm font-bold text-amber-600">
                    {item.duration >= 30
                      ? `${Math.floor(item.duration / 30)} months`
                      : `${item.duration} days`}
                  </span>
                </div>
                {item.link && (
                  <Link
                    href={item.link}
                    className="text-sm font-bold text-amber-600 underline hover:text-blue-500"
                  >
                    Visit Here
                  </Link>
                )}
              </CardFooter>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPortFolios;
