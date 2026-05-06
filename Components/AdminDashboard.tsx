"use client";
import { useEffect, useMemo, useState } from "react";
import { Icon } from "@iconify/react";
import { GetDashboardData } from "@/lib/actions";
import SectionHeader from "./SectionHeader";
import AdminDashboardStatCard from "./AdminDashboardStatCard";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card";

interface DashboardData {
  counts: {
    services: number;
    portfolios: number;
    blogs: number;
    teams: number;
    partners: number;
    contacts: number;
    testimonials: number;
    newsletter_subscribers: number;
    newsletter_issues: number;
  };
  recent_activities: {
    contacts: Array<{
      id: number;
      name: string;
      email: string;
      subject: string;
      created_at: string;
    }>;
    blogs: Array<{
      id: number;
      title: string;
      date: string;
    }>;
  };
}

type StatKey = keyof DashboardData["counts"];

const statCards: Array<{
  key: StatKey;
  title: string;
  description: string;
  icon: string;
  accent: string;
}> = [
  {
    key: "services",
    title: "Services",
    description: "Active service items",
    icon: "mdi:tools",
    accent: "bg-amber-400",
  },
  {
    key: "portfolios",
    title: "Portfolios",
    description: "Portfolio pieces available",
    icon: "mdi:briefcase",
    accent: "bg-sky-400",
  },
  {
    key: "blogs",
    title: "Blogs",
    description: "Published articles",
    icon: "mdi:newspaper-variant-multiple",
    accent: "bg-violet-400",
  },
  {
    key: "teams",
    title: "Teams",
    description: "Team member profiles",
    icon: "mdi:account-group",
    accent: "bg-emerald-400",
  },
  {
    key: "partners",
    title: "Partners",
    description: "Trusted ally count",
    icon: "mdi:handshake",
    accent: "bg-rose-400",
  },
  {
    key: "contacts",
    title: "Contacts",
    description: "Messages received",
    icon: "mdi:email-multiple-outline",
    accent: "bg-cyan-400",
  },
  {
    key: "testimonials",
    title: "Testimonials",
    description: "Customer praise entries",
    icon: "mdi:comment-quote-outline",
    accent: "bg-orange-400",
  },
  {
    key: "newsletter_subscribers",
    title: "Subscribers",
    description: "Newsletter subscribers",
    icon: "mdi:email-newsletter",
    accent: "bg-indigo-400",
  },
  {
    key: "newsletter_issues",
    title: "Newsletter Posts",
    description: "Published newsletters",
    icon: "mdi:post-outline",
    accent: "bg-lime-400",
  },
];

const AdminDashboard = () => {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const result = await GetDashboardData();
      if (result) {
        setData(result);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  const summary = useMemo(() => {
    if (!data) return 0;
    return (
      data.counts.services +
      data.counts.portfolios +
      data.counts.blogs +
      data.counts.teams +
      data.counts.partners +
      data.counts.contacts +
      data.counts.testimonials +
      data.counts.newsletter_subscribers +
      data.counts.newsletter_issues
    );
  }, [data]);

  if (loading) {
    return (
      <div className="flex min-h-112 items-center justify-center rounded-[32px] bg-slate-900/95 shadow-lg shadow-slate-950/50">
        <Icon icon="eos-icons:loading" className="h-10 w-10 animate-spin text-amber-500" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <SectionHeader
        subtitle="Admin Overview"
        title="Beautiful dashboard built for managers"
        description="Track active content counts and recent updates from the week with the clean dark admin panel. Use the Password tab to keep credentials secure."
      />

      <Card className="border border-slate-800/80 bg-slate-950/90 p-6 shadow-[0_32px_90px_-40px_rgba(0,0,0,0.35)] ring-1 ring-slate-700/80">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-amber-400">Current Snapshot</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-100">
              {summary} total active items across the app
            </h2>
          </div>
          <div className="inline-flex items-center gap-3 rounded-full bg-slate-900/95 px-4 py-3 text-sm font-medium text-slate-100 shadow-lg shadow-amber-500/10 ring-1 ring-slate-700/80">
            <Icon icon="mdi:calendar-week" className="h-5 w-5 text-amber-300" />
            Recent activity and counts for the last 7 days.
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-2">
          {statCards.slice(0, 4).map((stat) => (
            <AdminDashboardStatCard
              key={stat.key}
              title={stat.title}
              value={data?.counts[stat.key] ?? 0}
              description={stat.description}
              icon={stat.icon}
              accent={stat.accent}
            />
          ))}
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-2">
          {statCards.slice(4).map((stat) => (
            <AdminDashboardStatCard
              key={stat.key}
              title={stat.title}
              value={data?.counts[stat.key] ?? 0}
              description={stat.description}
              icon={stat.icon}
              accent={stat.accent}
            />
          ))}
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.4fr_0.9fr]">
        <Card className="border border-slate-800/80 bg-slate-950/90 shadow-[0_30px_80px_-45px_rgba(0,0,0,0.3)] ring-1 ring-slate-700/80">
          <CardHeader>
            <CardTitle className="text-slate-100">Recent activities this week</CardTitle>
            <CardDescription className="text-slate-400">Fresh contacts and blog updates from the last 7 days.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-5">
              <div className="rounded-3xl border border-slate-800/70 bg-slate-900/90 p-4">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h3 className="text-base font-semibold text-slate-100">Recent Contacts</h3>
                    <p className="text-sm text-slate-400">New messages received this week</p>
                  </div>
                  <Badge variant="secondary">{data?.recent_activities.contacts.length ?? 0}</Badge>
                </div>
                <div className="mt-4 space-y-3">
                  {data?.recent_activities.contacts.length ? (
                    data.recent_activities.contacts.map((contact) => (
                      <div key={contact.id} className="rounded-3xl border border-slate-800/70 bg-slate-900/95 p-4 shadow-lg shadow-slate-950/30">
                        <div className="flex items-center justify-between gap-4">
                          <div>
                            <p className="font-medium text-slate-100">{contact.name}</p>
                            <p className="text-sm text-slate-400">{contact.email}</p>
                          </div>
                          <Badge variant="outline">
                            {new Date(contact.created_at).toLocaleDateString()}
                          </Badge>
                        </div>
                        <p className="mt-3 text-sm text-slate-300">{contact.subject}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-slate-400">No new contacts this week.</p>
                  )}
                </div>
              </div>
              <div className="rounded-3xl border border-slate-800/70 bg-slate-900/90 p-4">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h3 className="text-base font-semibold text-slate-100">Recent Blogs</h3>
                    <p className="text-sm text-slate-400">Published items this week</p>
                  </div>
                  <Badge variant="secondary">{data?.recent_activities.blogs.length ?? 0}</Badge>
                </div>
                <div className="mt-4 space-y-3">
                  {data?.recent_activities.blogs.length ? (
                    data.recent_activities.blogs.map((blog) => (
                      <div key={blog.id} className="rounded-3xl border border-slate-800/70 bg-slate-900/95 p-4 shadow-lg shadow-slate-950/30">
                        <div className="flex items-center justify-between gap-4">
                          <p className="font-medium text-slate-100">{blog.title}</p>
                          <Badge variant="outline">
                            {new Date(blog.date).toLocaleDateString()}
                          </Badge>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-slate-400">No new blog posts this week.</p>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
};

export default AdminDashboard;
