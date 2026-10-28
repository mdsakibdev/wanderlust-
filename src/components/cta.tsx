import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Cta() {
  return (
    <section className="bg-white px-6 py-16">
      <div className="relative flex min-h-[380px] overflow-hidden rounded-2xl md:min-h-[440px]">
        <Image
          src="/image/CTA.png"
          alt="Airplane flying over a tropical island"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />

        <div className="relative z-10 mx-auto flex w-full flex-col items-center justify-center px-6 py-16 text-center">
          <h2 className="font-heading text-4xl font-normal text-white md:text-5xl">
            Ready To Start Your Journey?
          </h2>
          <p className="mt-4 text-white/85">
            Join thousands of travelers who have discovered the world with us
          </p>
          <Button
            type="button"
            className="mt-8 h-11 gap-2 rounded-md bg-white px-6 text-sm font-semibold uppercase tracking-widest text-neutral-900 hover:bg-white/90"
          >
            Book Your Trip Today
            <ArrowRight className="size-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}
