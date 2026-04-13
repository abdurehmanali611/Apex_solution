"use client"
import { Icon } from "@iconify/react";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";

interface ServiceItemProps {
  icon: string;
  title: string;
  description: string;
}

export default function ServiceItem({ icon, title, description }: ServiceItemProps) {
  return (
    <Card className="group border border-amber-100 dark:border-amber-900/20 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm hover:shadow-xl hover:shadow-amber-500/10 transition-all duration-300">
      <CardHeader className="text-center flex flex-col items-center gap-4">
        <div className="p-4 bg-amber-50 dark:bg-amber-950/30 rounded-2xl group-hover:scale-110 transition-transform duration-300">
          <Icon icon={icon} className="w-10 h-10 text-amber-600 dark:text-amber-500" />
        </div>
        <CardTitle className="text-xl font-bold text-slate-900 dark:text-white">{title}</CardTitle>
        <CardDescription className="font-serif text-slate-600 dark:text-slate-400 leading-relaxed">
          {description || "Premium technology solutions tailored for your business needs."}
        </CardDescription>
      </CardHeader>
    </Card>
  );
}