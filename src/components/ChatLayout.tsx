
import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { ChatSidebar } from "./ChatSidebar";
import { ChatArea } from "./ChatArea";
import { MobileHeader } from "./MobileHeader";
import { ProfileDrawer } from "./ProfileDrawer";

export function ChatLayout() {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  
  return (
    <SidebarProvider>
      <div className="flex h-full w-full overflow-hidden">
        <ChatSidebar 
          isMobileSidebarOpen={isMobileSidebarOpen} 
          setIsMobileSidebarOpen={setIsMobileSidebarOpen}
        />
        
        <div className="flex flex-col flex-1 h-full relative">
          <MobileHeader 
            onMenuClick={() => setIsMobileSidebarOpen(true)} 
            onProfileClick={() => setIsProfileOpen(true)}
          />
          
          <ChatArea />
        </div>
        
        <ProfileDrawer 
          isOpen={isProfileOpen} 
          onClose={() => setIsProfileOpen(false)} 
        />
      </div>
    </SidebarProvider>
  );
}
