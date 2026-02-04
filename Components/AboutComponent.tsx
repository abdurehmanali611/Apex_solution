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
  const listSpanStyle = "text-yellow-600 dark:text-yellow-500 text-sm leading-relaxed relative pl-4 before:content-['•'] before:absolute before:left-0 before:text-amber-500 font-medium";
  return (
    <Card className="border-none shadow-xl overflow-hidden">
      <CardHeader className="text-center space-y-2 pb-10">
        <CardTitle className="text-amber-600 dark:text-amber-500 text-3xl font-bold tracking-tight">
          About Us
        </CardTitle>
        <CardDescription className="text-slate-500 dark:text-slate-400 font-medium text-base uppercase tracking-widest">
          Software Products and Tech Supports
        </CardDescription>
        <div className="h-1 w-20 bg-amber-500 mx-auto rounded-full" />
      </CardHeader>
      <CardContent>
        <div className="flex flex-col lg:flex-row justify-between items-start gap-12">
          <div className="hidden lg:block w-full lg:w-1/2 relative group">
            <div className="absolute -inset-1 bg-linear-to-r from-amber-500 to-yellow-400 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
            <Image
              src="/assets/guy.jpg"
              alt="Computer"
              width={600}
              height={600}
              loading="eager"
              className="relative rounded-xl object-cover shadow-2xl transition-transform duration-500 group-hover:scale-[1.01]"
            />
          </div>
          <div className="w-full lg:w-1/2 flex flex-col gap-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10">
              <div className="flex flex-col gap-3">
                <h3 className="font-serif text-xl font-bold text-amber-600 dark:text-amber-500 border-b border-amber-100 dark:border-amber-900/50 pb-2">
                  Our Mission
                </h3>
                <p className="font-serif text-slate-700 dark:text-slate-300 flex flex-col gap-3 text-sm leading-relaxed">
                  Our Mission is to Design, Deliver and Support Practical IT and
                  ERP Solutions that Solve real business problems. we Focus on:
                  <span className={listSpanStyle}>Delivering dependable systems backed by real technical expertise</span>
                  <span className={listSpanStyle}>Simplifying Operations through automation</span>
                  <span className={listSpanStyle}>Enhancing decision-making with accurate Data</span>
                </p>
              </div>

              <div className="flex flex-col gap-3">
                <h3 className="font-serif text-xl font-bold text-amber-600 dark:text-amber-500 border-b border-amber-100 dark:border-amber-900/50 pb-2">
                  Our Vision
                </h3>
                <p className="font-serif text-slate-700 dark:text-slate-300 flex flex-col gap-4 text-sm leading-relaxed">
                  To become a trusted technology partner in Africa, empowering businesses with smart,
                  reliable and scalable digital solutions that drive efficiency, growth and long-term 
                  success.
                  <span className="text-amber-600 dark:text-amber-400 font-semibold italic text-center bg-amber-50 dark:bg-amber-950/30 p-3 rounded-lg border-l-4 border-amber-500">
                    We Don&apos;t just Deploy Systems- <br /> 
                    <span className="text-xs uppercase tracking-tighter opacity-80">We build foundations for the future</span>
                  </span>
                </p>
              </div>

              <div className={`flex flex-col gap-3 transition-all duration-500 ${show ? "hidden opacity-0" : "block opacity-100"}`}>
                <h2 className="font-serif text-xl font-bold text-amber-600 dark:text-amber-500 border-b border-amber-100 dark:border-amber-900/50 pb-2">
                  Our Scope
                </h2>
                <div className="font-serif text-slate-700 dark:text-slate-300 flex flex-col gap-2 text-sm">
                  Apex Solution provides End-to-End technology services including: 
                  <span className={listSpanStyle}>Software & ERP Solutions</span>
                  <span className={listSpanStyle}>IT Infrastructure & Networking</span>
                  <span className={listSpanStyle}>Support & Consultancy</span>
                  <span className="text-amber-600 dark:text-amber-400 mt-4 italic font-medium">
                    From Planning to Deployment- <br />
                    <span className="text-xs font-bold underline decoration-amber-500/50">We Own the full lifeCycle</span>
                  </span>
                </div>
              </div>

              <div className={`flex flex-col gap-3 transition-all duration-500 ${show ? "hidden opacity-0" : "block opacity-100"}`}>
                <h2 className="font-serif text-xl font-bold text-amber-600 dark:text-amber-500 border-b border-amber-100 dark:border-amber-900/50 pb-2">
                  Our Quality
                </h2>
                <div className="font-serif text-slate-700 dark:text-slate-300 flex flex-col gap-2 text-sm">
                  At Apex Solution, Quality is non-negotiable.
                  <span className="text-red-600 dark:text-red-400 font-bold text-base mt-1">We are commited to:</span>
                  <span className={listSpanStyle}>Delivering Reliable, Secure and Scalable Solutions</span>
                  <span className={listSpanStyle}>Following industry best practices and standards</span>
                  <span className={listSpanStyle}>Ensuring systems are tested, documented and Supported</span>
                  <span className={listSpanStyle}>Meeting client requirements ontime and within Scope</span>
                  <span className={listSpanStyle}>Continously improving through feedback and Innovation</span>
                </div>
              </div>
            </div>

            {show && (
              <Button
                className="mt-4 w-full md:w-max px-8 py-6 cursor-pointer bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-xl shadow-lg shadow-amber-500/20 transition-all hover:scale-105 active:scale-95 self-center"
                onClick={() => router.push("/About")}
              >
                Learn More About Us
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AboutComponent;