"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { TelegramLogin } from "@/components/auth/TelegramLogin";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleTelegramAuth = async (user: any) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/auth/telegram', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
      });
      
      const data = await response.json();
      
      if (response.ok && data.success) {
        // Mock successful login - route to TWA for now
        router.push('/twa');
      } else {
        setError(data.error || 'Authentication failed');
      }
    } catch (err) {
      setError('An error occurred during login');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-2">
            <BookOpen className="h-10 w-10 text-primary" />
            <span className="text-3xl font-black tracking-tight text-primary">StudyArena</span>
          </div>
        </div>
        
        <Card className="gamified-card border-b-4">
          <CardHeader className="text-center pb-2">
            <CardTitle className="text-2xl font-bold">Welcome Back!</CardTitle>
            <CardDescription>Login with your Telegram account to continue your learning journey.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center pt-6 gap-6">
            
            {error && (
              <div className="flex items-center gap-2 text-destructive bg-destructive/10 p-3 rounded-xl w-full text-sm font-medium">
                <ShieldAlert className="h-5 w-5" />
                {error}
              </div>
            )}

            {isLoading ? (
              <div className="h-12 flex items-center justify-center text-muted-foreground font-medium">
                Authenticating...
              </div>
            ) : (
              <div className="w-full flex justify-center py-4">
                {process.env.NEXT_PUBLIC_TELEGRAM_BOT_NAME ? (
                  <TelegramLogin 
                    botName={process.env.NEXT_PUBLIC_TELEGRAM_BOT_NAME}
                    onAuth={handleTelegramAuth}
                    buttonSize="large"
                    cornerRadius={16}
                  />
                ) : (
                  <div className="w-full flex flex-col gap-3">
                    <div className="text-sm text-center text-muted-foreground mb-2">
                      Telegram Bot Name is not configured. Use mock login for development.
                    </div>
                    <Button 
                      className="w-full" 
                      onClick={() => router.push('/dashboard/student')}
                    >
                      Mock Login as Student
                    </Button>
                    <Button 
                      variant="secondary"
                      className="w-full" 
                      onClick={() => router.push('/dashboard/mentor')}
                    >
                      Mock Login as Mentor
                    </Button>
                  </div>
                )}
              </div>
            )}
            
            <p className="text-xs text-center text-muted-foreground mt-4">
              By logging in, you agree to our Terms of Service and Privacy Policy.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
