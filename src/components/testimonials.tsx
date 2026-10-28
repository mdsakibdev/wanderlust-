import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const testimonials = [
  {
    quote:
      "\"The Bali Trip Was Absolutely Magical! Every Detail Was Perfectly Planned. The Resorts Were Luxurious And The Cultural Experiences Were Unforgettable.\"",
    name: "Michael Chen",
    location: "Singapore",
    photo: "/image/person2.png",
  },
  {
    quote:
      "\"Swiss Alps Adventure Exceeded All Expectations. The Mountain Views Were Breathtaking And Our Guide Was Incredibly Knowledgeable. Highly Recommend!\"",
    name: "Sarah Johnson",
    location: "New York, USA",
    photo: "/image/person1.png",
  },
  {
    quote:
      "\"The Private Tour Through Tuscany Was Worth Every Penny. Our Local Guide Knew Every Hidden Gem And Made The Trip Truly Special.\"",
    name: "James Wright",
    location: "Manchester, UK",
    photo: "/image/person2.png",
  },
  {
    quote:
      "\"Booking Was Effortless And The Support Team Answered Every Question Within Minutes. A Smooth, Stress-Free Vacation From Start To Finish.\"",
    name: "Olivia Martinez",
    location: "Barcelona, Spain",
    photo: "/image/person1.png",
  },
];

export function Testimonials() {
  return (
    <section className="bg-white px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <Carousel opts={{ align: "start", loop: true }} className="mt-4">
          <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="font-heading text-4xl font-medium text-neutral-900 md:text-5xl">
                What Travelers Say
              </h2>
              <p className="mt-3 text-sm text-neutral-600">
                Real experiences from our happy travelers
              </p>
            </div>
            <div className="flex shrink-0 items-center gap-3">
              <CarouselPrevious className="static my-0 size-11" />
              <CarouselNext className="static my-0 size-11" />
            </div>
          </div>

          <CarouselContent>
            {testimonials.map((testimonial) => (
              <CarouselItem key={testimonial.name} className="md:basis-1/2">
                <div className="flex h-full items-stretch gap-5 rounded-lg border border-neutral-200 bg-white p-6 shadow-sm">
                  <div className="flex flex-1 flex-col justify-between gap-6">
                    <p className="text-[15px] leading-relaxed text-neutral-900">
                      {testimonial.quote}
                    </p>
                    <div>
                      <p className="text-sm font-medium text-[#159AA5]">
                        — {testimonial.name}
                      </p>
                      <p className="mt-1 text-xs text-neutral-500">
                        {testimonial.location}
                      </p>
                    </div>
                  </div>
                  <Image
                    src={testimonial.photo}
                    alt={testimonial.name}
                    width={145}
                    height={175}
                    className="w-36 shrink-0 self-stretch rounded-lg object-cover"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
}
