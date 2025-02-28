
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ThemeToggle } from "./ThemeToggle";
import { X, LogOut, Settings } from "lucide-react";

interface ProfileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ProfileDrawer({ isOpen, onClose }: ProfileDrawerProps) {
  return (
    <Drawer open={isOpen} onOpenChange={onClose}>
      <DrawerContent className="max-h-[90vh]">
        <div className="mx-auto w-full max-w-lg">
          <DrawerHeader className="text-left">
            <div className="flex items-center justify-between">
              <DrawerTitle className="text-xl font-semibold">Profile</DrawerTitle>
              <DrawerClose asChild>
                <Button variant="ghost" size="icon">
                  <X size={18} />
                </Button>
              </DrawerClose>
            </div>
            <DrawerDescription>Customize your settings and preferences</DrawerDescription>
          </DrawerHeader>
          
          <div className="p-4 pb-0">
            <Tabs defaultValue="profile">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="profile">Profile</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>
              
              <TabsContent value="profile" className="mt-4 space-y-6">
                <div className="flex flex-col items-center gap-3">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src="" />
                    <AvatarFallback className="text-2xl bg-primary/10 text-primary">JD</AvatarFallback>
                  </Avatar>
                  <div className="text-center">
                    <h3 className="text-lg font-medium">John Doe</h3>
                    <p className="text-sm text-muted-foreground">Always available</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="online-status">Online Status</Label>
                      <p className="text-sm text-muted-foreground">Show when you're active</p>
                    </div>
                    <Switch id="online-status" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Theme</Label>
                      <p className="text-sm text-muted-foreground">Switch between light and dark</p>
                    </div>
                    <ThemeToggle />
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="settings" className="mt-4 space-y-6">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="read-receipts">Read Receipts</Label>
                      <p className="text-sm text-muted-foreground">Let others know when you've read their messages</p>
                    </div>
                    <Switch id="read-receipts" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="notifications">Notifications</Label>
                      <p className="text-sm text-muted-foreground">Receive notifications for new messages</p>
                    </div>
                    <Switch id="notifications" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="typing-indicators">Typing Indicators</Label>
                      <p className="text-sm text-muted-foreground">Show when others are typing</p>
                    </div>
                    <Switch id="typing-indicators" defaultChecked />
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          <DrawerFooter className="flex-row justify-between gap-2">
            <Button variant="outline" className="flex-1 text-destructive">
              <LogOut className="mr-2" size={16} />
              Sign Out
            </Button>
            <Button className="flex-1">
              <Settings className="mr-2" size={16} />
              Update Settings
            </Button>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
