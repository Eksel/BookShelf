import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarGroupLabel,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuBadge,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarMenuSubButton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  
  } from "@workspace/ui/components/sidebar"
import { BadgePlus,BookOpen,Book } from 'lucide-react';
import { Link } from "react-router";
  
export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <h1 className="flex flex-row justify-center items-center text-center font-black font-lato text-2xl">
          <Book/>
          <span className="mx-1">
            Time to Read
          </span>
        </h1>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>
            Sites
          </SidebarGroupLabel>

          <SidebarGroupContent>

          </SidebarGroupContent>
  
          <SidebarGroupAction>
        
          </SidebarGroupAction>
  
          <SidebarMenu>
            <Link to="/dashboard/books">
              <SidebarMenuButton>
                <BookOpen/> Books
              </SidebarMenuButton>
            </Link>
          </SidebarMenu>
          <SidebarMenu>
            <Link to="/dashboard/addbook">
              <SidebarMenuButton>
                <BadgePlus /> Add new book
              </SidebarMenuButton>
            </ Link>
          </SidebarMenu>
  
        </SidebarGroup>
      </SidebarContent>
      
   </Sidebar>
  )
   } 