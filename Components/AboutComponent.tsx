import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";

const AboutComponent = () => {
  return (
    <Card>
      <CardHeader className="text-center w-full">
        <CardTitle className="text-amber-500 text-xl">About Us</CardTitle>
        <CardDescription>Software Products and Tech Supports</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center gap-10">
          <Image
            src="/assets/guy.jpg"
            alt="Computer"
            width={500}
            height={500}
            loading="eager"
            className="rounded-xl"
          />
          <div className="w-1/2 flex flex-col gap-5">
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aliquid,
              cupiditate unde voluptatibus sapiente excepturi porro perspiciatis
              non ad voluptates quae dolor molestiae eum qui nam voluptatem
              tenetur at totam debitis.
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aliquid,
              cupiditate unde voluptatibus sapiente excepturi porro perspiciatis
              non ad voluptates quae dolor molestiae eum qui nam voluptatem
              tenetur at totam debitis.
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aliquid,
              cupiditate unde voluptatibus sapiente excepturi porro perspiciatis
              non ad voluptates quae dolor molestiae eum qui nam voluptatem
              tenetur at totam debitis.
            </p>
            <Button className="cursor-pointer bg-amber-500">Learn More</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AboutComponent;
