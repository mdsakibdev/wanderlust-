import Image from "next/image";
import Link from "next/link";
import { MapPin, Calendar, ArrowUpRight, Star } from "lucide-react";

// Define the Destination interface based on your API response
interface Destination {
  _id: string;
  category: string;
  country: string;
  departureDate: string;
  description: string;
  destinationName: string;
  duration: string;
  imageUrl: string;
  price: number;
}

const AllDestinationsPage = async () => {
  // Fetch data from backend with cache control options if needed
  const res = await fetch("http://localhost:8000/destination", {
    cache: "no-store", // Or next: { revalidate: 60 }
  });
  const destinations: Destination[] = await res.json();

  return (
    <main className="max-w-7xl mx-auto px-4 py-10 text-slate-800">
      {/* --- Page Header --- */}
      <div className="mb-8">
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
          Explore All Destinations
        </h1>
        <p className="text-slate-500 mt-2 text-base">
          Find your perfect travel experience from our curated collection
        </p>
      </div>

      {/* --- Filter / Controls Section --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 border border-slate-200 rounded-md overflow-hidden mb-6 bg-white shadow-sm">
        <div className="p-3 border-b md:border-b-0 md:border-r border-slate-200">
          <select className="w-full bg-transparent text-xs font-semibold text-slate-500 uppercase focus:outline-none cursor-pointer">
            <option value="">CATEGORY</option>
            <option value="Island">Island</option>
            <option value="Mountain">Mountain</option>
            <option value="Beach">Beach</option>
          </select>
        </div>
        <div className="p-3 border-b md:border-b-0 md:border-r border-slate-200">
          <select className="w-full bg-transparent text-xs font-semibold text-slate-500 uppercase focus:outline-none cursor-pointer">
            <option value="">PRICE RANGE</option>
            <option value="0-50000">Under $50,000</option>
            <option value="50000-100000">$50,000 - $100,000</option>
          </select>
        </div>
        <div className="p-3">
          <select className="w-full bg-transparent text-xs font-semibold text-slate-500 uppercase focus:outline-none cursor-pointer">
            <option value="">SORT BY</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* --- Results Count --- */}
      <p className="text-sm text-slate-500 mb-8 font-medium">
        Showing {destinations.length} destinations
      </p>

      {/* --- Grid Layout for Cards --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {destinations.map((item) => (
          <div
            key={item._id}
            className="flex flex-col bg-white rounded-md overflow-hidden transition-all duration-300 hover:shadow-lg border border-transparent hover:border-slate-100"
          >
            {/* Card Image Wrapper */}
            <div className="relative w-full h-56 bg-slate-100">
              <img
                src={item.imageUrl}
                alt={item.destinationName}
                className="w-full h-full object-cover"
              />
              {/* Rating Badge */}
              <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md text-xs font-bold text-slate-800 flex items-center gap-1 shadow-sm">
                <span>4.5</span>
                <Star className="w-3.5 h-3.5 fill-black text-black" />
              </div>
            </div>

            {/* Card Content */}
            <div className="pt-4 flex flex-col flex-grow">
              {/* Country / Location */}
              <div className="flex items-center gap-1 text-xs text-slate-500 mb-1">
                <MapPin className="w-3.5 h-3.5" />
                <span>{item.country}</span>
              </div>

              {/* Title & Price Row */}
              <div className="flex justify-between items-baseline mb-2 gap-2">
                <h3 className="text-lg font-bold text-slate-900 leading-tight">
                  {item.destinationName}
                </h3>
                <div className="text-right whitespace-nowrap">
                  <span className="text-lg font-extrabold text-slate-900">
                    ${item.price}
                  </span>
                  <span className="text-xs text-slate-500 font-normal">
                    /Person
                  </span>
                </div>
              </div>

              {/* Duration */}
              <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-4">
                <Calendar className="w-3.5 h-3.5" />
                <span>{item.duration}</span>
              </div>

              {/* Action Button */}
              <div className="mt-auto pt-2">
                <Link
                  href={`/destinations/${item._id}`}
                  className="inline-flex items-center gap-1 text-xs font-bold text-cyan-500 uppercase hover:text-cyan-600 transition-colors tracking-wide"
                >
                  BOOK NOW
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default AllDestinationsPage;