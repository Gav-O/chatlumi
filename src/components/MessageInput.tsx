
import { useState, FormEvent } from "react";
import { Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface MessageInputProps {
  onSendMessage: (message: string) => void;
}

export function MessageInput({ onSendMessage }: MessageInputProps) {
  const [message, setMessage] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    if (!message.trim()) {
      toast({
        title: "Can't send empty message",
        variant: "destructive",
      });
      return;
    }
    
    onSendMessage(message.trim());
    setMessage("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2 p-4 glass-effect border-t">
      <Input
        placeholder="Type an eggy message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="flex-1 bg-secondary/50 border-0 focus-visible:ring-1"
      />
      <Button type="submit" size="icon" className="rounded-full" disabled={!message.trim()}>
        <Send size={18} />
      </Button>
    </form>
  );
}
