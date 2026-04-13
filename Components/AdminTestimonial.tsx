"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { testimonialPage } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Form } from "./ui/form";
import CustomFormField, { formFieldTypes } from "./customFormField";
import {
  CreateTestimonial,
  DeleteTestimonial,
  GetTestimonial,
  handleUploadSuccess,
  testimony,
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Edit, Star, Trash2 } from "lucide-react";
import AdminTestimonialUpdate from "./AdminTestimonialUpdate";
import Image from "next/image";
import { toast } from "sonner";

const AdminTestimonial = () => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [currentData, setCurrentData] = useState<testimony[]>([]);
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const form = useForm<z.infer<typeof testimonialPage>>({
    resolver: zodResolver(testimonialPage),
    defaultValues: {
      name: "",
      profession: "",
      image: "",
      content: "",
      rating: 0,
    },
  });

  const loadData = async () => {
    try {
      const data = await GetTestimonial();
      if (Array.isArray(data)) {
        setCurrentData(data);
      } else {
        setCurrentData([]);
      }
    } catch {
      toast.error("Failed to load testimonials.");
    }
  };

  useEffect(() => {
    (async () => {
      await loadData();
    })();
  }, [currentData]);

  const handleDelete = async (id: number) => {
    if (!id) return;
    setDeleting(true);
    await DeleteTestimonial(id);
    await loadData();
    setDeleting(false);
  };

  return (
    <div className="space-y-10 text-slate-100">
      <Card className="border border-slate-800/80 bg-slate-950/95 shadow-[0_30px_90px_-40px_rgba(0,0,0,0.65)] ring-1 ring-slate-700/70">
        <CardHeader className="space-y-4 p-8">
          <CardTitle className="text-3xl text-slate-100">
            Create Testimonial
          </CardTitle>
          <CardDescription className="text-slate-400">
            Add a new testimonial to the site and keep the admin carousel fresh.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-8">
          <Form {...form}>
            <form
              className="flex flex-col gap-5"
              onSubmit={form.handleSubmit(async (values) => {
                await CreateTestimonial(values, setLoading);
                form.reset();
                setPreviewUrl(null);
                await loadData();
              })}
            >
              <div className="grid gap-5 lg:grid-cols-3">
                <CustomFormField
                  name="name"
                  control={form.control}
                  fieldType={formFieldTypes.INPUT}
                  label="Client Name"
                  placeholder="e.g. Abebe"
                  inputClassName="h-fit p-2 w-56"
                />
                <CustomFormField
                  name="profession"
                  control={form.control}
                  fieldType={formFieldTypes.INPUT}
                  label="Profession"
                  placeholder="e.g. Manager"
                  inputClassName="h-fit p-2 w-56"
                />
                <CustomFormField
                  name="rating"
                  control={form.control}
                  fieldType={formFieldTypes.INPUT}
                  label="Rating"
                  placeholder="1-5"
                  type="number"
                  inputClassName="h-fit p-2 w-56"
                />
              </div>

              <div className="grid gap-5 lg:grid-cols-[1fr_280px]">
                <CustomFormField
                  name="content"
                  control={form.control}
                  fieldType={formFieldTypes.TEXTAREA}
                  label="Testimonial"
                  placeholder="Enter the client testimonial"
                  inputClassName="h-32 p-2"
                />
                <CustomFormField
                  name="image"
                  control={form.control}
                  fieldType={formFieldTypes.IMAGE_UPLOADER}
                  label="Client Image"
                  previewUrl={previewUrl}
                  handleCloudinary={(result) =>
                    handleUploadSuccess(result, form, setPreviewUrl, "image")
                  }
                />
              </div>

              <Button
                type="submit"
                className="w-full rounded-3xl bg-amber-500 text-slate-950 hover:bg-amber-400 cursor-pointer"
              >
                {loading ? "Creating..." : "Save Testimonial"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {currentData.length === 0 ? (
          <div className="col-span-full rounded-[2rem] border border-dashed border-slate-700/80 bg-slate-900/80 p-10 text-center text-slate-400">
            No testimonials available yet.
          </div>
        ) : (
          currentData.map((item) => (
            <Card
              key={item.id}
              className="group overflow-hidden border border-slate-800/90 bg-slate-950/95 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.55)]"
            >
              <div className="relative">
                <div className="absolute right-4 top-4 flex items-center gap-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                    <DialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="cursor-pointer"
                      >
                        <Edit className="text-amber-400" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="flex flex-col gap-5">
                      <DialogHeader>
                        <DialogTitle>Update {item.name}</DialogTitle>
                        <DialogDescription>
                          Edit the testimonial content and image.
                        </DialogDescription>
                      </DialogHeader>
                      <AdminTestimonialUpdate
                        id={item.id}
                        name={item.name}
                        profession={item.profession}
                        image={item.image}
                        content={item.content}
                        rating={item.rating}
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
                        className="cursor-pointer"
                      >
                        <Trash2 className="text-rose-500" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete {item.name}</AlertDialogTitle>
                        <AlertDialogDescription>
                          Confirm delete to remove this testimonial permanently.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <div className="flex items-center gap-4 justify-end">
                        <AlertDialogCancel className="cursor-pointer">
                          Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction
                          className="rounded-full bg-rose-500 px-4 py-2 text-white"
                          onClick={() => void handleDelete(item.id)}
                        >
                          {deleting ? "Deleting..." : "Delete"}
                        </AlertDialogAction>
                      </div>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>

              <CardContent className="p-8">
                <div className="flex items-center gap-4">
                  <div className="relative h-20 w-20 overflow-hidden rounded-3xl border border-amber-500/20 bg-slate-800">
                    <Image
                      fill
                      src={item.image}
                      alt={item.name}
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-sm uppercase tracking-[0.24em] text-amber-400">
                      {item.profession}
                    </p>
                    <h3 className="text-2xl font-semibold text-slate-100">
                      {item.name}
                    </h3>
                  </div>
                </div>
                <div className="mt-6 rounded-[2rem] border border-slate-800/80 bg-slate-900/80 p-6 text-slate-300">
                  <p className="text-lg leading-8 italic">“{item.content}”</p>
                </div>
                <div className="mt-6 flex items-center gap-1">
                  {[...Array(5)].map((_, index) => (
                    <Star
                      key={index}
                      className={`h-4 w-4 ${index < item.rating ? "text-amber-400" : "text-slate-700"}`}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminTestimonial;
