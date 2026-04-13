"use client";

import { Icon } from "@iconify/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

interface AdminDashboardStatCardProps {
  title: string;
  value: number;
  description: string;
  icon: string;
  accent: string;
}

export default function AdminDashboardStatCard({
  title,
  value,
  description,
  icon,
  accent,
}: AdminDashboardStatCardProps) {
  return (
    <Card className="relative overflow-hidden border border-slate-800/70 bg-slate-950/90 shadow-[0_28px_80px_-40px_rgba(0,0,0,0.35)] ring-1 ring-slate-700/80">
      <div className={`absolute inset-x-0 top-0 h-2 ${accent}`} />
      <CardHeader className="relative flex items-start justify-between gap-4 pb-4 pt-2">
        <div>
          <CardTitle className="text-sm uppercase tracking-[0.24em] text-slate-400">
            {title}
          </CardTitle>
          <CardDescription className="mt-2 text-sm text-slate-500">
            {description}
          </CardDescription>
        </div>
        <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-slate-800/80 text-amber-400 shadow-sm shadow-amber-500/10">
          <Icon icon={icon} className="h-5 w-5" />
        </div>
      </CardHeader>
      <CardContent className="px-5 pb-0">
        <div className="text-4xl font-semibold tracking-tight text-slate-100">
          {value}
        </div>
      </CardContent>
    </Card>
  );
}
