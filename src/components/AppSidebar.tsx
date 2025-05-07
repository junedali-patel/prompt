
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Sidebar, SidebarContent, SidebarHeader, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { PlusCircle, Home, History, Search, BookOpen, User, Settings, Lightbulb } from "lucide-react";

export const AppSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const menuItems = [
    { title: "Home", icon: Home, url: "/" },
    { title: "History", icon: History, url: "/history" },
    { title: "Explore", icon: Search, url: "/explore" },
    { title: "Learning", icon: BookOpen, url: "/learning" },
    { title: "Account", icon: User, url: "/account" },
    { title: "Settings", icon: Settings, url: "/settings" },
  ];
  return (
    <Sidebar className="h-screen">
      <SidebarHeader className="h-14 flex items-center justify-center p-2 border-b">
        <div className="flex items-center space-x-2">
          <PlusCircle className="h-5 w-5" />
          <span className="font-bold">Prompt Generator</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild
                    isActive={location.pathname === item.url}
                  >
                    <a 
                      href={item.url} 
                      className="flex items-center gap-3"
                      onClick={(e) => {
                        e.preventDefault();
                        navigate(item.url);
                      }}
                    >
                      <item.icon className="h-5 w-5" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-4 border-t">
        <div className="text-sm text-muted-foreground">
          Version 1.0.0
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};
