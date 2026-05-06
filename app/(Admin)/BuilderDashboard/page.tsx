/* eslint-disable react-hooks/set-state-in-effect */
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
import AdminNewsletter from "@/Components/AdminNewsletter";
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
              <div className="flex items-center gap-3 p-3 rounded-2xl border border-white/8 bg-white/3">
                <Image
                  src="/apex-icon-amber.svg"
                  alt="Apex Solution"
                  width={36}
                  height={36}
                  className="w-9 h-9 rounded-xl"
                  loading="eager"
                />
                <Image
                  src="/apex-logo-dark-bg.svg"
                  alt="Apex Solution"
                  width={110}
                  height={28}
                  className="h-7 w-auto"
                  loading="eager"
                />
              </div>
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
                        className={`w-full rounded-3xl p-4 sm:p-6 transition-all duration-200 flex items-center justify-between gap-2 cursor-pointer min-h-12 ${
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
                          <span className="text-sm sm:text-base font-medium font-serif text-left truncate">
                            {item.name}
                          </span>
                        </div>
                        <ChevronRight className="text-amber-500 shrink-0" />
                      </Button>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <SidebarInset className="flex flex-col gap-6 sm:gap-10 p-4 sm:p-6 bg-slate-950/95 text-slate-100 rounded-[24px] sm:rounded-[32px] shadow-[0_30px_80px_-55px_rgba(0,0,0,0.35)] ring-1 ring-slate-800/70 min-w-0">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex gap-2 items-center mt-2 sm:mt-4 min-w-0">
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
        ) : link === "Newsletter" ? (
          <AdminNewsletter />
        ) : (
          "No Such type of screen"
        )}
      </SidebarInset>
    </SidebarProvider>
  );
}
