"use client";
import AdminBlogs from "@/Components/AdminBlogs";
import AdminExperience from "@/Components/AdminExperience";
import AdminPortFolio from "@/Components/AdminPortFolio";
import AdminProject from "@/Components/AdminProject";
import AdminServices from "@/Components/AdminServices";
import AdminTestimonial from "@/Components/AdminTestimonial";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/Components/ui/breadcrumb";
import { Button } from "@/Components/ui/button";
import { Separator } from "@/Components/ui/separator";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/Components/ui/sidebar";
import { dashboardList } from "@/constants";
import { Icon } from "@iconify/react";
import Image from "next/image";
import { useState } from "react";
export default function AdminDashboard() {
  const [link, setLink] = useState<string>("Dashboard");
  return (
    <div>
      <SidebarProvider>
        <Sidebar collapsible="offcanvas">
          <SidebarContent className="overflow-y-auto [&::-webkit-scrollbar]:hidden scrollbar-none py-5">
            <SidebarGroup className="flex flex-col gap-7">
              <SidebarHeader>
                <Button
                  className="flex items-center gap-5 p-4 h-fit"
                  variant="outline"
                  onClick={() => setLink("Dashboard")}
                >
                  <Image
                    src="/vercel.svg"
                    alt="Logo"
                    width={50}
                    height={50}
                    loading="eager"
                    className="rounded-full"
                  />
                  <h2 className="font-serif font-semibold text-xl">
                    Admin Panel
                  </h2>
                </Button>
              </SidebarHeader>
              <SidebarGroupContent className="flex flex-col gap-2">
                <SidebarMenu className="flex flex-col gap-5">
                  {dashboardList.map((item) => (
                    <SidebarMenuItem key={item.id}>
                      <SidebarMenuButton
                        asChild
                        onClick={() => setLink(item.name)}
                      >
                        <Button className="flex gap-2 justify-start items-center p-6 bg-[#10b982] cursor-pointer">
                          <Icon icon={item.icon} width={50} height={50} />
                          <span className="text-lg font-normal font-serif">
                            {item.name}
                          </span>
                        </Button>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
        <SidebarInset className="flex flex-col gap-10">
          <div className="flex gap-2 items-center mt-4">
            <SidebarTrigger className="cursor-pointer" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/">Dashboard</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  {link != "Dashboard" ? link : ""}
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            {link === "Dashboard" ? (
              <AdminDashboard />
            ) : link === "Experience Status" ? (
              <AdminExperience />
            ) : link === "Services" ? (
              <AdminServices />
            ) : link === "PortFolio" ? (
              <AdminPortFolio />
            ) : link === "Blogs" ? (
              <AdminBlogs />
            ) : link === "Testimonial" ? (
              <AdminTestimonial />
            ) : (
              link === "Project" && <AdminProject />
            )}
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
