
import { Menu, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./ThemeToggle";

interface MobileHeaderProps {
  onMenuClick: () => void;
  onProfileClick: () => void;
}

export function MobileHeader({ onMenuClick, onProfileClick }: MobileHeaderProps) {
  return (
    <div className="md:hidden h-14 border-b flex items-center justify-between px-4 glass-effect sticky top-0 z-10">
      <Button variant="ghost" size="icon" onClick={onMenuClick} aria-label="Open menu">
        <Menu size={20} />
      </Button>
      
      <div className="flex items-center gap-2">
        <ThemeToggle />
        <Button variant="ghost" size="icon" onClick={onProfileClick} aria-label="Open profile">
          <User size={20} />
        </Button>
      </div>
    </div>
  );
}
