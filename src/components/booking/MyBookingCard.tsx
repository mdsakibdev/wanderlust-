"use client"
import Image from "next/image";
import Link from "next/link";
import { Calendar, MapPin, CheckCircle, Clock, Trash2, Eye } from "lucide-react";
import { redirect } from "next/navigation";

interface Booking {
  _id: string;
  destinationName: string;
  imageUrl: string;
  departureDate: string;
  bookingDate: string;
  price: number;
  category: string;
  country: string;
  description: string;
  duration: string;
  userEmail: string;
  userName: string;
  status?: string; 
}

// ১. আলাদা একটি কার্ড কম্পোনেন্ট যা একটি নির্দিষ্ট বুকিং হ্যান্ডেল করবে
const MyBookingCard = ({ booking }: { booking: Booking }) => {
    
    const handleCancelBooking = async () => {
        try {
            const res = await fetch(`http://localhost:8000/my-booking/${booking._id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const data = await res.json();
            console.log(data);
            // এখানে চাইলে স্টেট আপডেট বা পেজ রিফ্রেশ করার লজিক যোগ করতে পারো
        } catch (error) {
            console.error("Failed to cancel booking:", error);
        }

        redirect('/my-bookings')
    };

    // ফরম্যাট ডেট
    const formattedDate = booking.departureDate
      ? new Date(booking.departureDate).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        })
      : "N/A";

    const status = booking.status || "Confirmed";
    const isConfirmed = status.toLowerCase() === "confirmed";

    return (
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden flex flex-col md:flex-row items-stretch hover:shadow-md transition-shadow duration-200">
        {/* Image Container */}
        <div className="relative w-full md:w-80 h-52 flex-shrink-0">
          <Image
            src={booking.imageUrl || "/placeholder.jpg"}
            alt={booking.destinationName}
            fill
            className="object-cover"
            unoptimized
          />
        </div>

        {/* Content Container */}
        <div className="p-6 flex-1 flex flex-col justify-between">
          <div>
            {/* Status Badge */}
            <div className="mb-2">
              {isConfirmed ? (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-600 border border-emerald-100">
                  <CheckCircle className="w-3.5 h-3.5" />
                  Confirmed
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-600 border border-amber-100">
                  <Clock className="w-3.5 h-3.5" />
                  Pending
                </span>
              )}
            </div>

            {/* Title */}
            <h2 className="text-2xl font-serif text-gray-900 font-semibold mb-3">
              {booking.destinationName}
            </h2>

            {/* Info Metadata */}
            <div className="space-y-1.5 text-xs text-gray-500">
              <div className="flex items-center gap-2">
                <Calendar className="w-3.5 h-3.5 text-gray-400" />
                <span>Departure: {formattedDate}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-gray-400" />
                <span>Booking ID: {booking._id}</span>
              </div>
            </div>
          </div>

          {/* Footer / Price & Actions */}
          <div className="flex items-end justify-between mt-6 pt-2 border-t border-gray-50/50">
            {/* Price */}
            <div className="text-2xl font-semibold text-cyan-600">
              ${booking.price}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3">
              <button 
                onClick={handleCancelBooking} 
                className="flex items-center gap-1.5 px-4 py-2 border border-red-200 text-red-500 hover:bg-red-50 rounded-lg text-xs font-medium transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Cancel
              </button>
              <Link
                href={`/my-bookings/${booking._id}`}
                className="flex items-center gap-1.5 px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg text-xs font-medium transition-colors"
              >
                <Eye className="w-3.5 h-3.5" />
                View
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
};

// ২. মেইন লিস্ট কম্পোনেন্ট যেখানে অ্যারে ম্যাপ করা হবে
const MyBookingsList = ({ bookingsData }: { bookingsData: Booking[] }) => {
    return (
        <div className="space-y-6">
            {bookingsData?.map((booking) => (
                <MyBookingCard key={booking._id} booking={booking} />
            ))}
        </div>
    );
};

export default MyBookingsList;