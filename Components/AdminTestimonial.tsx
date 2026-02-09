"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { testimonialPage } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Testimonial } from "@/constants";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Form } from "./ui/form";
import CustomFormField, { formFieldTypes } from "./customFormField";
import { CreateTestimonial, handleUploadSuccess } from "@/lib/actions";
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
import { Edit, Quote, Star, Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import AdminTestimonialUpdate from "./AdminTestimonialUpdate";
import Image from "next/image"

export interface testimony {
  name: string;
  profession: string;
  image: string;
  content: string;
  rating: number;
}

const AdminTestimonial = () => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [currentData, setCurrentData] = useState<testimony[]>([]);
  const [loading, setLoading] = useState(false);
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
  useEffect(() => {
    (() => {
      const data = Testimonial;
      setCurrentData(data);
    })();
  }, []);
  return (
    <div className="flex flex-col gap-10 items-center">
      <Card>
        <CardHeader>
          <CardTitle>Create Testimony</CardTitle>
          <CardDescription>
            Let&apos;s show up who are we to our Clients
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form className="flex flex-col gap-5" onSubmit={form.handleSubmit((values) => {
              CreateTestimonial(values, setLoading)
              form.reset()
            })}>
              <div className="flex gap-5 items-center">
                <CustomFormField
                  name="name"
                  control={form.control}
                  fieldType={formFieldTypes.INPUT}
                  label="Client Name: "
                  placeholder="eg: Abebe"
                  inputClassName="h-fit p-2 w-56"
                />
                <CustomFormField
                  name="profession"
                  control={form.control}
                  fieldType={formFieldTypes.INPUT}
                  label="Client Profession: "
                  placeholder="eg: Manager"
                  inputClassName="h-fit p-2 w-56"
                />
              </div>

              <div className="flex items-start gap-5">
                <CustomFormField
                  name="content"
                  control={form.control}
                  fieldType={formFieldTypes.TEXTAREA}
                  label="Client content: "
                  placeholder="Enter the client content"
                  inputClassName="h-28 p-2 w-56 mx-0"
                />
                <CustomFormField
                  name="image"
                  control={form.control}
                  fieldType={formFieldTypes.IMAGE_UPLOADER}
                  label="Client Image: "
                  previewUrl={previewUrl}
                  handleCloudinary={(result) =>
                    handleUploadSuccess(result, form, setPreviewUrl, "image")
                  }
                />
              </div>
              <CustomFormField
                name="rating"
                control={form.control}
                fieldType={formFieldTypes.INPUT}
                label="Rating: "
                placeholder="Enter Clients rating"
                inputClassName="h-fit p-2 w-56 justify-center"
                type="number"
              />
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
      <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-6">
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
                    <DialogTitle>Update {item.name} Testimony</DialogTitle>
                    <DialogDescription>
                      Update the Informations about {item.name} Testimony
                    </DialogDescription>
                  </DialogHeader>
                  <AdminTestimonialUpdate
                    name={item.name}
                    profession={item.profession}
                    image={item.image}
                    content={item.content}
                    rating={item.rating}
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
                    <AlertDialogTitle>Deleting {item.name}</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to Delete {item.name}. This Action
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
            <div className="p-10 bg-white/60 dark:bg-slate-900/60 backdrop-blur-md border border-amber-100/50 dark:border-amber-900/30 rounded-[2rem] h-full shadow-xl shadow-amber-500/5 relative overflow-hidden group">
              <Quote className="absolute -top-4 -right-4 w-24 h-24 text-amber-500/5 -rotate-12 group-hover:rotate-0 transition-transform duration-500" />

              <div className="flex flex-col gap-6 relative z-10">
                <div className="flex items-center gap-5">
                  <div className="relative shrink-0">
                    <div className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-amber-500/30 p-1 bg-white dark:bg-slate-800">
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={80}
                        height={80}
                        className="rounded-xl object-cover h-full w-full"
                      />
                    </div>
                    <div className="absolute -bottom-2 -right-2 bg-amber-500 p-1.5 rounded-lg shadow-lg">
                      <Star className="text-white fill-white w-3 h-3" />
                    </div>
                  </div>

                  <div>
                    <h5 className="text-xl font-bold text-slate-900 dark:text-white mb-1 leading-tight">
                      {item.name}
                    </h5>
                    <p className="text-amber-600 dark:text-amber-500 text-xs font-bold uppercase tracking-[0.15em]">
                      {item.profession}
                    </p>
                  </div>
                </div>

                <p className="font-serif text-lg italic text-slate-700 dark:text-slate-300 leading-relaxed">
                  &ldquo;{item.content}&rdquo;
                </p>

                <div className="flex gap-1 pt-2 border-t border-amber-50 dark:border-amber-900/20 w-fit">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < item.rating ? "text-amber-500 fill-amber-500" : "text-slate-200"}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminTestimonial;
