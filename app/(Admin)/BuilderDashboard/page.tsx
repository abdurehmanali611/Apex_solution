"use client";
import AdminBlogs from "@/Components/AdminBlogs";
import AdminContact from "@/Components/AdminContact";
import AdminDashboard from "@/Components/AdminDashboard";
import AdminHeroFooter from "@/Components/AdminHeroFooter";
import AdminPartners from "@/Components/AdminPartners";
import AdminPortFolios from "@/Components/AdminPortFolios";
import AdminPasswordSection from "@/Components/AdminPasswordSection";
import AdminServices from "@/Components/AdminServices";
import AdminTeams from "@/Components/AdminTeams";
import AdminTestimonial from "@/Components/AdminTestimonial";
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
import { LogoutUser } from "@/lib/actions";
import { Icon } from "@iconify/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ChevronRight } from "lucide-react";

export default function BuilderDashboard() {
  const router = useRouter();
  const [link, setLink] = useState("Dashboard");
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.replace("/Builder");
    } else {
      setIsAuthorized(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!isAuthorized) {
    return null;
  }

  return (
    <SidebarProvider>
      <Sidebar collapsible="offcanvas">
        <SidebarContent className="overflow-y-auto [&::-webkit-scrollbar]:hidden scrollbar-none p-4 bg-slate-950/95 rounded-[28px] shadow-[inset_0_0_0_1px_rgba(148,163,184,0.08)] ring-1 ring-slate-800/70">
          <SidebarGroup className="flex flex-col gap-8">
            <SidebarHeader className="flex flex-col gap-4">
              <Button
                variant="outline"
                className="cursor-pointer w-full h-fit p-3 flex items-center gap-3 rounded-3xl border-slate-700/60 text-slate-100 shadow-sm shadow-slate-950/20"
              >
                <Avatar className="w-10 h-10">
                  <Image
                    src="/assets/logo.png"
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
              <SidebarMenu className="flex flex-col gap-4">
                {AdminList.map((item) => (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton
                      asChild
                      isActive={link === item.name}
                      className="w-full p-0"
                    >
                      <Button
                        variant="ghost"
                        className={`w-full rounded-3xl p-6 transition-all duration-200 flex items-center justify-between cursor-pointer ${
                          link === item.name
                            ? "bg-amber-500 text-slate-950 shadow-[0_24px_64px_-32px_rgba(245,158,11,0.55)]"
                            : "bg-slate-900/95 text-slate-200 hover:bg-slate-800/95 hover:text-white"
                        }`}
                        onClick={() => setLink(item.name)}
                      >
                        <div className="flex items-center gap-3">
                          <Icon
                            icon={item.icon}
                            width={28}
                            height={28}
                            className={
                              link === item.name
                                ? "text-slate-950"
                                : "text-amber-300"
                            }
                          />
                          <span className="text-base font-medium font-serif">
                            {item.name}
                          </span>
                        </div>
                        <ChevronRight className="text-amber-500" />
                      </Button>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <SidebarInset className="flex flex-col gap-10 p-6 bg-slate-950/95 text-slate-100 rounded-[32px] shadow-[0_30px_80px_-55px_rgba(0,0,0,0.35)] ring-1 ring-slate-800/70">
        <div className="flex items-center justify-between">
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
          <Button
            variant="ghost"
            onClick={() => LogoutUser(router)}
            className="w-fit rounded-3xl p-4 transition-all duration-200 flex items-center justify-center gap-3 cursor-pointer bg-red-900/20 text-red-300 hover:bg-red-800/30 hover:text-red-200 border border-red-800/30"
          >
            <Icon icon="mdi:logout" width={20} height={20} />
            <span className="text-sm font-medium">Logout</span>
          </Button>
        </div>
        {link === "Dashboard" ? (
          <AdminDashboard />
        ) : link === "HeroFooter" ? (
          <AdminHeroFooter />
        ) : link === "Services" ? (
          <AdminServices />
        ) : link === "Portfolios" ? (
          <AdminPortFolios />
        ) : link === "Blogs" ? (
          <AdminBlogs />
        ) : link === "Team Members" ? (
          <AdminTeams />
        ) : link === "Partners" ? (
          <AdminPartners />
        ) : link === "Contact Messages" ? (
          <AdminContact />
        ) : link === "Testimonials" ? (
          <AdminTestimonial />
        ) : link === "Update Password" ? (
          <AdminPasswordSection />
        ) : (
          "No Such type of screen"
        )}
      </SidebarInset>
    </SidebarProvider>
  );
}
