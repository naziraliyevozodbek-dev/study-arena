"use client";

import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bot, Send, User } from "lucide-react";

interface Message {
  role: "user" | "ai";
  content: string;
}

export default function AITutorPage() {
  const [messages, setMessages] = useState<Message[]>([
    { role: "ai", content: "Hallo! I am your AI Tutor. How can I help you with your studies today?" }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input;
    setMessages(prev => [...prev, { role: "user", content: userMessage }]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage })
      });
      const data = await response.json();
      
      if (response.ok) {
        setMessages(prev => [...prev, { role: "ai", content: data.reply }]);
      } else {
        setMessages(prev => [...prev, { role: "ai", content: "Sorry, I am having trouble connecting to my brain right now." }]);
      }
    } catch (error) {
      setMessages(prev => [...prev, { role: "ai", content: "Network error occurred." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto h-[calc(100vh-80px)] md:h-screen flex flex-col">
      <div className="flex items-center gap-4 mb-4">
        <div className="p-3 bg-primary/20 rounded-xl">
          <Bot className="h-8 w-8 text-primary" />
        </div>
        <div>
          <h1 className="text-2xl font-black tracking-tight">AI Tutor</h1>
          <p className="text-sm text-muted-foreground">Ask me questions, practice grammar, or get hints!</p>
        </div>
      </div>

      <Card className="gamified-card flex-1 flex flex-col overflow-hidden">
        <CardContent className="flex-1 overflow-y-auto p-4 space-y-4" ref={scrollRef}>
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`flex gap-3 max-w-[80%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                <div className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center ${msg.role === 'user' ? 'bg-secondary text-secondary-foreground' : 'bg-primary text-primary-foreground'}`}>
                  {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
                </div>
                <div className={`p-3 rounded-2xl ${msg.role === 'user' ? 'bg-secondary/10 text-foreground rounded-tr-sm' : 'bg-muted text-foreground rounded-tl-sm'}`}>
                  {msg.content}
                </div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="flex gap-3 max-w-[80%] flex-row">
                <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                  <Bot size={16} />
                </div>
                <div className="p-4 rounded-2xl bg-muted text-foreground rounded-tl-sm flex items-center gap-1">
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s'}} />
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.4s'}} />
                </div>
              </div>
            </div>
          )}
        </CardContent>
        <div className="p-4 border-t-2 border-border bg-surface">
          <form 
            className="flex gap-2"
            onSubmit={(e) => { e.preventDefault(); handleSend(); }}
          >
            <Input 
              value={input} 
              onChange={e => setInput(e.target.value)} 
              placeholder="Ask your tutor something..." 
              className="flex-1"
            />
            <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
              <Send size={18} />
            </Button>
          </form>
        </div>
      </Card>
    </div>
  );
}
