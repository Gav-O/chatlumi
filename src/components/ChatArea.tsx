
import { useState, useRef, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { TypingIndicator } from "./TypingIndicator";
import { MessageInput } from "./MessageInput";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";

type MessageType = {
  id: number;
  text: string;
  sender: 'me' | 'other';
  time: string;
};

export function ChatArea() {
  const { toast } = useToast();
  const [messages, setMessages] = useState<MessageType[]>([
    { id: 1, sender: 'other', text: 'Hi there! How can I help you today?', time: '10:30 AM' },
    { id: 2, sender: 'me', text: 'I have a question about the new design system.', time: '10:31 AM' },
    { id: 3, sender: 'other', text: 'Sure! What would you like to know specifically?', time: '10:32 AM' },
    { id: 4, sender: 'me', text: 'I\'m wondering how to implement the new component library in our existing project.', time: '10:33 AM' },
    { id: 5, sender: 'other', text: 'Great question! The new component library can be integrated by installing the package and following the documentation. Would you like me to walk you through the setup process?', time: '10:35 AM' },
  ]);
  
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const handleSendMessage = (text: string) => {
    const newMessage: MessageType = {
      id: messages.length + 1,
      text,
      sender: 'me',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    
    setMessages([...messages, newMessage]);
    
    // Simulate a reply
    setIsTyping(true);
    
    setTimeout(() => {
      setIsTyping(false);
      
      const replyMessage: MessageType = {
        id: messages.length + 2,
        text: "Thanks for your message! I'll get back to you shortly.",
        sender: 'other',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      
      setMessages(prevMessages => [...prevMessages, replyMessage]);
      
      toast({
        title: "New message",
        description: "You have received a new message",
      });
    }, 2000);
  };
  
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center p-4 border-b glass-effect sticky top-0 z-10 md:justify-center">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Avatar>
              <AvatarImage src="" />
              <AvatarFallback className="bg-primary/10 text-primary">SJ</AvatarFallback>
            </Avatar>
            <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-green-500 border-2 border-background animate-pulse-status" />
          </div>
          
          <div>
            <h2 className="font-medium">Sarah Johnson</h2>
            <p className="text-xs text-muted-foreground">Active now</p>
          </div>
        </div>
      </div>
      
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4 max-w-3xl mx-auto">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'} animate-fade-in`}
            >
              {message.sender === 'other' && (
                <Avatar className="mr-2 mt-1 flex-shrink-0">
                  <AvatarFallback className="bg-primary/10 text-primary">SJ</AvatarFallback>
                </Avatar>
              )}
              
              <div
                className={`max-w-[80%] ${
                  message.sender === 'me' ? 'message-bubble-out' : 'message-bubble-in'
                }`}
              >
                <p>{message.text}</p>
                <span className={`text-xs ${message.sender === 'me' ? 'text-primary-foreground/70' : 'text-secondary-foreground/70'} block mt-1`}>
                  {message.time}
                </span>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <Avatar className="mr-2 flex-shrink-0">
                <AvatarFallback className="bg-primary/10 text-primary">SJ</AvatarFallback>
              </Avatar>
              <TypingIndicator className="message-bubble-in !py-3" />
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>
      
      <MessageInput onSendMessage={handleSendMessage} />
    </div>
  );
}
