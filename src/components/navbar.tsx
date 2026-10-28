"use client"
import Image from "next/image";
import Link from "next/link";
import { UserRound } from "lucide-react";
import { authClient } from "@/lib/auth-client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const navLinks = [
  { label: "Home", href: "/", active: true },
  { label: "Destinations", href: "/destinations" },
  { label: "Add Destination", href: "/add-destination" },
  { label: "My Bookings", href: "/my-bookings" },
];

import {

  LogOutIcon,

} from "lucide-react"


import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "./ui/button";

export function Navbar() {
  const { data: session, } = authClient.useSession()
  const user = session?.user
  console.log(user)

  const handleSignOut = () => {
    authClient.signOut()
  }

  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white shadow-sm">
      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4 px-6 py-3">
        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={`text-sm font-medium transition-colors hover:text-[#159AA5] ${link.active ? "text-[#159AA5]" : "text-gray-800"
                }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Link href="/" className="justify-self-center">
          <Image
            src="/image/Wanderlast.png"
            alt="Wanderlast"
            width={240}
            height={42}
            priority
            className="h-6 w-auto"
          />
        </Link>



        <div className="flex items-center justify-end gap-4 text-sm font-medium text-gray-800 md:gap-6">
          <Link
            href="#"
            className="hidden items-center gap-1.5 transition-colors hover:text-[#159AA5] sm:flex"
          >
            <UserRound className="size-4" />
            Profile
          </Link>

          {
            user ? <DropdownMenu>
            <DropdownMenuTrigger render={<Avatar>
              <AvatarImage referrerPolicy="no-referrer" src={user?.image as string} />
              <AvatarFallback>{user?.name.charAt(0)}</AvatarFallback>
            </Avatar>} />
            <DropdownMenuContent>
              <DropdownMenuItem>
                {user?.name}
              </DropdownMenuItem>
              <DropdownMenuItem>
                {user?.email}
              </DropdownMenuItem>

              <DropdownMenuSeparator />
              <Button onClick={handleSignOut} variant="destructive">
                <LogOutIcon />
                Log out
              </Button>
            </DropdownMenuContent>
          </DropdownMenu> : <>
          <Link href="login" className="transition-colors hover:text-[#159AA5]">
            Login
          </Link>
          <Link href="/signup" className="transition-colors hover:text-[#159AA5]">
            Sign Up
          </Link>
          </>
          }

          

          
        </div>
      </div>
    </header>
  );
}
