"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  CardContent,
} from "./ui/card";
import z from "zod";
import { BlogsPage } from "@/lib/validation";
import { Form } from "./ui/form";
import CustomFormField, { formFieldTypes } from "./customFormField";
import {
  blogs,
  CreateBlog,
  DeleteBlog,
  GetBlog,
  handleUploadSuccess,
} from "@/lib/actions";
import { Button } from "./ui/button";
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
import Link from "next/link";
import Image from "next/image";
import AdminBlogUpdate from "./AdminBlogUpdate";
import { toast } from "sonner";

const AdminBlogs = () => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [currentData, setCurrentData] = useState<blogs[]>([]);
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
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

  const loadData = async () => {
    try {
      const data = await GetBlog();
      if (Array.isArray(data)) {
        setCurrentData(data);
      } else {
        setCurrentData([]);
      }
    } catch {
      toast.error("Failed to load blogs");
    }
  };

  useEffect(() => {
    (async () => {
      await loadData();
    })();
  }, [currentData]);

  return (
    <div className="space-y-10 text-slate-100">
      <Card className="border border-slate-800/80 bg-slate-950/95 shadow-[0_28px_120px_-40px_rgba(0,0,0,0.45)] ring-1 ring-slate-700/80">
        <CardHeader className="space-y-3 p-6">
          <CardTitle className="text-3xl text-slate-100">Blogs</CardTitle>
          <CardDescription className="text-slate-400">
            Publish and manage blog entries with a polished admin editor.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <Form {...form}>
            <form
              className="grid gap-6"
              onSubmit={form.handleSubmit(async (values) => {
                const formattedDate =
                  values.date instanceof Date
                    ? values.date.toISOString().split("T")[0]
                    : new Date(values.date).toISOString().split("T")[0];

                const payload = {
                  ...values,
                  date: formattedDate, // Send as string in YYYY-MM-DD format
                };
                await CreateBlog(payload, setLoading);
                form.reset();
                setPreviewUrl(null);
                await loadData();
              })}
            >
              <div className="grid gap-6 lg:grid-cols-3">
                <CustomFormField
                  name="title"
                  control={form.control}
                  fieldType={formFieldTypes.INPUT}
                  label="Title"
                  placeholder="Blog title"
                  inputClassName="w-56 rounded-2xl border border-slate-700/80 bg-slate-950 px-4 py-3 text-slate-100 outline-none focus:border-amber-400"
                />
                <CustomFormField
                  name="source"
                  control={form.control}
                  fieldType={formFieldTypes.INPUT}
                  label="Source"
                  placeholder="Blog source"
                  inputClassName="w-56 rounded-2xl border border-slate-700/80 bg-slate-950 px-4 py-3 text-slate-100 outline-none focus:border-amber-400"
                />
                <CustomFormField
                  name="link"
                  control={form.control}
                  fieldType={formFieldTypes.INPUT}
                  label="Link"
                  placeholder="Blog URL"
                  inputClassName="w-56 rounded-2xl border border-slate-700/80 bg-slate-950 px-4 py-3 text-slate-100 outline-none focus:border-amber-400"
                />
              </div>
              <div className="grid gap-6 lg:grid-cols-3">
                <CustomFormField
                  name="date"
                  control={form.control}
                  fieldType={formFieldTypes.CALENDAR}
                  label="Publish date"
                  placeholder="Blog date"
                />
                <CustomFormField
                  name="description"
                  control={form.control}
                  fieldType={formFieldTypes.TEXTAREA}
                  label="Description"
                  placeholder="Blog description"
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
                {loading ? "Creating..." : "Create Blog"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-3">
        {currentData.map((item, idx) => (
          <div key={idx} className="relative">
            <Card className="overflow-hidden border border-slate-800/70 bg-slate-950/90 shadow-[0_18px_60px_-30px_rgba(0,0,0,0.45)]">
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-x-0 bottom-0 p-4 bg-linear-to-t from-slate-950/95 to-transparent">
                  <span className="text-[10px] uppercase tracking-[0.24em] text-amber-300">
                    {item.source}
                  </span>
                </div>
              </div>
              <CardContent className="space-y-4 p-5">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-xs uppercase tracking-[0.26em] text-amber-400/90">
                    {new Date(item.date).toDateString()}
                  </span>
                  <div className="flex items-center gap-2">
                    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                      <DialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-slate-200 hover:text-amber-300"
                        >
                          <Edit />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="flex flex-col gap-5">
                        <DialogHeader>
                          <DialogTitle>Update {item.title} Blog</DialogTitle>
                        </DialogHeader>
                        <AdminBlogUpdate
                          id={item.id}
                          image={item.image}
                          title={item.title}
                          desc={item.description}
                          link={item.link}
                          source={item.source}
                          date={item.date}
                          loadData={loadData}
                          onClose={() => setOpenDialog(false)}
                        />
                      </DialogContent>
                    </Dialog>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-red-400 hover:text-red-300"
                        >
                          <Trash2 />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Delete {item.title}
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to delete this blog? This
                            action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <div className="flex items-center gap-4 justify-end pt-4">
                          <AlertDialogCancel className="rounded-full border border-slate-700 px-4 py-2 text-slate-200 hover:bg-slate-900">
                            Cancel
                          </AlertDialogCancel>
                          <AlertDialogAction
                            className="rounded-full bg-red-500 px-4 py-2 text-white hover:bg-red-400"
                            onClick={async () => {
                              await DeleteBlog(item.id);
                              await loadData();
                            }}
                          >
                            Delete
                          </AlertDialogAction>
                        </div>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-slate-100">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-400 line-clamp-2">
                    {item.description}
                  </p>
                </div>
                <Link
                  href={item.link}
                  className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 text-sm font-semibold"
                >
                  Read Story
                </Link>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminBlogs;
