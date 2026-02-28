"use client";

import { ChartBarStacked, Form, MapPin, Slack, TextSearch } from "lucide-react";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { usePathname, useRouter } from "next/navigation";

export function NavMain() {
  const router = useRouter();
  const pathName = usePathname();

  const navigations = [
    {
      title: "Jobs",
      url: "/dashboard/jobs",
      icon: TextSearch,
    },
    {
      title: "Companies",
      url: "/dashboard/companies",
      icon: Slack,
    },
    {
      title: "Categories",
      url: "/dashboard/categories",
      icon: ChartBarStacked,
    },
    {
      title: "Locations",
      url: "/dashboard/locations",
      icon: MapPin,
    },
    {
      title: "Applications",
      url: "/dashboard/applications",
      icon: Form,
    },
  ];
  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          {navigations.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                isActive={pathName.includes(item.url)}
                onClick={() => router.push(item.url)}
                tooltip={item.title}
                className="data-[active=true]:bg-brand data-[active=true]:text-primary"
              >
                {item.icon && <item.icon />}
                <span>{item.title}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
