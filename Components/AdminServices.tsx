"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { servicePage } from "@/lib/validation";
import { Form } from "./ui/form";
import CustomFormField, { formFieldTypes } from "./customFormField";
import { Button } from "./ui/button";
import { Edit, Trash2 } from "lucide-react";
import { Icon } from "@iconify/react";
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
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import AdminServiceUpdate from "./AdminServiceUpdate";
import { CreateService, DeleteService, GetService, Services } from "@/lib/actions";
import { toast } from "sonner";

const AdminServices = () => {
  const [currentData, setCurrentData] = useState<Services[]>([]);
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const form = useForm<z.infer<typeof servicePage>>({
    resolver: zodResolver(servicePage),
    defaultValues: {
      icon: "",
      title: "",
      description: "",
    },
  });

  const loadData = async() => {
    try {
      const data = await GetService()
      if (Array.isArray(data)) {
        setCurrentData(data);
      }else {
        setCurrentData([])
      }
    } catch {
      toast.error("Failed to load services. Please try again.");
    }
  }

  useEffect(() => {
    (async() => {
      await loadData()
    })()
  }, [currentData]);

  return (
    <div className="space-y-10 text-slate-100">
      <Card className="border border-slate-800/80 bg-slate-950/95 shadow-[0_28px_120px_-40px_rgba(0,0,0,0.45)] ring-1 ring-slate-700/80">
        <CardHeader className="space-y-3 p-6">
          <CardTitle className="text-3xl text-slate-100">Services</CardTitle>
          <CardDescription className="text-slate-400">
            Manage the services offered on the site with clean admin controls.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              className="grid gap-6"
              onSubmit={form.handleSubmit(async (values) => {
                await CreateService(values, setLoading);
                form.reset();
                await loadData()
              })}
            >
              <div className="flex items-center justify-between">
                <CustomFormField
                  name="icon"
                  control={form.control}
                  fieldType={formFieldTypes.INPUT}
                  label="Icon name"
                  placeholder="Iconify icon name"
                  inputClassName="w-74 rounded-2xl border border-slate-700/80 bg-slate-950 px-4 py-3 text-slate-100 outline-none focus:border-amber-400"
                />
                <CustomFormField
                  name="title"
                  control={form.control}
                  fieldType={formFieldTypes.INPUT}
                  label="Service title"
                  placeholder="Service title"
                  inputClassName="w-74 rounded-2xl border border-slate-700/80 bg-slate-950 px-4 py-3 text-slate-100 outline-none focus:border-amber-400"
                />
              </div>
              <CustomFormField
                name="description"
                control={form.control}
                fieldType={formFieldTypes.TEXTAREA}
                label="Service description"
                placeholder="Enter service description"
                inputClassName="w-full rounded-2xl border border-slate-700/80 bg-slate-950 px-4 py-3 text-slate-100 outline-none focus:border-amber-400 mx-1"
              />
              <Button
                type="submit"
                className="w-full cursor-pointer rounded-full bg-amber-500 px-6 py-3 text-slate-950 transition hover:bg-amber-400"
              >
                {loading ? "Creating..." : "Create Service"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        {currentData.map((item, idx) => (
          <Card
            key={idx}
            className="relative overflow-hidden border border-slate-800/70 bg-slate-950/90 shadow-[0_18px_60px_-30px_rgba(0,0,0,0.45)]"
          >
            <div className="absolute inset-x-0 top-0 h-2 bg-amber-500/80" />
            <CardHeader className="space-y-4 p-6 pt-10">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-2 text-amber-300">
                    <Icon icon={item.icon} className="h-5 w-5" />
                    <span className="text-xl font-semibold text-slate-100">
                      {item.title}
                    </span>
                  </div>
                </div>
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
                        <DialogTitle>Update {item.title} Service</DialogTitle>
                      </DialogHeader>
                      <AdminServiceUpdate
                        id={item.id}
                        icon={item.icon}
                        title={item.title}
                        description={item.description}
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
                        <AlertDialogTitle>Delete {item.title}</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to delete this service? This
                          action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <div className="flex items-center gap-4 justify-end pt-4">
                        <AlertDialogCancel className="rounded-full border border-slate-700 px-4 py-2 text-slate-200 hover:bg-slate-900">
                          Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction className="rounded-full bg-red-500 px-4 py-2 text-white hover:bg-red-400" onClick={async() => {
                          await DeleteService(item.id)
                          await loadData()
                        }}>
                          Delete
                        </AlertDialogAction>
                      </div>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
              <CardDescription className="text-slate-400">
                {item.description}
              </CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminServices;
