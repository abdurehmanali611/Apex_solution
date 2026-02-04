"use client";
import { Avatar } from "@/Components/ui/avatar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
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
import { AdminList } from "@/constants";
import { Icon } from "@iconify/react";
import Image from "next/image";
import { useState } from "react";

export default function BuilderDashboard() {
  const [link, setLink] = useState("Dashboard");
  return (
    <SidebarProvider>
      <Sidebar collapsible="offcanvas">
        <SidebarContent className="overflow-y-auto [&::-webkit-scrollbar]:hidden scrollbar-none p-3">
          <SidebarGroup className="flex flex-col gap-8">
            <SidebarHeader className="flex items-center justify-between">
              <Button
                variant="outline"
                className="cursor-pointer w-full h-fit p-2 flex gap-3 items-center"
              >
                <Avatar className="w-10 h-10">
                  <Image
                    src="/assets/logo.jpg"
                    alt="Logo"
                    fill
                    loading="eager"
                    className="object-cover"
                  />
                </Avatar>
                <p className="text-lg font-serif">
                  <span className="text-amber-500">Apex</span> Solutions
                </p>
              </Button>
            </SidebarHeader>
            <SidebarGroupContent className="flex flex-col gap-2">
              <SidebarMenu className="flex flex-col gap-5">
                {AdminList.map((item) => (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton asChild className="w-full h-fit p-3">
                      <Button
                        variant="outline"
                        className="flex gap-2 justify-start items-center p-3 bg-amber-500 cursor-pointer"
                        onClick={() => setLink(item.name)}
                      >
                        <Icon icon={item.icon} width={40} height={40} />
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
              <BreadcrumbItem>{link}</BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        
      </SidebarInset>
    </SidebarProvider>
  );
}
