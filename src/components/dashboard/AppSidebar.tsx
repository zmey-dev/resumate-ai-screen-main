
import React from 'react';
import { 
  Sidebar, 
  SidebarContent, 
  SidebarHeader,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter
} from "@/components/ui/sidebar";
import { 
  LayoutDashboard, 
  File, 
  Users,
  Database,
  Cog
} from "lucide-react";

const sidebarItems = [
  { name: "Dashboard", icon: LayoutDashboard, path: "/" },
  { name: "Job Descriptions", icon: File, path: "/jobs" },
  { name: "Candidates", icon: Users, path: "/candidates" },
  { name: "Email Setup", icon: Database, path: "/email-setup" },
  { name: "Settings", icon: Cog, path: "/settings" },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <h2 className="text-xl font-bold text-sidebar-foreground">Recruiter AI</h2>
        <p className="text-sm text-sidebar-foreground/70">Resume Screening Assistant</p>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Main Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {sidebarItems.map((item) => (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton asChild className="flex items-center gap-3">
                    <a href={item.path}>
                      <item.icon className="h-5 w-5" />
                      <span>{item.name}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-4">
        <div className="text-xs text-sidebar-foreground/60">
          <p>© 2025 Recruiter AI</p>
          <p>Version 1.0.0</p>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
