/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
import { Form } from "./ui/form";
import { useForm } from "react-hook-form";
import z from "zod";
import { portFolioPage } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "./ui/button";
import CustomFormField, { formFieldTypes } from "./customFormField";
import { portFolioTypes } from "@/constants";
import { toast } from "sonner";
import { ImageIcon } from "lucide-react";
import Image from "next/image";

interface portUpdate {
  image?: string;
  title: string;
  desc: string;
  type: string;
  duration: number;
  link?: string;
  version?: number;
  special?: boolean;
}

const AdminPortFolioUpdate = ({
  image,
  title,
  desc,
  type,
  duration,
  link,
  version,
  special,
}: portUpdate) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(image || null);
  const form = useForm<z.infer<typeof portFolioPage>>({
    resolver: zodResolver(portFolioPage),
    defaultValues: {
      image: image,
      title: title,
      description: desc,
      type: type,
      duration: duration,
      version: version,
      link: link,
      special: special,
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
      <form className="flex flex-col gap-5">
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
        </div>
        <div className="flex items-center gap-5">
          <CustomFormField
            name="duration"
            control={form.control}
            fieldType={formFieldTypes.INPUT}
            label="PortFolio Duration(in Days): "
            type="number"
            inputClassName="h-fit p-2 w-56"
          />
          <CustomFormField
            name="version"
            control={form.control}
            fieldType={formFieldTypes.INPUT}
            label="PortFolio Version(If any): "
            type="number"
            inputClassName="h-fit p-2 w-56"
          />
        </div>
        <div className="flex items-center gap-5">
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
        <div className="flex items-start gap-5">
          <CustomFormField
            name="description"
            control={form.control}
            fieldType={formFieldTypes.TEXTAREA}
            label="PortFolio description: "
            placeholder="Enter portfolio desc"
            inputClassName="h-32 p-2 w-72 mx-0"
          />
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">PortFolio Image</label>
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
          Update PortFolio
        </Button>
      </form>
    </Form>
  );
};

export default AdminPortFolioUpdate;
