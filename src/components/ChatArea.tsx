
import { useState, useRef, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { TypingIndicator } from "./TypingIndicator";
import { MessageInput } from "./MessageInput";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";

type MessageType = {
  id: number;
  text: string;
  sender: 'user' | 'ai';
  time: string;
};

export function ChatArea() {
  const { toast } = useToast();
  const [messages, setMessages] = useState<MessageType[]>([
    { id: 1, sender: 'ai', text: 'Hello! I\'m your AI assistant. How can I help you today?', time: '10:30 AM' },
    { id: 2, sender: 'user', text: 'I\'m working on a new design system. Any tips?', time: '10:31 AM' },
    { id: 3, sender: 'ai', text: 'Great project! For a successful design system, I recommend starting with core components like buttons, inputs, and typography. Establish a clear color palette and consistent spacing. Document everything well, and involve both designers and developers in the process. Is there a specific aspect you\'d like to explore further?', time: '10:32 AM' },
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
      sender: 'user',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    
    setMessages([...messages, newMessage]);
    
    // Simulate AI response
    setIsTyping(true);
    
    setTimeout(() => {
      setIsTyping(false);
      
      const replyMessage: MessageType = {
        id: messages.length + 2,
        text: "Thanks for sharing that! I understand you're working on a design system. That's an excellent project that can bring consistency and efficiency to your product development. Would you like specific advice on component organization, documentation approaches, or implementation strategies?",
        sender: 'ai',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      
      setMessages(prevMessages => [...prevMessages, replyMessage]);
    }, 2000);
  };
  
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center p-4 border-b glass-effect sticky top-0 z-10 md:justify-center">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src="" />
            <AvatarFallback className="bg-primary/10 text-primary">AI</AvatarFallback>
          </Avatar>
          
          <div>
            <h2 className="font-medium">Project Brainstorming</h2>
            <p className="text-xs text-muted-foreground">AI Assistant</p>
          </div>
        </div>
      </div>
      
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4 max-w-3xl mx-auto">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
            >
              {message.sender === 'ai' && (
                <Avatar className="mr-2 mt-1 flex-shrink-0">
                  <AvatarFallback className="bg-primary/10 text-primary">AI</AvatarFallback>
                </Avatar>
              )}
              
              <div
                className={`max-w-[80%] ${
                  message.sender === 'user' ? 'message-bubble-out' : 'message-bubble-in'
                }`}
              >
                <p>{message.text}</p>
                <span className={`text-xs ${message.sender === 'user' ? 'text-primary-foreground/70' : 'text-secondary-foreground/70'} block mt-1`}>
                  {message.time}
                </span>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <Avatar className="mr-2 flex-shrink-0">
                <AvatarFallback className="bg-primary/10 text-primary">AI</AvatarFallback>
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
