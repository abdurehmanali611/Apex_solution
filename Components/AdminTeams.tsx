"use client";
import { teamMembers } from "@/constants";
import { teamsPage } from "@/lib/validation";
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
import { CreateTeam, handleUploadSuccess } from "@/lib/actions";
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
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { CardFooter } from "./ui/card";
import { Avatar } from "./ui/avatar";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "@iconify/react";
import AdminTeamUpdate from "./AdminTeamUpdate";

export interface teamprop {
  image: string;
  name: string;
  position: string;
  title: string;
  description: string;
  facebook: string;
  instagram: string;
  linkedin: string;
  telegram: string;
}

const AdminTeams = () => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [currentData, setCurrentData] = useState<teamprop[]>([]);
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof teamsPage>>({
    resolver: zodResolver(teamsPage),
    defaultValues: {
      image: "",
      name: "",
      position: "",
      title: "",
      description: "",
      facebook: "",
      instagram: "",
      linkedin: "",
      telegram: "",
    },
  });
  useEffect(() => {
    (() => {
      const data = teamMembers;
      setCurrentData(data);
    })();
  }, []);
  return (
    <div className="flex flex-col gap-10 items-center">
      <Card>
        <CardHeader>
          <CardTitle>Creating a Team Member</CardTitle>
          <CardDescription>
            Let&apos;s showup who is behind our expertise
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form className="flex flex-col gap-5" onSubmit={form.handleSubmit((data) => {
              CreateTeam(data, setLoading)
              form.reset()
            })}>
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
                <CustomFormField
                  name="title"
                  control={form.control}
                  fieldType={formFieldTypes.INPUT}
                  label="Title: "
                  placeholder="eg: the Founder"
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
                <CustomFormField
                  name="linkedin"
                  control={form.control}
                  fieldType={formFieldTypes.INPUT}
                  label="LinkedIn: "
                  placeholder="his/her linkedin link"
                  inputClassName="h-fit p-2 w-56"
                />
              </div>
              <div className="flex items-start gap-5">
                <CustomFormField
                  name="telegram"
                  control={form.control}
                  fieldType={formFieldTypes.INPUT}
                  label="Telegram: "
                  placeholder="his/her telegram link"
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
                <CustomFormField
                  name="image"
                  control={form.control}
                  fieldType={formFieldTypes.IMAGE_UPLOADER}
                  label="Image: "
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
                {loading ? "Creating..." : "Create Team Member"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-6">
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
                    <DialogTitle>Update {item.name} Blog</DialogTitle>
                    <DialogDescription>
                      Update the Informations about {item.name} Blog
                    </DialogDescription>
                  </DialogHeader>
                  <div className="max-h-[60vh] overflow-y-auto pr-2 [&::-webkit-scrollbar]:hidden">
                    <AdminTeamUpdate
                      name={item.name}
                      image={item.image}
                      position={item.position}
                      title={item.title}
                      desc={item.description}
                      facebook={item.facebook}
                      instagram={item.instagram}
                      linkedin={item.linkedin}
                      telegram={item.telegram}
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
            <Card className="w-80 border-amber-100 dark:border-amber-900/20 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm group hover:-translate-y-2 transition-all duration-300">
              <CardHeader className="flex flex-col items-center">
                <div className="relative p-1 rounded-full border-2 border-amber-500/20 group-hover:border-amber-500 transition-colors duration-500">
                  <Avatar className="w-24 h-24">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </Avatar>
                </div>
                <CardTitle className="mt-4 text-lg font-bold">
                  {item.name}
                </CardTitle>
                <CardDescription className="text-amber-600 dark:text-amber-500 font-bold text-xs uppercase tracking-tighter">
                  {item.position} — {item.title}
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center font-serif text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {item.description}
              </CardContent>
              <CardFooter className="flex gap-4 justify-center border-t border-amber-50 dark:border-amber-900/10">
                <Link
                  href={item.facebook}
                  className="text-slate-400 hover:text-amber-500 transition-colors"
                >
                  <Icon icon="lucide:facebook" className="w-5 h-5" />
                </Link>
                <Link
                  href={item.instagram}
                  className="text-slate-400 hover:text-amber-500 transition-colors"
                >
                  <Icon icon="lucide:instagram" className="w-5 h-5" />
                </Link>
                <Link
                  href={item.linkedin}
                  className="text-slate-400 hover:text-amber-500 transition-colors"
                >
                  <Icon icon="lucide:linkedin" className="w-5 h-5" />
                </Link>
                <Link
                  href={item.telegram}
                  className="text-slate-400 hover:text-amber-500 transition-colors"
                >
                  <Icon icon="lucide:send" className="w-5 h-5" />
                </Link>
              </CardFooter>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminTeams;
