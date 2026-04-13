/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { BlogsPage } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import { Form } from "./ui/form";
import { Button } from "./ui/button";
import { ImageIcon } from "lucide-react";
import Image from "next/image";
import CustomFormField, { formFieldTypes } from "./customFormField";
import { UpdateBlog } from "@/lib/actions";

const AdminBlogUpdate = ({
  id,
  title,
  desc,
  image,
  link,
  source,
  date,
  loadData,
  onClose
}: any) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(image || null);
  const [loading, setLoading] = useState(false);

   const formatDateForInput = (dateValue: any): string => {
    if (!dateValue) return new Date().toISOString().split('T')[0];
    
    try {
      const date = new Date(dateValue);
      if (isNaN(date.getTime())) {
        return new Date().toISOString().split('T')[0];
      }
      return date.toISOString().split('T')[0];
    } catch {
      return new Date().toISOString().split('T')[0];
    }
  };

  const form = useForm<z.infer<typeof BlogsPage>>({
    resolver: zodResolver(BlogsPage),
    defaultValues: {
      image: image,
      title: title,
      description: desc,
      link: link,
      source: source,
      date: formatDateForInput(date),
    },
  });
  const displayImage = previewUrl || image;
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => setPreviewUrl(reader.result as string);
    reader.readAsDataURL(file);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append(
        "upload_preset",
        process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME || "",
      );

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        },
      );

      const data = await response.json();
      const imageUrl = data.secure_url;

      form.setValue("image", imageUrl);
      setPreviewUrl(imageUrl);
      toast.success("Image uploaded successfully");
    } catch (error: any) {
      toast.error(`Failed to upload image: ${error.message}`);
    }
  };
  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-5"
        onSubmit={form.handleSubmit(async (values) => {
          const formattedDate =
            values.date instanceof Date
              ? values.date.toISOString().split("T")[0]
              : typeof values.date === "string"
                ? values.date
                : new Date(values.date).toISOString().split("T")[0];

          const payload = {
            ...values,
            id: id,
            date: formattedDate,
          };
          await UpdateBlog(payload, setLoading);
          onClose();
          await loadData();
        })}
      >
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
        </div>
        <div className="flex items-center gap-5">
          <CustomFormField
            name="link"
            control={form.control}
            fieldType={formFieldTypes.INPUT}
            label="Blog Link: "
            placeholder="Enter the Blog link"
            inputClassName="h-fit p-2 w-56"
          />
          <CustomFormField
            name="date"
            control={form.control}
            fieldType={formFieldTypes.CALENDAR}
            label="Blog Date: "
            placeholder="Enter the Blog Date"
          />
        </div>
        <div className="flex items-start justify-between">
          <CustomFormField
            name="description"
            control={form.control}
            fieldType={formFieldTypes.TEXTAREA}
            label="Blog Description: "
            placeholder="Enter the Blog Description"
            inputClassName="h-36 p-2 w-64 mx-0"
          />
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Blog Image</label>
              <div className="relative w-42 h-42 rounded-lg flex items-center justify-center overflow-hidden group mt-2">
                {displayImage ? (
                  <>
                    <Image
                      src={displayImage}
                      alt="Preview"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                      <Button
                        type="button"
                        variant="secondary"
                        size="sm"
                        className="cursor-pointer"
                        onClick={() =>
                          document.getElementById("image-upload")?.click()
                        }
                      >
                        Change Image
                      </Button>
                    </div>
                  </>
                ) : (
                  <div className="text-center p-6">
                    <ImageIcon className="mx-auto h-12 w-12 text-muted-foreground/50" />
                    <div className="mt-2">
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="cursor-pointer"
                        onClick={() =>
                          document.getElementById("image-upload")?.click()
                        }
                      >
                        Upload Image
                      </Button>
                    </div>
                  </div>
                )}
                <input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                />
              </div>
            </div>
          </div>
        </div>
        <Button type="submit" className="cursor-pointer w-full bg-amber-500">
          {loading ? "Updating..." : "Update Blog"}
        </Button>
      </form>
    </Form>
  );
};

export default AdminBlogUpdate;
