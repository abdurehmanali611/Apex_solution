"use client";
import { teamsPage } from "@/lib/validation";
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
import { CreateTeam, DeleteTeam, GetTeam, handleUploadSuccess, teams } from "@/lib/actions";
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
import { Avatar } from "./ui/avatar";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "@iconify/react";
import AdminTeamUpdate from "./AdminTeamUpdate";
import { toast } from "sonner";

const AdminTeams = () => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [currentData, setCurrentData] = useState<teams[]>([]);
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
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

  const loadData = async () => {
    try {
      const data = await GetTeam()
      if (Array.isArray(data)) {
        setCurrentData(data);
      } else {
        setCurrentData([]); 
      }
    } catch {
      toast.error("Failed to load team members.");
    }
  }

  useEffect(() => {
    (async() => {
      await loadData();
    })()
  }, [currentData]);

  return (
    <div className="space-y-10 text-slate-100">
      <Card className="border border-slate-800/80 bg-slate-950/95 shadow-[0_30px_90px_-40px_rgba(0,0,0,0.65)] ring-1 ring-slate-700/70">
        <CardHeader className="space-y-3 p-8">
          <CardTitle className="text-3xl text-slate-100">Team Member Manager</CardTitle>
          <CardDescription className="text-slate-400">
            Add new team members, edit profiles, or update social details in one place.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-8">
          <Form {...form}>
            <form
              className="grid gap-6"
              onSubmit={form.handleSubmit(async (data) => {
                await CreateTeam(data, setLoading);
                form.reset();
                setPreviewUrl(null);
                await loadData();
              })}
            >
              <div className="grid gap-6 lg:grid-cols-3">
                <CustomFormField
                  name="name"
                  control={form.control}
                  fieldType={formFieldTypes.INPUT}
                  label="Name"
                  placeholder="eg: Atle"
                  inputClassName="w-56 rounded-2xl border border-slate-700/80 bg-slate-950 px-4 py-3 text-slate-100 outline-none focus:border-amber-400"
                />
                <CustomFormField
                  name="position"
                  control={form.control}
                  fieldType={formFieldTypes.INPUT}
                  label="Position"
                  placeholder="eg: CEO"
                  inputClassName="w-56 rounded-2xl border border-slate-700/80 bg-slate-950 px-4 py-3 text-slate-100 outline-none focus:border-amber-400"
                />
                <CustomFormField
                  name="title"
                  control={form.control}
                  fieldType={formFieldTypes.INPUT}
                  label="Title"
                  placeholder="eg: Founder"
                  inputClassName="w-56 rounded-2xl border border-slate-700/80 bg-slate-950 px-4 py-3 text-slate-100 outline-none focus:border-amber-400"
                />
              </div>
              <div className="grid gap-6 lg:grid-cols-3">
                <CustomFormField
                  name="facebook"
                  control={form.control}
                  fieldType={formFieldTypes.INPUT}
                  label="Facebook"
                  placeholder="facebook profile"
                  inputClassName="w-56 rounded-2xl border border-slate-700/80 bg-slate-950 px-4 py-3 text-slate-100 outline-none focus:border-amber-400"
                />
                <CustomFormField
                  name="instagram"
                  control={form.control}
                  fieldType={formFieldTypes.INPUT}
                  label="Instagram"
                  placeholder="instagram profile"
                  inputClassName="w-56 rounded-2xl border border-slate-700/80 bg-slate-950 px-4 py-3 text-slate-100 outline-none focus:border-amber-400"
                />
                <CustomFormField
                  name="linkedin"
                  control={form.control}
                  fieldType={formFieldTypes.INPUT}
                  label="LinkedIn"
                  placeholder="linkedin profile"
                  inputClassName="w-56 rounded-2xl border border-slate-700/80 bg-slate-950 px-4 py-3 text-slate-100 outline-none focus:border-amber-400"
                />
              </div>
              <div className="grid gap-6 lg:grid-cols-3">
                <CustomFormField
                  name="telegram"
                  control={form.control}
                  fieldType={formFieldTypes.INPUT}
                  label="Telegram"
                  placeholder="telegram profile"
                  inputClassName="w-56 rounded-2xl border border-slate-700/80 bg-slate-950 px-4 py-3 text-slate-100 outline-none focus:border-amber-400"
                />
                <CustomFormField
                  name="description"
                  control={form.control}
                  fieldType={formFieldTypes.INPUT}
                  label="Description"
                  placeholder="short intro"
                  inputClassName="w-56 rounded-2xl border border-slate-700/80 bg-slate-950 px-4 py-3 text-slate-100 outline-none focus:border-amber-400"
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
                {loading ? "Creating..." : "Add Team Member"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-3">
        {currentData.map((item, idx) => (
          <div key={idx} className="relative">
            <div className="absolute right-4 top-4 z-30 flex items-center gap-2">
              <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                <DialogTrigger asChild>
                  <Button variant="ghost" size="icon" className="cursor-pointer">
                    <Edit />
                  </Button>
                </DialogTrigger>
                <DialogContent className="flex flex-col gap-5">
                  <DialogHeader>
                    <DialogTitle>Update {item.name}</DialogTitle>
                    <DialogDescription>Refresh team member details and socials.</DialogDescription>
                  </DialogHeader>
                  <div className="max-h-[60vh] overflow-y-auto pr-2 [&::-webkit-scrollbar]:hidden">
                    <AdminTeamUpdate
                      id={item.id}
                      name={item.name}
                      image={item.image}
                      position={item.position}
                      title={item.title}
                      desc={item.description}
                      facebook={item.facebook}
                      instagram={item.instagram}
                      linkedin={item.linkedin}
                      telegram={item.telegram}
                      loadData={loadData}
                      onClose={() => setOpenDialog(false)}
                    />
                  </div>
                </DialogContent>
              </Dialog>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="ghost" size="icon" className="cursor-pointer">
                    <Trash2 className="text-red-500" />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete {item.name}</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to delete this profile? This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <div className="flex items-center gap-5 justify-end">
                    <AlertDialogCancel className="cursor-pointer">Cancel</AlertDialogCancel>
                    <AlertDialogAction className="bg-red-500 cursor-pointer" onClick={async() => {
                      await DeleteTeam(item.id)
                      await loadData()
                    }}>Delete</AlertDialogAction>
                  </div>
                </AlertDialogContent>
              </AlertDialog>
            </div>
            <Card className="overflow-hidden border border-slate-800/80 bg-slate-900/90 shadow-[0_18px_60px_-30px_rgba(0,0,0,0.5)] transition-transform duration-300 hover:-translate-y-1">
              <CardHeader className="flex flex-col items-center gap-4 px-6 pt-8 pb-4">
                <div className="relative rounded-full border-2 border-amber-500/30 p-1 shadow-[0_12px_40px_-30px_rgba(250,204,21,0.8)]">
                  <Avatar className="w-24 h-24">
                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                  </Avatar>
                </div>
                <CardTitle className="text-lg font-semibold text-slate-100">{item.name}</CardTitle>
                <CardDescription className="text-xs uppercase tracking-[0.24em] text-amber-400">
                  {item.position} · {item.title}
                </CardDescription>
              </CardHeader>
              <CardContent className="px-6 pb-6 text-center text-sm leading-7 text-slate-300">
                {item.description}
              </CardContent>
              <CardFooter className="flex items-center justify-center gap-4 border-t border-slate-800/70 px-6 py-4">
                <Link href={item.facebook} className="text-slate-400 hover:text-amber-400 transition-colors">
                  <Icon icon="lucide:facebook" className="w-5 h-5" />
                </Link>
                <Link href={item.instagram} className="text-slate-400 hover:text-amber-400 transition-colors">
                  <Icon icon="lucide:instagram" className="w-5 h-5" />
                </Link>
                <Link href={item.linkedin} className="text-slate-400 hover:text-amber-400 transition-colors">
                  <Icon icon="lucide:linkedin" className="w-5 h-5" />
                </Link>
                <Link href={item.telegram} className="text-slate-400 hover:text-amber-400 transition-colors">
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
