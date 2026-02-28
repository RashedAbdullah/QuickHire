"use client";

import * as React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { NavMain } from "./main-navs";
import Image from "next/image";
import Link from "next/link";

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon">
      <Link href="/" className="flex items-center py-2 ml-4 gap-2">
        <Image height={30} width={30} src="/logo.png" alt="Quick hire" />
        <span className="text-base font-semibold">QuickHire</span>
      </Link>

      <SidebarContent>
        <NavMain />
      </SidebarContent>

      <SidebarFooter></SidebarFooter>
    </Sidebar>
  );
}
