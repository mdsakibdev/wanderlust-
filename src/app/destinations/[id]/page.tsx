
import Link from "next/link";
import { 
  ArrowLeft, 
  MapPin, 
  Star, 
  Calendar, 
  Check,  
} from "lucide-react";

// Shadcn UI Components

import EditDestinationDialog from "@/components/EditDestinationDialog";
import DeleteDestinationDialog from "@/components/DeleteDestinationDialog";
import BookingCard from "@/components/booking/BookingCard";
import { auth } from "@/lib/auth";
// import { headers } from "next/headers";

// Interface definition based on your API structure
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

const DestinationDetailsPage = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;

  // Fetching single destination data from backend
  let data: Destination | null = null;

  // const jwtToken = await auth.api.getToken({
  //   headers: await headers()
  // })

  // console.log(jwtToken)

  try {
    const res = await fetch(`http://localhost:8000/destination/${id}`, {
      cache: "no-store",
      headers: {authorization: 'user logged in'}
    });
    data = await res.json();
  } catch (error) {
    console.error("Failed to fetch destination details:", error);
  }

  // Fallback if data is not found
  if (!data) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-slate-800">Destination not found</h2>
        <Link href="/" className="text-cyan-500 hover:underline mt-4 inline-block">
          Back to Destinations
        </Link>
      </div>
    );
  }

  return (
    <main className="max-w-6xl mx-auto px-4 py-8 text-slate-800">
      {/* --- Top Navigation & Action Buttons --- */}
      <div className="flex justify-between items-center mb-6">
        <Link
          href={`/destinations`}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Destinations
        </Link>

        <div className="flex items-center gap-2">
          {/* Edit Button */}
          

          <EditDestinationDialog destination = {data}/>

          {/* Cancel/Delete Button */}
          
          <DeleteDestinationDialog id = {id}/>

        </div>
      </div>

      {/* --- Hero Banner Image --- */}
      <div className="relative w-full h-[380px] sm:h-[440px] rounded-lg overflow-hidden mb-8 bg-slate-100 shadow-sm">
        <img
          src={data.imageUrl}
          alt={data.destinationName}
          className="w-full h-full object-cover"
        />
      </div>

      {/* --- Main Grid Content (Left Details & Right Booking Card) --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
        
        {/* Left Column: Title, Overview, Highlights */}
        <div className="lg:col-span-2 space-y-8">
          {/* Location & Title */}
          <div>
            <div className="flex items-center gap-1 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
              <MapPin className="w-3.5 h-3.5" />
              <span>{data.country}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
              {data.destinationName}
            </h1>

            {/* Ratings & Duration Row */}
            <div className="flex items-center gap-4 text-xs font-medium text-slate-600">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-slate-900 text-slate-900" />
                <span className="font-bold text-slate-900">4.9</span>
                <span className="text-slate-400">(234 reviews)</span>
              </div>
              <span className="text-slate-300">•</span>
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-slate-500" />
                <span>{data.duration}</span>
              </div>
            </div>
          </div>

          {/* Overview Section */}
          <div className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900">Overview</h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              {data.description}
            </p>
          </div>

          {/* Highlights Section */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-slate-900">Highlights</h2>
            <p className="text-slate-600 text-sm sm:text-base">
              Discover the magic of {data.country} with pristine beaches, ancient temples, and vibrant culture. Experience luxury resorts, tropical landscapes, and unforgettable sunsets.
            </p>

            {/* Checklist Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="flex items-center gap-2 text-xs font-medium text-slate-700">
                <Check className="w-4 h-4 text-slate-900" />
                <span>Luxury beachfront accommodation</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-medium text-slate-700">
                <Check className="w-4 h-4 text-slate-900" />
                <span>Visit Uluwatu Temple at sunset</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-medium text-slate-700">
                <Check className="w-4 h-4 text-slate-900" />
                <span>Traditional Balinese spa treatment</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-medium text-slate-700">
                <Check className="w-4 h-4 text-slate-900" />
                <span>Private beach dinner experience</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-medium text-slate-700">
                <Check className="w-4 h-4 text-slate-900" />
                <span>Sunrise trek to Mount Batur</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Booking Card */}
        <BookingCard data = {data}/>

      </div>
    </main>
  );
};

export default DestinationDetailsPage;