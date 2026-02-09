"use client";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { useForm } from "react-hook-form";
import z from "zod";
import { servicePage } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Service } from "@/constants";
import { Form } from "./ui/form";
import CustomFormField, { formFieldTypes } from "./customFormField";
import { Button } from "./ui/button";
import { ChevronsUpDown, Edit, Trash2 } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";
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
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import AdminServiceUpdate from "./AdminServiceUpdate";
import { CreateService } from "@/lib/actions";

export interface services {
  icon: string;
  title: string;
  description: string;
}

const AdminServices = () => {
  const [currentData, setCurrentData] = useState<services[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false); 
  const form = useForm<z.infer<typeof servicePage>>({
    resolver: zodResolver(servicePage),
    defaultValues: {
      icon: "",
      title: "",
      description: "",
    },
  });
  useEffect(() => {
    (() => {
      const data = Service;
      setCurrentData(data);
    })();
  });
  return (
    <div className="flex flex-col gap-10 items-center">
      <Card>
        <CardHeader>
          <CardTitle>Services</CardTitle>
          <CardDescription>What are we providing</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form className="flex flex-col gap-5 items-center" onSubmit={form.handleSubmit((values) => {
              CreateService(values, setLoading)
              form.reset()
            })}>
              <div className="flex items-center gap-5">
                <CustomFormField
                  name="icon"
                  control={form.control}
                  fieldType={formFieldTypes.INPUT}
                  label="Icon Name: "
                  placeholder="Iconify Icon name"
                  inputClassName="h-fit p-2 w-56"
                />
                <CustomFormField
                  name="title"
                  control={form.control}
                  fieldType={formFieldTypes.INPUT}
                  label="Service Title: "
                  placeholder="Enter Service title"
                  inputClassName="h-fit p-2 w-56"
                />
              </div>
              <CustomFormField
                name="description"
                control={form.control}
                fieldType={formFieldTypes.TEXTAREA}
                label="Service Description: "
                placeholder="Enter Service Description"
                inputClassName="h-28 p-2 w-56 mx-0"
              />
              <Button
                type="submit"
                className="cursor-pointer bg-amber-500 w-full"
              >
                {loading ? "Creating..." : "Create Service"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      <Collapsible
        open={isOpen}
        onOpenChange={setIsOpen}
        className="w-full flex flex-col gap-5 px-3 py-3"
      >
        <CollapsibleTrigger
          asChild
          className="cursor-pointer flex items-center w-full justify-between"
        >
          <Button variant="ghost">
            <span className="text-lg font-serif">Update/Delete Services</span>
            <ChevronsUpDown className="w-4 h-4" />
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-6">
            {/* Here displayed only the fetched Data not constant data from index.ts */}
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
                        <DialogTitle>Update {item.title} Service</DialogTitle>
                        <DialogDescription>
                          Update the Informations about {item.title} service
                        </DialogDescription>
                      </DialogHeader>
                      <AdminServiceUpdate
                        icon={item.icon}
                        title={item.title}
                        desc={item.description}
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
                        <AlertDialogTitle>
                          Deleting {item.title}
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to Delete {item.title}. This
                          Action can&apos;t be UnDone.
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
                <Card>
                  <CardHeader className="flex flex-col gap-5 items-center">
                    <Icon icon={item.icon} className="w-10 h-10" />
                    <CardTitle className="text-lg font-serif font-semibold">
                      {item.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-center font-serif">
                    {item.description}
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default AdminServices;
