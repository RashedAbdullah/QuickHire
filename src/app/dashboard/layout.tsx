import { AppSidebar } from "@/components/sidebar/dashboard-sidebar";
import { SiteHeader } from "@/components/sidebar/sidebar-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { ConfirmDialogProvider } from "@/context/confirm-dialog-provider";
import React from "react";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <SidebarProvider
        style={
          {
            "--sidebar-width": "calc(var(--spacing) * 72)",
            "--header-height": "calc(var(--spacing) * 12)",
          } as React.CSSProperties
        }
      >
        <AppSidebar />
        <SidebarInset className="md:peer-data-[variant=inset]:rounded-none md:peer-data-[variant=inset]:shadow-none md:peer-data-[variant=inset]:m-0 md:peer-data-[variant=inset]:border-l">
          <SiteHeader />
          <ConfirmDialogProvider>{children}</ConfirmDialogProvider>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
};

export default DashboardLayout;
