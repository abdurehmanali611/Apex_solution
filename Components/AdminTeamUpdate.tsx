/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { teamsPage } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import { Form } from "./ui/form";
import { Button } from "./ui/button";
import { ImageIcon } from "lucide-react";
import CustomFormField, { formFieldTypes } from "./customFormField";
import Image from "next/image";

interface updateTeam {
  name: string;
  position: string;
  image: string;
  title: string;
  desc: string;
  facebook: string;
  instagram: string;
  linkedin: string;
  telegram: string;
}
const AdminTeamUpdate = ({
  name,
  position,
  image,
  title,
  desc,
  facebook,
  instagram,
  linkedin,
  telegram,
}: updateTeam) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(image || null);
  const form = useForm<z.infer<typeof teamsPage>>({
    resolver: zodResolver(teamsPage),
    defaultValues: {
      name: name,
      position: position,
      image: image,
      title: title,
      description: desc,
      facebook: facebook,
      instagram: instagram,
      linkedin: linkedin,
      telegram: telegram,
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
      <form className="flex flex-col gap-5 items-center">
        <div className="flex items-center gap-5">
          <CustomFormField
            name="name"
            control={form.control}
            fieldType={formFieldTypes.INPUT}
            label="Name: "
            placeholder="eg: Atle"
            inputClassName="h-fit p-2 w-56"
          />
          <CustomFormField
            name="position"
            control={form.control}
            fieldType={formFieldTypes.INPUT}
            label="Position: "
            placeholder="eg: CEO"
            inputClassName="h-fit p-2 w-56"
          />
        </div>
        <div className="flex items-center gap-5">
          <CustomFormField
            name="title"
            control={form.control}
            fieldType={formFieldTypes.INPUT}
            label="Title: "
            placeholder="eg: the Founder"
            inputClassName="h-fit p-2 w-56"
          />
          <CustomFormField
            name="description"
            control={form.control}
            fieldType={formFieldTypes.INPUT}
            label="Description: "
            placeholder="his/her description"
            inputClassName="h-fit p-2 w-56"
          />
        </div>
        <div className="flex items-center gap-5">
          <CustomFormField
            name="facebook"
            control={form.control}
            fieldType={formFieldTypes.INPUT}
            label="Facebook: "
            placeholder="his/her facebook link"
            inputClassName="h-fit p-2 w-56"
          />
          <CustomFormField
            name="instagram"
            control={form.control}
            fieldType={formFieldTypes.INPUT}
            label="Instagram: "
            placeholder="his/her instagram link"
            inputClassName="h-fit p-2 w-56"
          />
        </div>
        <div className="flex items-start gap-5">
          <CustomFormField
            name="linkedin"
            control={form.control}
            fieldType={formFieldTypes.INPUT}
            label="LinkedIn: "
            placeholder="his/her linkedin link"
            inputClassName="h-fit p-2 w-56"
          />
          <CustomFormField
            name="telegram"
            control={form.control}
            fieldType={formFieldTypes.INPUT}
            label="Telegram: "
            placeholder="his/her telegram link"
            inputClassName="h-fit p-2 w-56"
          />
        </div>
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Team Image</label>
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
        <Button type="submit" className="cursor-pointer w-full bg-amber-500">
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default AdminTeamUpdate;
