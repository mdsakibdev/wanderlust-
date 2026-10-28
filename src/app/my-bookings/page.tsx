import MyBookingCard from "@/components/booking/MyBookingCard";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";


// Interface defining the API response schema
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
  status?: string; // Optional field if your DB includes status (defaults to Confirmed)
}

const MyBookingPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = session?.user;

  // Handle case where user might not be logged in yet
  if (!user?.email) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-12 text-center">
        <p className="text-gray-600">Please log in to view your bookings.</p>
      </div>
    );
  }

  const res = await fetch(`http://localhost:8000/my-booking/${user.email}`, {
    cache: "no-store",
  });
  
  const bookingsData: Booking[] = await res.json();

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 font-sans">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-serif text-gray-900 mb-1">My Bookings</h1>
        <p className="text-gray-500 text-sm">
          Manage and view your upcoming travel plans
        </p>
      </div>

      {/* Empty State */}
      {bookingsData?.length === 0 && (
        <div className="bg-white rounded-xl p-8 text-center border border-gray-100 shadow-sm">
          <p className="text-gray-500">You have no active bookings at the moment.</p>
        </div>
      )}

      {/* Bookings List */}
      <MyBookingCard bookingsData = {bookingsData}/>


    </div>
  );
};

export default MyBookingPage;