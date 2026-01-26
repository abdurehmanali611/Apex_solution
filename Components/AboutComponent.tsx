import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

const AboutComponent = ({ show }: { show: boolean }) => {
  const router = useRouter();
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
            className="rounded-xl hidden sm:block"
          />
          <div className="md:w-1/2 flex flex-col gap-5 w-full">
            <div className="grid grid-cols-2 items-center gap-5">
              <div className="flex flex-col gap-5">
                <h3 className="font-serif text-lg font-semibold text-amber-500">Our Mission</h3>
                <p className="font-serif">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Aliquid, cupiditate unde voluptatibus sapiente excepturi porro
                  perspiciatis non ad voluptates quae dolor molestiae eum qui
                  nam voluptatem tenetur at totam debitis.
                </p>
              </div>
              <div className="flex flex-col gap-5">
                <h3 className="font-serif text-lg font-semibold text-amber-500">Our Vision</h3>
                <p className="font-serif">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Aliquid, cupiditate unde voluptatibus sapiente excepturi porro
                  perspiciatis non ad voluptates quae dolor molestiae eum qui
                  nam voluptatem tenetur at totam debitis.
                </p>
              </div>
              <div className={`flex flex-col gap-5 ${show ? "hidden" : "block"}`}>
                <h2 className="font-serif text-lg font-semibold text-amber-500">Our Scope</h2>
                <p className="font-serif">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Aliquid, cupiditate unde voluptatibus sapiente excepturi porro
                  perspiciatis non ad voluptates quae dolor molestiae eum qui
                  nam voluptatem tenetur at totam debitis.
                </p>
              </div>
              <div className={`flex flex-col gap-5 ${show ? "hidden" : "block"}`}>
                <h2 className="font-serif text-lg font-semibold text-amber-500">Our Quality</h2>
                <p className="font-serif">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Aliquid, cupiditate unde voluptatibus sapiente excepturi porro
                  perspiciatis non ad voluptates quae dolor molestiae eum qui
                  nam voluptatem tenetur at totam debitis.
                </p>
              </div>
            </div>
            {show && (
              <Button
                className="cursor-pointer bg-amber-500"
                onClick={() => router.push("/About")}
              >
                Learn More
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AboutComponent;
