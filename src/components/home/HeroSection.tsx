import Image from "next/image";
import Searchbar from "./searchbar";
import { locationService } from "@/services/location.service";

const HeroSection = async () => {
  const { data } = (await locationService.findAll()) as {
    data: { data: { id: string; city: string; country: string }[] } | null;
  };
  const locations = data?.data || [];

  return (
    <section className="relative overflow-hidden bg-muted/50">
      <div className="container relative z-10 flex flex-col items-center gap-8 md:flex-row">
        {/* Left */}
        <div className="flex-1 py-12 md:py-20">
          <h1 className="mb-4 text-4xl font-semibold leading-tight text-foreground md:text-5xl lg:text-6xl">
            Discover
            <br />
            more than
            <br />
            <span className="text-accent">5000+ Jobs</span>
          </h1>
          <p className="mb-8 max-w-md text-base leading-relaxed text-muted-foreground">
            Great platform for the job seeker that searching for new career
            heights and passionate about startups.
          </p>

          {/* Search bar */}
          <Searchbar locations={locations} />

          <p className="mt-4 text-sm text-muted-foreground">
            Popular :{" "}
            <span className="font-medium text-foreground">
              UI Designer, UX Researcher, Android, Admin
            </span>
          </p>
        </div>

        {/* Right - Hero image */}
        <div className="hidden flex-1 pt-12 md:pt-20 justify-end md:flex bg-[url(/pattern.png)]">
          <img
            src={"/hero-person.png"}
            alt="Job seeker"
            className="h-auto w-auto object-contain"
          />
        </div>
      </div>

      {/* Decorative lines */}
      <div className="pointer-events-none absolute right-0 top-0 h-full w-2/3">
        <Image
          height={1000}
          width={1000}
          src="/pattern.png"
          alt=""
          className="h-full w-full object-cover"
        />
      </div>
    </section>
  );
};

export default HeroSection;
