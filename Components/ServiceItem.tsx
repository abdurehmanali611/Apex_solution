"use client"
import { Icon } from "@iconify/react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

interface ServiceItemProps {
  icon: string;
  title: string;
  description: string;
}

export default function ServiceItem({
  icon,
  title,
  description,
}: ServiceItemProps) {
  const router = useRouter()
  return (
    <Card>
      <Icon icon={icon} className="self-center w-10 h-10" />
      <CardHeader className="text-center">
        <CardTitle>{title}</CardTitle>
        <CardDescription>
          {description || "No Description Provided"}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex justify-center">
        <Button variant="outline" className="cursor-pointer" onClick={() => router.push("/Contact")}>Contact Us</Button>
      </CardContent>
    </Card>
  );
}
