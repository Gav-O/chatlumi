
import { Search, ArrowLeft, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Sidebar, SidebarContent, SidebarHeader } from "@/components/ui/sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { ThemeToggle } from "./ThemeToggle";

interface ChatSidebarProps {
  isMobileSidebarOpen: boolean;
  setIsMobileSidebarOpen: (isOpen: boolean) => void;
}

export function ChatSidebar({ isMobileSidebarOpen, setIsMobileSidebarOpen }: ChatSidebarProps) {
  const isMobile = useIsMobile();
  
  // Sample conversation data for AI chat
  const conversations = [
    {
      id: 1,
      name: "Project Brainstorming",
      lastMessage: "Let's explore some ideas for your new app",
      time: "2m ago",
      active: true,
    },
    {
      id: 2,
      name: "Code Generation",
      lastMessage: "The React component has been optimized",
      time: "45m ago",
      active: false,
    },
    {
      id: 3,
      name: "Data Analysis Help",
      lastMessage: "Here's how you can visualize those metrics",
      time: "2h ago",
      active: false,
    },
    {
      id: 4,
      name: "Travel Planning",
      lastMessage: "I've found some options for your Paris trip",
      time: "1d ago",
      active: false,
    },
    {
      id: 5,
      name: "Design Feedback",
      lastMessage: "The color contrast could be improved",
      time: "3d ago",
      active: false,
    },
    {
      id: 6,
      name: "Learning Python",
      lastMessage: "Let's continue with data structures",
      time: "5d ago",
      active: false,
    },
  ];

  const sidebarClass = isMobile 
    ? `fixed inset-y-0 left-0 z-20 w-80 transition-transform duration-300 ease-in-out transform ${isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'} shadow-lg`
    : 'hidden md:block w-80 border-r';

  return (
    <div className={sidebarClass}>
      <div className="flex flex-col h-full bg-sidebar">
        <div className="h-14 border-b flex items-center justify-between px-4 glass-effect">
          {isMobile && (
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsMobileSidebarOpen(false)}
              aria-label="Close sidebar"
            >
              <ArrowLeft size={20} />
            </Button>
          )}
          
          <h1 className="text-lg font-semibold">AI Chats</h1>
          
          {!isMobile && <ThemeToggle />}
        </div>
        
        <div className="p-4">
          <Button className="w-full gap-2 mb-4">
            <Plus size={16} />
            New Chat
          </Button>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
            <Input
              placeholder="Search conversations..."
              className="pl-9 bg-secondary/50 border-0 focus-visible:ring-1"
            />
          </div>
        </div>
        
        <ScrollArea className="flex-1">
          <div className="space-y-1 p-2">
            {conversations.map((convo) => (
              <button
                key={convo.id}
                className={`w-full p-3 rounded-lg hover:bg-accent flex items-center gap-3 animate-fade-in transition-colors duration-200 ${convo.active ? 'bg-accent' : ''}`}
              >
                <div className="flex-1 text-left truncate">
                  <div className="flex justify-between items-center">
                    <span className="font-medium truncate">{convo.name}</span>
                    <span className="text-xs text-muted-foreground">{convo.time}</span>
                  </div>
                  <p className="text-sm text-muted-foreground truncate">{convo.lastMessage}</p>
                </div>
              </button>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
