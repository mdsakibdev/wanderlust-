"use client"
import { Button } from "@/components/ui/button";
import { Card, } from "@/components/ui/card";

import { 

  Check, 
  ArrowRight 
} from "lucide-react";
import { Input } from "../ui/input";
import { authClient } from "@/lib/auth-client";


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

const BookingCard = ({data}: {data:Destination}) => {
    const { data: session, } = authClient.useSession()
    const user = session?.user

  const handleBooking = async (e: React.FormEvent<HTMLFormElement>) =>{
    e.preventDefault()

    const departureDate = e.currentTarget.departureDate.value
    // console.log(departureDate)

    const bookingData = {
      userName: user?.name,
      userEmail: user?.email,
      image: user?.image,
      ...data,
      departureDate: departureDate,
      bookingDate: new Date()
      
    }
    console.log(bookingData)

    const res = await fetch("http://localhost:8000/booking", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(bookingData)
    });

    const ruselt = await res.json()
    console.log(ruselt)

    if (!res.ok) {
      throw new Error("Failed to create booking");
    }
  }

    return (
        <div className="lg:col-span-1">
          <Card className="border border-slate-200 shadow-sm rounded-lg bg-white overflow-hidden p-6 space-y-6 sticky top-8">
            {/* Price Information */}
            <div>
              <span className="text-xs text-slate-400 font-medium uppercase tracking-wider block mb-1">
                Starting from
              </span>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-extrabold text-cyan-600">
                  ${data.price}
                </span>
                <span className="text-xs text-slate-500 font-normal">
                  per person
                </span>
              </div>
            </div>

            {/* Date Input Mock */}
            <form onSubmit={handleBooking}>
              <div className="border border-slate-200 rounded-md  text-sm text-slate-700 bg-slate-50/50">
                <Input 
                name="departureDate"
                type="date"
                aria-label="departureDate"
                defaultValue={data.departureDate}
                 
                  />
                {/* <Calendar className="w-4 h-4 text-slate-400" /> */}
              </div>
            

            {/* Book Now Button */}
            <Button type="submit"
             className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-2.5 rounded-md flex items-center justify-center gap-2 shadow-none">
              Book Now 
              <ArrowRight className="w-4 h-4" />
            </Button>
            </form>

            {/* Perks / Guarantees List */}
            <div className="space-y-2.5 pt-2 border-t border-slate-100 text-xs text-slate-500">
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-slate-700" />
                <span>Free cancellation up to 7 days</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-slate-700" />
                <span>Travel insurance included</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-slate-700" />
                <span>24/7 customer support</span>
              </div>
            </div>
          </Card>
        </div>
    );
};

export default BookingCard;