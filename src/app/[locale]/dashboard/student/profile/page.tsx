"use client";

import { useTelegram } from "@/components/auth/TelegramProvider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, Shield, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const { user } = useTelegram();
  const router = useRouter();
  
  const userName = user?.first_name ? `${user.first_name} ${user.last_name || ''}` : "Felix Student";
  const userPhoto = user?.photo_url || "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix";
  const username = user?.username ? `@${user.username}` : "No username";

  return (
    <div className="p-4 md:p-8 max-w-2xl mx-auto space-y-6">
      <Card className="gamified-card border-b-4">
        <CardHeader className="text-center flex flex-col items-center pt-8">
          <div className="h-24 w-24 bg-muted rounded-full border-4 border-primary/20 overflow-hidden mb-4">
            <img src={userPhoto} alt="Avatar" className="w-full h-full object-cover" />
          </div>
          <CardTitle className="text-3xl font-black tracking-tight">{userName}</CardTitle>
          <p className="text-muted-foreground font-medium">{username}</p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-surface rounded-2xl p-4 border-2 border-border flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Shield className="text-primary h-6 w-6" />
              <div>
                <p className="font-bold">Telegram Account</p>
                <p className="text-sm text-muted-foreground">Connected</p>
              </div>
            </div>
            <Button variant="outline" size="sm" disabled>Verified</Button>
          </div>

          <div className="bg-surface rounded-2xl p-4 border-2 border-border flex items-center justify-between">
            <div className="flex items-center gap-3">
              <User className="text-primary h-6 w-6" />
              <div>
                <p className="font-bold">Current Level</p>
                <p className="text-sm text-muted-foreground">Level 5 Scholar</p>
              </div>
            </div>
            <span className="font-black text-xl text-primary">1450 XP</span>
          </div>

          <Button 
            variant="destructive" 
            className="w-full gamified-btn border-b-4 border-destructive/50"
            onClick={() => router.push('/login')}
          >
            <LogOut className="mr-2 h-5 w-5" />
            Log Out
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
