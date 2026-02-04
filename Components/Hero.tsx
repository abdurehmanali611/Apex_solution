import Image from "next/image";
import { Button } from "./ui/button";
import { HeroFooter } from "@/constants";
import { useRouter } from "next/navigation";

const Hero = () => {
  const router = useRouter();

  return (
    <section className="relative w-full min-h-[80vh] flex items-center justify-center py-12 lg:py-20">
      <div className="container max-w-7xl px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          <div className="flex flex-col gap-8 order-2 lg:order-1 md:items-center lg:items-start">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="text-amber-600 dark:text-amber-500 text-xs font-bold uppercase tracking-[0.3em]">
                  Software & Tech Support
                </span>
              </div>
              
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-slate-900 dark:text-white leading-[1.15]">
                Building Foundations <br /> 
                <span className="text-amber-500">For The Future</span>
              </h1>
            </div>

            <p className="font-serif text-slate-700 dark:text-slate-300 text-base leading-relaxed max-w-125">
              10+ years of real-world telecom and IT experience. 
              We deliver <span className="text-amber-600 dark:text-amber-500 font-medium">reliable, secure and scalable solutions</span> 
              backed by technical expertise.
            </p>

            <div className="flex flex-wrap gap-4">
              <Button 
                className="px-8 py-6 cursor-pointer bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-xl shadow-lg shadow-amber-500/20 transition-all hover:scale-105 active:scale-95"
                onClick={() => router.push("/Contact")}
              >
                Say Hello
              </Button>
            </div>

            <div className="flex items-center gap-8 pt-4 border-t border-slate-100 dark:border-slate-800 w-fit">
              {HeroFooter.map((item) => (
                <div key={item.id} className="flex flex-col">
                  <span className="text-xl font-bold text-amber-600 dark:text-amber-500">{item.amount}</span>
                  <span className="text-[10px] uppercase tracking-widest text-slate-500 font-semibold">{item.name}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative group order-1 lg:order-2">
            <div className="absolute -inset-1 bg-linear-to-r from-amber-500 to-yellow-400 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
            <div className="relative rounded-xl overflow-hidden shadow-2xl">
              <Image
                src="/assets/computer.jpeg"
                alt="Computer"
                width={600}
                height={500}
                priority
                className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default Hero;