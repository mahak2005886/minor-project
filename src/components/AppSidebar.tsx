import { NavLink, useLocation } from "react-router-dom";
import { 
  Home, 
  TrendingUp, 
  FileEdit, 
  List, 
  ShieldCheck, 
  Archive,
  Sprout
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const navigationItems = [
  { title: "Home", url: "/", icon: Home },
  { title: "Mandi Price", url: "/mandi-price", icon: TrendingUp },
  { title: "Crop Registration", url: "/crop-registration", icon: FileEdit },
  { title: "Listed Crop", url: "/listed-crop", icon: List },
  { title: "Quality Verification", url: "/quality-verification", icon: ShieldCheck },
  { title: "Sold Crop", url: "/sold-crop", icon: Archive },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const isCollapsed = state === "collapsed";

  const isActive = (path: string) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  const getNavClassName = (path: string) => {
    const baseClasses = "w-full transition-all duration-200 hover:bg-primary/10";
    return isActive(path) 
      ? `${baseClasses} bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground shadow-soft`
      : `${baseClasses} text-muted-foreground hover:text-foreground`;
  };

  return (
    <Sidebar className={`border-r bg-card ${isCollapsed ? "w-20" : "w-72"} transition-all duration-300`}>
      <SidebarContent className="gradient-card">
        <div className="p-6 border-b">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 gradient-primary rounded-xl">
              <Sprout className="w-5 h-5 text-primary-foreground" />
            </div>
            {!isCollapsed && (
              <div>
                <h2 className="font-bold text-lg text-primary">Krishi-Chain</h2>
                <p className="text-xs text-muted-foreground">Farmer Portal</p>
              </div>
            )}
          </div>
        </div>

        <SidebarGroup className="px-4 py-6">
          <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground mb-4">
            {!isCollapsed && "NAVIGATION"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="p-0">
                    <NavLink
                      to={item.url}
                      className={getNavClassName(item.url)}
                    >
                      <div className="flex items-center gap-3 px-4 py-3 rounded-lg">
                        <item.icon className="w-5 h-5 flex-shrink-0" />
                        {!isCollapsed && (
                          <span className="font-medium">{item.title}</span>
                        )}
                      </div>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}