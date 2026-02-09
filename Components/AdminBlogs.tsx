"use client";
import { useForm } from "react-hook-form";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  CardContent,
} from "./ui/card";
import { useEffect, useState } from "react";
import z from "zod";
import { BlogsPage } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "./ui/form";
import CustomFormField, { formFieldTypes } from "./customFormField";
import { CreateBlog, handleUploadSuccess } from "@/lib/actions";
import { Button } from "./ui/button";
import { Blogs } from "@/constants";
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
import Link from "next/link";
import Image from "next/image";
import AdminBlogUpdate from "./AdminBlogUpdate";

export interface blogs {
  image: string;
  link: string;
  title: string;
  description: string;
  source: string;
  date: Date;
}

const AdminBlogs = () => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [currentData, setCurrentData] = useState<blogs[]>([]);
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof BlogsPage>>({
    resolver: zodResolver(BlogsPage),
    defaultValues: {
      image: "",
      title: "",
      description: "",
      source: "",
      date: new Date(),
      link: "",
    },
  });
  useEffect(() => {
    (() => {
      const data = Blogs;
      setCurrentData(data);
    })();
  }, []);
  return (
    <div className="flex flex-col gap-10 items-center">
      <Card>
        <CardHeader>
          <CardTitle>Creating Blogs</CardTitle>
          <CardDescription>What&apos;s new in the Tech World</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form className="flex flex-col gap-5" onSubmit={form.handleSubmit((values) => {
              const payload = {
                ...values,
                date: new Date(values.date)
              }
              CreateBlog(payload, setLoading)
              form.reset()
            })}>
              <div className="flex items-center gap-5">
                <CustomFormField
                  name="title"
                  control={form.control}
                  fieldType={formFieldTypes.INPUT}
                  label="Blog Title: "
                  placeholder="Enter the Blog Title"
                  inputClassName="h-fit p-2 w-56"
                />
                <CustomFormField
                  name="source"
                  control={form.control}
                  fieldType={formFieldTypes.INPUT}
                  label="Blog Source: "
                  placeholder="Enter the Blog Source"
                  inputClassName="h-fit p-2 w-56"
                />
                <CustomFormField
                  name="link"
                  control={form.control}
                  fieldType={formFieldTypes.INPUT}
                  label="Blog Link: "
                  placeholder="Enter the Blog link"
                  inputClassName="h-fit p-2 w-56"
                />
              </div>
              <div className="flex items-start justify-between">
                <CustomFormField
                  name="date"
                  control={form.control}
                  fieldType={formFieldTypes.CALENDAR}
                  label="Blog Date: "
                  placeholder="Enter the Blog Date"
                />
                <CustomFormField
                  name="description"
                  control={form.control}
                  fieldType={formFieldTypes.TEXTAREA}
                  label="Blog Description: "
                  placeholder="Enter the Blog Description"
                  inputClassName="h-28 p-2 w-56 mx-0"
                />
                <CustomFormField
                  name="image"
                  control={form.control}
                  fieldType={formFieldTypes.IMAGE_UPLOADER}
                  label="Blog Image: "
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
                {loading ? "Creating..." : "Create Blog"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center gap-6">
        {currentData.map((item, idx) => (
          <div key={idx}>
            <div className="flex items-center gap-2 absolute z-50 bg-transparent w-80 justify-end">
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
                    <DialogTitle>Update {item.title} Blog</DialogTitle>
                    <DialogDescription>
                      Update the Informations about {item.title} Blog
                    </DialogDescription>
                  </DialogHeader>
                  <div className="max-h-[60vh] overflow-y-auto pr-2 [&::-webkit-scrollbar]:hidden">
                    <AdminBlogUpdate
                      image={item.image}
                      title={item.title}
                      desc={item.description}
                      link={item.link}
                      source={item.source}
                      date={item.date}
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
                    <AlertDialogAction className="bg-red-500 cursor-pointer" >
                      Delete
                    </AlertDialogAction>
                  </div>
                </AlertDialogContent>
              </AlertDialog>
            </div>
            <div className="group bg-white dark:bg-slate-950 rounded-2xl overflow-hidden border border-amber-50 dark:border-amber-900/20 shadow-sm hover:shadow-xl transition-all">
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-linear-to-t from-black/60 to-transparent">
                  <span className="text-[10px] text-white font-bold uppercase tracking-widest">
                    {item.source}
                  </span>
                </div>
              </div>
              <div className="p-5 space-y-3">
                <span className="text-amber-600 text-[10px] font-bold">
                  {item.date.toDateString()}
                </span>
                <h3 className="text-lg font-bold leading-tight group-hover:text-amber-600 transition-colors">
                  {item.title}
                </h3>
                <p className="font-serif text-sm text-slate-600 dark:text-slate-400 line-clamp-2">
                  {item.description}
                </p>
                <Link
                  href={item.link}
                  className="inline-block text-amber-600 font-bold text-xs uppercase tracking-widest border-b-2 border-amber-500/20 hover:border-amber-500 transition-all pt-2"
                >
                  Read Story
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminBlogs;
