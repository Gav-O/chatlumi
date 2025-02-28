
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ThemeToggle } from "./ThemeToggle";
import { X, RefreshCw, Trash2, Download } from "lucide-react";

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
              <DrawerTitle className="text-xl font-semibold">Settings</DrawerTitle>
              <DrawerClose asChild>
                <Button variant="ghost" size="icon">
                  <X size={18} />
                </Button>
              </DrawerClose>
            </div>
            <DrawerDescription>Customize your AI assistant preferences</DrawerDescription>
          </DrawerHeader>
          
          <div className="p-4 pb-0">
            <Tabs defaultValue="appearance">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="appearance">Appearance</TabsTrigger>
                <TabsTrigger value="preferences">Preferences</TabsTrigger>
              </TabsList>
              
              <TabsContent value="appearance" className="mt-4 space-y-6">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Theme</Label>
                      <p className="text-sm text-muted-foreground">Switch between light and dark</p>
                    </div>
                    <ThemeToggle />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="reduced-motion">Reduced Motion</Label>
                      <p className="text-sm text-muted-foreground">Minimize animations</p>
                    </div>
                    <Switch id="reduced-motion" />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="high-contrast">High Contrast</Label>
                      <p className="text-sm text-muted-foreground">Increase text contrast</p>
                    </div>
                    <Switch id="high-contrast" />
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="preferences" className="mt-4 space-y-6">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="typing-indicators">Show Typing Indicators</Label>
                      <p className="text-sm text-muted-foreground">Show when AI is generating a response</p>
                    </div>
                    <Switch id="typing-indicators" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="notifications">Notifications</Label>
                      <p className="text-sm text-muted-foreground">Receive notifications for AI responses</p>
                    </div>
                    <Switch id="notifications" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="auto-save">Auto Save Conversations</Label>
                      <p className="text-sm text-muted-foreground">Automatically save your chat history</p>
                    </div>
                    <Switch id="auto-save" defaultChecked />
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          <DrawerFooter className="flex-row justify-between gap-2">
            <Button variant="outline" className="flex-1 text-destructive">
              <Trash2 className="mr-2" size={16} />
              Clear History
            </Button>
            <Button className="flex-1">
              <Download className="mr-2" size={16} />
              Export Chat
            </Button>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
