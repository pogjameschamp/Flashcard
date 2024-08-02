import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Skeleton } from "@/components/ui/skeleton"
import { useEffect, useState } from "react";
import Image from 'next/image'
import Peterpic from './Peter_Griffin.png'
import { useRouter } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth"
import Link from "next/link"
import { CircleUser, Menu, Package2, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

const Navbar = () => {
    
    return (
        <div>
            <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
            <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
                <Link
                href="#"
                className="flex items-center gap-2 text-lg font-semibold md:text-base"
                >
                <Package2 className="h-6 w-6" />
                <span className="sr-only">Acme Inc</span>
                </Link>
                <Link
                href="/"
                className="text-muted-foreground transition-colors hover:text-foreground"
                >
                Dashboard
                </Link>
                <Link
                href="/collection"
                className="text-muted-foreground transition-colors hover:text-foreground"
                >
                Collection
                </Link>
                <Link
                href="/login"
                className="text-muted-foreground transition-colors hover:text-foreground"
                >
                Login
                </Link>
            </nav>
            <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
                <form className="ml-auto flex-1 sm:flex-initial">
                {/* <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                    type="search"
                    placeholder="Search products..."
                    className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
                    />
                </div> */}
                </form>
                <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="secondary" size="icon" className="rounded-full">
                    <CircleUser className="h-5 w-5" />
                    <span className="sr-only">Toggle user menu</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Settings</DropdownMenuItem>
                    <DropdownMenuItem>Support</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Logout</DropdownMenuItem>
                </DropdownMenuContent>
                </DropdownMenu>
            </div>
            </header>
        </div>
    )
};

export default Navbar;