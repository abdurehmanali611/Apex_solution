import Image from "next/image";
import { Button } from "./ui/button";
import { HeroFooter } from "@/constants";
import { useRouter } from "next/navigation";
const Hero = () => {
  const router = useRouter()
  return (
    <div className="flex h-screen justify-between items-center lg:px-10 md:px-5">
      <div className="flex flex-col gap-5 items-center sm:items-start">
        <h2 className="text-2xl font-bold font-serif leading-9">
          <span className="text-amber-500 pl-0 md:pl-20 lg:pl-0">Apex</span> Solutions
        </h2>
        <h3 className="text-xl font-serif font-semibold text-amber-500">
          Software Products | Tech Solutions
        </h3>
        <p className="text-center w-[70%] font-sans text-md font-normal">
          10+ years of real world telecom and IT experience Hospitality-focused, technology
          expertise, Reliable, secure and scalable solutions and Hands-on implementations.
        </p>
        <Button className="cursor-pointer w-fit mx-40" size="lg" onClick={() => router.push("/Contact")}>
          Say Hello
        </Button>
        <div className="flex items-center gap-2 py-3 w-fit shadow-md border-4 border-amber-500/50 rounded-xl">
          {HeroFooter.map((item) => (
            <div
              key={item.id}
              className="flex flex-col gap-2 border-r-2 not-last:border-r-amber-500/50 py-2 px-3 rounded-xl"
            >
              <h3 className="text-[#FD6F00]">{item.amount}</h3>
              <p>{item.name}</p>
            </div>
          ))}
        </div>
      </div>
      <Image
        src="/assets/computer.jpeg"
        alt="Computer"
        width={550}
        height={550}
        loading="eager"
        className="rounded-xl hidden sm:block"
      />
    </div>
  );
};

export default Hero;
