import Image from "next/image";

const features = [
  {
    icon: "/image/ShieldCheck.png",
    title: "Safe & Secure",
    description:
      "Your safety is our priority with comprehensive travel insurance and 24/7 support.",
  },
  {
    icon: "/image/MapTrifold.png",
    title: "Expert Guides",
    description:
      "Local experts who bring destinations to life with authentic cultural insights.",
  },
  {
    icon: "/image/Headset.png",
    title: "24/7 Support",
    description:
      "Round-the-clock customer service to assist you wherever your journey takes you.",
  },
];

export function WhyChoose() {
  return (
    <section className="bg-[#e7f6f9] px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <h2 className="font-heading text-4xl font-medium text-neutral-900 md:text-5xl">
            Why Choose Wanderlast
          </h2>
          <p className="mt-3 text-sm text-neutral-600">
            Your trusted partner for exceptional travel experiences
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-lg bg-white p-8 shadow-sm"
            >
              <Image
                src={feature.icon}
                alt=""
                width={40}
                height={40}
                className="size-10"
              />
              <h3 className="font-heading mt-6 text-2xl font-normal text-neutral-900">
                {feature.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-neutral-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
