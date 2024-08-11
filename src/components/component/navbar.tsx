"use client"
import Link from "next/link"
import { CircleUser, Package, Folder } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/app/config/firebase-config";
import { signOut } from "firebase/auth";

const Navbar = () => {
    const [user, loading, error] = useAuthState(auth);

    const handleLogout = () => {
        signOut(auth).then(() => {
          // Redirect to login page after logout
          window.location.href = '/login';
        }).catch((error) => {
          console.error("Error signing out: ", error);
        });
      };

    return (
        <div>
            <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
            <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
                <Link
                href="#"
                className="flex items-center gap-2 text-lg font-semibold md:text-base"
                >
                <Package className="h-6 w-6" />
                <span className="sr-only">Acme Inc</span>
                </Link>
                <Link
                href="/"
                className="text-muted-foreground transition-colors hover:text-foreground"
                >
                Home
                </Link>
                <Link
                href="/collection"
                className="text-muted-foreground transition-colors hover:text-foreground"
                >
                Collection
                </Link>
                {!user ? (
                    <Link
                    href="/login"
                    className="text-muted-foreground transition-colors hover:text-foreground"
                    >
                    Login
                    </Link>
                ) : null}
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
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onSelect={handleLogout}>Logout</DropdownMenuItem>
                </DropdownMenuContent>
                </DropdownMenu>
            </div>
            </header>
        </div>
    )
};

export default Navbar;