
import React from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/dashboard/AppSidebar';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { FloatingCollapseButton } from '@/components/dashboard/FloatingCollapseButton';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <div className="flex flex-col flex-1">
          <DashboardHeader />
          <main className="flex-1 bg-muted/40 p-2">
            {children}
          </main>
        </div>
        <FloatingCollapseButton />
      </div>
    </SidebarProvider>
  );
}
