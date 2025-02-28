
import { Search, ArrowLeft } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Sidebar, SidebarContent, SidebarHeader } from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "./ThemeToggle";

interface ChatSidebarProps {
  isMobileSidebarOpen: boolean;
  setIsMobileSidebarOpen: (isOpen: boolean) => void;
}

export function ChatSidebar({ isMobileSidebarOpen, setIsMobileSidebarOpen }: ChatSidebarProps) {
  const isMobile = useIsMobile();
  
  // Sample conversation data
  const conversations = [
    {
      id: 1,
      name: "Sarah Johnson",
      avatar: "",
      lastMessage: "That sounds perfect! See you then.",
      time: "2m ago",
      unread: 2,
      online: true,
    },
    {
      id: 2,
      name: "Design Team",
      avatar: "",
      lastMessage: "Let's review the mockups tomorrow morning.",
      time: "45m ago",
      unread: 0,
      online: true,
    },
    {
      id: 3,
      name: "John Smith",
      avatar: "",
      lastMessage: "I've sent you the files you requested.",
      time: "2h ago",
      unread: 0,
      online: false,
    },
    {
      id: 4,
      name: "Emily Wilson",
      avatar: "",
      lastMessage: "Are we still meeting today?",
      time: "1d ago",
      unread: 0,
      online: false,
    },
    {
      id: 5,
      name: "Product Team",
      avatar: "",
      lastMessage: "We'll need to update the roadmap.",
      time: "3d ago",
      unread: 0,
      online: true,
    },
    {
      id: 6,
      name: "Michael Brown",
      avatar: "",
      lastMessage: "Thanks for your help yesterday!",
      time: "5d ago",
      unread: 0,
      online: false,
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
          
          <h1 className="text-lg font-semibold">Chats</h1>
          
          {!isMobile && <ThemeToggle />}
        </div>
        
        <div className="p-4">
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
                className="w-full p-3 rounded-lg hover:bg-accent flex items-center gap-3 animate-fade-in transition-colors duration-200"
              >
                <div className="relative">
                  <Avatar>
                    <AvatarImage src={convo.avatar} />
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {convo.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  
                  {convo.online && (
                    <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-green-500 border-2 border-background animate-pulse-status" />
                  )}
                </div>
                
                <div className="flex-1 text-left truncate">
                  <div className="flex justify-between items-center">
                    <span className="font-medium truncate">{convo.name}</span>
                    <span className="text-xs text-muted-foreground">{convo.time}</span>
                  </div>
                  <p className="text-sm text-muted-foreground truncate">{convo.lastMessage}</p>
                </div>
                
                {convo.unread > 0 && (
                  <Badge variant="default" className="ml-auto bg-primary hover:bg-primary">
                    {convo.unread}
                  </Badge>
                )}
              </button>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
