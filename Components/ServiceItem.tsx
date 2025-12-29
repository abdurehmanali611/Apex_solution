import { Icon } from "@iconify/react";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";

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
  return (
    <Card>
      <Icon icon={icon} className="self-center w-10 h-10" />
      <CardHeader className="text-center">
        <CardTitle>{title}</CardTitle>
        <CardDescription>
          {description || "No Description Provided"}
        </CardDescription>
      </CardHeader>
    </Card>
  );
}
