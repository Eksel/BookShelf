import { SidebarProvider,SidebarTrigger } from "@workspace/ui/components/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { Outlet, Link } from 'react-router';

export default function Layout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full">
        <SidebarTrigger />
        
        <Outlet />
      </main>
    </SidebarProvider>
  )
}