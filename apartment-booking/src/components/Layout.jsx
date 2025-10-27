import React from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { base44 } from "@/api/base44Client";
import { useQuery } from "@tanstack/react-query";
import { Home, Calendar, User, Building2, Plus, LogOut, Settings } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const navigationItems = [
  {
    title: "Квартиры",
    url: createPageUrl("Apartments"),
    icon: Home,
  },
  {
    title: "Добавить квартиру",
    url: createPageUrl("AddApartment"),
    icon: Plus,
  },
  {
    title: "Мои бронирования",
    url: createPageUrl("MyBookings"),
    icon: Calendar,
  },
  {
    title: "Профиль",
    url: createPageUrl("Profile"),
    icon: User,
  },
];

export default function Layout({ children, currentPageName }) {
  const location = useLocation();

  const { data: user } = useQuery({
    queryKey: ['currentUser'],
    queryFn: async () => {
      try {
        return await base44.auth.me();
      } catch (error) {
        return null;
      }
    },
  });

  const handleLogout = () => {
    base44.auth.logout();
  };

  return (
    <SidebarProvider>
      <style>{`
        :root {
          --primary: 231 48% 48%;
          --primary-foreground: 0 0% 100%;
          --accent: 43 74% 66%;
        }
      `}</style>
      
      <div className="min-h-screen flex w-full bg-gradient-to-br from-slate-50 via-white to-indigo-50">
        <Sidebar className="border-r border-slate-200/60 bg-white/80 backdrop-blur-xl">
          <SidebarHeader className="border-b border-slate-200/60 p-6">
            <Link to={createPageUrl("Apartments")} className="flex items-center gap-3 group">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-indigo-700 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/30 group-hover:shadow-xl group-hover:shadow-indigo-500/40 transition-all duration-300">
                <Building2 className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="font-bold text-slate-900 text-lg">LuxStay</h2>
                <p className="text-xs text-slate-500 font-medium">Премиум квартиры</p>
              </div>
            </Link>
          </SidebarHeader>
          
          <SidebarContent className="p-3">
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu>
                  {navigationItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton 
                        asChild 
                        className={`hover:bg-indigo-50 hover:text-indigo-700 transition-all duration-200 rounded-xl mb-1 ${
                          location.pathname === item.url ? 'bg-indigo-50 text-indigo-700 shadow-sm' : ''
                        }`}
                      >
                        <Link to={item.url} className="flex items-center gap-3 px-4 py-3">
                          <item.icon className="w-5 h-5" />
                          <span className="font-medium">{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>

          <SidebarFooter className="border-t border-slate-200/60 p-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-3 w-full hover:bg-slate-50 p-2 rounded-lg transition-colors duration-200">
                  <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-500 rounded-full flex items-center justify-center shadow-md">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0 text-left">
                    <p className="font-semibold text-slate-900 text-sm truncate">
                      {user?.full_name || 'Гость'}
                    </p>
                    <p className="text-xs text-slate-500 truncate">
                      {user?.email || 'Добро пожаловать'}
                    </p>
                  </div>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem asChild>
                  <Link to={createPageUrl("Profile")} className="cursor-pointer">
                    <Settings className="w-4 h-4 mr-2" />
                    Настройки профиля
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  onClick={handleLogout}
                  className="cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Выйти
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarFooter>
        </Sidebar>

        <main className="flex-1 flex flex-col">
          <header className="bg-white/80 backdrop-blur-xl border-b border-slate-200/60 px-6 py-4 md:hidden sticky top-0 z-10">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="hover:bg-slate-100 p-2 rounded-lg transition-colors duration-200" />
              <h1 className="text-xl font-bold text-slate-900">LuxStay</h1>
            </div>
          </header>

          <div className="flex-1">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}