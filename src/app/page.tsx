"use client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Skeleton } from "@/components/ui/skeleton"
import { useEffect, useState } from "react";
import Image from 'next/image'
import Peterpic from './Peter_Griffin.png'
import { useRouter } from "next/navigation";
import { auth } from "./config/firebase-config"
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
import Navbar  from '../components/component/navbar'

export default function Home() {
  const router = useRouter();
  const [user, loading, error] = useAuthState(auth);

  useEffect(() => {
    if (error) {
      console.error("Error authenticating user:", error);
    }
  }, [error]);

  return (
    <div>
    </div>
  );
}

