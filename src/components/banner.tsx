import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const searchFields = [
  { label: "Location", placeholder: "Address, City Or Zip" },
  { label: "Date/Duration", placeholder: "Anytime/3 Days" },
  { label: "Budget", placeholder: "$0-$3000" },
  { label: "People", placeholder: "5-10" },
];

export function Banner() {
  return (
    <section className="relative flex min-h-[560px] flex-col overflow-hidden md:min-h-[720px]">
      <Image
        src="/image/Banner.png"
        alt="Aerial view of a turquoise coastal bay"
        fill
        priority
        className="object-cover"
      />

      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 py-20 text-center">
        <h1 className="font-heading text-5xl font-medium text-white md:text-7xl">
          Discover Your
          <br className="hidden md:block" /> Next Adventure
        </h1>
        <p className="mt-6 max-w-xl text-balance text-white/85 md:text-lg">
          Explore breathtaking destinations and create unforgettable memories
          with our curated travel experiences.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Button
            type="button"
            className="h-12 gap-2 rounded-md px-8 text-sm font-semibold uppercase tracking-wider bg-[#159AA5] text-white hover:bg-[#118a93]"
          >
            Explore Now
            <ArrowRight className="size-4" />
          </Button>
          <Button
            type="button"
            variant="outline"
            className="h-12 rounded-md border-white/30 bg-white/20 px-8 text-sm font-semibold uppercase tracking-wider text-white hover:bg-white/30 hover:text-white backdrop-blur-sm"
          >
            View Destination
          </Button>
        </div>
      </div>

      <div className="relative z-10 flex flex-col bg-black/40 backdrop-blur-md md:flex-row">
        {searchFields.map((field) => (
          <div key={field.label} className="flex-1 px-8 py-4 text-left">
            <p className="text-sm font-bold text-white">{field.label}</p>
            <p className="mt-0.5 text-sm text-white/60">{field.placeholder}</p>
          </div>
        ))}
        <button
          type="button"
          className="bg-[#159AA5] px-12 py-4 text-base font-semibold text-white transition-colors hover:bg-[#118a93] md:px-16"
        >
          Search
        </button>
      </div>
    </section>
  );
}
